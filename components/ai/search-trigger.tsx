'use client';

import { type ComponentProps } from 'react';
import { useAISearchContext } from '@/components/ai/search-context';
import { cn } from '@/lib/cn';

export function AISearchTrigger({
  position = 'default',
  className,
  ...props
}: ComponentProps<'button'> & { position?: 'default' | 'float' }) {
  const { open, setOpen } = useAISearchContext();

  return (
    <button
      data-state={open ? 'open' : 'closed'}
      className={cn(
        position === 'float' && [
          'fixed bottom-4 inset-e-[calc(--spacing(4)+var(--removed-body-scroll-bar-size,0px))] z-20 w-24 gap-3 shadow-lg transition-[translate,opacity]',
          open && 'translate-y-10 opacity-0',
        ],
        className,
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {props.children}
    </button>
  );
}
