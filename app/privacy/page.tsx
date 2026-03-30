import type { Metadata } from "next";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "shindanshi の AI機能、アクセス解析、フィードバック送信を含む個人情報等の取扱い方針です。",
};

export default function PrivacyPage() {
  return (
    <DocsPage
      full
      className="wiki-docs-page"
      breadcrumb={{ enabled: false }}
      footer={{ enabled: false }}
      tableOfContent={{ enabled: false }}
      tableOfContentPopover={{ enabled: false }}
    >
      <DocsTitle className="wiki-page-title">プライバシーポリシー</DocsTitle>
      <DocsDescription className="wiki-page-description">
        shindanshi における利用者に関する情報の取扱い方針を記載しています。
      </DocsDescription>

      <DocsBody className="wiki-docs-body">
        <p>
          haya株式会社（以下「当社」といいます。）は、中小企業診断士試験の学習用
          wiki「shindanshi」（以下「本サイト」といいます。）において、利用者に関する情報を、
          以下のとおり取り扱います。
        </p>

        <section>
          <h2>1. 取得する情報</h2>
          <ul>
            <li>
              本サイトの閲覧時に取得されるアクセス情報、利用端末、ブラウザ、参照元、利用状況に関する情報
            </li>
            <li>
              AI質問機能に入力された質問文、会話履歴その他回答生成に必要な情報
            </li>
            <li>
              フィードバック機能に入力された評価、ページURL、ページ名、ページパス、自由記述その他改善受付に必要な情報
            </li>
            <li>利用者が任意に入力したその他の情報</li>
          </ul>
        </section>

        <section>
          <h2>2. 利用目的</h2>
          <ul>
            <li>本サイトの提供、運営、保守および改善のため</li>
            <li>AI質問機能に対する回答生成のため</li>
            <li>利用状況の把握、表示品質の改善、不具合調査のため</li>
            <li>フィードバック内容の確認およびコンテンツ改善のため</li>
            <li>不正利用、障害、セキュリティ上の問題への対応のため</li>
          </ul>
        </section>

        <section>
          <h2>3. 外部サービスの利用</h2>
          <p>本サイトでは、次の外部サービスを利用する場合があります。</p>
          <ul>
            <li>
              Vercel Analytics / Speed Insights
              によるアクセス状況の把握および表示品質の改善
            </li>
            <li>
              OpenRouter および生成AI提供事業者による AI質問機能の回答生成
            </li>
            <li>
              運営設定に応じたフィードバック内容の保存先または外部Webhookへの送信
            </li>
          </ul>
        </section>

        <section>
          <h2>4. 外部送信</h2>
          <p>
            本サイトでは、機能提供および品質改善のため、利用者に関する情報が外部サービスへ送信される場合があります。
            送信される情報には、アクセス情報、AI質問機能への入力内容、フィードバック機能への入力内容その他各機能の提供に必要な情報が含まれます。
          </p>
        </section>

        <section>
          <h2>5. 第三者提供および委託</h2>
          <p>
            当社は、法令に基づく場合を除き、取得した個人情報を第三者に提供しません。
            ただし、本サイトの運営、保守、機能提供のために必要な範囲で、外部事業者に取扱いを委託することがあります。
          </p>
        </section>

        <section>
          <h2>6. 安全管理</h2>
          <p>
            当社は、取得した情報について、不正アクセス、漏えい、改ざん、滅失またはき損の防止その他の安全管理のために、
            合理的な範囲で必要かつ適切な措置を講じます。
          </p>
        </section>

        <section>
          <h2>7. 入力に関するお願い</h2>
          <p>
            AI質問機能またはフィードバック機能には、氏名、住所、電話番号、メールアドレス、
            受験番号、勤務先の秘密情報、要配慮個人情報その他第三者に共有すべきでない情報を入力しないでください。
          </p>
        </section>

        <section>
          <h2>8. 開示、訂正等の請求</h2>
          <p>
            当社は、法令に基づき、ご本人から保有個人データに関する開示、訂正、利用停止等の請求があった場合、
            適切な方法で本人確認を行ったうえで対応します。
          </p>
        </section>

        <section>
          <h2>9. お問い合わせ窓口</h2>
          <p>
            本ポリシーまたは個人情報の取扱いに関するお問い合わせは、
            <a href="mailto:info@haya.company">info@haya.company</a>
            までご連絡ください。
          </p>
        </section>

        <section>
          <h2>10. 改定</h2>
          <p>
            当社は、必要に応じて本ポリシーを改定することがあります。改定後の内容は、本ページに掲載した時点から適用されます。
          </p>
        </section>

        <section>
          <h2>制定日・最終更新日</h2>
          <p>2026年3月29日</p>
        </section>
      </DocsBody>
    </DocsPage>
  );
}
