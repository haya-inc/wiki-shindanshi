# エージェント引き継ぎ

更新日: 2026-03-28

## 1. この文書の役割

この文書は、別のエージェントがこのリポジトリを開いたときに、`今どこまで進んでいて、次に何をやるべきか` を短時間で把握するための入口です。

より詳細な状態は次を参照します。

- 全体進捗: [wiki-progress-tracker.md](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/wiki-progress-tracker.md)
- 細目 coverage: [wiki-coverage-registry.md](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/wiki-coverage-registry.md)
- 戦略: [shindanshi-wiki-strategy.md](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/shindanshi-wiki-strategy.md)
- 更新論点の確認対象: [wiki-freshness-registry.json](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/wiki-freshness-registry.json)
- 直近の学び: [wiki-review-log.md](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/wiki-review-log.md)
- 継続改善の反復状況: [maintenance-iteration-tracker.md](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/maintenance-iteration-tracker.md)

## 2. 何を作っているか

目的は、`Fumadocs` 上で動く中小企業診断士試験向けの網羅 wiki を育てることです。

- `1次試験 7科目`
- `2次試験 4事例`
- `参照資料`

を、`章ハブ`、`解説ページ`、`解き方ページ`、`演習ページ`、`要約` の単位で整理します。

## 3. ディレクトリの見方

- `_book/`: 非公開の参照資料。書籍、原稿、作成メモ。公開文章の source of truth ではない
- `content/docs/`: 公開する wiki 本文
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
- `横断付録`: 略語、類義語、誤答逆引きの入口は揃ったので、`事例Ⅳ`、1次知識ノード、索引からの逆流を増やす
- `章ページで対応` の残り: `受験ガイド` と `第2次試験 overview` は確認順と時間配分を補強済み。必要なら今後は索引や個別ノードで補う

## 5. 今すぐ着手しやすい次の作業

優先順位は次です。

1. `重要用語集` と `重要公式集` から、`事例Ⅳ`、1次知識ノード、索引への逆流を増やす
2. `事例Ⅰ〜Ⅳ` の悪文例、改善例、短文骨子を増やし、`設問索引` を事例Ⅳと次年度まで広げる
3. `受験ガイド` と `第2次試験 overview` は、制度更新時に即追随しつつ、必要なら索引または個別ノードで補う

判断に迷ったら、[wiki-coverage-registry.md](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/wiki-coverage-registry.md) の `いますぐ優先する不足` を先に減らします。残る `章ページで対応` は 3 件だけですが、いま重いのは `第2次の悪文例 / 改善例 / 短文骨子不足` と `横断付録を各ページへ戻す導線不足` です。

## 6. 既存の良い型

新しいページを増やすときは、次の既存ページを手本にすると崩れにくいです。

- `章ハブ` の型:
  - [microeconomics/index.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/(first-stage)/economics-and-economic-policy/microeconomics/index.mdx)
  - [civil-and-transaction-law.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/(first-stage)/business-law/civil-and-transaction-law.mdx)
- `解説ページ` の型:
  - [knowledge-market-mechanism.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/(first-stage)/economics-and-economic-policy/microeconomics/knowledge-market-mechanism.mdx)
  - [knowledge-contracts-obligations-and-security.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/(first-stage)/business-law/knowledge-contracts-obligations-and-security.mdx)
- `設問型` と `答案骨子` の型:
  - [case-1-question-patterns.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/second-stage/case-1-question-patterns.mdx)
  - [case-1-answer-frameworks.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/second-stage/case-1-answer-frameworks.mdx)
- `逆引き索引` の型:
  - [second-stage-question-index.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/reference/second-stage-question-index.mdx)
- `事例Ⅳの個別ノード` の型:
  - [case-4-management-analysis.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/second-stage/case-4-management-analysis.mdx)
  - [case-4-npv-and-investment-decision.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/second-stage/case-4-npv-and-investment-decision.mdx)

## 7. ページ追加時に一緒に触ること

新しい章ハブや解説ページを足すときは、通常は次も一緒に更新します。

- `content/docs/.../meta.json`
- 関連する科目ハブまたは章ハブ
- [content/docs/reference/past-question-theme-index.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/reference/past-question-theme-index.mdx)
- [docs/wiki-progress-tracker.md](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/wiki-progress-tracker.md)
- [docs/wiki-coverage-registry.md](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/wiki-coverage-registry.md)
- [docs/shindanshi-wiki-strategy.md](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/shindanshi-wiki-strategy.md)
- [docs/wiki-review-log.md](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/wiki-review-log.md)
- `必要なら` [tests/docs-ui.spec.ts](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/tests/docs-ui.spec.ts)
- `更新論点なら` [docs/wiki-freshness-registry.json](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/docs/wiki-freshness-registry.json)

## 8. 更新論点の扱い

- 法改正、制度改定、白書、補助金、公的ガイドラインのような `更新論点` は、まず一次情報を確認する
- 更新日や一次情報 URL は、できるだけ `科目ハブ` または `章ハブ` に寄せる
- 安定論点の解説ページには、日付や一時的な制度メモをできるだけ持ち込まない

例:

- [content/docs/(first-stage)/business-law/index.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/(first-stage)/business-law/index.mdx)
- [content/docs/(first-stage)/business-law/civil-and-transaction-law.mdx](/Users/yhay81/ghq/github.com/haya-inc/shindanshi/content/docs/(first-stage)/business-law/civil-and-transaction-law.mdx)

## 9. 検証の基本手順

通常は次の順です。

1. `pnpm lint`
2. `NEXT_DIST_DIR=.next-check pnpm build`
3. 変更した docs ルートの表示確認

### 9.1 build の注意

標準の `pnpm build` は、他のローカル Next.js サーバーが `.next` を使っていると、`_buildManifest.js.tmp` 競合で失敗することがあります。安全側で `NEXT_DIST_DIR=.next-check pnpm build` を使ってください。

### 9.2 表示確認の注意

- `tests/docs-ui.spec.ts` の対象なら `pnpm exec playwright test ...`
- ポート競合や MCP 不調がある場合は、`NEXT_DIST_DIR=.next-check pnpm exec next start --hostname 127.0.0.1 --port 3101` で起動し、headless browser で `200` と `h1` を確認する

## 10. 既知の注意点

- ワークツリーはかなり dirty な前提で扱う。自分が触っていない差分は戻さない
- `scripts/check-doc-page-structure.mjs` により、`第2次試験` の `設問型` と `答案骨子` は `## このページの役割` などの見出しが必須
- `_book/` は参照専用。公開文章をそのまま転記しない

## 11. 迷ったときの判断基準

- `新しい章を増やす` より、`既存の章ページ止まりを減らす`
- `日付を増やす` より、`更新論点をハブへ集約する`
- `抽象的なまとめ` より、`比較表、誤答パターン、戻り先` を増やす
- `何となく増やす` より、coverage 台帳の穴を 1 つ減らす
