import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryPath = path.join(root, "docs/wiki-freshness-registry.json");
const cachePath = path.join(root, ".link-cache.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const uniqueUrls = [...new Set(registry.entries.flatMap((entry) => entry.sourceUrls))];
const userAgent = "shindanshi-wiki-link-check/1.0";
const timeoutMs = 8000;
const concurrency = 4;
const cacheTtlMs = 7 * 24 * 60 * 60 * 1000; // 7日

// --- キャッシュ読み込み ---

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(cachePath, "utf8"));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2) + "\n");
}

const cache = loadCache();
const now = Date.now();

// --- リクエスト ---

async function requestUrl(url, method) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": userAgent,
        accept: "text/html,application/pdf,*/*",
      },
    });

    return {
      ok: response.ok,
      status: response.status,
      url: response.url,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function checkUrl(url) {
  // キャッシュが有効ならスキップ
  if (cache[url] && now - cache[url] < cacheTtlMs) {
    return { level: "cached", message: `CACHED ${url}` };
  }

  try {
    let result = await requestUrl(url, "HEAD");

    if (result.status === 405 || result.status === 403) {
      result = await requestUrl(url, "GET");
    }

    if (result.ok || (result.status >= 300 && result.status < 400)) {
      cache[url] = now;
      return { level: "ok", message: `OK ${url} -> ${result.status}` };
    }

    if (result.status === 404 || result.status === 410) {
      delete cache[url];
      return { level: "error", message: `リンク切れの可能性があります: ${url} -> ${result.status}` };
    }

    if (result.status === 403 || result.status === 429 || result.status >= 500) {
      return { level: "warning", message: `要確認: ${url} -> ${result.status}` };
    }

    return { level: "warning", message: `要確認: ${url} -> ${result.status}` };
  } catch (error) {
    if (error.name === "AbortError") {
      return { level: "warning", message: `タイムアウト: ${url}` };
    }

    return { level: "warning", message: `接続確認失敗: ${url} -> ${error.message}` };
  }
}

// --- 実行 ---

async function runQueue(items, worker, limit) {
  const results = [];
  let currentIndex = 0;

  async function runWorker() {
    while (currentIndex < items.length) {
      const index = currentIndex;
      currentIndex += 1;
      results[index] = await worker(items[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, runWorker));
  return results;
}

const results = await runQueue(uniqueUrls, checkUrl, concurrency);

saveCache(cache);

let hasError = false;
let cachedCount = 0;

for (const result of results) {
  if (result.level === "cached") {
    cachedCount += 1;
    continue;
  }

  if (result.level === "error") {
    console.error(result.message);
    hasError = true;
    continue;
  }

  if (result.level === "warning") {
    console.warn(result.message);
    continue;
  }

  console.log(result.message);
}

if (cachedCount > 0) {
  console.log(`${cachedCount} URL をキャッシュからスキップしました`);
}

if (hasError) {
  process.exit(1);
}
