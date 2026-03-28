import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const registryPath = path.join(root, "docs/wiki-freshness-registry.json");
const progressTrackerPath = path.join(root, "docs/wiki-progress-tracker.md");

const gateHeadingPatterns = {
  G1: [
    /##\s+このページの役割/u,
    /##\s+この事例の位置づけ/u,
    /##\s+この科目の位置づけ/u,
    /##\s+全体像/u,
    /##\s+このページの前提/u,
  ],
  G2: [
    /##\s+学習のポイント/u,
    /##\s+学習メモ/u,
    /##\s+学習の優先順位/u,
    /##\s+現時点で重視していること/u,
    /##\s+\d{4}-\d{2}-\d{2}\s+時点での読み方/u,
  ],
  G3: [
    /##\s+典型的なつまずき/u,
    /##\s+問題を解くときの観点/u,
    /##\s+頻出の設問パターン/u,
    /##\s+解答順の考え方/u,
    /##\s+このページの次の拡張方針/u,
    /##\s+試験の構造/u,
    /##\s+登録までの流れ/u,
  ],
};

function parseDateString(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    throw new Error(`日付の形式が不正です: ${value}`);
  }

  const [, year, month, day] = match;
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
}

function addDays(date, days) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function formatDate(date, timeZone = "Asia/Tokyo") {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function diffDays(fromDate, toDate) {
  const diff = toDate.getTime() - fromDate.getTime();
  return Math.floor(diff / (24 * 60 * 60 * 1000));
}

function walkFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

export function parseClaimedGates(value) {
  const compact = value.replace(/\s+/g, "");

  if (/^G1-G5$/u.test(compact)) {
    return ["G1", "G2", "G3", "G4", "G5"];
  }

  if (/^G1-G6$/u.test(compact)) {
    return ["G1", "G2", "G3", "G4", "G5", "G6"];
  }

  return compact.split(",").filter(Boolean);
}

function buildDocPathCandidates(route) {
  const slug = route.replace(/^\/docs\/?/u, "");
  const basePath = slug === "" ? "content/docs" : path.join("content/docs", slug);
  const groupedBasePath = slug === "" ? null : path.join("content/docs", "(first-stage)", slug);

  return [
    path.join(root, `${basePath}.mdx`),
    path.join(root, basePath, "index.mdx"),
    groupedBasePath ? path.join(root, `${groupedBasePath}.mdx`) : null,
    groupedBasePath ? path.join(root, groupedBasePath, "index.mdx") : null,
  ].filter(Boolean);
}

function routeToDocPath(route) {
  return buildDocPathCandidates(route).find((candidate) => fs.existsSync(candidate)) ?? null;
}

function extractTrackedPages() {
  const content = fs.readFileSync(progressTrackerPath, "utf8");
  const lines = content.split("\n");
  const trackedPages = [];
  let currentHeaders = null;

  for (const line of lines) {
    if (!line.startsWith("|")) {
      currentHeaders = null;
      continue;
    }

    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

    if (cells.length < 5) {
      continue;
    }

    if (cells.every((cell) => /^-+$/u.test(cell))) {
      continue;
    }

    if (cells[0] === "章" || cells[0] === "ページ") {
      currentHeaders = cells;
      continue;
    }

    if (!currentHeaders) {
      continue;
    }

    const route = cells[1];
    const topicType = cells[2];
    const status = cells[3];
    const claimedGates = cells[4];

    if (!route.startsWith("/docs")) {
      continue;
    }

    trackedPages.push({
      route,
      topicType,
      status,
      claimedGates,
    });
  }

  return trackedPages;
}

function hasAnyPattern(content, patterns) {
  return patterns.some((pattern) => pattern.test(content));
}

export function detectActualGates(content, hasFreshnessEntry) {
  const actual = new Set();
  const hasInternalLink = /\]\(\/docs\/[^)]+\)/u.test(content);
  const hasExternalLink = /\]\(https:\/\/[^)]+\)/u.test(content);
  const hasDateMarker = /\b20\d{2}-\d{2}-\d{2}\b/u.test(content) || /令和\d+年度/u.test(content);

  if (hasAnyPattern(content, gateHeadingPatterns.G1)) {
    actual.add("G1");
  }

  // 更新参照ページの見出しは毎回日付が変わるため、固定日付ではなく形式で判定する。
  if (hasAnyPattern(content, gateHeadingPatterns.G2)) {
    actual.add("G2");
  }

  if (hasAnyPattern(content, gateHeadingPatterns.G3) || /^\|.+\|$/mu.test(content)) {
    actual.add("G3");
  }

  if (hasInternalLink) {
    actual.add("G4");
  }

  actual.add("G5");

  if (hasFreshnessEntry && hasExternalLink && hasDateMarker) {
    actual.add("G6");
  }

  return actual;
}

function loadFreshnessRegistry() {
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const timeZone = registry.timezone ?? "Asia/Tokyo";
  const today = parseDateString(formatDate(new Date(), timeZone));
  const freshnessEntries = new Map(
    registry.entries.map((entry) => [entry.docPath, entry])
  );

  return { registry, freshnessEntries, today, timeZone };
}

// 鮮度台帳そのものの整合と期限切れを確認する。
function validateFreshnessEntries(registry, today, timeZone) {
  const errors = [];
  const warnings = [];
  const results = [];

  for (const entry of registry.entries) {
    const docPath = path.join(root, entry.docPath);

    if (!fs.existsSync(docPath)) {
      errors.push(`ファイルが見つかりません: ${entry.docPath}`);
      continue;
    }

    if (!Number.isInteger(entry.reviewWindowDays) || entry.reviewWindowDays <= 0) {
      errors.push(`reviewWindowDays が不正です: ${entry.route}`);
      continue;
    }

    if (!Array.isArray(entry.sourceUrls) || entry.sourceUrls.length === 0) {
      errors.push(`一次情報 URL が未設定です: ${entry.route}`);
      continue;
    }

    const content = fs.readFileSync(docPath, "utf8");
    const reviewedAt = parseDateString(entry.lastReviewedAt);
    const staleOn = addDays(reviewedAt, entry.reviewWindowDays);
    const daysLeft = diffDays(today, staleOn);

    for (const sourceUrl of entry.sourceUrls) {
      if (!content.includes(sourceUrl)) {
        errors.push(`本文に一次情報 URL が見つかりません: ${entry.route} -> ${sourceUrl}`);
      }
    }

    if (today > staleOn) {
      errors.push(
        `鮮度確認の期限切れです: ${entry.route} 最終確認 ${entry.lastReviewedAt} / 期限 ${formatDate(staleOn, timeZone)}`
      );
      continue;
    }

    if (daysLeft <= 14) {
      warnings.push(
        `鮮度確認の期限が近いです: ${entry.route} 最終確認 ${entry.lastReviewedAt} / 期限 ${formatDate(staleOn, timeZone)}`
      );
    }

    results.push(
      `OK ${entry.route} 最終確認 ${entry.lastReviewedAt} / 次回確認期限 ${formatDate(staleOn, timeZone)}`
    );
  }

  return { errors, warnings, results };
}

// 進捗トラッカーの申告が本文の実態とずれていないか確認する。
function validateTrackedPages(trackedPages, freshnessEntries) {
  const errors = [];

  for (const trackedPage of trackedPages) {
    const resolvedPath = routeToDocPath(trackedPage.route);

    if (!resolvedPath) {
      errors.push(`進捗トラッカーの公開導線に対応するファイルが見つかりません: ${trackedPage.route}`);
      continue;
    }

    const relativeDocPath = toPosix(path.relative(root, resolvedPath));
    const content = fs.readFileSync(resolvedPath, "utf8");
    const freshnessEntry = freshnessEntries.get(relativeDocPath);
    const actualGates = detectActualGates(content, Boolean(freshnessEntry));
    const claimedGates = parseClaimedGates(trackedPage.claimedGates);

    for (const gate of claimedGates) {
      if (!actualGates.has(gate)) {
        errors.push(`達成ゲートの根拠が本文から確認できません: ${trackedPage.route} -> ${gate}`);
      }
    }

    if (trackedPage.topicType === "更新論点" && trackedPage.status === "公開済み" && !actualGates.has("G6")) {
      errors.push(`更新論点の公開済みページに G6 が不足しています: ${trackedPage.route}`);
    }
  }

  return errors;
}

function collectDocFiles() {
  return walkFiles(path.join(root, "content/docs"))
    .filter((filePath) => filePath.endsWith(".mdx"))
    .map((filePath) => ({
      absolutePath: filePath,
      relativePath: toPosix(path.relative(root, filePath)),
      content: fs.readFileSync(filePath, "utf8"),
    }));
}

// 日付や最新確認メモを含むページが、鮮度台帳から漏れていないか確認する。
function validateUpdateProneDocs(freshnessEntries) {
  const errors = [];

  for (const docFile of collectDocFiles()) {
    const looksUpdateProne =
      /最新確認メモ/u.test(docFile.content) ||
      /更新確認メモ/u.test(docFile.content) ||
      /\b20\d{2}-\d{2}-\d{2}\b/u.test(docFile.content) ||
      /令和\d+年度/u.test(docFile.content);

    if (looksUpdateProne && !freshnessEntries.has(docFile.relativePath)) {
      errors.push(`更新系ページが鮮度台帳に未登録です: ${docFile.relativePath}`);
    }
  }

  return errors;
}

function printLines(lines, writer) {
  for (const line of lines) {
    writer(line);
  }
}

export function main() {
  const { registry, freshnessEntries, today, timeZone } = loadFreshnessRegistry();
  const freshnessValidation = validateFreshnessEntries(
    registry,
    today,
    timeZone
  );
  const trackedPageErrors = validateTrackedPages(extractTrackedPages(), freshnessEntries);
  const updateProneErrors = validateUpdateProneDocs(freshnessEntries);
  const errors = [
    ...freshnessValidation.errors,
    ...trackedPageErrors,
    ...updateProneErrors,
  ];

  printLines(freshnessValidation.results, console.log);
  printLines(freshnessValidation.warnings, console.warn);

  if (errors.length > 0) {
    printLines(errors, console.error);
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
