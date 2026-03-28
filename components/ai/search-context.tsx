'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useChat, type UseChatHelpers, type UIMessage } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

type AISearchContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  chat: UseChatHelpers<UIMessage>;
};

const AISearchContext = createContext<AISearchContextValue | null>(null);

function useAISearchValue() {
  const context = useContext(AISearchContext);

  if (!context) {
    throw new Error("AISearch の外では使えません。");
  }

  return context;
}

export function AISearch({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const chat = useChat({
    id: 'search',
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <AISearchContext value={useMemo(() => ({ chat, open, setOpen }), [chat, open])}>
      {children}
    </AISearchContext>
  );
}

export function useAISearchContext() {
  const { open, setOpen } = useAISearchValue();
  return { open, setOpen };
}

export function useAISearchChatContext() {
  return useAISearchValue().chat;
}
