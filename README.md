# shindanshi

`pnpm`、`Next.js 16 App Router`、`Fumadocs`、`Vercel` を前提に初期化したプロジェクトです。

## 開発開始

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くとアプリ本体、[http://localhost:3000/docs](http://localhost:3000/docs) を開くと Fumadocs を確認できます。

## 主なコマンド

- `pnpm dev`
- `pnpm check:wiki`
- `pnpm check:maintenance-tests`
- `pnpm check:wiki-links`
- `pnpm check:wiki-full`
- `pnpm lint`
- `pnpm build`
- `pnpm check:docs-links`
- `pnpm check:docs-ui`

## Fumadocs の拡張

- `/llms.txt` と `/llms-full.txt` を公開し、`/docs/*.mdx` で各ページの Markdown を取得できます。
- `llms` 向け出力は raw MDX を LLM 向け Markdown に整形し、`Cards`、`Tabs`、`Accordion`、`TypeTable` の情報が落ちにくい形にしています。
- docs 画面に `AIに質問` を追加しています。`OpenRouter` の `qwen/qwen3.5-9b` を利用します。
- docs 内検索はページ種別タグで絞り込めます。
- docs ページ下部に `Feedback` を追加しています。既定では `data/docs-feedback.jsonl` とサーバーログへ記録します。
- 本文ブロックごとに `FeedbackBlock` を出し、段落単位でも改善要望を送れます。
- docs ページ下部に、参照先と被リンクをまとめた `関連マップ` を表示します。
- `/docs` トップに、ページ全体の参照関係を俯瞰できる `GraphView` を表示します。
- `DOCS_FEEDBACK_WEBHOOK_URL` を設定すると、Feedback を任意の Webhook にも転送できます。
- `OPENROUTER_API_KEY` を設定すると、docs 内検索を使った AI チャットを利用できます。検索ツールの入力不備が出た場合は内部で再試行します。
- `lastModified` は Git 履歴から計算します。Vercel では `VERCEL_DEEP_CLONE=true` を設定してください。

## AI 検索の実装入口

- UI 状態と `/api/chat` への接続: `components/ai/search-context.tsx`
- パネル UI: `components/ai/search-panel.tsx`、`components/ai/search-input.tsx`、`components/ai/search-message.tsx`
- Route Handler と prompt、検索件数、再試行: `app/api/chat/route.ts`
- docs 内検索 index: `lib/docs-search.ts`
- LLM に渡す本文の生成: `lib/get-llm-text.ts`、`lib/llm-markdown.ts`、`lib/docs-structured-data.ts`

### AI 検索を変更するときの見方

1. prompt、モデル、検索件数、ツール再試行を変えるときは `app/api/chat/route.ts` を見る
2. LLM に渡す本文の質を変えるときは `lib/get-llm-text.ts` の fallback 順を先に確認する
3. raw MDX の整形ルールを変えるときは `lib/llm-markdown.ts` を触る
4. UI の開閉、入力、表示を変えるときは `components/ai/` だけを見る

### LLM 向け本文の fallback 順

- `content/docs/**` の raw MDX を整形した Markdown
- `structuredData` を組み直した Markdown
- Fumadocs の processed text を整形した Markdown

## 参考

- 設計判断と運用方針: `docs/`
- ドキュメント本文: `content/docs/`
- docs のページ型と UI 方針: `docs/wiki-ui-patterns.md`
- 継続改善の反復状況: `docs/maintenance-iteration-tracker.md`

## docs UI を触る場所

- `app/globals.css`: 配色、タイポグラフィ、Fumadocs 全体の見た目
- `app/docs/[[...slug]]/page.tsx`: `/docs` 配下のページ共通レイアウト
- `content/docs/index.mdx`: `/docs` トップの導線と構成

## docs のページ型

- 詳細な定義と最小テンプレは `docs/wiki-ui-patterns.md` を正とする
- README では、`/docs` の入口、主要コマンド、実装の入口だけを把握する

## docs UI の確認

- `pnpm check:docs-ui`
- `tests/docs-ui.spec.ts` の `desktopRouteGroups` と `uiScenarioRoutes` を正として smoke test を実行する

## docs の運用チェック

- `pnpm check:wiki`
- `pnpm check:wiki` には `check-doc-links` と `check-wiki-maintenance` の回帰テストを含める
- 鮮度台帳に加えて、`content/docs/second-stage/case-*.mdx` の型ベース構造チェックを実行する
- 事例ハブは `位置づけ / 扱う範囲 / 関連1次科目 / 分解ページ / 学習のポイント / 典型的なつまずき / 次に読むページ` を最小要件とする
