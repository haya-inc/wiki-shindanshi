"use client";

import { useState } from "react";
import type { ActionResponse, PageFeedback, PageFeedbackRequest } from "@/components/feedback/schema";
import {
  FeedbackSubmittedActions,
  useFeedbackSubmission,
  useStoredFeedback,
} from "@/components/feedback/shared";
import { buttonVariants } from "@/components/ui/button";

type FeedbackProps = {
  pageUrl: string;
  pageTitle: string;
  pagePath: string;
};

type StoredPageFeedback = PageFeedback & {
  path: string;
  response?: ActionResponse;
  title: string;
};

const opinions: { label: string; value: PageFeedback["opinion"] }[] = [
  { value: "good", label: "役に立った" },
  { value: "bad", label: "改善が必要" },
];

function feedbackOpinionButtonClass(active: boolean) {
  return buttonVariants({
    color: active ? "primary" : "outline",
    size: "sm",
  });
}

export function Feedback({ pageUrl, pageTitle, pagePath }: FeedbackProps) {
  const storage = useStoredFeedback<StoredPageFeedback>(`docs-feedback-page-${pageUrl}`);
  const [opinion, setOpinion] = useState<PageFeedback["opinion"] | null>(null);
  const [message, setMessage] = useState("");
  const { errorMessage, isPending, submit } = useFeedbackSubmission();

  function handleSubmit() {
    submit<PageFeedbackRequest>({
      buildRequest: () => {
        if (!opinion) {
          return null;
        }

        return {
          kind: "page",
          url: pageUrl,
          title: pageTitle,
          path: pagePath,
          opinion,
          message: message.trim(),
        };
      },
      onSuccess: (request, response) => {
        storage.setPrevious({
          url: request.url,
          title: request.title,
          path: request.path,
          opinion: request.opinion,
          message: request.message,
          response,
        });
        setOpinion(null);
        setMessage("");
      },
    });
  }

  const activeOpinion = storage.previous?.opinion ?? opinion;

  return (
    <section className="not-prose mt-10 rounded-2xl border border-fd-border bg-fd-card p-5">
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-fd-foreground">このページは役に立ちましたか？</h2>
          <p className="text-sm text-fd-muted-foreground">
            評価とひとことを残してもらえると、内容と導線の改善に使えます。
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {opinions.map((item) => {
            const active = activeOpinion === item.value;

            return (
              <button
                key={item.value}
                type="button"
                disabled={Boolean(storage.previous)}
                onClick={() => setOpinion(item.value)}
                className={feedbackOpinionButtonClass(active)}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {storage.previous ? (
          <div className="space-y-3 rounded-2xl border border-fd-border bg-fd-background px-4 py-4 text-sm">
            <p className="text-fd-foreground">送信しました。次の改善に使います。</p>
            <FeedbackSubmittedActions
              githubUrl={storage.previous.response?.githubUrl}
              onReset={() => storage.setPrevious(null)}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="気になった点や、足りなかった情報があれば書いてください。"
              className="min-h-28 w-full rounded-2xl border border-fd-border bg-fd-background px-4 py-3 text-sm outline-none transition-colors focus:border-fd-primary"
            />

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!opinion || isPending}
                className={buttonVariants()}
              >
                {isPending ? "送信中..." : "Feedback を送る"}
              </button>

              {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
