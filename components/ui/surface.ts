import { cn } from '@/lib/cn';

export const cardSurfaceClass =
  'border border-fd-border bg-fd-card text-fd-card-foreground';

export const secondarySurfaceClass =
  'border border-fd-border bg-fd-secondary text-fd-secondary-foreground';

export const backgroundSurfaceClass =
  'border border-fd-border bg-fd-background text-fd-foreground';

export const popoverSurfaceClass =
  'border border-fd-border bg-fd-popover text-fd-popover-foreground';

const textareaSizeClasses = {
  md: 'min-h-28 rounded-2xl px-4 py-3',
  sm: 'min-h-24 rounded-xl px-3 py-2',
} as const;

type TextareaSize = keyof typeof textareaSizeClasses;

type TextareaVariantOptions = {
  size?: TextareaSize;
  className?: string;
};

export function textareaVariants(options: TextareaVariantOptions = {}) {
  const { size = 'md', className } = options;

  return cn(
    'w-full border border-fd-border bg-fd-background text-fd-foreground text-sm outline-none transition-colors placeholder:text-fd-muted-foreground focus:border-fd-primary',
    textareaSizeClasses[size],
    className,
  );
}
