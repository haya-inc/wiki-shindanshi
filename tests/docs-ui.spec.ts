import { expect, test, type Page } from "@playwright/test";

type DesktopRoute = {
  route: string;
  markerText: string;
  selector: string;
  headingLevel?: number;
};

const desktopRouteGroups = {
  hubs: [
    {
      route: "/docs",
      headingLevel: 2,
      markerText: "まず選ぶ導線",
      selector: "h2",
    },
    {
      route: "/docs/second-stage",
      markerText: "共通プロセスから入る",
      selector: "h2",
    },
    {
      route: "/docs/reference",
      markerText: "参照資料の使い分け",
      selector: "h2",
    },
  ],
  reference: [
    {
      route: "/docs/reference/exam-guide",
      markerText: "令和8年度の大きな変更",
      selector: "article",
    },
    {
      route: "/docs/reference/second-stage-question-index",
      markerText: "事例Ⅰ 設問索引",
      selector: "article",
    },
    {
      route: "/docs/reference/past-question-theme-index",
      markerText: "問題文のテーマに近い科目",
      selector: "article",
    },
    {
      route: "/docs/reference/important-terms-glossary",
      markerText: "重要用語集",
      selector: "article",
    },
    {
      route: "/docs/reference/important-formulas",
      markerText: "重要公式・計算式一覧",
      selector: "table",
    },
    {
      route: "/docs/reference/yearly-question-trends",
      markerText: "年度差",
      selector: "article",
    },
    {
      route: "/docs/reference/study-time-model",
      markerText: "学習時間モデル",
      selector: "table",
    },
  ],
  financeAndAccounting: [
    {
      route: "/docs/finance-and-accounting",
      markerText: "学習のポイント",
      selector: "h2",
    },
    {
      route: "/docs/finance-and-accounting/bookkeeping-basics-account-categories-and-journal-entries",
      markerText: "5分類と仕訳",
      selector: "article",
    },
    {
      route: "/docs/finance-and-accounting/bookkeeping-basics-adjusting-entries",
      markerText: "決算整理仕訳",
      selector: "article",
    },
    {
      route: "/docs/finance-and-accounting/bookkeeping-basics-ledgers-and-vouchers",
      markerText: "帳簿組織と伝票",
      selector: "article",
    },
    {
      route: "/docs/finance-and-accounting/corporate-accounting-financial-statements-and-five-profits",
      markerText: "財務諸表と5段階利益",
      selector: "article",
    },
    {
      route: "/docs/finance-and-accounting/corporate-accounting-assets-accounting",
      markerText: "資産会計",
      selector: "article",
    },
    {
      route: "/docs/finance-and-accounting/corporate-accounting-liabilities-equity-and-tax-effect",
      markerText: "負債・純資産会計と税効果会計",
      selector: "article",
    },
    {
      route: "/docs/finance-and-accounting/corporate-accounting-principles-and-consolidation",
      markerText: "企業会計原則と連結会計",
      selector: "article",
    },
  ],
  economicsAndEconomicPolicy: [
    {
      route: "/docs/economics-and-economic-policy",
      markerText: "章マップ",
      selector: "h2",
    },
    {
      route: "/docs/economics-and-economic-policy/microeconomics/practice-basic-check",
      markerText: "基本確認問題",
      selector: "h2",
    },
    {
      route: "/docs/economics-and-economic-policy/microeconomics/knowledge-market-mechanism",
      markerText: "市場メカニズムの基礎",
      selector: "article",
    },
  ],
  businessManagementTheory: [
    {
      route: "/docs/business-management-theory",
      markerText: "この科目で問われること",
      selector: "h2",
    },
    {
      route: "/docs/business-management-theory/knowledge-strategic-planning-and-swot",
      markerText: "経営計画とSWOT",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-corporate-and-growth-strategy",
      markerText: "全社戦略と成長戦略",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-competitive-and-resource-strategy",
      markerText: "競争戦略と経営資源戦略",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-innovation-international-and-digital-strategy",
      markerText: "イノベーション・国際経営・デジタル戦略",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-organizational-structure-and-design",
      markerText: "組織構造と組織設計",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-motivation-theories",
      markerText: "モチベーション理論",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-leadership-theories",
      markerText: "リーダーシップ論",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-human-resource-management",
      markerText: "人的資源管理",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-organizational-culture-and-change",
      markerText: "組織文化と組織変革",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-stp-and-4p",
      markerText: "STPと4P",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-marketing-research-and-consumer-behavior",
      markerText: "マーケティングリサーチと消費者行動",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-product-and-price-strategy",
      markerText: "製品戦略と価格戦略",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-channel-and-promotion-strategy",
      markerText: "チャネル戦略とプロモーション戦略",
      selector: "article",
    },
    {
      route: "/docs/business-management-theory/knowledge-service-marketing-and-crm",
      markerText: "サービスマーケティングとCRM",
      selector: "article",
    },
  ],
  businessLaw: [
    {
      route: "/docs/business-law",
      markerText: "更新確認メモ",
      selector: "h2",
    },
    {
      route: "/docs/business-law/knowledge-company-types-and-incorporation",
      markerText: "会社類型と設立手続",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-shares-and-shareholders",
      markerText: "株式と株主",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-corporate-organs-and-shareholder-meetings",
      markerText: "機関設計と株主総会決議",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-fundraising-dividends-and-financial-statements",
      markerText: "資金調達・配当・計算書類",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-corporate-reorganization-and-business-transfer",
      markerText: "組織再編と事業譲渡",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-insolvency-and-corporate-rehabilitation",
      markerText: "倒産法制",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-ip-framework-and-terms",
      markerText: "知的財産権の体系と存続期間",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-patent-law",
      markerText: "特許法",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-utility-model-law",
      markerText: "実用新案法",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-design-law",
      markerText: "意匠法",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-trademark-law",
      markerText: "商標法",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-copyright-law",
      markerText: "著作権法",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-unfair-competition-prevention-law",
      markerText: "不正競争防止法",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-ip-strategy-and-international-protection",
      markerText: "知的財産権の活用と国際的保護",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-contracts-obligations-and-security",
      markerText: "契約・債権・物権・担保",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-prescription-and-guarantee",
      markerText: "時効と保証",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-inheritance",
      markerText: "相続",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-antimonopoly-and-trade-regulation",
      markerText: "独占禁止法と取引適正化",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-consumer-protection-laws",
      markerText: "消費者保護関連法",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-personal-information-protection",
      markerText: "個人情報保護法",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-labor-laws-overview",
      markerText: "労働関連法規の概要",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-capital-market-laws",
      markerText: "資本市場関連法規",
      selector: "article",
    },
    {
      route: "/docs/business-law/knowledge-english-contract-terms",
      markerText: "英文契約書の基本用語",
      selector: "article",
    },
  ],
  managementInformationSystems: [
    {
      route: "/docs/management-information-systems",
      markerText: "更新確認メモ",
      selector: "h2",
    },
    {
      route: "/docs/management-information-systems/knowledge-computer-basics",
      markerText: "コンピュータの基礎",
      selector: "article",
    },
    {
      route: "/docs/management-information-systems/knowledge-database-and-sql",
      markerText: "データベースとSQL",
      selector: "article",
    },
    {
      route: "/docs/management-information-systems/knowledge-network-basics",
      markerText: "通信ネットワーク",
      selector: "article",
    },
    {
      route: "/docs/management-information-systems/knowledge-web-and-cloud",
      markerText: "Webテクノロジーとクラウド",
      selector: "article",
    },
    {
      route: "/docs/management-information-systems/knowledge-information-security-basics",
      markerText: "情報セキュリティの基礎",
      selector: "article",
    },
    {
      route: "/docs/management-information-systems/knowledge-ai-and-machine-learning-basics",
      markerText: "AI・機械学習の基礎",
      selector: "article",
    },
  ],
  operationsManagement: [
    {
      route: "/docs/operations-management",
      markerText: "年度別に見るときの軸",
      selector: "h2",
    },
    {
      route: "/docs/operations-management/knowledge-production-systems-and-planning-control",
      markerText: "生産方式と計画統制",
      selector: "article",
    },
    {
      route: "/docs/operations-management/knowledge-factory-layout-and-flow-design",
      markerText: "工場レイアウトと流れ設計",
      selector: "article",
    },
    {
      route: "/docs/operations-management/knowledge-materials-and-inventory-management",
      markerText: "資材・在庫管理",
      selector: "article",
    },
    {
      route: "/docs/operations-management/knowledge-quality-management",
      markerText: "品質管理",
      selector: "article",
    },
    {
      route: "/docs/operations-management/knowledge-ie-and-ve",
      markerText: "IEとVE",
      selector: "article",
    },
    {
      route: "/docs/operations-management/knowledge-jit-and-kanban",
      markerText: "JITとかんばん方式",
      selector: "article",
    },
    {
      route: "/docs/operations-management/knowledge-scheduling-and-line-balancing",
      markerText: "スケジューリングとラインバランシング",
      selector: "article",
    },
    {
      route: "/docs/operations-management/knowledge-equipment-management-and-productivity",
      markerText: "設備管理と生産性向上",
      selector: "article",
    },
    {
      route: "/docs/operations-management/knowledge-purchasing-and-outsourcing-management",
      markerText: "購買・外注管理",
      selector: "article",
    },
    {
      route: "/docs/operations-management/knowledge-store-location-and-trading-area",
      markerText: "店舗立地と商圏分析",
      selector: "article",
    },
    {
      route: "/docs/operations-management/knowledge-store-layout-and-merchandising",
      markerText: "店舗レイアウトとマーチャンダイジング",
      selector: "article",
    },
    {
      route: "/docs/operations-management/knowledge-sales-indicators-logistics-and-retail-information-systems",
      markerText: "販売管理指標・物流・流通情報システム",
      selector: "article",
    },
  ],
  smeManagementAndPolicy: [
    {
      route: "/docs/sme-management-and-policy",
      markerText: "重点更新ページ",
      selector: "h2",
    },
    {
      route: "/docs/sme-management-and-policy/policy-human-resources-and-employment-support",
      markerText: "採用・定着を支える助成",
      selector: "article",
    },
    {
      route: "/docs/sme-management-and-policy/policy-overseas-expansion-support",
      markerText: "入口相談と初回支援",
      selector: "article",
    },
  ],
  secondStage: [
    {
      route: "/docs/second-stage/reading-case-materials",
      markerText: "読み方の型",
      selector: "h2",
    },
    {
      route: "/docs/second-stage/interpreting-questions-and-structuring-answers",
      markerText: "設問解釈の型",
      selector: "h2",
    },
    {
      route: "/docs/second-stage/logical-writing-techniques",
      markerText: "書き方の型",
      selector: "h2",
    },
    {
      route: "/docs/second-stage/case-1-question-patterns",
      markerText: "設問型の全体像",
      selector: "table",
    },
    {
      route: "/docs/second-stage/case-1-answer-frameworks",
      markerText: "レイヤー別の答案骨子",
      selector: "table",
    },
    {
      route: "/docs/second-stage/case-2-question-patterns",
      markerText: "設問型の全体像",
      selector: "table",
    },
    {
      route: "/docs/second-stage/case-2-answer-frameworks",
      markerText: "設問型別の答案骨子",
      selector: "table",
    },
    {
      route: "/docs/second-stage/case-3-question-patterns",
      markerText: "設問型の全体像",
      selector: "table",
    },
    {
      route: "/docs/second-stage/case-3-answer-frameworks",
      markerText: "設問型別の答案骨子",
      selector: "table",
    },
    {
      route: "/docs/second-stage/case-4-question-patterns",
      markerText: "設問型の全体像",
      selector: "table",
    },
    {
      route: "/docs/second-stage/case-4-answer-frameworks",
      markerText: "設問型別の答案骨子",
      selector: "table",
    },
    {
      route: "/docs/second-stage/case-4-management-analysis",
      markerText: "指標選定の型",
      selector: "table",
    },
    {
      route: "/docs/second-stage/case-4-cvp-and-profit-planning",
      markerText: "CVP 型の処理順",
      selector: "table",
    },
    {
      route: "/docs/second-stage/case-4-cash-flow-and-working-capital",
      markerText: "CF 型の処理順",
      selector: "table",
    },
    {
      route: "/docs/second-stage/case-4-npv-and-investment-decision",
      markerText: "NPV 型の処理順",
      selector: "table",
    },
  ],
} satisfies Record<string, readonly DesktopRoute[]>;

const desktopRoutes = Object.values(desktopRouteGroups).flat();

const uiScenarioRoutes = {
  mobileHubs: ["/docs/finance-and-accounting", "/docs/second-stage", "/docs/reference"],
  darkModeReadingNode: "/docs/second-stage/reading-case-materials",
  focusVisible: "/docs",
  aiQuestionPanel: "/docs/reference/important-terms-glossary",
  feedbackPage: "/docs/finance-and-accounting",
  bannerAndMath: {
    bannerPages: ["/docs/reference/exam-guide", "/docs/reference/yearly-question-trends"],
    mathPages: [
      "/docs/reference/important-formulas",
      "/docs/economics-and-economic-policy/microeconomics/knowledge-market-mechanism",
    ],
  },
  referenceSurface: "/docs/reference",
} as const;

const renderTimeout = 15_000;

const ignoredBrowserErrorPatterns = [
  /WebSocket connection to 'ws:\/\/127\.0\.0\.1:3000\/_next\/webpack-hmr/i,
  /ERR_INVALID_HTTP_RESPONSE/i,
] as const;

function isIgnorableBrowserError(message: string) {
  return ignoredBrowserErrorPatterns.some((pattern) => pattern.test(message));
}

function attachBrowserErrorCollectors(page: Page) {
  const errors: string[] = [];

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      const text = message.text();

      if (!isIgnorableBrowserError(text)) {
        errors.push(text);
      }
    }
  });

  return errors;
}

async function assertStablePage(page: Page, errors: string[]) {
  expect(errors).toEqual([]);
  await expect(page.locator("body")).not.toContainText("Hydration failed");
  await expect(page.locator("body")).not.toContainText("Application error");
}

async function openStablePage(page: Page, route: string, errors: string[]) {
  await page.goto(route, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(200);
  await assertStablePage(page, errors);
}

async function measureContrast(page: Page, textSelector: string, surfaceSelector: string) {
  return page.evaluate(
    ({ textSelector: currentTextSelector, surfaceSelector: currentSurfaceSelector }) => {
      type Color = {
        r: number;
        g: number;
        b: number;
        a: number;
      };

      function parseColor(value: string): Color {
        const srgbMatch = value.match(/color\(srgb\s+([^\s/]+)\s+([^\s/]+)\s+([^\s/)]+)(?:\s*\/\s*([^\s)]+))?\)/u);

        if (srgbMatch) {
          const [, red, green, blue, alpha] = srgbMatch;

          return {
            r: Math.round(Number(red) * 255),
            g: Math.round(Number(green) * 255),
            b: Math.round(Number(blue) * 255),
            a: alpha ? Number(alpha) : 1,
          };
        }

        const match = value.match(/rgba?\(([^)]+)\)/u);

        if (!match) {
          throw new Error(`色を解析できません: ${value}`);
        }

        const parts = match[1].split(",").map((part) => Number(part.trim()));
        return {
          r: parts[0] ?? 0,
          g: parts[1] ?? 0,
          b: parts[2] ?? 0,
          a: parts[3] ?? 1,
        };
      }

      function compositeColor(foreground: Color, background: Color): Color {
        return {
          r: foreground.r * foreground.a + background.r * (1 - foreground.a),
          g: foreground.g * foreground.a + background.g * (1 - foreground.a),
          b: foreground.b * foreground.a + background.b * (1 - foreground.a),
          a: 1,
        };
      }

      function toLinear(channel: number) {
        const normalized = channel / 255;
        return normalized <= 0.03928
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      }

      function luminance(color: Color) {
        return (
          0.2126 * toLinear(color.r) +
          0.7152 * toLinear(color.g) +
          0.0722 * toLinear(color.b)
        );
      }

      function contrastRatio(first: Color, second: Color) {
        const firstLuminance = luminance(first);
        const secondLuminance = luminance(second);
        const lighter = Math.max(firstLuminance, secondLuminance);
        const darker = Math.min(firstLuminance, secondLuminance);
        return (lighter + 0.05) / (darker + 0.05);
      }

      const textElement = document.querySelector<HTMLElement>(currentTextSelector);
      const surfaceElement = document.querySelector<HTMLElement>(currentSurfaceSelector);

      if (!textElement || !surfaceElement) {
        throw new Error("コントラスト測定対象が見つかりません");
      }

      const textColor = parseColor(window.getComputedStyle(textElement).color);
      const surfaceColor = parseColor(window.getComputedStyle(surfaceElement).backgroundColor);
      const bodyColor = parseColor(window.getComputedStyle(document.body).backgroundColor);
      const effectiveSurface =
        surfaceColor.a < 1 ? compositeColor(surfaceColor, bodyColor) : surfaceColor;
      const effectiveText = textColor.a < 1 ? compositeColor(textColor, effectiveSurface) : textColor;

      return contrastRatio(effectiveText, effectiveSurface);
    },
    { textSelector, surfaceSelector }
  );
}

test.describe("docs ui smoke", () => {
  for (const { route, markerText, selector, headingLevel = 1 } of desktopRoutes) {
    test(`desktop ${route}`, async ({ page }) => {
      const errors = attachBrowserErrorCollectors(page);

      await page.setViewportSize({ width: 1440, height: 1100 });
      await openStablePage(page, route, errors);
      await expect(
        page.locator("article").getByRole("heading", { level: headingLevel }).first()
      ).toBeVisible({ timeout: renderTimeout });
      await expect(page.locator(selector).first()).toBeVisible({ timeout: renderTimeout });
      await expect(
        page.locator("article").getByText(markerText, { exact: false }).first()
      ).toBeVisible({ timeout: renderTimeout });
    });
  }

  test("mobile hubs avoid horizontal overflow", async ({ page }) => {
    const errors = attachBrowserErrorCollectors(page);

    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of uiScenarioRoutes.mobileHubs) {
      await openStablePage(page, route, errors);
      await expect(page.locator("article")).toBeVisible();

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth - window.innerWidth;
      });

      expect(overflow).toBeLessThanOrEqual(1);
    }
  });

  test("dark mode reading node renders", async ({ page }) => {
    const errors = attachBrowserErrorCollectors(page);

    await page.setViewportSize({ width: 1280, height: 960 });
    await page.emulateMedia({ colorScheme: "dark" });
    await openStablePage(page, uiScenarioRoutes.darkModeReadingNode, errors);
    await expect(page.locator("article").getByRole("heading", { level: 1, name: "与件文の読み方" })).toBeVisible();
    await expect(page.locator("article").getByRole("heading", { level: 2, name: "学習のポイント" })).toBeVisible();
  });

  test("keyboard focus stays visible on docs home", async ({ page }) => {
    const errors = attachBrowserErrorCollectors(page);

    await page.setViewportSize({ width: 1280, height: 960 });
    await openStablePage(page, uiScenarioRoutes.focusVisible, errors);

    await page.keyboard.press("Tab");

    const focusState = await page.evaluate(() => {
      const activeElement = document.activeElement as HTMLElement | null;

      if (!activeElement) {
        return null;
      }

      const styles = window.getComputedStyle(activeElement);

      return {
        tagName: activeElement.tagName.toLowerCase(),
        outlineStyle: styles.outlineStyle,
        outlineWidth: styles.outlineWidth,
        boxShadow: styles.boxShadow,
      };
    });

    expect(focusState).not.toBeNull();
    expect(["a", "button"]).toContain(focusState?.tagName ?? "");
    expect(
      focusState?.outlineStyle !== "none" ||
        focusState?.outlineWidth !== "0px" ||
        focusState?.boxShadow !== "none"
    ).toBeTruthy();
  });

  test("AI に質問パネルを開ける", async ({ page }) => {
    const errors = attachBrowserErrorCollectors(page);

    await page.setViewportSize({ width: 1440, height: 1100 });
    await openStablePage(page, uiScenarioRoutes.aiQuestionPanel, errors);
    await page.getByRole("button", { name: "AIに質問" }).click();
    await page.waitForTimeout(200);
    await expect(page.getByPlaceholder("質問を書く")).toBeVisible();
    await expect(page.getByRole("button", { name: "閉じる" })).toBeVisible();
  });

  test("通常の docs ページで Feedback を操作できる", async ({ page }) => {
    const errors = attachBrowserErrorCollectors(page);

    await page.setViewportSize({ width: 1440, height: 1100 });
    await openStablePage(page, uiScenarioRoutes.feedbackPage, errors);

    const submitButton = page.getByRole("button", { name: "Feedback を送る" });

    await expect(page.getByRole("button", { name: "役に立った" })).toBeVisible();
    await expect(page.getByRole("button", { name: "改善が必要" })).toBeVisible();
    await expect(submitButton).toBeDisabled();

    await page.getByRole("button", { name: "役に立った" }).click();
    await expect(submitButton).toBeEnabled();
  });

  test("Fumadocs の Banner と include と数式が描画される", async ({ page }) => {
    const errors = attachBrowserErrorCollectors(page);

    await page.setViewportSize({ width: 1440, height: 1100 });

    await openStablePage(page, uiScenarioRoutes.bannerAndMath.bannerPages[0], errors);
    await expect(
      page.getByText("制度情報と日程は毎年更新されます。", { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText("制度情報は一次情報で最終確認する", { exact: false })
    ).toBeVisible();

    await openStablePage(page, uiScenarioRoutes.bannerAndMath.bannerPages[1], errors);
    await expect(
      page.getByText("制度情報は一次情報で最終確認する", { exact: false })
    ).toBeVisible();

    for (const route of uiScenarioRoutes.bannerAndMath.mathPages) {
      await openStablePage(page, route, errors);
      await expect(page.locator(".katex, .katex-display").first()).toBeVisible();
    }
  });

  test("reference page exposes complementary and article landmarks", async ({ page }) => {
    const errors = attachBrowserErrorCollectors(page);

    await page.setViewportSize({ width: 1280, height: 960 });
    await openStablePage(page, uiScenarioRoutes.referenceSurface, errors);

    const landmarks = await page.evaluate(() => {
      return {
        complementary: document.querySelectorAll("aside, [role='complementary']").length,
        article: document.querySelectorAll("article").length,
      };
    });

    expect(landmarks.complementary).toBeGreaterThan(0);
    expect(landmarks.article).toBeGreaterThan(0);
  });

  test("reference copy keeps readable contrast in light and dark", async ({ page }) => {
    const errors = attachBrowserErrorCollectors(page);

    await page.setViewportSize({ width: 1280, height: 960 });

    for (const colorScheme of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme });
      await openStablePage(page, uiScenarioRoutes.referenceSurface, errors);

      const bodyContrast = await measureContrast(page, ".prose p", "article");
      const headingContrast = await measureContrast(page, "h1", "article");

      expect(bodyContrast).toBeGreaterThanOrEqual(4.5);
      expect(headingContrast).toBeGreaterThanOrEqual(4.5);
    }
  });
});
