'use client';

import { type ComponentProps, type SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Loader2, RefreshCw, Send } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { useAISearchChatContext } from '@/components/ai/search-context';

const storageKeyInput = '__ai_search_input';

function useStoredInput(storageKey: string) {
  const [value, setValue] = useState(() =>
    typeof window === 'undefined' ? '' : localStorage.getItem(storageKey) ?? '',
  );

  function updateValue(nextValue: string) {
    setValue(nextValue);

    if (nextValue.length === 0) {
      localStorage.removeItem(storageKey);
      return;
    }

    localStorage.setItem(storageKey, nextValue);
  }

  return {
    value,
    setValue: updateValue,
  };
}

export function AISearchInputActions() {
  const { messages, status, setMessages, regenerate } = useAISearchChatContext();
  const isLoading = status === 'streaming';

  if (messages.length === 0) {
    return null;
  }

  return (
    <>
      {!isLoading && messages.at(-1)?.role === 'assistant' ? (
        <button
          type="button"
          className={buttonVariants({
            color: 'secondary',
            size: 'sm',
          })}
          onClick={() => regenerate()}
        >
          <RefreshCw className="size-4" />
          再実行
        </button>
      ) : null}
      <button
        type="button"
        className={buttonVariants({
          color: 'secondary',
          size: 'sm',
        })}
        onClick={() => setMessages([])}
      >
        会話を消去
      </button>
    </>
  );
}

export function AISearchInput(props: ComponentProps<'form'>) {
  const { status, sendMessage, stop } = useAISearchChatContext();
  const { value: input, setValue: setInput } = useStoredInput(storageKeyInput);
  const isLoading = status === 'streaming' || status === 'submitted';

  function handleStart(event?: SyntheticEvent) {
    event?.preventDefault();

    const message = input.trim();

    if (message.length === 0) {
      return;
    }

    void sendMessage({ text: message });
    setInput('');
  }

  useEffect(() => {
    if (isLoading) {
      document.getElementById('nd-ai-input')?.focus();
    }
  }, [isLoading]);

  return (
    <form {...props} className={cn('flex items-start pe-2', props.className)} onSubmit={handleStart}>
      <Input
        value={input}
        placeholder={isLoading ? 'AI が回答しています...' : '質問を書く'}
        autoFocus
        className="p-3"
        disabled={isLoading}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (!event.shiftKey && event.key === 'Enter') {
            handleStart(event);
          }
        }}
      />
      {isLoading ? (
        <button
          type="button"
          className={buttonVariants({
            color: 'secondary',
            size: 'sm',
            className: 'mt-2 transition-all',
          })}
          onClick={stop}
        >
          <Loader2 className="size-4 animate-spin text-fd-muted-foreground" />
          回答を停止
        </button>
      ) : (
        <button
          type="submit"
          className={buttonVariants({
            color: 'primary',
            size: 'icon',
            className: 'mt-2 transition-all',
          })}
          disabled={input.length === 0}
        >
          <Send className="size-4" />
        </button>
      )}
    </form>
  );
}

function Input(props: ComponentProps<'textarea'>) {
  const ref = useRef<HTMLDivElement>(null);
  const sharedClassName = cn('col-start-1 row-start-1', props.className);

  return (
    <div className="grid flex-1">
      <textarea
        id="nd-ai-input"
        {...props}
        className={cn(
          'resize-none bg-transparent placeholder:text-fd-muted-foreground focus-visible:outline-none',
          sharedClassName,
        )}
      />
      <div ref={ref} className={cn(sharedClassName, 'invisible break-all')}>
        {`${props.value?.toString() ?? ''}\n`}
      </div>
    </div>
  );
}
