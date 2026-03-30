import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name))
        : [path.join(dir, entry.name)],
    );
}

function collectKnowledgeBlock(lines, startIndex) {
  const block = [lines[startIndex].replace("**必要知識**:", "").trim()];

  for (let i = startIndex + 1; i < lines.length; i += 1) {
    const line = lines[i];

    if (
      line.startsWith("**") ||
      line.startsWith("### ") ||
      line.startsWith("## ") ||
      line.startsWith("---")
    ) {
      break;
    }

    if (line.trim() === "") {
      break;
    }

    block.push(line.trim());
  }

  return block.join(" ");
}

function buildRouteSet(docsRoot) {
  const docsFiles = walk(docsRoot).filter((file) => /\.(md|mdx)$/.test(file));
  const routes = new Set();

  for (const file of docsFiles) {
    const relative = path.relative(docsRoot, file).replaceAll(path.sep, "/");

    if (relative === "meta.json") {
      continue;
    }

    const route =
      "/" + relative.replace(/\.(md|mdx)$/, "").replace(/\/index$/, "");

    routes.add(route);
  }

  return routes;
}

function analyze() {
  const repoRoot = process.cwd();
  const docsRoot = path.join(repoRoot, "content/docs");
  const pastExamRoot = path.join(docsRoot, "past-exam-solutions");
  const routes = buildRouteSet(docsRoot);
  const subjectRoots = new Set([
    "/economics-and-economic-policy",
    "/finance-and-accounting",
    "/business-management-theory",
    "/operations-management",
    "/business-law",
    "/management-information-systems",
    "/sme-management-and-policy",
  ]);

  const solutionFiles = walk(pastExamRoot).filter(
    (file) => file.endsWith(".mdx") && !file.endsWith("/index.mdx"),
  );

  const fileSummaries = [];
  const questionIssues = [];
  const issueCounts = {
    missing_link: 0,
    placeholder_external: 0,
    broad_hub_link: 0,
  };

  let totalKnowledgeBlocks = 0;
  let cleanKnowledgeBlocks = 0;

  for (const file of solutionFiles) {
    const relativeFile = path
      .relative(repoRoot, file)
      .replaceAll(path.sep, "/");
    const text = fs.readFileSync(file, "utf8");
    const lines = text.split(/\r?\n/);
    const impactedQuestions = [];

    let currentQuestion = "";
    let questionCount = 0;
    let blockCount = 0;

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];

      if (line.startsWith("### ")) {
        currentQuestion = line.replace(/^###\s+/, "").trim();
        questionCount += 1;
      }

      if (!line.startsWith("**必要知識**:")) {
        continue;
      }

      totalKnowledgeBlocks += 1;
      blockCount += 1;

      const raw = collectKnowledgeBlock(lines, i);
      const links = [...raw.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(
        (match) => ({
          label: match[1],
          url: match[2],
        }),
      );

      const flags = new Set();

      if (links.length === 0) {
        flags.add("missing_link");
      }

      for (const link of links) {
        if (/^https?:\/\//.test(link.url)) {
          if (!link.url.includes("jf-cmca.jp")) {
            flags.add("placeholder_external");
          }

          continue;
        }

        const route = link.url.split("#")[0];

        if (routes.has(route) && subjectRoots.has(route)) {
          flags.add("broad_hub_link");
        }
      }

      if (flags.size === 0) {
        cleanKnowledgeBlocks += 1;
        continue;
      }

      for (const flag of flags) {
        issueCounts[flag] += 1;
      }

      const issue = {
        file: relativeFile,
        question: currentQuestion,
        flags: [...flags],
        raw,
      };

      questionIssues.push(issue);
      impactedQuestions.push(issue);
    }

    fileSummaries.push({
      file: relativeFile,
      questions: questionCount,
      knowledgeBlocks: blockCount,
      impactedQuestions: impactedQuestions.length,
      issueCounts: impactedQuestions
        .flatMap((issue) => issue.flags)
        .reduce((counts, flag) => {
          counts[flag] = (counts[flag] ?? 0) + 1;
          return counts;
        }, {}),
    });
  }

  const filesWithIssue = fileSummaries.filter(
    (summary) => summary.impactedQuestions > 0,
  );

  filesWithIssue.sort(
    (left, right) => right.impactedQuestions - left.impactedQuestions,
  );

  return {
    summary: {
      totalFiles: fileSummaries.length,
      totalKnowledgeBlocks,
      cleanKnowledgeBlocks,
      passRate: Number(
        ((cleanKnowledgeBlocks / totalKnowledgeBlocks) * 100).toFixed(1),
      ),
      filesWithIssue: filesWithIssue.length,
      impactedQuestions: questionIssues.length,
      issueCounts,
    },
    topFiles: filesWithIssue.slice(0, 20),
    questionIssues,
  };
}

function printHumanReadable(result) {
  const { summary, topFiles } = result;

  console.log("# 過去問解説 必要知識監査");
  console.log("");
  console.log(`- 対象ファイル: ${summary.totalFiles}`);
  console.log(`- 必要知識ブロック: ${summary.totalKnowledgeBlocks}`);
  console.log(
    `- 直接たどれるブロック: ${summary.cleanKnowledgeBlocks} (${summary.passRate}%)`,
  );
  console.log(`- 問題があるファイル: ${summary.filesWithIssue}`);
  console.log(`- 影響を受ける設問: ${summary.impactedQuestions}`);
  console.log("");
  console.log("## 問題種別");
  console.log(`- missing_link: ${summary.issueCounts.missing_link}`);
  console.log(
    `- placeholder_external: ${summary.issueCounts.placeholder_external}`,
  );
  console.log(`- broad_hub_link: ${summary.issueCounts.broad_hub_link}`);
  console.log("");
  console.log("## 重点ファイル");

  for (const summaryRow of topFiles) {
    const counts = Object.entries(summaryRow.issueCounts)
      .map(([name, count]) => `${name}=${count}`)
      .join(", ");

    console.log(
      `- ${summaryRow.file}: impacted=${summaryRow.impactedQuestions}, blocks=${summaryRow.knowledgeBlocks}, ${counts}`,
    );
  }
}

const result = analyze();

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(result, null, 2));
} else {
  printHumanReadable(result);
}
