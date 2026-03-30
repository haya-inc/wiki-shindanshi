#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const docsRoot = path.join(repoRoot, "content", "docs", "past-exam-solutions");

const SUBJECTS = {
  economics: { letter: "A", htmlH19: "001_keizai.html" },
  finance: { letter: "B", htmlH19: "002_zaimu_kaikei.html" },
  management: { letter: "C", htmlH19: "003_kigyokeiei_riron.html" },
  operations: { letter: "D", htmlH19: "004_uneikanri.html" },
  "business-law": { letter: "E", htmlH19: "006_keieihoumu.html" },
  "info-systems": { letter: "F", htmlH19: "007_keieijyoho.html" },
  "sme-policy": { letter: "G", htmlH19: "008_chushokigyo_keiei_seisaku.html" },
};

const YEAR_KEYS = Array.from(
  { length: 12 },
  (_, index) => `h${String(index + 19).padStart(2, "0")}`,
).concat(
  Array.from(
    { length: 7 },
    (_, index) => `r${String(index + 1).padStart(2, "0")}`,
  ),
);

const responseCache = new Map();
const answerPageLinkCache = new Map();

function toCalendarYear(yearKey) {
  if (yearKey.startsWith("h")) {
    return 1988 + Number(yearKey.slice(1));
  }
  return 2018 + Number(yearKey.slice(1));
}

function dedupe(values) {
  return [...new Set(values)];
}

async function fetchBuffer(url) {
  if (responseCache.has(url)) {
    return responseCache.get(url);
  }

  const response = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0" },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  responseCache.set(url, buffer);
  return buffer;
}

function answerPageUrl(yearKey) {
  if (yearKey === "h20") {
    return "https://www.jf-cmca.jp/contents/010_c_/010_c_h20_shiken/H20_1ji_seikai.html";
  }
  if (yearKey === "h21" || yearKey === "h22") {
    return `https://www.jf-cmca.jp/contents/010_c_/010_c_${yearKey}_shiken/${yearKey.toUpperCase()}_005_1ji_shiken_kaitou.html`;
  }
  if (yearKey === "r01") {
    return "https://www.jf-cmca.jp/contents/010_c_/010_c_h31_shiken/R01_1ji_shiken_kaitou.html";
  }
  if (yearKey === "h19") {
    return null;
  }
  return `https://www.jf-cmca.jp/contents/010_c_/010_c_${yearKey}_shiken/${yearKey.toUpperCase()}_1ji_shiken_kaitou.html`;
}

async function fetchAnswerPageLinks(yearKey) {
  if (answerPageLinkCache.has(yearKey)) {
    return answerPageLinkCache.get(yearKey);
  }

  const url = answerPageUrl(yearKey);
  if (!url) {
    return [];
  }

  const decoder = new TextDecoder("shift_jis");
  const html = decoder.decode(await fetchBuffer(url));
  const links = dedupe(
    [...html.matchAll(/href="([^"]+)"/g)]
      .map((match) => match[1])
      .map((href) => new URL(href, url).href),
  );

  answerPageLinkCache.set(yearKey, links);
  return links;
}

function matchesSubjectPdf(url, letter, calendarYear) {
  const stem = path.posix
    .basename(new URL(url).pathname)
    .toLowerCase()
    .replace(/\.pdf$/, "");
  if (!stem || stem.includes("annai") || stem === "seikai_teisei") {
    return false;
  }

  const lowerLetter = letter.toLowerCase();
  const year = String(calendarYear);
  return (
    stem.startsWith(lowerLetter) ||
    stem.startsWith(`${year}${lowerLetter}`) ||
    stem.startsWith(`${lowerLetter}_`) ||
    stem.includes(`${lowerLetter}${year}`) ||
    stem.includes(`${year}${lowerLetter}`)
  );
}

function scorePdfUrl(url) {
  const stem = path.posix.basename(new URL(url).pathname).toLowerCase();
  let score = 0;
  if (stem.includes("v2")) {
    score += 2;
  }
  return score;
}

async function resolvePdfUrls(yearKey, letter) {
  const links = await fetchAnswerPageLinks(yearKey);
  const calendarYear = toCalendarYear(yearKey);
  return links
    .filter((url) => url.toLowerCase().endsWith(".pdf"))
    .filter((url) => matchesSubjectPdf(url, letter, calendarYear))
    .sort((left, right) => scorePdfUrl(right) - scorePdfUrl(left));
}

function pdfTextFromBuffer(buffer) {
  const dir = mkdtempSync(path.join(tmpdir(), "past-exam-answer-"));
  const pdfPath = path.join(dir, "answer.pdf");
  writeFileSync(pdfPath, buffer);
  try {
    return execFileSync("pdftotext", ["-layout", pdfPath, "-"], {
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 10,
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function normalizeChoiceText(raw) {
  if (!raw) {
    return null;
  }
  if (/[－-]/.test(raw) && !/[アイウエオ]/.test(raw)) {
    return "－";
  }
  const choices = dedupe(
    [...raw.matchAll(/[アイウエオ]/g)].map((match) => match[0]),
  );
  if (choices.length === 0) {
    return null;
  }
  return choices.join("/");
}

function parseOfficialAnswersFromPdf(text) {
  const lines = text
    .replace(/\r/g, "")
    .replace(/\u3000/g, " ")
    .split("\n");
  const answers = [];
  let currentQuestion = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line || line.includes("正解・配点について")) {
      continue;
    }

    const parts = line
      .split(/\s{2,}/)
      .map((part) => part.trim())
      .filter(Boolean);

    if (parts.length === 0) {
      continue;
    }

    for (let index = 0; index < parts.length; index += 1) {
      const part = parts[index];

      if (/^[＊*]*第[0-9０-９]+問$/.test(part)) {
        currentQuestion = part;
        const next = parts[index + 1];
        const answerCandidate =
          next && (/^設問[0-9０-９]+$/.test(next) || next === "-")
            ? parts[index + 2]
            : next;
        const normalized = normalizeChoiceText(answerCandidate);
        if (normalized) {
          answers.push(normalized);
        }
        break;
      }

      if (currentQuestion && /^設問[0-9０-９]+$/.test(part)) {
        const normalized = normalizeChoiceText(parts[index + 1]);
        if (normalized) {
          answers.push(normalized);
        }
      }
    }
  }

  return answers;
}

function stripHtml(text) {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/\r/g, "")
    .replace(/\u3000/g, " ");
}

function parseOfficialAnswersFromHtml(buffer) {
  const decoder = new TextDecoder("shift_jis");
  const text = stripHtml(decoder.decode(buffer));
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const answers = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (!/^第[0-9０-９]+問$/.test(lines[index])) {
      continue;
    }

    let cursor = index + 1;
    while (cursor < lines.length && /^設問[0-9０-９]+$/.test(lines[cursor])) {
      const normalized = normalizeChoiceText(lines[cursor + 1]);
      if (normalized) {
        answers.push(normalized);
      }
      cursor += 3;
    }

    if (lines[cursor] === "-") {
      const normalized = normalizeChoiceText(lines[cursor + 1]);
      if (normalized) {
        answers.push(normalized);
      }
    }
  }

  return answers;
}

async function getOfficialAnswers(yearKey, subjectKey) {
  if (yearKey === "h19") {
    const url = `https://www.jf-cmca.jp/contents/007_c_shiken/005_c_kaitou/${SUBJECTS[subjectKey].htmlH19}`;
    const buffer = await fetchBuffer(url);
    return { url, answers: parseOfficialAnswersFromHtml(buffer) };
  }

  const { letter } = SUBJECTS[subjectKey];
  for (const url of await resolvePdfUrls(yearKey, letter)) {
    const buffer = await fetchBuffer(url);
    const answers = parseOfficialAnswersFromPdf(pdfTextFromBuffer(buffer));
    if (answers.length > 0) {
      return { url, answers };
    }
  }

  throw new Error(`official answer url not found for ${yearKey}/${subjectKey}`);
}

function parseMdxAnswers(filePath) {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const results = [];
  let currentLabel = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const headingMatch =
      line.match(/^###\s+(.+)$/) ?? line.match(/^####\s+(.+)$/);
    if (headingMatch) {
      currentLabel = headingMatch[1].trim();
      continue;
    }

    let raw = null;
    const inlineMatch = line.match(/^\*\*正解\*\*[:：]\s*(.+)$/);
    let style = null;
    let valueLineIndex = null;
    if (inlineMatch) {
      raw = inlineMatch[1].trim();
      style = "inline";
      valueLineIndex = index;
    } else if (/^\*\*正解\*\*\s*$/.test(line)) {
      let cursor = index + 1;
      while (cursor < lines.length && !lines[cursor].trim()) {
        cursor += 1;
      }
      raw = lines[cursor]?.trim() ?? null;
      style = "next-line";
      valueLineIndex = cursor;
    }

    if (!raw) {
      continue;
    }
    const choice = normalizeChoiceText(raw);
    results.push({
      label: currentLabel ?? `answer-${results.length + 1}`,
      raw,
      choice,
      style,
      answerLineIndex: index,
      valueLineIndex,
    });
  }

  return results;
}

function formatOfficialAnswer(answer) {
  return answer.replace(/\//g, "／");
}

function rewriteAlignedFiles(comparisons) {
  let updatedFiles = 0;

  for (const item of comparisons) {
    if (item.mismatches.length === 0 || item.mdxCount !== item.officialCount) {
      continue;
    }

    const lines = readFileSync(item.filePath, "utf8").split("\n");
    let changed = false;

    for (let index = 0; index < item.mdxAnswers.length; index += 1) {
      const mdx = item.mdxAnswers[index];
      const officialAnswer = item.officialAnswers[index];
      const formatted = formatOfficialAnswer(officialAnswer);

      if (mdx.style === "inline") {
        const nextLine = `**正解**: ${formatted}`;
        if (lines[mdx.answerLineIndex] !== nextLine) {
          lines[mdx.answerLineIndex] = nextLine;
          changed = true;
        }
      } else if (mdx.style === "next-line" && mdx.valueLineIndex != null) {
        if (lines[mdx.valueLineIndex] !== formatted) {
          lines[mdx.valueLineIndex] = formatted;
          changed = true;
        }
      }
    }

    if (changed) {
      writeFileSync(item.filePath, lines.join("\n"));
      updatedFiles += 1;
    }
  }

  return updatedFiles;
}

async function collectComparisons() {
  const comparisons = [];

  for (const yearKey of YEAR_KEYS) {
    for (const subjectKey of Object.keys(SUBJECTS)) {
      const filePath = path.join(docsRoot, yearKey, `${subjectKey}.mdx`);
      const mdxAnswers = parseMdxAnswers(filePath);
      const official = await getOfficialAnswers(yearKey, subjectKey);
      const maxLength = Math.max(mdxAnswers.length, official.answers.length);
      const mismatches = [];

      for (let index = 0; index < maxLength; index += 1) {
        const mdx = mdxAnswers[index];
        const officialAnswer = official.answers[index] ?? null;

        if (!mdx || !officialAnswer || mdx.choice !== officialAnswer) {
          mismatches.push({
            index: index + 1,
            label: mdx?.label ?? `missing-${index + 1}`,
            mdx: mdx?.raw ?? null,
            official: officialAnswer,
          });
        }
      }

      comparisons.push({
        yearKey,
        subjectKey,
        filePath,
        officialUrl: official.url,
        officialAnswers: official.answers,
        mdxCount: mdxAnswers.length,
        mdxAnswers,
        officialCount: official.answers.length,
        mismatches,
      });
    }
  }

  return comparisons;
}

function printText(comparisons) {
  const problemFiles = comparisons.filter((item) => item.mismatches.length > 0);
  console.log(`checked: ${comparisons.length} files`);
  console.log(`problem files: ${problemFiles.length}`);

  for (const item of problemFiles) {
    console.log(`\n[${item.yearKey}/${item.subjectKey}] ${item.filePath}`);
    console.log(`official: ${item.officialUrl}`);
    console.log(`counts: mdx=${item.mdxCount}, official=${item.officialCount}`);
    for (const mismatch of item.mismatches.slice(0, 20)) {
      console.log(
        `  - #${mismatch.index} ${mismatch.label}: mdx=${mismatch.mdx ?? "null"} / official=${mismatch.official ?? "null"}`,
      );
    }
    if (item.mismatches.length > 20) {
      console.log(`  ... ${item.mismatches.length - 20} more`);
    }
  }
}

const args = new Set(process.argv.slice(2));
const comparisons = await collectComparisons();

if (args.has("--rewrite-aligned")) {
  const updatedFiles = rewriteAlignedFiles(comparisons);
  console.log(`rewritten aligned files: ${updatedFiles}`);
}

if (args.has("--json")) {
  console.log(JSON.stringify(comparisons, null, 2));
} else {
  printText(comparisons);
}
