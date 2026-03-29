# AGENTS.md

## 最重要: KISS / YAGNI

> **適用範囲: コード（設定・スクリプト・コンポーネント等）のみ。**
> wiki 記事や学習コンテンツ（`content/docs/` 配下の MDX 等）の執筆では、本セクションの制約は適用しない。
> コンテンツは網羅性・教材品質が優先であり、「最小差分」「単一経路」等のコード設計原則で省略してはならない。

- **KISS**: まず最も単純な解で実装する。賢い抽象よりも「誰でも読めるコード」。
- **YAGNI**: “必要になるまで” 追加しない。将来要件のためのフックや設定や分岐は避ける。
- **単一経路**: 機能は可能な限り一つのコードパスで扱う。条件分岐や設定フラグを増やさない。
- **既存再利用**: 既存のユーティリティや依存関係を流用し、新規レイヤを増やさない。
- **認知負荷を下げる**: 一貫した命名、小さな関数、局所的に理解できる依存関係、最小の設定を優先する。
- **証拠駆動**: 追加前に失敗例、テスト、ユーザー要望を確認し、最小差分で解決する。
- **日本語ドキュメント**: コメント、docstring、ドキュメントは日本語で書く。
- **ドキュメント更新**: コード変更に合わせて、必要十分なドキュメントを更新する。

## シンプルさチェック

- 3 分で概要が伝わるか。
- 読む人が迷う分岐やフラグはないか。
- 既存の仕組みを再利用できないか。
- 引数や設定は最小か。既定値で動くか。
- ドキュメントは必要十分か。将来の仮定を書きすぎていないか。

## Next.js 16

- このリポジトリは `pnpm`、`Next.js 16 App Router`、`Fumadocs` を前提にする。
- Next.js 固有の実装前に、関連する公式ドキュメントを確認する。
- `Cache Components` を前提に設計し、旧来のパターンを新規採用しない。
- `middleware.ts` ではなく `proxy.ts` を使う。

## 別エージェント向けの入口

このリポジトリは、`AGENTS.md` を起点に次の順で読むと状況を把握しやすいです。

1. [docs/agent-handoff.md](docs/agent-handoff.md)
2. [docs/wiki-progress-tracker.md](docs/wiki-progress-tracker.md)
3. [docs/wiki-coverage-registry.md](docs/wiki-coverage-registry.md)
4. 更新論点を触るときだけ [docs/wiki-freshness-registry.json](docs/wiki-freshness-registry.json)

`docs/` の構造:

- ルート直下: 運用中のドキュメント（進捗、coverage、戦略、品質基準、レビュー記録など）
- `docs/archive/`: 完了済みの分析メモ（経済学ギャップ分析など。役目を終えた中間成果物）
- `docs/templates/`: 新規プロジェクト用テンプレート（簿記2級、初期化手順など）
- `docs/analysis/`: 出題予測・傾向分析（2026年度経済学予測、出題頻度データなど）

## 読み手の想定

このサイトの読み手は **中小企業診断士試験の受験生**（現在勉強中の方）である。
つまり、試験範囲の専門知識がまだ十分に身についていない人が対象となる。

- 専門用語を初出で使うときは、簡潔な定義や補足を添える。
- 「知っていて当然」という前提を置かず、前提知識が必要な箇所は明示する。
- 読み手が「なぜそうなるのか」を理解できるよう、結論だけでなく理由・背景も書く。

## このプロジェクトで追加で守ること

- `_book/` は参照資料置き場であり、公開原稿の source of truth ではない。公開文章は `content/docs/` に書き直す。
- 新しい論点を切るときは、まず既存の章ハブ、ノード、索引、進捗台帳の型を再利用する。
- 進捗だけでなく、`docs/wiki-review-log.md` に今回の学びと次の打ち手を残す。
- 更新論点は `科目ハブ` または `章ハブ` に確認日と一次情報を寄せ、安定論点ノードには日付をできるだけ持ち込まない。

## 検証の基本

一括実行なら `pnpm validate`（check → format:check → lint → build を順に実行）。個別に叩く場合は以下を参照。

| コマンド                               | 内容                                                    |
| -------------------------------------- | ------------------------------------------------------- |
| `pnpm check`                           | wiki 構造・リンク・ドキュメントリンクをすべて検証       |
| `pnpm format:check`                    | Prettier（ts/tsx/css/json/md。mdx は対象外）            |
| `pnpm format`                          | Prettier で自動整形（mdx は `.prettierignore` で除外）  |
| `pnpm lint`                            | ESLint + eslint-plugin-mdx + remark-lint                |
| `pnpm lint --fix`                      | mdx の自動修正（heading-style、改行、リストマーカー等） |
| `pnpm test`                            | Playwright による UI テスト（build + start を内包）     |
| `NEXT_DIST_DIR=.next-check pnpm build` | ビルド（競合回避用の出力先指定）                        |

- 変更した docs ルートは headless browser で `200` と `h1` を確認する（`pnpm test`）
- 標準の `pnpm build` は、他のローカル Next.js サーバーが `.next` を使っていると `_buildManifest.js.tmp` 競合で落ちることがある。`NEXT_DIST_DIR=.next-check` を付けるか、`pnpm validate` を使う。
