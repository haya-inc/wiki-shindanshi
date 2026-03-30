# エージェント引き継ぎ

更新日: 2026-03-30

## 1. この文書の役割

この文書は、別のエージェントがこのリポジトリを開いたときに、`今どこまで進んでいて、次に何をやるべきか` を短時間で把握するための入口です。

より詳細な状態は次を参照します。

- 全体進捗: [wiki-progress-tracker.md](docs/wiki-progress-tracker.md)
- 細目 coverage: [wiki-coverage-registry.md](docs/wiki-coverage-registry.md)
- 戦略: [shindanshi-wiki-strategy.md](docs/shindanshi-wiki-strategy.md)
- 初学者通読レビューの現在位置: [wiki-beginner-review-tracker.md](docs/wiki-beginner-review-tracker.md)
- 更新論点の確認対象: [wiki-freshness-registry.json](docs/wiki-freshness-registry.json)
- 直近の学び: [wiki-review-log.md](docs/wiki-review-log.md)
- 継続改善の反復状況: [maintenance-iteration-tracker.md](docs/maintenance-iteration-tracker.md)

## 2. 何を作っているか

目的は、`Fumadocs` 上で動く中小企業診断士試験向けの網羅 wiki を育てることです。

- `1次試験 7科目`
- `2次試験 4事例`
- `参照資料`

を、`章ハブ`、`解説ページ`、`解き方ページ`、`演習ページ`、`要約` の単位で整理します。

## 3. ディレクトリの見方

- `_book/`: 非公開の参照資料。書籍、原稿、作成メモ。公開文章の source of truth ではない
  - `_book/past-exams/1ji/{年}/`: 1次試験 過去問PDF（H19〜R7 / 2007〜2025、7科目×19年=134ファイル）
  - `_book/past-exams/2ji/{年}/`: 2次試験 過去問PDF（H19〜R7 / 2007〜2025、4事例×19年）
  - `_book/本編/`: テキスト原稿（全26章 Markdown）
  - `_book/PDF/`: 統合版PDF参考資料
  - ファイル命名規則: `economics-2024.pdf`, `finance-2025.pdf`, `case-1-2024.pdf` 等
- `content/docs/`: 公開する wiki 本文
- `content/docs/past-exam-solutions/`: 年度別・科目別の過去問解説ページ（著作権安全な要旨+解法型）
- `docs/`: 戦略、進捗、coverage、鮮度管理、レビュー記録
- `tests/docs-ui.spec.ts`: docs の主要ルート smoke test
- `scripts/check-wiki-maintenance.mjs`: 進捗、鮮度、構造の整合確認
- `scripts/check-doc-page-structure.mjs`: 特定ページ群の見出し構造確認
- `scripts/check-doc-links.mjs`: docs 内リンク確認
- `docs/maintenance-iteration-tracker.md`: 継続改善の現在回と次の候補

## 4. 現在の到達状況

2026-03-28 時点の coverage 件数は次です。

- `独立ノードあり`: 161
- `章ページ+演習あり`: 0
- `章ページで対応`: 3
- `章内に一部含む`: 0
- `未対応`: 0

意味としては、`範囲の穴と財務の大きな戻り先不足は解消し、第2次索引の初版もできたので、残件は年度別小問例、横断付録、章ページ止まり 3 件にかなり集約された` 状態です。

### 4.1 強くなっている領域

- `経済学・経済政策`: ミクロ / マクロともに `章ハブ + 知識 + 出題 + 演習 + 要約`
- `財務・会計`: 前半基礎ノードに加え、`原価計算`、`経営分析`、`利益と資金の管理` も主要戻り先を独立ノード化済み
- `企業経営理論`: 戦略、組織、マーケティングの主要細目を独立ノード化済み
- `運営管理`: プランニング、オペレーション、店舗・販売管理の主要細目を独立ノード化済み
- `経営法務`: 会社法、知財、民法と取引関連法の3章とも独立ノード化が進んでいる
- `経営情報システム`: `情報通信技術の基礎` に加え、`経営情報管理` も主要戻り先を独立ノード化済み
- `中小企業経営`: `第20章` は `定義 / 統計 / 経営課題 / 業種別動向 / 産業集積 / 開廃業 / 白書の読み方` の主要戻り先を独立ノード化済み
- `中小企業政策`: `第21章` は `基本法 / 経営支援 / 金融 / 補助金 / 創業 / 承継 / 海外展開 / 取引適正化 / 人材 / 災害対応` の主要戻り先を独立ノード化済み
- `第2次試験`: 事例ハブ、設問型、答案骨子、事例Ⅳの個別ノードに加え、`設問索引` と `事例Ⅰ〜Ⅲ` の実年度小問例まで整備済み

### 4.2 まだ重点強化が必要な領域

- `第2次試験`: `事例Ⅰ〜Ⅳ` の悪文例、改善例、短文骨子の厚み
- `横断付録`: 略語、類義語、誤答逆引きの入口は揃ったので、`事例Ⅳ`、1次ノード、索引からの逆流を増やす
- `章ページで対応` の残り: `受験ガイド` と `第2次試験 overview` は確認順と時間配分を補強済み。必要なら今後は索引や個別ノードで補う

### 4.3 初学者通読レビューの現在位置

- `2026-03-29` から、`docs/wiki-beginner-review-tracker.md` を正として、公開導線どおりの通読レビューを開始
- レビュー対象は、まず `content/docs` のコア本文 `201ページ`
- `content/docs/past-exam-solutions` の `153ページ` は、入口、科目トップ、章ハブ、主要ノードの通読が一巡したあとに後段で着手
- `入口フェーズ` は、`content/docs/index.mdx`、`content/docs/reference/exam-guide.mdx`、`content/docs/reference/index.mdx`、`content/docs/second-stage/index.mdx`、`content/docs/economics-and-economic-policy/index.mdx`、`content/docs/finance-and-accounting/index.mdx`、`content/docs/business-management-theory/index.mdx`、`content/docs/operations-management/index.mdx`、`content/docs/business-law/index.mdx`、`content/docs/management-information-systems/index.mdx`、`content/docs/sme-management-and-policy/index.mdx` の通過で完了
- `章ハブ・事例ハブフェーズ` に入り、`content/docs/economics-and-economic-policy/microeconomics.mdx`、`content/docs/economics-and-economic-policy/macroeconomics.mdx`、`content/docs/finance-and-accounting/bookkeeping-basics.mdx`、`content/docs/finance-and-accounting/corporate-accounting-basics.mdx`、`content/docs/finance-and-accounting/cost-accounting.mdx`、`content/docs/finance-and-accounting/management-analysis.mdx`、`content/docs/finance-and-accounting/profit-and-cash-management.mdx`、`content/docs/finance-and-accounting/finance.mdx`、`content/docs/second-stage/case-4-finance-and-accounting.mdx`、`content/docs/second-stage/case-1-organization-and-hr.mdx`、`content/docs/second-stage/case-2-marketing-and-distribution.mdx`、`content/docs/second-stage/case-3-production-and-technology.mdx`、`content/docs/business-management-theory/management-strategy.mdx`、`content/docs/business-management-theory/organization-theory.mdx` は通過済み、次は `content/docs/business-management-theory/marketing.mdx`

## 5. 今すぐ着手しやすい次の作業

優先順位は次です。

1. `重要用語集` と `重要公式集` から、`事例Ⅳ`、1次ノード、索引への逆流を増やす
2. `事例Ⅰ〜Ⅳ` の悪文例、改善例、短文骨子を増やし、`設問索引` を事例Ⅳと次年度まで広げる
3. `受験ガイド` と `第2次試験 overview` は、制度更新時に即追随しつつ、必要なら索引または個別ノードで補う

判断に迷ったら、[wiki-coverage-registry.md](docs/wiki-coverage-registry.md) の `いますぐ優先する不足` を先に減らします。残る `章ページで対応` は 3 件だけですが、いま重いのは `第2次の悪文例 / 改善例 / 短文骨子不足` と `横断付録を各ページへ戻す導線不足` です。

### 5.1 初学者通読レビューで次にやること

1. [wiki-beginner-review-tracker.md](docs/wiki-beginner-review-tracker.md) の順番どおりに `マーケティング論` 章ハブを読む
2. `市場選定 → 顧客理解 → 価値設計 → 届け方 → 関係維持` の順と、`初めて読むならこの順`、`テーマ → まず戻るページ`、`次に読むページ` が同じ学習導線になっているかを確認する
3. 読み終えたら、`最後に読んだページ`、`次に読むページ`、`今回の学び` を台帳へ追記する

## 6. 既存の良い型

新しいページを増やすときは、次の既存ページを手本にすると崩れにくいです。

- `章ハブ` の型:
  - [microeconomics.mdx](content/docs/economics-and-economic-policy/microeconomics.mdx)
  - [civil-and-transaction-law.mdx](content/docs/business-law/civil-and-transaction-law.mdx)
- `解説ページ` の型:
  - [microeconomics-knowledge-market-mechanism.mdx](content/docs/economics-and-economic-policy/microeconomics-knowledge-market-mechanism.mdx)
  - [knowledge-contracts-obligations-and-security.mdx](content/docs/business-law/knowledge-contracts-obligations-and-security.mdx)
- `設問型` と `答案骨子` の型:
  - [case-1-question-patterns.mdx](content/docs/second-stage/case-1-question-patterns.mdx)
  - [case-1-answer-frameworks.mdx](content/docs/second-stage/case-1-answer-frameworks.mdx)
- `逆引き索引` の型:
  - [second-stage-question-index.mdx](content/docs/reference/second-stage-question-index.mdx)
- `事例Ⅳの個別ノード` の型:
  - [case-4-management-analysis.mdx](content/docs/second-stage/case-4-management-analysis.mdx)
  - [case-4-npv-and-investment-decision.mdx](content/docs/second-stage/case-4-npv-and-investment-decision.mdx)

## 7. ページ追加時に一緒に触ること

新しい章ハブや解説ページを足すときは、通常は次も一緒に更新します。

- `content/docs/.../meta.json`
- 関連する科目ハブまたは章ハブ
- [content/docs/reference/past-question-theme-index.mdx](content/docs/reference/past-question-theme-index.mdx)
- [docs/wiki-progress-tracker.md](docs/wiki-progress-tracker.md)
- [docs/wiki-coverage-registry.md](docs/wiki-coverage-registry.md)
- [docs/shindanshi-wiki-strategy.md](docs/shindanshi-wiki-strategy.md)
- [docs/wiki-review-log.md](docs/wiki-review-log.md)
- `必要なら` [tests/docs-ui.spec.ts](tests/docs-ui.spec.ts)
- `更新論点なら` [docs/wiki-freshness-registry.json](docs/wiki-freshness-registry.json)

## 8. 更新論点の扱い

- 法改正、制度改定、白書、補助金、公的ガイドラインのような `更新論点` は、まず一次情報を確認する
- 更新日や一次情報 URL は、できるだけ `科目ハブ` または `章ハブ` に寄せる
- 安定論点の解説ページには、日付や一時的な制度メモをできるだけ持ち込まない

例:

- [content/docs/business-law/index.mdx](content/docs/business-law/index.mdx)
- [content/docs/business-law/civil-and-transaction-law.mdx](content/docs/business-law/civil-and-transaction-law.mdx)

## 9. 検証の基本手順

通常は次の順です。

1. `pnpm lint`
2. `NEXT_DIST_DIR=.next-check pnpm build`
3. 変更した docs ルートの表示確認

### 9.1 build の注意

標準の `pnpm build` は、他のローカル Next.js サーバーが `.next` を使っていると、`_buildManifest.js.tmp` 競合で失敗することがあります。安全側で `pnpm build:check` または `pnpm validate` を使ってください。

`pnpm validate` は `pnpm build:check` を実行し、Turbopack 側の一時ファイル削除や manifest 生成でフレークした場合は、自動で webpack 専用の dist dir を使う `pnpm build:check:webpack` へ fall back します。

それでも `.next-check` や `.next-check-webpack` 側で `ENOENT` や `ENOTDIR` が続く場合は、同じリポジトリで `.next` を使うサーバーが動いていないことを確認したうえで、`pnpm exec next build --webpack` に切り替えて検証してよいです。

`2026-03-30` の `原価計算` 章ハブレビューでは、`pnpm validate` が `check`、`format:check`、`lint` 通過後に、Turbopack panic のあと webpack fallback でも `.next-check-webpack/server/pages-manifest.json` の `ENOENT` で止まりました。この場合は、差分原因を build failure と決め打ちせず、`NEXT_DIST_DIR=.next-devcheck pnpm exec next dev --hostname 127.0.0.1 --port 3101` で対象ルートの `200`、`h1`、console error を取り、`wiki-review-log.md` に build フレークとして残してください。

`2026-03-30` の `利益と資金の管理` 章ハブレビューでは、`pnpm validate` が `check`、`format:check`、`lint` 通過後に、Turbopack 側で `.next-check/required-server-files.json` の `ENOENT` で落ちました。webpack fallback も validate 経由では途中終了したため、`rm -rf .next-check-webpack && NEXT_DIST_DIR=.next-check-webpack pnpm exec next build --webpack` を単独で完走させ、`NEXT_DIST_DIR=.next-check-webpack pnpm exec next start --hostname 127.0.0.1 --port 3101` で表示確認しています。

`2026-03-30` の `ファイナンス` 章ハブレビューでは、`pnpm validate` が `check` 後に `pnpm format:check` の Node abort で止まり、単独の webpack build も `.next-check-webpack/server/functions-config-manifest.json` の `ENOENT` で落ちました。この場合は、dist build に固執せず、`rm -rf .next-devcheck && NEXT_DIST_DIR=.next-devcheck pnpm exec next dev --hostname 127.0.0.1 --port 3101` を clean start し、対象ルートだけを headless browser で読ませて `200`、`h1`、追加文言、console error を確認してよいです。

`2026-03-30` の `事例Ⅰ 組織・人事` ハブレビューでは、`pnpm validate` の `check`、`format:check`、`lint` は通過したものの、Turbopack build が `.next-check/static/.../_clientMiddlewareManifest.js` の `ENOENT` で落ち、webpack fallback も `next build --webpack` が 1 分以上 output なしで残留しました。この場合も `rm -rf .next-devcheck && NEXT_DIST_DIR=.next-devcheck pnpm exec next dev --hostname 127.0.0.1 --port 3101` の clean start に切り替えてよいです。

`2026-03-30` の `事例Ⅲ 生産・技術` ハブレビューでは、`pnpm validate` の `check`、`format:check`、`lint` は通過したものの、Turbopack build が `ELIFECYCLE exit code 143` で validate 内 fallback へ移り、webpack build も 1 分以上 output なしで残留しました。ただし `.next-check` 自体は生成されて `next start` で起動できたため、この場合は自分が起動した build プロセスだけ止め、`NEXT_DIST_DIR=.next-check pnpm exec next start --hostname 127.0.0.1 --port 3101` と inline の `@playwright/test` で対象ルートの `200`、`h1`、console error を確認してよいです。

`.next` 側へ切り替えたとき、`tsconfig.json` の `include` にある `.next-check/types/**/*.ts` が未生成だと `File '.next-check/types/routes.d.ts' not found` で止まることがあります。その場合は、先に `.next-check` 側の build を一度走らせて `routes.d.ts` を作ってから `.next` build を再実行すると通しやすいです。

`pnpm validate` の前に `.next-devcheck` が残っていると、`pnpm format:check` が生成物まで拾って大量 warning で止まります。dev fallback を使ったあとに validate を回し直すときは、先に `rm -rf .next-devcheck` を入れてください。

`.next-check-webpack` が壊れた cache pack を含んだまま残っていると、`pnpm format:check` が `Unable to read file ".next-check-webpack/cache/webpack/...1.pack_"`、`Invalid string length` で止まることがあります。この場合も、validate を回し直す前に `rm -rf .next-check-webpack` を入れてください。

### 9.2 表示確認の注意

- `tests/docs-ui.spec.ts` の対象なら `pnpm exec playwright test ...`
- ポート競合や MCP 不調がある場合は、`NEXT_DIST_DIR=.next-check pnpm exec next start --hostname 127.0.0.1 --port 3101` で起動し、headless browser で `200` と `h1` を確認する
- Playwright MCP が `Browser is already in use for .../ms-playwright/mcp-chrome` で詰まる場合は、孤立した `playwright-mcp` / `mcp-chrome` プロセスを落としたうえで、`@playwright/test` の `chromium.launch()` を使う簡単な inline script で `status`、`h1`、console error を確認してよい
- `NEXT_DIST_DIR=.next-check pnpm exec next start` が `middleware-manifest.json` 読み込みで不安定な場合は、表示確認だけ `NEXT_DIST_DIR=.next-devcheck pnpm exec next dev --hostname 127.0.0.1 --port 3101` に切り替えてよい。dev サーバーでは websocket が常駐するので、browser script の `page.goto()` は `networkidle` ではなく `domcontentloaded` と `h1` 待ちを使う
- `NEXT_DIST_DIR=.next-devcheck pnpm exec next dev` の初回 route compile は 30 秒を超えることがある。`page.goto()` が timeout した場合でも、サーバー側で `GET ... 200` が出ていれば、同じ route を 60 秒 timeout で再試行すると通ることがある
- ただし `.next-devcheck` 側で `Persisting failed: Unable to write SST file ...` や `app/globals.css` の CSS parse error が出て `500` になる場合は、dev fallback 自体を諦め、dist dir を作り直した webpack build と `next start` に戻した方が早い
- それでも `.next-devcheck`、`.next-check`、`.next-check-webpack` が全部不安定で、他に `.next` を使う Next.js プロセスが動いていないなら、生成物だけ `rm -rf .next .next-devcheck .next-check .next-check-webpack` で掃除してから、最後の fallback として既定の `.next` で `pnpm exec next dev --hostname 127.0.0.1 --port 3101` を立て直してよい

## 10. 既知の注意点

- ワークツリーはかなり dirty な前提で扱う。自分が触っていない差分は戻さない
- `scripts/check-doc-page-structure.mjs` により、`第2次試験` の `設問型` と `答案骨子` は `## このページの役割` などの見出しが必須
- `_book/` は参照専用。公開文章をそのまま転記しない
- Playwright MCP はまれに `mcp-chrome` のロックが残る。表示確認が詰まったら、MCP に固執せず standalone の Playwright script へ切り替える

## 11. 迷ったときの判断基準

- `新しい章を増やす` より、`既存の章ページ止まりを減らす`
- `日付を増やす` より、`更新論点をハブへ集約する`
- `抽象的なまとめ` より、`比較表、誤答パターン、戻り先` を増やす
- `何となく増やす` より、coverage 台帳の穴を 1 つ減らす
