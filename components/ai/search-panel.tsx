'use client';

import { type ComponentProps, useEffect, useEffectEvent, useRef } from 'react';
import { MessageCircleIcon, X } from 'lucide-react';
import { Presence } from '@radix-ui/react-presence';
import { AISearchInput, AISearchInputActions } from '@/components/ai/search-input';
import { AISearchMessage } from '@/components/ai/search-message';
import { useAISearchContext, useAISearchChatContext } from '@/components/ai/search-context';
import { buttonVariants } from '@/components/ui/button';
import { secondarySurfaceClass } from '@/components/ui/surface';
import { cn } from '@/lib/cn';

const panelAnimationStyle = `
@keyframes ask-ai-open {
  from {
    translate: 100% 0;
  }
  to {
    translate: 0 0;
  }
}

@keyframes ask-ai-close {
  from {
    width: var(--ai-chat-width);
  }
  to {
    width: 0px;
  }
}
`;

export function AISearchPanelHeader({ className, ...props }: ComponentProps<'div'>) {
  const { setOpen } = useAISearchContext();

  return (
    <div
      className={cn(
        'sticky top-0 flex items-start gap-2 rounded-xl shadow-sm',
        secondarySurfaceClass,
        className,
      )}
      {...props}
    >
      <div className="flex-1 px-3 py-2">
        <p className="mb-2 text-sm font-medium">AI検索</p>
        <p className="text-xs text-fd-muted-foreground">
          AI は誤ることがあるため、出典リンクも確認してください。
        </p>
      </div>

      <button
        aria-label="閉じる"
        tabIndex={-1}
        className={buttonVariants({
          color: 'ghost',
          size: 'icon-sm',
        })}
        onClick={() => setOpen(false)}
      >
        <X />
      </button>
    </div>
  );
}

function AISearchMessageList(props: Omit<ComponentProps<'div'>, 'dir'>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    function syncScrollPosition() {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'instant',
      });
    }

    const observer = new ResizeObserver(syncScrollPosition);
    const element = containerRef.current.firstElementChild;

    syncScrollPosition();

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn('fd-scroll-container flex min-w-0 flex-col overflow-y-auto', props.className)}
    >
      {props.children}
    </div>
  );
}

export function AISearchPanel() {
  const { open, setOpen } = useAISearchContext();
  useAISearchHotKey();

  return (
    <>
      <style>{panelAnimationStyle}</style>
      <Presence present={open}>
        <div
          data-state={open ? 'open' : 'closed'}
          className="fixed inset-0 z-30 bg-fd-overlay backdrop-blur-xs data-[state=closed]:animate-fd-fade-out data-[state=open]:animate-fd-fade-in lg:hidden"
          onClick={() => setOpen(false)}
        />
      </Presence>
      <Presence present={open}>
        <div
          className={cn(
            'z-30 overflow-hidden bg-fd-card text-fd-card-foreground [--ai-chat-width:400px] 2xl:[--ai-chat-width:460px]',
            'max-lg:fixed max-lg:inset-x-2 max-lg:inset-y-4 max-lg:rounded-2xl max-lg:border max-lg:shadow-xl',
            'lg:sticky lg:top-0 lg:h-dvh lg:ms-auto lg:border-s lg:in-[#nd-docs-layout]:[grid-area:toc] lg:in-[#nd-notebook-layout]:col-start-5 lg:in-[#nd-notebook-layout]:row-span-full',
            open
              ? 'animate-fd-dialog-in lg:animate-[ask-ai-open_200ms]'
              : 'animate-fd-dialog-out lg:animate-[ask-ai-close_200ms]',
          )}
        >
          <div className="flex size-full flex-col p-2 lg:w-(--ai-chat-width) lg:p-3">
            <AISearchPanelHeader />
            <AISearchPanelList className="flex-1" />
            <div className={cn('rounded-xl shadow-sm has-focus-visible:shadow-md', secondarySurfaceClass)}>
              <AISearchInput />
              <div className="flex items-center gap-1.5 p-1 empty:hidden">
                <AISearchInputActions />
              </div>
            </div>
          </div>
        </div>
      </Presence>
    </>
  );
}

export function AISearchPanelList({ className, style, ...props }: ComponentProps<'div'>) {
  const chat = useAISearchChatContext();
  const messages = chat.messages.filter((message) => message.role !== 'system');

  return (
    <AISearchMessageList
      className={cn('overscroll-contain py-4', className)}
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent, white 1rem, white calc(100% - 1rem), transparent 100%)',
        ...style,
      }}
      {...props}
    >
      {messages.length === 0 ? (
        <div className="flex size-full flex-col items-center justify-center gap-2 text-center text-sm text-fd-muted-foreground/80">
          <MessageCircleIcon fill="currentColor" stroke="none" />
          <p onClick={(event) => event.stopPropagation()}>下の入力欄から質問できます。</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-3">
          {messages.map((message) => (
            <AISearchMessage key={message.id} message={message} />
          ))}
        </div>
      )}
    </AISearchMessageList>
  );
}

function useAISearchHotKey() {
  const { open, setOpen } = useAISearchContext();

  const onKeyPress = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      event.preventDefault();
    }

    if (event.key === '/' && (event.metaKey || event.ctrlKey) && !open) {
      setOpen(true);
      event.preventDefault();
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  }, []);
}
