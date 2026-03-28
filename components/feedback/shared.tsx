"use client";

import { useState, useTransition } from "react";
import type { ActionResponse, FeedbackRequest } from "@/components/feedback/schema";
import { buttonVariants } from "@/components/ui/button";

const feedbackErrorMessage = "Feedback の送信に失敗しました。";

async function postFeedback(input: FeedbackRequest): Promise<ActionResponse> {
  const response = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (response.ok) {
    return (await response.json()) as ActionResponse;
  }

  try {
    const data = (await response.json()) as { error?: string };
    throw new Error(data.error || feedbackErrorMessage);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(feedbackErrorMessage);
  }
}

export function FeedbackSubmittedActions({
  githubUrl,
  onReset,
  onClose,
}: {
  githubUrl?: string;
  onReset: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {githubUrl ? (
        <a
          href={githubUrl}
          rel="noreferrer noopener"
          target="_blank"
          className={buttonVariants({ color: "primary", size: "sm" })}
        >
          GitHub で見る
        </a>
      ) : null}
      <button
        type="button"
        className={buttonVariants({ color: "secondary", size: "sm" })}
        onClick={onReset}
      >
        もう一度送る
      </button>
      {onClose ? (
        <button
          type="button"
          className={buttonVariants({ color: "outline", size: "sm" })}
          onClick={onClose}
        >
          閉じる
        </button>
      ) : null}
    </div>
  );
}

export function useFeedbackSubmission() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit<TRequest extends FeedbackRequest>({
    buildRequest,
    onSuccess,
  }: {
    buildRequest: () => TRequest | null;
    onSuccess: (request: TRequest, response: ActionResponse) => void;
  }) {
    if (isPending) {
      return;
    }

    const request = buildRequest();

    if (!request) {
      return;
    }

    setErrorMessage("");

    startTransition(async () => {
      try {
        const response = await postFeedback(request);
        onSuccess(request, response);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : feedbackErrorMessage);
      }
    });
  }

  return {
    errorMessage,
    isPending,
    submit,
  };
}

function readStoredValue<T>(storageKey: string) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(storageKey);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as T;
  } catch {
    localStorage.removeItem(storageKey);
    return null;
  }
}

function writeStoredValue<T>(storageKey: string, value: T | null) {
  if (value) {
    localStorage.setItem(storageKey, JSON.stringify(value));
    return;
  }

  localStorage.removeItem(storageKey);
}

export function useStoredFeedback<T>(storageKey: string) {
  const [value, setValue] = useState<T | null>(() => readStoredValue<T>(storageKey));

  return {
    previous: value,
    setPrevious(next: T | null) {
      writeStoredValue(storageKey, next);
      setValue(next);
    },
  };
}
