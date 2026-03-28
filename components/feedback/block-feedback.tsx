"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import type { FeedbackBlockProps as RemarkFeedbackBlockProps } from "fumadocs-core/mdx-plugins/remark-feedback-block";
import type { ActionResponse, BlockFeedback, BlockFeedbackRequest } from "@/components/feedback/schema";
import {
  FeedbackSubmittedActions,
  useFeedbackSubmission,
  useStoredFeedback,
} from "@/components/feedback/shared";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type FeedbackBlockComponentProps = RemarkFeedbackBlockProps & {
  children: ReactNode;
};

type StoredBlockFeedback = BlockFeedback & {
  response?: ActionResponse;
};

export function FeedbackBlock({ id, body, children }: FeedbackBlockComponentProps) {
  const pathname = usePathname();
  const blockId = `${pathname}-${id}`;
  const storage = useStoredFeedback<StoredBlockFeedback>(`docs-feedback-block-${blockId}`);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { errorMessage, isPending, submit } = useFeedbackSubmission();

  function handleSubmit() {
    submit<BlockFeedbackRequest>({
      buildRequest: () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
          return null;
        }

        return {
          kind: "block",
          blockId,
          blockBody: body?.trim() || undefined,
          url: pathname,
          message: trimmedMessage,
        };
      },
      onSuccess: (request, response) => {
        storage.setPrevious({
          blockId: request.blockId,
          blockBody: request.blockBody,
          url: request.url,
          message: request.message,
          response,
        });
        setMessage("");
      },
    });
  }

  return (
    <div className="group/feedback relative">
      <div
        className={cn(
          "absolute -inset-1 z-[-1] rounded-sm transition-colors duration-100",
          isOpen ? "bg-fd-accent/70" : "group-hover/feedback:bg-fd-accent/40",
        )}
      />

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={cn(
          buttonVariants({ color: "outline", size: "xs" }),
          "absolute -top-7 right-0 opacity-0 transition group-hover/feedback:opacity-100",
          isOpen ? "opacity-100" : null,
        )}
      >
        Feedback
      </button>

      <div>{children}</div>

      {isOpen ? (
        <div className="absolute right-0 top-0 z-20 w-full max-w-sm rounded-2xl border border-fd-border bg-fd-popover p-3 shadow-xl">
          {storage.previous ? (
            <div className="space-y-3 text-sm">
              <p className="text-fd-foreground">送信しました。次の改善に使います。</p>
              <FeedbackSubmittedActions
                githubUrl={storage.previous.response?.githubUrl}
                onReset={() => storage.setPrevious(null)}
                onClose={() => setIsOpen(false)}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-fd-foreground">このブロックへの Feedback</p>
                <p className="text-xs text-fd-muted-foreground">
                  分かりにくかった点や不足していた点を短く書いてください。
                </p>
              </div>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="例: 用語の定義を追加してほしい"
                className="min-h-24 w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2 text-sm outline-none transition-colors focus:border-fd-primary"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={message.trim().length === 0 || isPending}
                  className={buttonVariants({ color: "primary", size: "sm" })}
                >
                  {isPending ? "送信中..." : "送信する"}
                </button>
                <button
                  type="button"
                  className={buttonVariants({ color: "outline", size: "sm" })}
                  onClick={() => setIsOpen(false)}
                >
                  閉じる
                </button>
              </div>
              {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
