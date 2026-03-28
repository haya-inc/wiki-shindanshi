# wiki 進捗トラッカー

更新日: 2026-03-28

## 状態の意味

- 未着手: 公開面にまだ反映していない
- 骨子あり: 公開面に章名や論点一覧はあるが、本文は薄い
- 執筆中: 公開面に学習用の説明や優先順位が入り始めている
- 公開済み: 単独ページとして使える品質まで達している
- 要更新: 制度変更や情報更新で再確認が必要

## 品質ゲート

- `G1`: 試験範囲とページの役割が明記されている
- `G2`: 学習のポイントや優先順位がある
- `G3`: 典型的なつまずき、解き方、比較軸などの学習支援がある
- `G4`: 関連ページへの導線がある
- `G5`: `pnpm lint`、`pnpm build`、表示確認などの検証が終わっている
- `G6`: 更新論点では確認日と一次情報が整理されている

## 状態判定ルール

- `骨子あり`: `G1` と `G5` を満たす
- `執筆中`: `G1`、`G2`、`G4`、`G5` を満たす
- `公開済み` の安定論点: `G1` から `G5`
- `公開済み` の更新論点: `G1` から `G6`

## 第1次試験

| 章 | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 第1章 ミクロ経済学 | `/docs/economics-and-economic-policy/microeconomics` | 安定論点 | 公開済み | `G1-G5` | 年別出題傾向と誤答パターンに加え、出題ノードへ後半論点の判断順を広げる |
| 第2章 マクロ経済学 | `/docs/economics-and-economic-policy/macroeconomics` | 安定論点 | 公開済み | `G1-G5` | 索引から政策比較表と年別出題傾向へ広げる |
| 第3章 簿記の基礎 | `/docs/finance-and-accounting/bookkeeping-basics` | 安定論点 | 公開済み | `G1-G5` | 商品売買、現金過不足、銀行勘定調整表の確認問題を追加する |
| 第4章 企業会計の基礎 | `/docs/finance-and-accounting/corporate-accounting-basics` | 安定論点 | 公開済み | `G1-G5` | 財務諸表横断表、税効果会計の誤答例、連結会計の入口例を補強する |
| 第5章 原価計算 | `/docs/finance-and-accounting/cost-accounting` | 安定論点 | 公開済み | `G1-G5` | 仕損・減損、配合差異、勘定連絡の応用問題を追加する |
| 第6章 経営分析 | `/docs/finance-and-accounting/management-analysis` | 安定論点 | 公開済み | `G1-G5` | 新規知識ノードへ比較問題と事例Ⅳの指標選定例を追加する |
| 第7章 利益と資金の管理 | `/docs/finance-and-accounting/profit-and-cash-management` | 安定論点 | 公開済み | `G1-G5` | 新規知識ノードへ予算実績差異と月次資金繰りの例題を追加する |
| 第8章 ファイナンス | `/docs/finance-and-accounting/finance` | 安定論点 | 公開済み | `G1-G5` | WACC、NPV、DCF のつながりを比較表で補強する |
| 第9章 経営戦略論 | `/docs/business-management-theory/management-strategy` | 安定論点 | 公開済み | `G1-G5` | SWOT、PPM、5フォース、VRIO、国際経営の比較問題を増やす |
| 第10章 組織論 | `/docs/business-management-theory/organization-theory` | 安定論点 | 公開済み | `G1-G5` | 新規ノードへ比較問題と事例Ⅰ型の例題を追加する |
| 第11章 マーケティング論 | `/docs/business-management-theory/marketing` | 安定論点 | 公開済み | `G1-G5` | STP、調査、製品価格、チャネル、CRM の比較問題を増やす |
| 第12章 生産管理 プランニング | `/docs/operations-management/production-planning` | 安定論点 | 公開済み | `G1-G5` | 生産方式、在庫、品質、IE / VE の比較問題を増やす |
| 第13章 生産管理 オペレーション | `/docs/operations-management/production-operations` | 安定論点 | 公開済み | `G1-G5` | JIT、PERT/CPM、OEE、購買外注の比較問題を増やす |
| 第14章 店舗・販売管理 | `/docs/operations-management/store-and-sales-management` | 安定論点 | 公開済み | `G1-G5` | 商圏分析、VMD、販売管理指標、流通情報の比較問題を増やす |
| 第15章 会社法 | `/docs/business-law/company-law` | 更新論点 | 公開済み | `G1-G6` | 機関設計、株主総会決議、組織再編の比較問題を追加する |
| 第16章 知的財産権 | `/docs/business-law/intellectual-property` | 更新論点 | 公開済み | `G1-G6` | 産業財産権4法、著作権、不正競争防止法の比較問題を追加する |
| 第17章 民法と取引関連法 | `/docs/business-law/civil-and-transaction-law` | 更新論点 | 公開済み | `G1-G6` | 新規知識ノードへ比較問題と確認問題を追加する |
| 第18章 情報通信技術の基礎 | `/docs/management-information-systems/ict-basics` | 安定論点 | 公開済み | `G1-G5` | 6つの知識ノードへ比較問題と確認問題を追加する |
| 第19章 経営情報管理 | `/docs/management-information-systems/information-management` | 安定論点 | 公開済み | `G1-G5` | 新規知識ノードへ比較問題と確認問題を追加し、索引の戻り先をさらに強める |
| 第20章 中小企業経営 | `/docs/sme-management-and-policy/sme-management` | 更新論点 | 公開済み | `G1-G6` | 新規知識ノードへ比較問題と確認問題を追加し、白書導線の戻り先をさらに強める |
| 第21章 中小企業政策 | `/docs/sme-management-and-policy/sme-policy` | 更新論点 | 公開済み | `G1-G6` | 新規更新ノードへ比較表と誤答パターンを追加し、索引の戻り先をさらに強める |

### 第1章 ミクロ経済学の論点ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 章ハブ ミクロ経済学 | `/docs/economics-and-economic-policy/microeconomics` | 安定論点 | 公開済み | `G1-G5` | 年別出題傾向と誤答パターンを追加する |
| 知識ノード 需要と供給、市場均衡 | `/docs/economics-and-economic-policy/microeconomics/knowledge-market-mechanism` | 安定論点 | 公開済み | `G1-G5` | 価格規制、税、補助金の図表パターンを厚くする |
| 知識ノード 消費者行動と企業行動 | `/docs/economics-and-economic-policy/microeconomics/knowledge-consumer-and-firm` | 安定論点 | 公開済み | `G1-G5` | スルツキー分解と独占企業の利潤最大化を補強する |
| 知識ノード 市場構造と市場の失敗 | `/docs/economics-and-economic-policy/microeconomics/knowledge-market-structure-and-failure` | 安定論点 | 公開済み | `G1-G5` | 寡占とゲーム理論、比較優位の例を追加する |
| 知識ノード ゲーム理論 | `/docs/economics-and-economic-policy/microeconomics/knowledge-game-theory` | 安定論点 | 公開済み | `G1-G5` | 支配戦略、ナッシュ均衡、囚人のジレンマの誤答パターンを追加する |
| 知識ノード 国際貿易理論 | `/docs/economics-and-economic-policy/microeconomics/knowledge-international-trade` | 安定論点 | 公開済み | `G1-G5` | 比較優位、機会費用、関税の効果を演習付きで補強する |
| 出題ノード グラフ・比較問題の解き方 | `/docs/economics-and-economic-policy/microeconomics/exam-graph-and-comparison-patterns` | 安定論点 | 公開済み | `G1-G5` | 設問パターンごとの判断順を表で固定する |
| 演習ノード 基本確認問題 | `/docs/economics-and-economic-policy/microeconomics/practice-basic-check` | 安定論点 | 公開済み | `G1-G5` | ゲーム理論と国際貿易理論の応用問題、誤答パターンを追加する |
| 要点整理 | `/docs/economics-and-economic-policy/microeconomics/summary` | 安定論点 | 公開済み | `G1-G5` | 後半論点を含む比較表と直前確認欄を増やす |

### 第2章 マクロ経済学の論点ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 章ハブ マクロ経済学 | `/docs/economics-and-economic-policy/macroeconomics` | 安定論点 | 公開済み | `G1-G5` | 政策比較表と年別出題傾向を追加する |
| 知識ノード 国民所得計算と主要指標 | `/docs/economics-and-economic-policy/macroeconomics/knowledge-national-income-and-indicators` | 安定論点 | 公開済み | `G1-G5` | 物価指数と失業率の計算例を追加する |
| 知識ノード 消費理論と投資理論 | `/docs/economics-and-economic-policy/macroeconomics/knowledge-consumption-and-investment-theory` | 安定論点 | 公開済み | `G1-G5` | ライフサイクル仮説、恒常所得仮説、トービンの q の比較演習を追加する |
| 知識ノード IS-LM と政策効果 | `/docs/economics-and-economic-policy/macroeconomics/knowledge-is-lm-and-policies` | 安定論点 | 公開済み | `G1-G5` | クラウディングアウトと乗数の比較表を追加する |
| 知識ノード AD-AS、フィリップス曲線、国際マクロ | `/docs/economics-and-economic-policy/macroeconomics/knowledge-ad-as-and-international-macro` | 安定論点 | 公開済み | `G1-G5` | 供給ショックと国際マクロの政策比較を追加する |
| 知識ノード 主要経済理論の系譜 | `/docs/economics-and-economic-policy/macroeconomics/knowledge-history-of-macroeconomic-thought` | 安定論点 | 公開済み | `G1-G5` | 古典派、ケインズ派、マネタリズム、新しい古典派、新しいケインズ派の出題比較を追加する |
| 出題ノード 政策・グラフ問題の解き方 | `/docs/economics-and-economic-policy/macroeconomics/exam-policy-and-graph-patterns` | 安定論点 | 公開済み | `G1-G5` | 設問パターンごとの判断順を表で固定する |
| 演習ノード 基本確認問題 | `/docs/economics-and-economic-policy/macroeconomics/practice-basic-check` | 安定論点 | 公開済み | `G1-G5` | 応用問題と誤答パターンを追加する |
| 要点整理 | `/docs/economics-and-economic-policy/macroeconomics/summary` | 安定論点 | 公開済み | `G1-G5` | 政策比較の早見表を増やす |

### 企業経営理論の知識ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 知識ノード 経営計画とSWOT | `/docs/business-management-theory/knowledge-strategic-planning-and-swot` | 安定論点 | 公開済み | `G1-G5` | SWOT の結果を戦略課題へ落とす比較問題を増やす |
| 知識ノード 全社戦略と成長戦略 | `/docs/business-management-theory/knowledge-corporate-and-growth-strategy` | 安定論点 | 公開済み | `G1-G5` | PPM、多角化、アンゾフ、M&A / アライアンスの比較問題を増やす |
| 知識ノード 競争戦略と経営資源戦略 | `/docs/business-management-theory/knowledge-competitive-and-resource-strategy` | 安定論点 | 公開済み | `G1-G5` | 5フォース、基本戦略、バリューチェーン、VRIO の誤答比較を増やす |
| 知識ノード イノベーション・国際経営・デジタル戦略 | `/docs/business-management-theory/knowledge-innovation-international-and-digital-strategy` | 安定論点 | 公開済み | `G1-G5` | 進出形態と DX / プラットフォームの比較問題を増やす |
| 知識ノード CSR・ESGとコーポレートガバナンス | `/docs/business-management-theory/knowledge-csr-esg-and-governance` | 安定論点 | 公開済み | `G1-G5` | `CSR / ESG / ガバナンス` の比較問題とステークホルダー論点を補強する |
| 知識ノード バーナードとサイモン | `/docs/business-management-theory/knowledge-barnard-and-simon` | 安定論点 | 公開済み | `G1-G5` | `組織成立`、`権限受容説`、`限定合理性`、`満足化` の比較問題を補強する |
| 知識ノード 組織構造と組織設計 | `/docs/business-management-theory/knowledge-organizational-structure-and-design` | 安定論点 | 公開済み | `G1-G5` | 機能別、事業部制、マトリクス、集権 / 分権の比較問題を増やす |
| 知識ノード モチベーション理論 | `/docs/business-management-theory/knowledge-motivation-theories` | 安定論点 | 公開済み | `G1-G5` | 内容理論、過程理論、職務設計の比較問題を増やす |
| 知識ノード リーダーシップ論 | `/docs/business-management-theory/knowledge-leadership-theories` | 安定論点 | 公開済み | `G1-G5` | SL理論、パス=ゴール理論、変革型の比較問題を増やす |
| 知識ノード 人的資源管理 | `/docs/business-management-theory/knowledge-human-resource-management` | 安定論点 | 公開済み | `G1-G5` | 育成、評価、報酬、ジョブ型 / メンバーシップ型の比較問題を増やす |
| 知識ノード 組織文化と組織変革 | `/docs/business-management-theory/knowledge-organizational-culture-and-change` | 安定論点 | 公開済み | `G1-G5` | レビン、コッター、SECIモデルの比較問題を増やす |
| 知識ノード STPと4P | `/docs/business-management-theory/knowledge-stp-and-4p` | 安定論点 | 公開済み | `G1-G5` | ポジショニングと 4P の整合を問う比較問題を増やす |
| 知識ノード マーケティングリサーチと消費者行動 | `/docs/business-management-theory/knowledge-marketing-research-and-consumer-behavior` | 安定論点 | 公開済み | `G1-G5` | 調査手法と購買段階の対応問題を増やす |
| 知識ノード 製品戦略と価格戦略 | `/docs/business-management-theory/knowledge-product-and-price-strategy` | 安定論点 | 公開済み | `G1-G5` | ライフサイクルと価格設定法の比較問題を増やす |
| 知識ノード チャネル戦略とプロモーション戦略 | `/docs/business-management-theory/knowledge-channel-and-promotion-strategy` | 安定論点 | 公開済み | `G1-G5` | VMS とプロモーション手段の比較問題を増やす |
| 知識ノード サービスマーケティングとCRM | `/docs/business-management-theory/knowledge-service-marketing-and-crm` | 安定論点 | 公開済み | `G1-G5` | 7P、SERVQUAL、CRM、LTV の比較問題を増やす |

### 運営管理の知識ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 知識ノード 生産方式と計画統制 | `/docs/operations-management/knowledge-production-systems-and-planning-control` | 安定論点 | 公開済み | `G1-G5` | 生産方式と計画 / 統制の比較問題を増やす |
| 知識ノード 工場レイアウトと流れ設計 | `/docs/operations-management/knowledge-factory-layout-and-flow-design` | 安定論点 | 公開済み | `G1-G5` | レイアウト類型と SLP の比較問題を増やす |
| 知識ノード 資材・在庫管理 | `/docs/operations-management/knowledge-materials-and-inventory-management` | 安定論点 | 公開済み | `G1-G5` | MRP、EOQ、安全在庫の比較問題を増やす |
| 知識ノード 品質管理 | `/docs/operations-management/knowledge-quality-management` | 安定論点 | 公開済み | `G1-G5` | QC7つ道具と新QC7つ道具の誤答比較を増やす |
| 知識ノード IEとVE | `/docs/operations-management/knowledge-ie-and-ve` | 安定論点 | 公開済み | `G1-G5` | IE と VE の改善目的の比較問題を増やす |
| 知識ノード JITとかんばん方式 | `/docs/operations-management/knowledge-jit-and-kanban` | 安定論点 | 公開済み | `G1-G5` | JIT と MRP の比較問題を増やす |
| 知識ノード スケジューリングとラインバランシング | `/docs/operations-management/knowledge-scheduling-and-line-balancing` | 安定論点 | 公開済み | `G1-G5` | PERT/CPM、ジョンソン法、編成効率の演習を増やす |
| 知識ノード 設備管理と生産性向上 | `/docs/operations-management/knowledge-equipment-management-and-productivity` | 安定論点 | 公開済み | `G1-G5` | OEE、MTBF、MTTR、生産性向上の比較問題を増やす |
| 知識ノード 購買・外注管理 | `/docs/operations-management/knowledge-purchasing-and-outsourcing-management` | 安定論点 | 公開済み | `G1-G5` | 購買と外注の比較問題を増やす |
| 知識ノード 店舗立地と商圏分析 | `/docs/operations-management/knowledge-store-location-and-trading-area` | 安定論点 | 公開済み | `G1-G5` | 立地類型とハフモデルの演習を増やす |
| 知識ノード 店舗レイアウトとマーチャンダイジング | `/docs/operations-management/knowledge-store-layout-and-merchandising` | 安定論点 | 公開済み | `G1-G5` | VMD、SKU、棚割の比較問題を増やす |
| 知識ノード 販売管理指標・物流・流通情報システム | `/docs/operations-management/knowledge-sales-indicators-logistics-and-retail-information-systems` | 安定論点 | 公開済み | `G1-G5` | GMROI、交差比率、POS、EOS、EDI の比較問題を増やす |

### 経営法務の知識ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 知識ノード 会社類型と設立手続 | `/docs/business-law/knowledge-company-types-and-incorporation` | 更新論点 | 公開済み | `G1-G6` | 公開会社 / 非公開会社と設立手続の比較問題を増やす |
| 知識ノード 株式と株主 | `/docs/business-law/knowledge-shares-and-shareholders` | 更新論点 | 公開済み | `G1-G6` | 種類株式、自己株式、少数株主権の比較問題を増やす |
| 知識ノード 機関設計と株主総会決議 | `/docs/business-law/knowledge-corporate-organs-and-shareholder-meetings` | 更新論点 | 公開済み | `G1-G6` | 必置機関と決議区分の比較問題を増やす |
| 知識ノード 資金調達・配当・計算書類 | `/docs/business-law/knowledge-fundraising-dividends-and-financial-statements` | 更新論点 | 公開済み | `G1-G6` | 新株発行、社債、配当、計算書類の比較問題を増やす |
| 知識ノード 組織再編と事業譲渡 | `/docs/business-law/knowledge-corporate-reorganization-and-business-transfer` | 更新論点 | 公開済み | `G1-G6` | 再編手法と事業譲渡、簡易 / 略式の比較問題を増やす |
| 知識ノード 倒産法制 | `/docs/business-law/knowledge-insolvency-and-corporate-rehabilitation` | 更新論点 | 公開済み | `G1-G6` | 破産、民事再生、会社更生、特別清算の比較問題を増やす |
| 知識ノード 知的財産権の体系と存続期間 | `/docs/business-law/knowledge-ip-framework-and-terms` | 更新論点 | 公開済み | `G1-G6` | 保護対象、登録要否、存続期間の比較問題を増やす |
| 知識ノード 特許法 | `/docs/business-law/knowledge-patent-law` | 更新論点 | 公開済み | `G1-G6` | 出願、審査請求、実施権、職務発明の比較問題を増やす |
| 知識ノード 実用新案法 | `/docs/business-law/knowledge-utility-model-law` | 更新論点 | 公開済み | `G1-G6` | 特許法との違いを問う比較問題を増やす |
| 知識ノード 意匠法 | `/docs/business-law/knowledge-design-law` | 更新論点 | 公開済み | `G1-G6` | 意匠法の改正論点と特許法の違いを問う比較問題を増やす |
| 知識ノード 商標法 | `/docs/business-law/knowledge-trademark-law` | 更新論点 | 公開済み | `G1-G6` | 更新制度、不使用取消審判、コンセント制度の比較問題を増やす |
| 知識ノード 著作権法 | `/docs/business-law/knowledge-copyright-law` | 更新論点 | 公開済み | `G1-G6` | 人格権と財産権、保護期間の比較問題を増やす |
| 知識ノード 不正競争防止法 | `/docs/business-law/knowledge-unfair-competition-prevention-law` | 更新論点 | 公開済み | `G1-G6` | 営業秘密の 3 要件と表示冒用の比較問題を増やす |
| 知識ノード 知的財産権の活用と国際的保護 | `/docs/business-law/knowledge-ip-strategy-and-international-protection` | 更新論点 | 公開済み | `G1-G6` | ライセンス、職務発明、国際的保護の比較問題を増やす |
| 知識ノード 契約・債権・物権・担保 | `/docs/business-law/knowledge-contracts-obligations-and-security` | 安定論点 | 公開済み | `G1-G5` | 請負 / 委任、契約不適合責任、抵当権 / 質権の比較問題を増やす |
| 知識ノード 時効と保証 | `/docs/business-law/knowledge-prescription-and-guarantee` | 安定論点 | 公開済み | `G1-G5` | 完成猶予 / 更新と通常保証 / 連帯保証の比較問題を増やす |
| 知識ノード 相続 | `/docs/business-law/knowledge-inheritance` | 安定論点 | 公開済み | `G1-G5` | 法定相続分と遺留分の図解問題を増やす |
| 知識ノード 独占禁止法と取引適正化 | `/docs/business-law/knowledge-antimonopoly-and-trade-regulation` | 安定論点 | 公開済み | `G1-G5` | `私的独占 / カルテル / 優越的地位 / 取適法` の比較問題を増やす |
| 知識ノード 消費者保護関連法 | `/docs/business-law/knowledge-consumer-protection-laws` | 安定論点 | 公開済み | `G1-G5` | `消費者契約法 / 景表法 / 特商法` とクーリング・オフの比較問題を増やす |
| 知識ノード 個人情報保護法 | `/docs/business-law/knowledge-personal-information-protection` | 安定論点 | 公開済み | `G1-G5` | `個人情報 / 個人データ / 保有個人データ` と第三者提供の比較問題を増やす |
| 知識ノード 労働関連法規の概要 | `/docs/business-law/knowledge-labor-laws-overview` | 安定論点 | 公開済み | `G1-G5` | `労基法 / 労契法 / 労組法` とハラスメント対応の比較問題を増やす |
| 知識ノード 資本市場関連法規 | `/docs/business-law/knowledge-capital-market-laws` | 安定論点 | 公開済み | `G1-G5` | `金商法 / インサイダー取引 / TOB / 電子記録債権` の比較問題を増やす |
| 知識ノード 英文契約書の基本用語 | `/docs/business-law/knowledge-english-contract-terms` | 安定論点 | 公開済み | `G1-G5` | `warranty / indemnify / force majeure` の比較問題を増やす |

### 経営情報システムの知識ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 知識ノード コンピュータの基礎 | `/docs/management-information-systems/knowledge-computer-basics` | 安定論点 | 公開済み | `G1-G5` | `CPU / 記憶装置 / OS / RAID / 処理形態` の比較問題を追加する |
| 知識ノード データベースとSQL | `/docs/management-information-systems/knowledge-database-and-sql` | 安定論点 | 公開済み | `G1-G5` | `正規化 / SQL / トランザクション / 排他制御` の比較問題を追加する |
| 知識ノード 通信ネットワーク | `/docs/management-information-systems/knowledge-network-basics` | 安定論点 | 公開済み | `G1-G5` | `OSI / TCP-IP / DNS / HTTP / IPアドレス` の比較問題を追加する |
| 知識ノード Webテクノロジーとクラウド | `/docs/management-information-systems/knowledge-web-and-cloud` | 安定論点 | 公開済み | `G1-G5` | `Web / API / SaaS / PaaS / IaaS / CDN` の比較問題を追加する |
| 知識ノード 情報セキュリティの基礎 | `/docs/management-information-systems/knowledge-information-security-basics` | 安定論点 | 公開済み | `G1-G5` | `暗号 / ハッシュ / 電子署名 / PKI / 認証` の比較問題を追加する |
| 知識ノード AI・機械学習の基礎 | `/docs/management-information-systems/knowledge-ai-and-machine-learning-basics` | 安定論点 | 公開済み | `G1-G5` | `教師あり / 教師なし / 強化学習 / 生成AI / IoT` の比較問題を追加する |
| 知識ノード IT戦略・BPR・DX | `/docs/management-information-systems/knowledge-it-strategy-and-dx` | 安定論点 | 公開済み | `G1-G5` | `BPR / DX / ITガバナンス / ERP / SCM / CRM` の比較問題を追加する |
| 知識ノード システム開発手法 | `/docs/management-information-systems/knowledge-systems-development-methods` | 安定論点 | 公開済み | `G1-G5` | `要件定義 / 設計 / ウォーターフォール / V字モデル / アジャイル / DevOps` の比較問題を追加する |
| 知識ノード プロジェクトマネジメント | `/docs/management-information-systems/knowledge-project-management` | 安定論点 | 公開済み | `G1-G5` | `WBS / PERT / EVM / 見積り / リスク管理` の比較問題を追加する |
| 知識ノード 運用管理・評価・監査 | `/docs/management-information-systems/knowledge-it-operations-and-audit` | 安定論点 | 公開済み | `G1-G5` | `ITIL / SLA / システム監査 / 内部統制 / MTBF / MTTR` の比較問題を追加する |
| 知識ノード 外部資源活用と意思決定支援 | `/docs/management-information-systems/knowledge-outsourcing-and-decision-support` | 安定論点 | 公開済み | `G1-G5` | `アウトソーシング / SaaS / PaaS / IaaS / BI / DWH / OLAP / IoT` の比較問題を追加する |
| 知識ノード 統計学の基礎 | `/docs/management-information-systems/knowledge-statistics-basics` | 安定論点 | 公開済み | `G1-G5` | `代表値 / ばらつき / 相関 / 回帰 / 検定` の比較問題を補強する |
| 更新ノード 情報セキュリティガイドラインと関連法規 | `/docs/management-information-systems/security-guidelines-and-related-laws` | 更新論点 | 公開済み | `G1-G6` | `法規 / ガイドライン / 脅威動向` の比較表を補強し、年次更新を続ける |

### 中小企業経営の知識ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 知識ノード 中小企業の定義と規模別分類 | `/docs/sme-management-and-policy/knowledge-sme-definition-and-size-criteria` | 安定論点 | 公開済み | `G1-G5` | `資本金 / 従業員数 / OR 条件 / 制度固有要件` の比較問題を追加する |
| 知識ノード 中小企業の経済的役割と主要統計 | `/docs/sme-management-and-policy/knowledge-sme-economic-role-and-statistics` | 安定論点 | 公開済み | `G1-G5` | `企業数 / 従業者数 / 付加価値 / 労働生産性` の読み替え問題を追加する |
| 知識ノード 中小企業の経営課題 | `/docs/sme-management-and-policy/knowledge-sme-management-issues` | 安定論点 | 公開済み | `G1-G5` | `人手不足 / 賃上げ / 価格転嫁 / DX / 事業承継` の因果比較を補強する |
| 知識ノード 業種別の中小企業動向 | `/docs/sme-management-and-policy/knowledge-sme-industry-trends` | 安定論点 | 公開済み | `G1-G5` | `製造 / 建設 / 卸売 / 小売 / サービス` の比較表と誤答例を追加する |
| 知識ノード 産業集積 | `/docs/sme-management-and-policy/knowledge-industrial-clusters` | 安定論点 | 公開済み | `G1-G5` | `産地型 / 企業城下町型 / 都市型 / 進出工場型` の比較問題を追加する |
| 知識ノード 開業率と廃業率 | `/docs/sme-management-and-policy/knowledge-startup-and-closure-rates` | 安定論点 | 公開済み | `G1-G5` | `開業 / 廃業 / 休廃業・解散 / 倒産` の比較問題を追加する |
| 知識ノード 白書の読み方と頻出テーマ | `/docs/sme-management-and-policy/knowledge-sme-white-paper-reading` | 安定論点 | 公開済み | `G1-G5` | 白書テーマ索引と `環境 / 課題 / 対応 / 政策` の誤答例を追加する |

### 中小企業政策の更新ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 更新ノード 政策体系と基本法 | `/docs/sme-management-and-policy/policy-framework-and-basic-laws` | 更新論点 | 公開済み | `G1-G6` | `中小企業基本法 / 小規模企業振興基本法 / 中小企業等経営強化法` の比較表を追加する |
| 更新ノード 経営支援施策 | `/docs/sme-management-and-policy/policy-management-support` | 更新論点 | 公開済み | `G1-G6` | `経営革新計画 / 経営力向上計画 / 認定支援機関 / 商工団体` の比較表を追加する |
| 更新ノード 金融支援施策 | `/docs/sme-management-and-policy/policy-financial-support` | 更新論点 | 公開済み | `G1-G6` | `信用保証 / 公庫 / マル経 / セーフティネット` の比較表を追加する |
| 更新ノード 主要補助金制度 | `/docs/sme-management-and-policy/policy-major-subsidies` | 更新論点 | 公開済み | `G1-G6` | `持続化 / IT導入 / ものづくり / 省力化` の比較表を追加する |
| 更新ノード 創業支援策 | `/docs/sme-management-and-policy/policy-startup-support` | 更新論点 | 公開済み | `G1-G6` | `創業支援等事業計画 / 特定創業支援等事業 / 新規開業資金` の比較表を追加する |
| 更新ノード 事業承継・M&A支援 | `/docs/sme-management-and-policy/policy-business-succession-and-ma-support` | 更新論点 | 公開済み | `G1-G6` | `支援センター / 承継補助金 / 円滑化法` の比較表を追加する |
| 更新ノード 海外展開支援 | `/docs/sme-management-and-policy/policy-overseas-expansion-support` | 更新論点 | 公開済み | `G1-G6` | `入口相談 / 伴走 / 金融・保険` の比較表と旧制度名の読み替え例を追加する |
| 更新ノード 取引適正化と小規模事業者向け施策 | `/docs/sme-management-and-policy/policy-fair-trade-and-small-business-support` | 更新論点 | 公開済み | `G1-G6` | `取適法 / パートナーシップ構築宣言 / 官公需` の比較表を追加する |
| 更新ノード 人材・雇用支援施策 | `/docs/sme-management-and-policy/policy-human-resources-and-employment-support` | 更新論点 | 公開済み | `G1-G6` | `助成 / 研修 / 伴走支援` の比較表と誤答パターンを追加する |
| 更新ノード BCPと災害復旧支援 | `/docs/sme-management-and-policy/policy-bcp-and-disaster-recovery-support` | 更新論点 | 公開済み | `G1-G6` | `BCP / 事業継続力強化計画 / 災害復旧支援` の比較表を追加する |

### 財務・会計の知識ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 知識ノード 5分類と仕訳 | `/docs/finance-and-accounting/bookkeeping-basics-account-categories-and-journal-entries` | 安定論点 | 公開済み | `G1-G5` | 商品売買と現金過不足の仕訳パターンを追加する |
| 知識ノード 決算整理仕訳 | `/docs/finance-and-accounting/bookkeeping-basics-adjusting-entries` | 安定論点 | 公開済み | `G1-G5` | 経過勘定と引当金の確認問題を追加する |
| 知識ノード 帳簿組織と伝票 | `/docs/finance-and-accounting/bookkeeping-basics-ledgers-and-vouchers` | 安定論点 | 公開済み | `G1-G5` | 銀行勘定調整表と伝票制度の比較問題を追加する |
| 知識ノード 財務諸表と5段階利益 | `/docs/finance-and-accounting/corporate-accounting-financial-statements-and-five-profits` | 安定論点 | 公開済み | `G1-G5` | CF と株主資本等変動計算書を含む横断比較を増やす |
| 知識ノード 資産会計 | `/docs/finance-and-accounting/corporate-accounting-assets-accounting` | 安定論点 | 公開済み | `G1-G5` | 棚卸資産評価法、減価償却、減損の比較問題を追加する |
| 知識ノード 負債・純資産会計と税効果会計 | `/docs/finance-and-accounting/corporate-accounting-liabilities-equity-and-tax-effect` | 安定論点 | 公開済み | `G1-G5` | 一時差異と繰延税金資産 / 負債の誤答例を追加する |
| 知識ノード 企業会計原則と連結会計 | `/docs/finance-and-accounting/corporate-accounting-principles-and-consolidation` | 安定論点 | 公開済み | `G1-G5` | 会計原則の比較表と内部取引消去の入口例を補強する |
| 知識ノード 収益性分析 | `/docs/finance-and-accounting/management-analysis-profitability` | 安定論点 | 公開済み | `G1-G5` | `ROA / ROE / デュポン分解` の誤答比較を追加する |
| 知識ノード 安全性分析 | `/docs/finance-and-accounting/management-analysis-safety` | 安定論点 | 公開済み | `G1-G5` | `流動比率 / 当座比率 / 固定長期適合率` の比較表を追加する |
| 知識ノード 効率性分析 | `/docs/finance-and-accounting/management-analysis-efficiency` | 安定論点 | 公開済み | `G1-G5` | 回転率と回転期間、運転資本の読み替え問題を追加する |
| 知識ノード 成長性分析と生産性分析 | `/docs/finance-and-accounting/management-analysis-growth-and-productivity` | 安定論点 | 公開済み | `G1-G5` | `売上成長 / 利益成長 / 付加価値 / 労働生産性` の比較表を追加する |
| 知識ノード 損益分岐点分析 | `/docs/finance-and-accounting/management-analysis-cvp-and-break-even` | 安定論点 | 公開済み | `G1-G5` | `目標利益` と `セールスミックス` の応用問題を追加する |
| 知識ノード 利益計画と予算管理 | `/docs/finance-and-accounting/profit-and-cash-management-profit-planning-and-budget-control` | 安定論点 | 公開済み | `G1-G5` | 予算実績差異と利益差異の例題を追加する |
| 知識ノード キャッシュ・フロー管理 | `/docs/finance-and-accounting/profit-and-cash-management-cash-flow-and-fcf` | 安定論点 | 公開済み | `G1-G5` | 月次資金繰り、`営業 CF`、`FCF` の読み替え例を追加する |
| 知識ノード 収益性指数法 | `/docs/finance-and-accounting/finance-profitability-index` | 安定論点 | 公開済み | `G1-G5` | `PI` と `NPV`、資本制約、相互排他的比較の演習を増やす |
| 知識ノード 効率的市場仮説 | `/docs/finance-and-accounting/finance-efficient-market-hypothesis` | 安定論点 | 公開済み | `G1-G5` | `弱度 / 準強度 / 強度` の比較問題と CAPM との関係を補強する |
| 知識ノード マルチプル法 | `/docs/finance-and-accounting/finance-multiples-valuation` | 安定論点 | 公開済み | `G1-G5` | `PER`、`PBR`、`EV/EBITDA` と `DCF法` の比較問題を補強する |
| 知識ノード MM理論と配当政策 | `/docs/finance-and-accounting/finance-mm-and-dividend-policy` | 安定論点 | 公開済み | `G1-G5` | `法人税なし / あり` と `配当無関連` の比較問題を補強する |
| 知識ノード デリバティブとリスク管理 | `/docs/finance-and-accounting/finance-derivatives-risk-management` | 安定論点 | 公開済み | `G1-G5` | `先物 / オプション / スワップ` の選択問題とヘッジ方向の誤答を補強する |

### 原価計算の知識ノードと出題ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 知識ノード 原価計算の目的と分類 | `/docs/finance-and-accounting/cost-accounting-purpose-and-classification` | 安定論点 | 公開済み | `G1-G5` | 製造原価と期間費用の誤答比較を追加する |
| 知識ノード 個別原価計算と総合原価計算 | `/docs/finance-and-accounting/cost-accounting-job-order-and-process-costing` | 安定論点 | 公開済み | `G1-G5` | 勘定連絡、完成品換算量、仕損・減損の応用を追加する |
| 知識ノード 標準原価計算と差異分析 | `/docs/finance-and-accounting/cost-accounting-standard-costing-and-variance-analysis` | 安定論点 | 公開済み | `G1-G5` | 製造間接費差異と配合差異の応用を追加する |
| 知識ノード 直接原価計算と全部原価計算 | `/docs/finance-and-accounting/cost-accounting-direct-and-absorption-costing` | 安定論点 | 公開済み | `G1-G5` | 在庫増減と特殊原価概念の応用問題を追加する |
| 出題ノード 原価計算の解き方 | `/docs/finance-and-accounting/cost-accounting-exam-patterns` | 安定論点 | 公開済み | `G1-G5` | 勘定連絡、差異分析、利益差の判断順を表で固定する |
| 要約 原価計算 要点整理 | `/docs/finance-and-accounting/cost-accounting-summary` | 安定論点 | 公開済み | `G1-G5` | 仕損・減損、配合差異、特殊原価概念まで直前確認欄を増やす |

### 財務・会計の演習ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 原価計算 演習ノード 基本確認問題 | `/docs/finance-and-accounting/cost-accounting-practice-basic-check` | 安定論点 | 公開済み | `G1-G5` | 総合原価計算の仕損・減損と配合差異の応用問題を追加する |
| 経営分析 演習ノード 基本確認問題 | `/docs/finance-and-accounting/management-analysis-practice-basic-check` | 安定論点 | 公開済み | `G1-G5` | セールスミックス、時系列比較、与件根拠つきの指標選定を追加する |
| 利益と資金の管理 演習ノード 基本確認問題 | `/docs/finance-and-accounting/profit-and-cash-management-practice-basic-check` | 安定論点 | 公開済み | `G1-G5` | 経常収支比率と短期借入依存度を含む月次資金繰り問題を追加する |
| ファイナンス 演習ノード 基本確認問題 | `/docs/finance-and-accounting/finance-practice-basic-check` | 安定論点 | 公開済み | `G1-G5` | 調査費と撤退価値を含む多段デシジョンツリー問題を追加する |

## 第2次試験

| 章 | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 第22章 2次試験の概要と解答プロセス | `/docs/second-stage/overview` | 更新論点 | 公開済み | `G1-G6` | 令和8年度の正式案内公開時の更新に加え、設問索引と年度別小問例への橋渡しを広げる |
| 第23章 事例Ⅰ 組織・人事 | `/docs/second-stage/case-1-organization-and-hr` | 安定論点 | 公開済み | `G1-G5` | 設問型ページと答案骨子ページを起点に、年度差と例文を厚くする |
| 第24章 事例Ⅱ マーケティング・流通 | `/docs/second-stage/case-2-marketing-and-distribution` | 安定論点 | 公開済み | `G1-G5` | 顧客別の施策例文とデータ読解パターンを厚くする |
| 第25章 事例Ⅲ 生産・技術 | `/docs/second-stage/case-3-production-and-technology` | 安定論点 | 公開済み | `G1-G5` | 工程別テンプレートと QCD 別の例文を厚くする |
| 第26章 事例Ⅳ 財務・会計 | `/docs/second-stage/case-4-finance-and-accounting` | 安定論点 | 公開済み | `G1-G5` | 個別ページと設問型 / 答案骨子の往復で例題と誤答例を厚くする |

### 第22章 2次試験共通プロセスの論点ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 章ハブ 2次試験の概要と解答プロセス | `/docs/second-stage/overview` | 更新論点 | 公開済み | `G1-G6` | 令和8年度の正式案内公開時の更新と、設問文の言葉から事例別ページへ飛ぶ導線を広げる |
| 知識ノード 与件文の読み方 | `/docs/second-stage/reading-case-materials` | 安定論点 | 公開済み | `G1-G5` | 根拠の振り分けと制約条件の使い分けを事例別に補強する |
| 知識ノード 設問解釈と答案構成 | `/docs/second-stage/interpreting-questions-and-structuring-answers` | 安定論点 | 公開済み | `G1-G5` | 設問動詞別の答案骨子テンプレートを増やす |
| 知識ノード 論理的記述の技術 | `/docs/second-stage/logical-writing-techniques` | 安定論点 | 公開済み | `G1-G5` | 制約条件の言い換え、80字と100字の削り方、重複防止の型を増やす |

### 第23章から第26章の事例別ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 事例Ⅰの設問型 | `/docs/second-stage/case-1-question-patterns` | 安定論点 | 公開済み | `G1-G5` | 組織統合、外部連携、第二創業の悪文例と答案骨子への往復を増やす |
| 事例Ⅰの答案骨子 | `/docs/second-stage/case-1-answer-frameworks` | 安定論点 | 公開済み | `G1-G5` | 第二創業と組織活性化の短文例を増やす |
| 事例Ⅱの設問型 | `/docs/second-stage/case-2-question-patterns` | 安定論点 | 公開済み | `G1-G5` | 価格戦略、動画活用、BtoB 提案の悪文例と答案骨子への往復を増やす |
| 事例Ⅱの答案骨子 | `/docs/second-stage/case-2-answer-frameworks` | 安定論点 | 公開済み | `G1-G5` | 価格戦略、LTV、顧客管理の短文例を増やす |
| 事例Ⅲの設問型 | `/docs/second-stage/case-3-question-patterns` | 安定論点 | 公開済み | `G1-G5` | 原価資料、納期対応、新市場対応の悪文例と工程別比較を増やす |
| 事例Ⅲの答案骨子 | `/docs/second-stage/case-3-answer-frameworks` | 安定論点 | 公開済み | `G1-G5` | 原価低減、在庫レス納期対応、営業連携の短文例を増やす |
| 事例Ⅳの設問型 | `/docs/second-stage/case-4-question-patterns` | 安定論点 | 公開済み | `G1-G5` | 難易度差と捨て問判断の例を増やす |
| 事例Ⅳの答案骨子 | `/docs/second-stage/case-4-answer-frameworks` | 安定論点 | 公開済み | `G1-G5` | 個別ページとの往復で例文と悪文例を厚くする |

### 事例Ⅳの個別ノード

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 事例Ⅳ 経営分析 | `/docs/second-stage/case-4-management-analysis` | 安定論点 | 公開済み | `G1-G5` | 指標選定の年度差と悪い答案例を増やす |
| 事例Ⅳ CVP と利益計画 | `/docs/second-stage/case-4-cvp-and-profit-planning` | 安定論点 | 公開済み | `G1-G5` | 応用セールスミックスと時間配分例を増やす |
| 事例Ⅳ CF と運転資本 | `/docs/second-stage/case-4-cash-flow-and-working-capital` | 安定論点 | 公開済み | `G1-G5` | 月次資金繰りと最終年度回収の例題を増やす |
| 事例Ⅳ NPV と投資意思決定 | `/docs/second-stage/case-4-npv-and-investment-decision` | 安定論点 | 公開済み | `G1-G5` | 企業価値評価と複数判断点の例題を増やす |

## 参照資料

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 受験ガイド | `/docs/reference/exam-guide` | 更新論点 | 公開済み | `G1-G6` | 官報公告後の詳細案内公開時に、予定日程と正式条件を照合して更新する |
| 第2次試験 設問索引 | `/docs/reference/second-stage-question-index` | 安定論点 | 公開済み | `G1-G5` | 事例Ⅳと次年度の行を増やし、用語集、公式集、過去問テーマ索引との往復を強める |
| 過去問テーマ索引 | `/docs/reference/past-question-theme-index` | 安定論点 | 公開済み | `G1-G5` | 誤答パターンと年度差の入口を各章ハブへ戻す |
| 年度別出題傾向 | `/docs/reference/yearly-question-trends` | 安定論点 | 公開済み | `G1-G5` | 事例別ページと章ページへ比較表の逆流を広げる |
| 重要用語集 | `/docs/reference/important-terms-glossary` | 安定論点 | 公開済み | `G1-G5` | 事例Ⅳと 1次知識ノードから、略語、言い換え、事例別逆引きへの戻り先を増やす |
| 重要公式・計算式一覧 | `/docs/reference/important-formulas` | 安定論点 | 公開済み | `G1-G5` | 事例Ⅳ例題と 1次計算ノードから、求めたい量別逆引きと確認欄への往復を増やす |
| 学習時間モデル | `/docs/reference/study-time-model` | 安定論点 | 公開済み | `G1-G5` | 通学、独学、再受験の配分差と週次モデルの例を増やす |
