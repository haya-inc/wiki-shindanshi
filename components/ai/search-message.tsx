'use client';

import { type ComponentProps } from 'react';
import { SearchIcon } from 'lucide-react';
import { type UIMessage } from '@ai-sdk/react';
import { type Tool, type UIToolInvocation } from 'ai';
import { Markdown } from '@/components/markdown';
import { secondarySurfaceClass } from '@/components/ui/surface';
import { cn } from '@/lib/cn';

const roleNames: Record<string, string> = {
  user: 'あなた',
  assistant: 'AI',
};

function collectMessageContent(message: UIMessage) {
  let markdown = '';
  const searchCalls: UIToolInvocation<Tool>[] = [];

  for (const part of message.parts ?? []) {
    if (part.type === 'text') {
      markdown += part.text;
      continue;
    }

    if (!part.type.startsWith('tool-')) {
      continue;
    }

    const toolName = part.type.slice('tool-'.length);
    const toolCall = part as UIToolInvocation<Tool>;

    if (toolName !== 'search' || !toolCall.toolCallId) {
      continue;
    }

    searchCalls.push(toolCall);
  }

  return { markdown, searchCalls };
}

export function AISearchMessage({
  message,
  ...props
}: { message: UIMessage } & ComponentProps<'div'>) {
  const { markdown, searchCalls } = collectMessageContent(message);

  return (
    <div onClick={(event) => event.stopPropagation()} {...props}>
      <p
        className={cn(
          'mb-1 text-sm font-medium text-fd-muted-foreground',
          message.role === 'assistant' && 'text-fd-primary',
        )}
      >
        {roleNames[message.role] ?? '不明'}
      </p>
      <div className="prose text-sm">
        <Markdown text={markdown} />
      </div>

      {searchCalls.map((call) => (
        <div
          key={call.toolCallId}
          className={cn(
            secondarySurfaceClass,
            'mt-3 flex flex-row items-center gap-2 rounded-lg p-2 text-xs text-fd-muted-foreground',
          )}
        >
          <SearchIcon className="size-4" />
          {call.state === 'output-error' || call.state === 'output-denied' ? (
            <p className="text-fd-error">{call.errorText ?? '検索に失敗しました'}</p>
          ) : (
            <p>{call.output ? `${call.output.length}件の検索結果` : '検索中...'}</p>
          )}
        </div>
      ))}
    </div>
  );
}
