# 継続改善 反復ログ

更新日: 2026-03-28

## 進行状況

- 運用指示: `止まらず最後まで進める` を原則とし、各反復で tracker を先に更新してから次の改善へ進む
- 目標回数: `100`
- 完了回数: `13`
- 現在の回: `14`
- 現在の状態: `作業前`
- 今回やること: `check-doc-page-structure` の代表テンプレ判定へ回帰テストを追加し、ページ型追加時の破損検知を早める

## 反復履歴

| 回数 | 状態 | 作業内容 | 検証 |
| --- | --- | --- | --- |
| 1 | 完了 | `scripts/check-wiki-maintenance.mjs` を責務別に整理し、日付見出し判定を固定日付から形式判定へ寄せた | `pnpm check:wiki`、`pnpm lint` |
| 2 | 完了 | `scripts/check-doc-page-structure.mjs` を型定義中心に整理し、`docs/wiki-ui-patterns.md` と見出し要件を揃えた | `pnpm check:wiki`、`pnpm lint` |
| 3 | 完了 | `tests/docs-ui.spec.ts` の desktop 代表ルートを `desktopRouteGroups` に整理し、UI 確認メモから固定件数を外した | `pnpm lint`、`pnpm exec playwright test tests/docs-ui.spec.ts --list` |
| 4 | 完了 | `tests/docs-ui.spec.ts` の mobile / dark mode / 補助確認ルートを `uiScenarioRoutes` へ寄せ、docs でもその定数を正と明記した | `pnpm lint`、`pnpm exec playwright test tests/docs-ui.spec.ts --list` |
| 5 | 完了 | `scripts/check-doc-links.mjs` の URL 変換と本文リンク正規化の責務を整理し、検証中に見つかった更新ノードの鮮度台帳漏れも解消した | `pnpm exec node scripts/check-doc-links.mjs`、`pnpm check:wiki`、`pnpm lint` |
| 6 | 完了 | `README.md` と `docs/agent-handoff.md` を更新し、反復ログと grouped test 定義へ直接入れるようにした | `pnpm lint` |
| 7 | 完了 | `README.md` のページ型説明を `docs/wiki-ui-patterns.md` 参照へ寄せ、入口文書の重複を減らした | `pnpm lint` |
| 8 | 完了 | `docs/wiki-quality-gates.md` の更新日を揃え、反復ログへの入口を追記した | `pnpm lint` |
| 9 | 完了 | `docs/wiki-completeness-roadmap.md` に coverage registry を正とする注記を追加し、件数説明の source of truth を明示した | `pnpm lint` |
| 10 | 完了 | `docs/initialization-strategy.md` を新規初期化向けメモだと明示し、現行 repo の運用入口と切り分けた | `pnpm lint` |
| 11 | 完了 | `docs/pnpm-nextjs-fumadocs-vercel-best-practices.md` を新規構築向け参考だと明示し、現行 repo の運用入口と切り分けた | `pnpm lint` |
| 12 | 完了 | `README.md` の保守コマンド一覧を補い、入口文書と実運用のずれをさらに減らした | `pnpm lint` |
| 13 | 完了 | `check-doc-links` と `check-wiki-maintenance` を import 可能にし、主要ロジックの回帰テストを `check:wiki` に組み込んだ | `pnpm check:maintenance-tests`、`pnpm check:wiki`、`pnpm lint` |
