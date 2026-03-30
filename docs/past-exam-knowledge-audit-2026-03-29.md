# 過去問解説 必要知識監査レポート（H19-R07）

監査日: 2026-03-29

> 追記（2026-03-29）: この文書は初回監査時点のベースライン記録です。その後の修正により、`node scripts/audit-past-exam-knowledge-links.mjs` の最新結果は `2603 / 2603` で、`missing_link / placeholder_external / broad_hub_link` はすべて 0 です。最新の作業内容は `docs/wiki-review-log.md` の `2026-03-29-05` を参照してください。

## 対象

- `content/docs/past-exam-solutions/**/*.mdx` の年度別・科目別解説 133 ファイル
- `**必要知識**` ブロック 2603 件
- 確認観点:
  - `必要知識` から現行 wiki へ直接たどれるか
  - プレースホルダ URL やリンク欠落が残っていないか
  - 実ページに飛んでも、知識の着地点として弱いリンクになっていないか
  - 手確認した代表例で、wiki 側に論点が実在するか

## 結論

- `必要知識` ブロック 2603 件のうち、2277 件は現行 wiki へ直接たどれた。**直接追跡率は 87.5%**
- 構造上の問題は **326 設問** に残っている
- 問題は 21 ファイルに集中しており、特に `r01/*` のプレースホルダ URL と、`h20/h24/h29/r05` の一部ファイルのリンク未装備が大きい
- さらに手確認すると、`リンクはあるが着地が違う`、または `wiki 側に論点自体がまだない` ケースが残っている

## 構造監査の集計

| 指標 | 値 |
| --- | --- |
| 対象ファイル数 | 133 |
| `必要知識` ブロック数 | 2603 |
| 問題なし | 2277 |
| 問題あり | 326 |
| 直接追跡率 | 87.5% |
| 問題があるファイル数 | 21 |

### 問題種別

| 種別 | 件数 | 意味 |
| --- | --- | --- |
| `missing_link` | 224 | `必要知識` に wiki リンクが付いていない |
| `placeholder_external` | 92 | `example.com` のままで現行 wiki に接続していない |
| `broad_hub_link` | 10 | 科目トップなど広すぎる着地で、論点知識へ直接降りられない |

## 問題が集中しているファイル

| ファイル | 影響設問数 | 主な問題 |
| --- | --- | --- |
| `content/docs/past-exam-solutions/r01/sme-policy.mdx` | 37 | `example.com` プレースホルダ |
| `content/docs/past-exam-solutions/h20/info-systems.mdx` | 25 | `必要知識` が plain text のまま |
| `content/docs/past-exam-solutions/h20/management.mdx` | 25 | `必要知識` が plain text のまま |
| `content/docs/past-exam-solutions/h20/sme-policy.mdx` | 25 | `必要知識` が plain text のまま |
| `content/docs/past-exam-solutions/h29/sme-policy.mdx` | 25 | `必要知識` が plain text のまま |
| `content/docs/past-exam-solutions/r05/info-systems.mdx` | 25 | `必要知識` が plain text のまま |
| `content/docs/past-exam-solutions/r01/finance.mdx` | 23 | `example.com` プレースホルダ |
| `content/docs/past-exam-solutions/r01/economics.mdx` | 21 | `example.com` プレースホルダ |
| `content/docs/past-exam-solutions/h24/sme-policy.mdx` | 19 | `必要知識` が plain text のまま |
| `content/docs/past-exam-solutions/h21/sme-policy.mdx` | 18 | `必要知識` の一部にリンク欠落 |
| `content/docs/past-exam-solutions/h24/info-systems.mdx` | 16 | `必要知識` が plain text のまま |
| `content/docs/past-exam-solutions/h24/business-law.mdx` | 14 | `必要知識` が plain text のまま |
| `content/docs/past-exam-solutions/h22/economics.mdx` | 12 | `必要知識` が plain text のまま |
| `content/docs/past-exam-solutions/h22/finance.mdx` | 11 | `必要知識` が plain text のまま |
| `content/docs/past-exam-solutions/r01/management.mdx` | 11 | `example.com` プレースホルダ |

## 手確認で確定した不整合

### 1. リンク先が誤っている

| 設問 | 現在の `必要知識` | 判定 | 根拠 |
| --- | --- | --- | --- |
| `h20/business-law` 第2問 | `/business-law/knowledge-shares-and-shareholders` | 誤着地 | `knowledge-inheritance.mdx` には `相続放棄` と `限定承認` があるが、現在のリンク先にはない |
| `h20/business-law` 第5問 | `/business-law/knowledge-shares-and-shareholders` | 誤着地 | `knowledge-inheritance.mdx` には `遺留分` があるが、現在のリンク先にはない |
| `r07/economics` 第19問 | `/economics-and-economic-policy/microeconomics-knowledge-international-trade` | 誤着地 | 問題は `累進税` だが、国際貿易ノードへ飛んでいる |

### 2. リンク先ページはあるが、論点が見当たらない

| 設問 | 現在の `必要知識` | 判定 | 根拠 |
| --- | --- | --- | --- |
| `h20/business-law` 第3問 | `/business-law/knowledge-fundraising-dividends-and-financial-statements` | ノード不足 | `備え置き`、`本店備置`、`会社法442条` が現行ノードに見当たらない |
| `r03/finance` 第21問 | `/finance-and-accounting` | 着地が広すぎる | 現行 wiki には `finance-mm-and-dividend-policy.mdx` に `配当割引モデル` があり、そこへ直接着地させるべき |
| `r07/economics` 第20問 | `/economics-and-economic-policy` | 着地が広すぎる | 現行 wiki には `macroeconomics-knowledge-national-income-and-indicators.mdx` に `ローレンツ曲線` がある |

### 3. 現行 wiki に論点自体がまだ見当たらない

| 設問 | 現在の `必要知識` | 判定 | 根拠 |
| --- | --- | --- | --- |
| `h20/business-law` 第14問 | `プロバイダ責任制限法` → `/business-law/knowledge-personal-information-protection` | wiki 未収載 | `プロバイダ責任制限法`、`発信者情報開示` の語が `content/docs/business-law/*.mdx` に存在しない |
| `h20/business-law` 第17問 | `企業内容開示と内部統制` → `/business-law/knowledge-capital-market-laws` | wiki 未収載 | `内部統制報告制度` の語が `content/docs/business-law/*.mdx` に存在しない |
| `h19/economics` 第3問 | `企業内貿易`、`産業内貿易` | wiki 未収載 | これらの語が `content/docs/economics-and-economic-policy/*.mdx` に存在しない |
| `h19/economics` 第5問 | `アブソープション・アプローチ`、`J曲線効果`、`国家財政恒等式` | wiki 未収載 | これらの語が `content/docs/economics-and-economic-policy/*.mdx` に存在しない |
| `r07/economics` 第19問 | `累進税` | wiki 未収載 | `累進税` の語が `content/docs/economics-and-economic-policy/*.mdx` に存在しない |
| `r01/finance` 第2問 | `負債性補助金`、`非負債性補助金` | wiki 未収載 | これらの語が `content/docs/finance-and-accounting/*.mdx` に存在しない |

## 現在の wiki で補えるが、解説側の接続が古い例

| 設問 | 現在の状態 | 現在の有力着地 |
| --- | --- | --- |
| `r01/finance` 第4問 | `example.com` のまま | `/finance-and-accounting/corporate-accounting-revenue-recognition` |
| `r03/finance` 第21問 | 科目トップへ着地 | `/finance-and-accounting/finance-mm-and-dividend-policy` |
| `r07/economics` 第20問 | 科目トップへ着地 | `/economics-and-economic-policy/macroeconomics-knowledge-national-income-and-indicators` |

## 判断

- **まず直すべきは解説ファイル側の配線**。`example.com` と plain text `必要知識` が多いファイルは、既存 wiki を読みに行けない
- **次に直すべきは誤着地**。特に `h20/business-law` と `r07/economics` は、リンクがあっても知識取得に失敗する
- **最後に wiki 側の欠落論点** を補う。今回の手確認では、少なくとも次の論点が未整備:
  - `プロバイダ責任制限法`
  - `内部統制報告制度`
  - `アブソープション・アプローチ`
  - `J曲線効果`
  - `国家財政恒等式`
  - `企業内貿易 / 産業内貿易`
  - `累進税`
  - `補助金会計（負債性 / 非負債性補助金）`

## 推奨する修正順

1. `r01/economics.mdx`、`r01/finance.mdx`、`r01/management.mdx`、`r01/sme-policy.mdx` の `example.com` を現行 wiki パスへ置換する
2. `h20/info-systems.mdx`、`h20/management.mdx`、`h20/sme-policy.mdx`、`h29/sme-policy.mdx`、`r05/info-systems.mdx` の plain text `必要知識` に現行 wiki リンクを付ける
3. `h20/business-law.mdx` の相続系・開示系リンクを正しいノードへ差し替える
4. `r07/economics.mdx` の broad hub link を、既存ノードへ降ろせるものは降ろし、未収載論点は別途補う
5. 上記の未収載論点を、既存ノードへの追記で済むものと、新規ノードが必要なものに分けて台帳化する

## 監査方法

### 構造監査

- `node scripts/audit-past-exam-knowledge-links.mjs`
- `node scripts/audit-past-exam-knowledge-links.mjs --json`

### 手確認

- `rg` で論点語の現行 wiki 収載有無を確認
- 必要に応じて `past-exam-solutions` 側の設問説明と、候補ノード本文を突き合わせて着地点の妥当性を確認
