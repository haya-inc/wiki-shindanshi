'use server';

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import {
  actionResponse,
  type ActionResponse,
  feedbackRequest,
  type FeedbackRequest,
} from "@/components/feedback/schema";

function resolveFeedbackLogPath() {
  return process.env.DOCS_FEEDBACK_LOG_PATH ?? path.join(process.cwd(), "data", "docs-feedback.jsonl");
}

async function appendFeedbackLog(record: Record<string, unknown>) {
  const logPath = resolveFeedbackLogPath();

  try {
    await mkdir(path.dirname(logPath), { recursive: true });
    await appendFile(logPath, `${JSON.stringify(record)}\n`, "utf8");
  } catch (error) {
    console.warn("[docs-feedback] ファイル保存に失敗しました。ログ出力のみ継続します。", error);
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
    throw new Error(`Feedback webhook の送信に失敗しました: ${response.status}`);
  }
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
  return actionResponse.parse({});
}
