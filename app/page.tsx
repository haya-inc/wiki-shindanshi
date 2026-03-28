import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-10 px-6 py-20 sm:px-10">
      <div className="space-y-5">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-fd-muted-foreground">
          pnpm / Next.js 16 / Fumadocs / Vercel
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl">
          最新の推奨構成でアプリとドキュメントを始めるための初期化が完了しています。
        </h1>
        <p className="max-w-2xl text-base leading-8 text-fd-muted-foreground sm:text-lg">
          アプリ本体は App Router、ドキュメントは Fumadocs、パッケージ管理は
          pnpm、将来の本番デプロイ先は Vercel を前提にそろえています。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          className="rounded-2xl border border-fd-border bg-fd-card p-6 transition-colors hover:border-fd-foreground"
          href="/docs"
        >
          <p className="text-sm font-medium text-fd-muted-foreground">Docs</p>
          <h2 className="mt-3 text-xl font-semibold text-fd-foreground">
            Fumadocs を確認する
          </h2>
          <p className="mt-2 text-sm leading-7 text-fd-muted-foreground">
            初期ドキュメントと検索 API がつながった状態で確認できます。
          </p>
        </Link>

        <a
          className="rounded-2xl border border-fd-border bg-fd-card p-6 transition-colors hover:border-fd-foreground"
          href="https://nextjs.org/docs/app/getting-started/installation"
          target="_blank"
          rel="noreferrer"
        >
          <p className="text-sm font-medium text-fd-muted-foreground">Next.js</p>
          <h2 className="mt-3 text-xl font-semibold text-fd-foreground">
            公式ドキュメント
          </h2>
          <p className="mt-2 text-sm leading-7 text-fd-muted-foreground">
            create-next-app と App Router の最新仕様を確認できます。
          </p>
        </a>

        <a
          className="rounded-2xl border border-fd-border bg-fd-card p-6 transition-colors hover:border-fd-foreground"
          href="https://vercel.com/docs/frameworks/full-stack/nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <p className="text-sm font-medium text-fd-muted-foreground">Vercel</p>
          <h2 className="mt-3 text-xl font-semibold text-fd-foreground">
            デプロイ前提を確認する
          </h2>
          <p className="mt-2 text-sm leading-7 text-fd-muted-foreground">
            Preview / Production とキャッシュ運用の前提を整理できます。
          </p>
        </a>
      </div>
    </main>
  );
}
