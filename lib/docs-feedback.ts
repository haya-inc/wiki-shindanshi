"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import {
  actionResponse,
  type ActionResponse,
  feedbackRequest,
  type FeedbackRequest,
} from "@/components/feedback/schema";

function resolveFeedbackLogPath() {
  return (
    process.env.DOCS_FEEDBACK_LOG_PATH ??
    path.join(process.cwd(), "data", "docs-feedback.jsonl")
  );
}

async function appendFeedbackLog(record: Record<string, unknown>) {
  const logPath = resolveFeedbackLogPath();

  try {
    await mkdir(path.dirname(logPath), { recursive: true });
    await appendFile(logPath, `${JSON.stringify(record)}\n`, "utf8");
  } catch (error) {
    console.warn(
      "[docs-feedback] ファイル保存に失敗しました。ログ出力のみ継続します。",
      error,
    );
  }
}

async function postFeedbackWebhook(record: Record<string, unknown>) {
  const webhookUrl = process.env.DOCS_FEEDBACK_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(record),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Feedback webhook の送信に失敗しました: ${response.status}`,
    );
  }
}

/** GitHub Issue のタイトル（最大長は API 制限に合わせる） */
function buildGitHubIssueTitle(record: Record<string, unknown>): string {
  const prefix = "[docs feedback]";
  if (record.kind === "page") {
    const path = typeof record.path === "string" ? record.path : "";
    const opinion = typeof record.opinion === "string" ? record.opinion : "";
    const head = `${prefix} ${path || String(record.url ?? "page")} (${opinion})`;
    return head.length > 256 ? `${head.slice(0, 252)}…` : head;
  }
  if (record.kind === "block") {
    const url = typeof record.url === "string" ? record.url : "";
    const head = `${prefix} block ${url || "?"}`;
    return head.length > 256 ? `${head.slice(0, 252)}…` : head;
  }
  return prefix;
}

function parseGitHubRepoSpec(
  raw: string,
): { owner: string; repo: string } | null {
  const trimmed = raw.trim();
  const parts = trimmed.split("/");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return null;
  }
  return { owner: parts[0], repo: parts[1] };
}

function parseOptionalGitHubLabels(raw: string | undefined): string[] {
  if (!raw?.trim()) {
    return [];
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * `DOCS_FEEDBACK_GITHUB_TOKEN` と `DOCS_FEEDBACK_GITHUB_REPO` が揃っているときだけ
 * GitHub に Issue を作成し、ブラウザ用 URL を返す。
 */
async function createGitHubFeedbackIssue(
  record: Record<string, unknown>,
): Promise<string | undefined> {
  const token = process.env.DOCS_FEEDBACK_GITHUB_TOKEN;
  const repoRaw = process.env.DOCS_FEEDBACK_GITHUB_REPO;

  if (!token?.trim() || !repoRaw?.trim()) {
    return undefined;
  }

  const parsed = parseGitHubRepoSpec(repoRaw);
  if (!parsed) {
    console.warn(
      "[docs-feedback] DOCS_FEEDBACK_GITHUB_REPO は owner/repo 形式（例: haya-inc/shindanshi）にしてください。",
    );
    return undefined;
  }

  const { owner, repo } = parsed;
  const title = buildGitHubIssueTitle(record);
  const body = [
    "サイトの Feedback フォームからの自動投稿です。",
    "",
    "```json",
    JSON.stringify(record, null, 2),
    "```",
  ].join("\n");

  const labels = parseOptionalGitHubLabels(
    process.env.DOCS_FEEDBACK_GITHUB_LABELS,
  );

  const payload: { title: string; body: string; labels?: string[] } = {
    title,
    body,
  };
  if (labels.length > 0) {
    payload.labels = labels;
  }

  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token.trim()}`,
        "User-Agent": "shindanshi-docs-feedback",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    let detail = "";
    try {
      const err = (await response.json()) as { message?: string };
      if (err.message) {
        detail = ` (${err.message})`;
      }
    } catch {
      /* 本文が JSON でない場合は無視 */
    }
    throw new Error(
      `GitHub Issue の作成に失敗しました: ${response.status}${detail}`,
    );
  }

  const data = (await response.json()) as { html_url?: string };
  if (!data.html_url) {
    throw new Error(
      "GitHub Issue の作成に失敗しました: html_url がありません。",
    );
  }

  return data.html_url;
}

async function submitFeedbackRecord(record: Record<string, unknown>) {
  console.log("[docs-feedback]", record);
  await appendFeedbackLog(record);
  await postFeedbackWebhook(record);
}

function buildFeedbackRecord(feedback: FeedbackRequest) {
  const submittedAt = new Date().toISOString();

  if (feedback.kind === "page") {
    return {
      ...feedback,
      message: feedback.message || undefined,
      submittedAt,
    };
  }

  return {
    ...feedback,
    blockBody: feedback.blockBody || undefined,
    submittedAt,
  };
}

export async function submitFeedback(input: unknown): Promise<ActionResponse> {
  const feedback = feedbackRequest.parse(input);
  const record = buildFeedbackRecord(feedback);

  await submitFeedbackRecord(record);
  let githubUrl: string | undefined;
  try {
    githubUrl = await createGitHubFeedbackIssue(record);
  } catch (error) {
    console.warn(
      "[docs-feedback] GitHub Issue の作成に失敗しました。Feedback 記録は継続します。",
      error,
    );
  }

  return actionResponse.parse(githubUrl ? { githubUrl } : {});
}
