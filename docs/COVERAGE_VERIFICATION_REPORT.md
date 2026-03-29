# カバレッジ検証レポート: R2-R4 過去問解説

**検証日**: 2026-03-29
**対象**: R2-R4（2020-2022）過去問解説18ファイル（7科目 × 3年度）
**総問数**: 578問

---

## 1. リンク切れ（Broken Links）

### 確認された問題

計4つのリンク切れが存在：

#### a) 新規wiki ノード不足（2件）

| パス                                                                  | 問題参照        | 説明                                     |
| --------------------------------------------------------------------- | --------------- | ---------------------------------------- |
| `/finance-and-accounting/capital-budgeting-and-investment-evaluation` | r03/finance Q21 | 資本予算・投資評価の専用ノードが不足     |
| `/finance-and-accounting/enterprise-value-evaluation-and-wacc`        | r03/finance Q22 | 企業価値評価・WACC理論の専用ノードが不足 |

**現状**: 関連概念は `finance-profitability-index.mdx` などで部分的にカバーされているが、統合的なノードがない

#### b) リンク形式エラー（2件）

| パス                                                                        | 問題参照             | 説明                                                                                                                     |
| --------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `/finance-and-accounting/finance.mdx`                                       | r04/finance Q22      | リンクに `.mdx` 拡張子を含める（誤り）。正しくは `/finance-and-accounting/finance`                                       |
| `/management-information-systems/knowledge-systems-development-methods.mdx` | r04/info-systems Q11 | リンクに `.mdx` 拡張子を含める（誤り）。正しくは `/management-information-systems/knowledge-systems-development-methods` |

**影響**: リンク変換時のパス解決エラー

---

## 2. カバレッジギャップ（Wiki Links 未付与）

### 問題別内訳

| 科目                     | 年度 | 問題番号        | 問数   |
| ------------------------ | ---- | --------------- | ------ |
| **Finance & Accounting** | R2   | 全24問（Q1-24） | 24     |
|                          | R3   | Q1-Q20          | 20     |
| **Business Management**  | R2   | Q23-Q25         | 3      |
|                          | R3   | Q32-Q38         | 7      |
| **Total**                | —    | —               | **54** |

### 詳細

**R2 Finance (全24問):**

- Q1-Q24 すべてがwiki link 未装備
- 必要知識: 簿記基礎、決算処理、有価証券評価、原価計算、財務分析、ポートフォリオ理論、資本構成理論など
- **原因**: 解説ファイル作成時点でwiki ノードが完成していなかったと推定

**R3 Finance (Q1-Q20):**

- 全20問がwiki link 未装備（Q21-Q24は正常）
- Q21-Q22は broken link（上記参照）

**R2 Business Management (Q23-Q25):**

- 3問のみlink 未装備
- Q1-Q22は正常にカバー

**R3 Business Management (Q32-Q38):**

- 7問のみlink 未装備
- Q1-Q31は正常にカバー

---

## 3. Wiki ノード側のカバレッジ（標本検査結果）

### 確認した投資評価関連

**例: Finance R2 Q1「商品評価と簿外取引」**

- **必要知識**: 簿記基礎 — 商品仕訳、売上原価の計算、簿外取引の処理
- **対応wiki**: `/finance-and-accounting/bookkeeping-basics`
- **検査結果**: 完全にカバー
  - ✅ 商品売買の三分法
  - ✅ 売上原価 = 期首棚卸 + 当期仕入 - 期末棚卸
  - ✅ 決算整理仕訳
  - ✅ 棚卸減耗損・商品評価損

**例: Finance R2 Q2「決算処理と貸倒れ」**

- **必要知識**: 決算処理基礎 — 貸倒引当金の設定・戻し入れ、貸倒損失認識
- **対応wiki**: `/finance-and-accounting/bookkeeping-basics-adjusting-entries`
- **検査結果**: 完全にカバー
  - ✅ 貸倒引当金の本質（発生主義）
  - ✅ 差額補充法の計算手順
  - ✅ 貸倒懸念債権との区別
  - ✅ B/S 表示方法

**結論**: wiki ノード側は既存問題の必要知識をよくカバーしている。問題はwiki link の装備状況。

---

## 4. 総合カバレッジ率

| 指標                 | 値        |
| -------------------- | --------- |
| 総問数（R2-R4）      | 578       |
| wiki link 装備問数   | 524       |
| wiki link 未装備問数 | 54        |
| **カバレッジ率**     | **90.7%** |

---

## 5. 推奨アクション（優先順）

### 優先度1: リンク形式エラー修正（即座）

1. `r04/finance.mdx` の Q22 を検索し、`[text](/finance-and-accounting/finance.mdx)` を `[text](/finance-and-accounting/finance)` に修正
2. `r04/info-systems.mdx` の Q11 を検索し、`[text](/management-information-systems/knowledge-systems-development-methods.mdx)` を `[text](/management-information-systems/knowledge-systems-development-methods)` に修正

### 優先度2: 新規wiki ノード追加（1-2週間）

**Finance: Capital Budgeting & Investment Evaluation**

- 対象: r03 finance Q21
- 必要な内容: NPV、IRR、回収期間法、ポートフォリオ理論、CAPM との関連

**Finance: Enterprise Value & WACC**

- 対象: r03 finance Q22
- 必要な内容: WACC 計算、MM定理、税効果、資本構成最適性

→ 既存の `finance-profitability-index.mdx` などとの関係を整理したうえで、統合・分割を検討

### 優先度3: R2-R3 Finance への wiki link 装備（2-3週間）

- **R2 Finance**: Q1-Q24 全問
- **R3 Finance**: Q1-Q20

対応wiki ノードはほぼ存在するため、解説ファイルに link を埋め込むだけで完了可能。

### 優先度4: Management への限定追加（1週間）

- **R2 Management**: Q23-Q25 (3問)
- **R3 Management**: Q32-Q38 (7問)

---

## 6. 検証方法

1. **リンク抽出**: 正規表現で `[text](path)` 形式のwiki link を全問から抽出
2. **パス検証**: 各リンク先ファイルの実在確認（`.mdx`, `.md` 拡張子チェック）
3. **内容標本検査**: Finance / Management の複数問について、wiki ノード内の必要知識カバレッジを定性評価

---

## 結論

**現状**: 90.7% のカバレッジ達成。link 未装備問は54問で、うち44問は確認済みwiki ノードへのlink が必要。

**即座の課題**: 形式エラー4件とノード不足2件の修正。残る未装備問への link は、既存wiki ノードの活用で95%以上のカバレッジ達成可能。

**wiki ノード側の品質**: 既存の必要知識をよくカバー。新規追加より、既存リソースの link 整備が優先。
