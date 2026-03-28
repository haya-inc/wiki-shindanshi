# pnpm / Next.js / Fumadocs / Vercel 最新ベストプラクティス

更新日: 2026-03-28

この文書は、`pnpm + Next.js + Fumadocs` で Web アプリを構築し、`Vercel` に載せるための現時点の推奨構成を整理したものです。新規構築を前提にしており、古い方法はできるだけ避けます。

この文書は `新規構築時の参考` に限って使います。現行 repo の具体的な運用、検証、継続改善の入口は `README.md`、`docs/agent-handoff.md`、`docs/maintenance-iteration-tracker.md` を正とします。

## 結論

- パッケージマネージャは `pnpm` を使う。
- `package.json` の `packageManager` も固定する。
- 初期化は `create-next-app` の公式 CLI を使う。
- 新規アプリは `Next.js 16 App Router` を前提にする。
- ドキュメントは `Fumadocs` の `manual installation` を使って既存の Next.js アプリへ統合する。
- `next.config.mjs` + `fumadocs-mdx` を基準にする。
- キャッシュは `Cache Components` を前提にする。
- `middleware.ts` ではなく `proxy.ts` を使う。
- Vercel では `Preview` と `Production` を分け、`Analytics` と `Speed Insights` を早い段階で有効化する。

## 推奨スタック

- パッケージマネージャ: `pnpm 10.x`
- フレームワーク: `Next.js 16.2.x`
- UI / docs: `Fumadocs`
- CSS: `Tailwind CSS 4`
- デプロイ: `Vercel`

## 初期化方針

### 1. Next.js の scaffold は CLI で作る

新規雛形は `create-next-app` で作ります。保存済み設定に引っ張られないよう、必要なオプションを明示するのが安全です。

```bash
pnpm create next-app@latest my-app \
  --yes \
  --ts \
  --tailwind \
  --eslint \
  --app \
  --turbopack \
  --use-pnpm \
  --import-alias "@/*" \
  --no-react-compiler \
  --no-src-dir \
  --agents-md
```

### 2. Fumadocs は既存アプリへ統合する

既存の Next.js アプリに Fumadocs を入れる場合は、`create-fumadocs-app` を別アプリとして立てるより、公式の `manual installation` に沿って統合する方が自然です。

導入の最小セット:

```bash
pnpm add fumadocs-ui fumadocs-core fumadocs-mdx @types/mdx
```

日本語検索を考えるなら:

```bash
pnpm add @orama/tokenizers
```

### 3. `next.config.mjs` を使う

`fumadocs-mdx` は `ESM-only` なので、`next.config.ts` より `next.config.mjs` を使う方が素直です。

合わせて `cacheComponents: true` を有効にします。

## 実装方針

### App Router

- `Pages Router` を新規採用しない。
- データ取得は Server Components を第一候補にする。
- 更新は Server Actions を第一候補にする。

### Cache Components

- `cacheComponents: true`
- `use cache`
- `cacheLife`
- `cacheTag`
- `updateTag`
- `revalidateTag`

新規ではこの系統を基準にし、`unstable_cache` を主軸にしません。

### Fumadocs

- `source.config.ts`
- `lib/source.ts`
- `app/docs/layout.tsx`
- `app/docs/[[...slug]]/page.tsx`
- `app/api/search/route.ts`

この最小構成で docs ルートを成立させます。

### Vercel

- `Preview` を毎 PR で使う
- 環境変数は `Development / Preview / Production` を分ける
- `vercel env pull` でローカル同期する
- `@vercel/analytics` と `@vercel/speed-insights` を導入候補にする

## 今は避けたい方法

- `getServerSideProps` / `getStaticProps` を新規の中心に置く
- `middleware.ts` を新規で増やす
- `next lint` を build の代替だと考える
- `unstable_cache` を新規の主軸にする
- docs のために別アプリを先に切る
- 日本語 docs なのに検索設定を後回しにして精度を放置する

## 参考リンク

- [Next.js Installation](https://nextjs.org/docs/app/getting-started/installation)
- [create-next-app CLI](https://nextjs.org/docs/pages/api-reference/cli/create-next-app)
- [Next.js cacheComponents](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)
- [Next.js use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [Fumadocs Manual Installation for Next.js](https://www.fumadocs.dev/docs/manual-installation/next)
- [Fumadocs Search](https://fumadocs.dev/docs/ui/search)
- [Vercel Next.js](https://vercel.com/docs/frameworks/full-stack/nextjs)
