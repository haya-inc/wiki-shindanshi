# 過去問解説エージェント指示書

## 全体概要

中小企業診断士第1次試験の過去問解説を、H19(2007)〜R7(2025) の19年分 × 7科目について作成する。
年度を3年ごとにグループ化し、各グループを別エージェントに並列委託する。

## 完了済み（スキップすること）

- **経済学**: R2〜R7（2020〜2025）の6年分 → 済
- **財務・会計**: R6（2024）の1年分 → 済

---

## グループ分け一覧

| グループ | 年度 | 和暦 | 担当科目 | 備考 |
| --- | --- | --- | --- | --- |
| A | 2023〜2025 | R5〜R7 | 経済学以外の6科目（R6財務も済） | 最新3年。R7は設問1/2形式あり注意 |
| B | 2020〜2022 | R2〜R4 | 経済学以外の7科目（R2-R4財務含む） | |
| C | 2017〜2019 | H29〜R1 | 全7科目 | |
| D | 2014〜2016 | H26〜H28 | 全7科目 | |
| E | 2011〜2013 | H23〜H25 | 全7科目 | |
| F | 2007〜2010 | H19〜H22 | 全7科目 | 4年分（H19単独だと少ないため統合） |

---

## 共通指示（全グループ共通）

### 前提ルール

1. **AGENTS.md を最初に読むこと** — `AGENTS.md` がこのリポジトリのルール。KISS / YAGNI / 日本語ドキュメントを遵守。
2. **著作権**: 問題文は一切掲載しない。「問題要旨」（何が問われているかの要約）のみ記載し、J-SMECA公式PDFへのリンクで原文参照を案内する。
3. **参照資料**: `_book/past-exams/1ji/{西暦}/` に各年度・各科目のPDFがある。これを読んで解説を作成する。
4. **wiki ノードへのリンク**: `content/docs/` 配下の既存wikiノードへのリンクを「必要知識」欄に付ける。リンク先が存在するか確認すること。存在しない場合はリンクなしでテーマ名だけ書く。

### ファイル構造

```
content/docs/past-exam-solutions/
├── {年度コード}/           # r07, r06, ..., h19
│   ├── index.mdx          # 年度トップページ
│   ├── meta.json          # { "title": "令和X年度（20XX）", "pages": ["index", "economics", "finance", ...] }
│   ├── economics.mdx      # 経済学・経済政策
│   ├── finance.mdx        # 財務・会計
│   ├── management.mdx     # 企業経営理論
│   ├── operations.mdx     # 運営管理
│   ├── business-law.mdx   # 経営法務
│   ├── info-systems.mdx   # 経営情報システム
│   └── sme-policy.mdx     # 中小企業経営・中小企業政策
```

**年度コード変換表**:

| 西暦 | 和暦 | コード | title |
| --- | --- | --- | --- |
| 2025 | 令和7年 | r07 | 令和7年度（2025） |
| 2024 | 令和6年 | r06 | 令和6年度（2024） |
| 2023 | 令和5年 | r05 | 令和5年度（2023） |
| 2022 | 令和4年 | r04 | 令和4年度（2022） |
| 2021 | 令和3年 | r03 | 令和3年度（2021） |
| 2020 | 令和2年 | r02 | 令和2年度（2020） |
| 2019 | 令和元年 | r01 | 令和元年度（2019） |
| 2018 | 平成30年 | h30 | 平成30年度（2018） |
| 2017 | 平成29年 | h29 | 平成29年度（2017） |
| 2016 | 平成28年 | h28 | 平成28年度（2016） |
| 2015 | 平成27年 | h27 | 平成27年度（2015） |
| 2014 | 平成26年 | h26 | 平成26年度（2014） |
| 2013 | 平成25年 | h25 | 平成25年度（2013） |
| 2012 | 平成24年 | h24 | 平成24年度（2012） |
| 2011 | 平成23年 | h23 | 平成23年度（2011） |
| 2010 | 平成22年 | h22 | 平成22年度（2010） |
| 2009 | 平成21年 | h21 | 平成21年度（2009） |
| 2008 | 平成20年 | h20 | 平成20年度（2008） |
| 2007 | 平成19年 | h19 | 平成19年度（2007） |

**科目ファイル名とPDFファイル名の対応**:

| 科目 | .mdx ファイル名 | PDF ファイル名パターン | J-SMECA PDF科目コード |
| --- | --- | --- | --- |
| 経済学・経済政策 | economics.mdx | economics-{年}.pdf | A |
| 財務・会計 | finance.mdx | finance-{年}.pdf | B |
| 企業経営理論 | management.mdx | management-theory-{年}.pdf | C |
| 運営管理 | operations.mdx | operations-{年}.pdf | D |
| 経営法務 | business-law.mdx | business-law-{年}.pdf | E |
| 経営情報システム | info-systems.mdx | info-systems-{年}.pdf | F |
| 中小企業経営・中小企業政策 | sme-policy.mdx | sme-policy-{年}.pdf | G |

### J-SMECA 公式PDF URLパターン

- R7(2025): `https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/{コード}1JI2025.pdf`
- R6(2024): `https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2024/{コード}1JI2024.pdf`
- R5(2023): `https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/{コード}1JI2023.pdf`
- R4(2022): `https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/{コード}1JI2022.pdf`
- R3(2021): `https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2021/{コード}1JI2021.pdf`
- R2(2020): `https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2020/{コード}1JI2020.pdf`
- R1以前: URL構造が異なる可能性あり。 `https://www.jf-cmca.jp/contents/010_c_/shikenmondai.html` のアーカイブページから確認。

{コード} は科目コード（A〜G）。

### 各科目解説ページの必須テンプレート

```mdx
---
title: {科目名}（{和暦title}）
description: {和暦title}中小企業診断士第1次試験 {科目名}の全{問数}問解説
---

## 概要

{和暦title}の{科目名}は全{問数}問（各4点、100点満点）で出題されました。{出題構成の簡潔な説明}。

問題文は [J-SMECA 公式サイト（{和暦title} {科目名}）]({PDFのURL}) から入手できます。手元に PDF を用意したうえでお読みください。全年度の問題は [J-SMECA 試験問題ページ](https://www.jf-cmca.jp/contents/010_c_/shikenmondai.html) で公開されています。

<Callout title="解説の読み方">
  各問について「問題要旨 → 分類タグ → 正解 → 必要知識 → 解法の思考プロセス → 誤答の落とし穴 → 学習アドバイス」の順で解説しています。分類タグの意味は[本ページ末尾の凡例](#分類タグの凡例)を参照してください。
</Callout>

### 出題構成

| 領域 | 問番号 | 問数 |
| --- | --- | --- |
| {領域名} | {問番号} | {問数} |
| ... | ... | ... |

### 全問分類マップ

| 問 | テーマ | 知識種類 | 思考法 | 形式層 | 罠パターン |
| --- | --- | --- | --- | --- | --- |
| 1 | {テーマ} | {K分類} | {T分類} | {L分類} | {Trap分類} |
| ... | ... | ... | ... | ... | ... |

### 形式層の分布

| 形式層 | 問数 | 割合 | 該当問 |
| --- | --- | --- | --- |
| L1 ... | ... | ...% | ... |
| L2 ... | ... | ...% | ... |
| L3 ... | ... | ...% | ... |

{合格ラインに対するコメント}

---

## {大区分名}

### 第{N}問　{テーマ名}

**問題要旨**: {問題文ではなく、何が問われているかの要約}

`{K分類}` `{T分類}` `{L分類}` `{Trap分類}`

**正解**: {選択肢記号}

**必要知識**: [{リンク先ノードのタイトル}]({wikiノードパス}) — {どの知識が必要かの簡潔な説明}

**解法の思考プロセス**: {正解にたどり着く手順。因果連鎖は矢印表記（A↑ → B↓ → C↑）を使う}

**誤答の落とし穴**: {よくある間違いとその原因}

**学習アドバイス**: {この問題から得られる教訓}

---

（全問繰り返し）

---

## 年度総括

### 思考法の分布

| 思考法 | 問数 | 配点 |
| --- | --- | --- |
| T1 正誤判定 | {n} | {n×4}点 |
| ... | ... | ... |

### 罠パターンの分布

| 罠 | 問数 | 対策 |
| --- | --- | --- |
| Trap-A 逆方向 | {n} | ... |
| ... | ... | ... |

### Tier別学習優先度

- **Tier 1（確実に取りたい）**: 問{...}（{n}問 = {n×4}点）
- **Tier 2（合格ラインの鍵）**: 問{...}（{n}問 = {n×4}点）
- **Tier 3（差をつける問題）**: 問{...}（{n}問 = {n×4}点）

### 本番セルフチェック5項目

1. {科目に応じた5項目}

---

## 分類タグの凡例

### 知識種類（K）

| タグ | 意味 | 例 |
| --- | --- | --- |
| K1 | 定義・用語 | ... |
| K2 | グラフ形状 / 分類・表示 | ... |
| K3 | 数式・公式 | ... |
| K4 | 因果メカニズム / 手続・手順 | ... |
| K5 | 制度・データ / 制度・基準 | ... |

### 思考法（T）

| タグ | 意味 |
| --- | --- |
| T1 | 正誤判定 |
| T2 | グラフ読解 / 分類判断 |
| T3 | 計算実行 |
| T4 | 因果推論 / 条件整理 |
| T5 | 場合分け |

### 形式層（L）

| タグ | 意味 |
| --- | --- |
| L1 | 定義暗記で解ける |
| L2 | 構造理解が必要 |
| L3 | 因果連鎖・推論が必要 |
| L4 | 数式操作・応用が必要 |

### 罠パターン（Trap）

| タグ | 意味 | 対策 |
| --- | --- | --- |
| Trap-A | 逆方向 | 方向を書き出して確認 |
| Trap-B | 条件すり替え / 条件見落とし | 前提条件を最初に確認 |
| Trap-C | 部分正解 | 最後の一段を重点チェック |
| Trap-D | 混同誘発 / 類似混同 | 対比表で区別を明確に |
| Trap-E | 計算ミス誘発 | 公式の意味を理解して検算 |

## 関連ページ

- [過去問アーカイブ（公式PDF）](/reference/past-exam-archive)
- [{科目}トップ](/{科目パス})
```

### K/T分類の科目別カスタマイズ

K分類・T分類は科目特性に合わせて微調整する:

- **経済学**: K2=グラフ形状, T2=グラフ読解（グラフが多い）
- **財務・会計**: K2=分類・表示, K4=手続・手順, T2=分類判断, T4=条件整理（計算が多い）
- **企業経営理論**: K1=定義・用語を厚く（理論・用語の正誤判定が中心）
- **運営管理**: K4=手続・手順を厚く（生産管理の手順系が多い）
- **経営法務**: K5=制度・基準を厚く（法律条文ベース）
- **経営情報システム**: K1=定義・用語を厚く（IT用語の知識問題が多い）
- **中小企業経営・中小企業政策**: K5=制度・データを厚く（白書データ＋施策制度）

### 年度トップページ (index.mdx) テンプレート

```mdx
---
title: {和暦title}
description: {和暦title}中小企業診断士第1次試験の科目別解説
---

{和暦title}の中小企業診断士第1次試験について、科目別の解説を掲載しています。

問題文は [J-SMECA 公式サイト](https://www.jf-cmca.jp/contents/010_c_/shikenmondai.html) から入手できます。
```

### meta.json テンプレート

```json
{
  "title": "{和暦title}",
  "pages": ["index", "economics", "finance", "management", "operations", "business-law", "info-systems", "sme-policy"]
}
```

### 注意事項

- **LaTeX / 数式**: `$$..$$` ブロック数式は使わない。インライン数式 `$...$` は使用可。複雑な数式はプレーンテキスト表記（例: `Y = C + I + G + NX`）に変換する。
- **設問1/設問2形式**: 一部の問題は設問1・設問2がある（例: R7経済学、R6財務問12）。この場合は `12-1`, `12-2` のように表記する。問数とマーク数が異なる場合は概要で明記する。
- **ビルド検証**: 変更後は `pnpm lint` でエラーがないことを確認する。可能なら `NEXT_DIST_DIR=.next-check pnpm build` も実行する。
- **index.mdx の更新**: 各グループの作業完了後、`content/docs/past-exam-solutions/index.mdx` の年度×科目マトリクスに新しいリンクを追加する。
- **meta.json の更新**: ルートの `content/docs/past-exam-solutions/meta.json` の `pages` 配列に新しい年度コードを追加する（降順）。
- **freshness registry**: `docs/wiki-freshness-registry.json` に各ファイルのエントリを追加する（reviewWindowDays: 365）。

### 作業手順

1. `_book/past-exams/1ji/{西暦}/` からPDFを読む
2. 出題構成を把握し、全問分類マップを作成する
3. 各問の解説を4軸フレームワークで記述する
4. wikiノードへのリンクを付ける（存在確認必須）
5. 年度総括（思考法分布・罠頻度・Tier別・セルフチェック）を書く
6. 分類タグ凡例を末尾に配置する
7. meta.json、index.mdx を更新する
8. `pnpm lint` で検証する

---

## グループ別指示

---

### グループA: R5〜R7（2023〜2025）— 経済学以外の残り科目

**担当年度**: R5(2023), R6(2024), R7(2025)

**作成するファイル**:

R5 (r05):
- `finance.mdx`, `management.mdx`, `operations.mdx`, `business-law.mdx`, `info-systems.mdx`, `sme-policy.mdx`

R6 (r06): ※ economics.mdx, finance.mdx は既存
- `management.mdx`, `operations.mdx`, `business-law.mdx`, `info-systems.mdx`, `sme-policy.mdx`

R7 (r07): ※ economics.mdx は既存
- `finance.mdx`, `management.mdx`, `operations.mdx`, `business-law.mdx`, `info-systems.mdx`, `sme-policy.mdx`

**参照PDF**:
- `_book/past-exams/1ji/2023/{科目}-2023.pdf`
- `_book/past-exams/1ji/2024/{科目}-2024.pdf`
- `_book/past-exams/1ji/2025/{科目}-2025.pdf`

**特記事項**:
- R7は一部科目で設問1/設問2形式がある可能性。問数とマーク数を正確に確認すること。
- R5〜R7は最新年度なので、wikiノードとのリンクが最も充実しているはず。積極的にリンクを付ける。
- r05, r06 の meta.json は既存。pages 配列に新科目を追加する。
- r07 の meta.json も既存。pages 配列に新科目を追加する。
- 合計ファイル数: 6 + 5 + 6 = **17ファイル**

---

### グループB: R2〜R4（2020〜2022）— 経済学以外の全科目

**担当年度**: R2(2020), R3(2021), R4(2022)

**作成するファイル**:

R2 (r02): ※ economics.mdx は既存
- `finance.mdx`, `management.mdx`, `operations.mdx`, `business-law.mdx`, `info-systems.mdx`, `sme-policy.mdx`

R3 (r03): ※ economics.mdx は既存
- `finance.mdx`, `management.mdx`, `operations.mdx`, `business-law.mdx`, `info-systems.mdx`, `sme-policy.mdx`

R4 (r04): ※ economics.mdx は既存
- `finance.mdx`, `management.mdx`, `operations.mdx`, `business-law.mdx`, `info-systems.mdx`, `sme-policy.mdx`

**参照PDF**:
- `_book/past-exams/1ji/2020/{科目}-2020.pdf`
- `_book/past-exams/1ji/2021/{科目}-2021.pdf`
- `_book/past-exams/1ji/2022/{科目}-2022.pdf`

**特記事項**:
- r02, r03, r04 の meta.json は既存。pages 配列に新科目を追加する。
- 合計ファイル数: 6 × 3 = **18ファイル**

---

### グループC: H29〜R1（2017〜2019）— 全7科目

**担当年度**: H29(2017), H30(2018), R1(2019)

**作成するファイル**: 各年度7科目のフルセット + 年度ディレクトリ・index.mdx・meta.json

新規ディレクトリ:
- `content/docs/past-exam-solutions/h29/`
- `content/docs/past-exam-solutions/h30/`
- `content/docs/past-exam-solutions/r01/`

各ディレクトリに:
- `index.mdx`, `meta.json`
- `economics.mdx`, `finance.mdx`, `management.mdx`, `operations.mdx`, `business-law.mdx`, `info-systems.mdx`, `sme-policy.mdx`

**参照PDF**:
- `_book/past-exams/1ji/2017/{科目}-2017.pdf`
- `_book/past-exams/1ji/2018/{科目}-2018.pdf`
- `_book/past-exams/1ji/2019/{科目}-2019.pdf`

**特記事項**:
- 新規年度。ディレクトリ作成から必要。
- ルートの `meta.json` の `pages` に `"r01"`, `"h30"`, `"h29"` を追加する（降順で既存の `"r02"` の後に挿入）。
- 合計ファイル数: (7 + 2) × 3 = **27ファイル**（うちindex+meta各3）

---

### グループD: H26〜H28（2014〜2016）— 全7科目

**担当年度**: H26(2014), H27(2015), H28(2016)

**作成するファイル**: 各年度7科目のフルセット + 年度ディレクトリ

新規ディレクトリ:
- `content/docs/past-exam-solutions/h26/`
- `content/docs/past-exam-solutions/h27/`
- `content/docs/past-exam-solutions/h28/`

**参照PDF**:
- `_book/past-exams/1ji/2014/{科目}-2014.pdf`
- `_book/past-exams/1ji/2015/{科目}-2015.pdf`
- `_book/past-exams/1ji/2016/{科目}-2016.pdf`

**特記事項**:
- ルートの `meta.json` に `"h28"`, `"h27"`, `"h26"` を追加。
- 合計ファイル数: (7 + 2) × 3 = **27ファイル**

---

### グループE: H23〜H25（2011〜2013）— 全7科目

**担当年度**: H23(2011), H24(2012), H25(2013)

**作成するファイル**: 各年度7科目のフルセット + 年度ディレクトリ

新規ディレクトリ:
- `content/docs/past-exam-solutions/h23/`
- `content/docs/past-exam-solutions/h24/`
- `content/docs/past-exam-solutions/h25/`

**参照PDF**:
- `_book/past-exams/1ji/2011/{科目}-2011.pdf`
- `_book/past-exams/1ji/2012/{科目}-2012.pdf`
- `_book/past-exams/1ji/2013/{科目}-2013.pdf`

**特記事項**:
- ルートの `meta.json` に `"h25"`, `"h24"`, `"h23"` を追加。
- 合計ファイル数: (7 + 2) × 3 = **27ファイル**

---

### グループF: H19〜H22（2007〜2010）— 全7科目

**担当年度**: H19(2007), H20(2008), H21(2009), H22(2010)

**作成するファイル**: 各年度7科目のフルセット + 年度ディレクトリ

新規ディレクトリ:
- `content/docs/past-exam-solutions/h19/`
- `content/docs/past-exam-solutions/h20/`
- `content/docs/past-exam-solutions/h21/`
- `content/docs/past-exam-solutions/h22/`

**参照PDF**:
- `_book/past-exams/1ji/2007/{科目}-2007.pdf`
- `_book/past-exams/1ji/2008/{科目}-2008.pdf`
- `_book/past-exams/1ji/2009/{科目}-2009.pdf`
- `_book/past-exams/1ji/2010/{科目}-2010.pdf`

**特記事項**:
- 4年分あるので他グループより作業量が多い。科目を2-3本ずつ区切って進めてもよい。
- 古い年度は出題傾向が現在と異なる場合がある。現行の分類タグは同じものを使うが、科目構成の変化があれば概要で注記する。
- ルートの `meta.json` に `"h22"`, `"h21"`, `"h20"`, `"h19"` を追加。
- 合計ファイル数: (7 + 2) × 4 = **36ファイル**

---

## 最終仕上げ（全グループ完了後）

全グループの作業が終わったら、以下を統合的に行う:

1. `content/docs/past-exam-solutions/index.mdx` の年度×科目マトリクスを全年度・全科目で更新
2. `content/docs/past-exam-solutions/meta.json` の `pages` を全年度降順で整備
3. `docs/wiki-freshness-registry.json` に全エントリ追加
4. `pnpm lint` + `NEXT_DIST_DIR=.next-check pnpm build` でビルド通過確認
5. 抜け漏れチェック（全年度 × 全科目のマトリクスで空欄がないか）
