import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const secondStageRoot = path.join(root, "content/docs/second-stage");
const referenceRoot = path.join(root, "content/docs/reference");

const secondStageFiles = fs.readdirSync(secondStageRoot);
const caseHubPattern =
  /^case-[1-4]-(organization-and-hr|marketing-and-distribution|production-and-technology|finance-and-accounting)\.mdx$/u;
const questionPatternPagePattern = /^case-[1-4]-question-patterns\.mdx$/u;
const answerFrameworkPagePattern = /^case-[1-4]-answer-frameworks\.mdx$/u;

// この定義は docs/wiki-ui-patterns.md の最小テンプレと対応させる。
const structureTemplates = [
  {
    type: "事例ハブ",
    matcher: (fileName) => caseHubPattern.test(fileName),
    requiredSections: [
      { label: "この事例の位置づけ", patterns: [/^この事例の位置づけ$/u] },
      { label: "この wiki で扱う範囲", patterns: [/^この wiki で扱う範囲$/u] },
      { label: "関連が強い1次科目", patterns: [/^関連が強い1次科目$/u] },
      { label: "この事例の分解ページ", patterns: [/^この事例の分解ページ$/u] },
      { label: "学習のポイント", patterns: [/^学習のポイント$/u] },
      { label: "典型的なつまずき", patterns: [/^典型的なつまずき$/u] },
      { label: "次に読むとよいページ", patterns: [/^次に読むとよいページ$/u] },
    ],
  },
  {
    type: "設問型ページ",
    matcher: (fileName) => questionPatternPagePattern.test(fileName),
    requiredSections: [
      { label: "このページの役割", patterns: [/^このページの役割$/u] },
      { label: "まず固定する視点", patterns: [/^まず固定する視点$/u] },
      { label: "設問型の全体像", patterns: [/^設問型の全体像$/u] },
      { label: "よくある誤答", patterns: [/^よくある誤答$/u] },
      { label: "次に読むページ", patterns: [/^次に読むページ$/u] },
    ],
  },
  {
    type: "答案骨子ページ",
    matcher: (fileName) => answerFrameworkPagePattern.test(fileName),
    requiredSections: [
      { label: "このページの役割", patterns: [/^このページの役割$/u] },
      {
        label: "骨子へ入る前の整理",
        patterns: [/^解答を作る順$/u, /^先に決める得点計画$/u],
      },
      {
        label: "答案骨子の中核",
        patterns: [/^レイヤー別の答案骨子$/u, /^設問型別の答案骨子$/u],
      },
      { label: "失点を避ける確認", patterns: [/^失点を避ける確認$/u] },
      { label: "関連ページ", patterns: [/^関連ページ$/u] },
    ],
  },
  {
    type: "事例個別ノード",
    matcher: (fileName) =>
      /^case-[1-4]-/u.test(fileName) &&
      !caseHubPattern.test(fileName) &&
      !questionPatternPagePattern.test(fileName) &&
      !answerFrameworkPagePattern.test(fileName),
    requiredSections: [
      { label: "このページの役割", patterns: [/^このページの役割$/u] },
      { label: "先に固定すること", patterns: [/^先に固定すること$/u] },
      {
        label: "解き方の手順",
        patterns: [/^.+型の処理順$/u, /^解く順$/u],
      },
      { label: "典型例題", patterns: [/^典型例題$/u] },
      { label: "誤答例と直し方", patterns: [/^誤答例と直し方$/u] },
      { label: "よくある失点", patterns: [/^よくある失点$/u] },
      { label: "次に読むページ", patterns: [/^次に読むページ$/u] },
    ],
  },
];

const structureRules = [
  ...structureTemplates.map((template) => ({
    type: template.type,
    files: resolveSecondStageFiles(template.matcher),
    requiredSections: template.requiredSections,
  })),
  {
    type: "更新参照ページ",
    files: [path.join(referenceRoot, "exam-guide.mdx")],
    requiredSections: [
      { label: "このページの前提", patterns: [/^このページの前提$/u] },
      {
        label: "確認日時つきの最新更新点",
        patterns: [/^\d{4}-\d{2}-\d{2} 時点で確認できる最新の改正点$/u],
      },
      {
        label: "確認日時つきの読み方",
        patterns: [/^\d{4}-\d{2}-\d{2} 時点での読み方$/u],
      },
      { label: "この wiki での運用ルール", patterns: [/^この wiki での運用ルール$/u] },
      { label: "公式情報", patterns: [/^公式情報$/u] },
    ],
  },
];

function resolveSecondStageFiles(matcher) {
  return secondStageFiles
    .filter((fileName) => matcher(fileName))
    .map((fileName) => path.join(secondStageRoot, fileName));
}

function normalizeHeading(value) {
  return value
    .replace(/`([^`]*)`/gu, "$1")
    .replace(/\[(.*?)\]\(.*?\)/gu, "$1")
    .replace(/<[^>]+>/gu, "")
    .trim();
}

function extractLevel2Headings(content) {
  const headings = [];
  let inCodeFence = false;

  for (const line of content.split("\n")) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const matched = /^##\s+(.+?)\s*$/u.exec(trimmed);

    if (!matched) {
      continue;
    }

    const heading = normalizeHeading(matched[1]);

    if (heading.length > 0) {
      headings.push(heading);
    }
  }

  return headings;
}

function matchesAnyHeading(headings, patterns) {
  return patterns.some((pattern) => headings.some((heading) => pattern.test(heading)));
}

function findMissingSections(headings, requiredSections) {
  return requiredSections
    .filter((section) => !matchesAnyHeading(headings, section.patterns))
    .map((section) => section.label);
}

function validateRule(rule) {
  const errors = [];

  for (const filePath of rule.files) {
    if (!fs.existsSync(filePath)) {
      errors.push(`ファイルが見つかりません: ${path.relative(root, filePath)}`);
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");
    const headings = extractLevel2Headings(content);
    const missingSections = findMissingSections(headings, rule.requiredSections);

    if (missingSections.length > 0) {
      errors.push(
        `${path.relative(root, filePath)}: ${rule.type} に必要な見出しが不足しています -> ${missingSections.join(", ")}`,
      );
    }
  }

  return {
    type: rule.type,
    count: rule.files.length,
    errors,
  };
}

function main() {
  const results = structureRules.map((rule) => validateRule(rule));
  const errors = results.flatMap((result) => result.errors);

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`NG ${error}`);
    }

    process.exit(1);
  }

  for (const result of results) {
    console.log(`OK ${result.type} ${result.count}ページ`);
  }
}

main();
