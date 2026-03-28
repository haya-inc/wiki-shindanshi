import { cn } from '@/lib/cn';

const baseButtonClass =
  'inline-flex items-center justify-center rounded-full font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring';

const colorClasses = {
  primary:
    'bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/80 disabled:bg-fd-secondary disabled:text-fd-secondary-foreground',
  outline:
    'border border-fd-border bg-fd-background text-fd-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
  ghost: 'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
  secondary:
    'border border-fd-border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
} as const;

const sizeClasses = {
  xs: 'gap-1 px-2 py-1 text-[11px]',
  sm: 'gap-1.5 px-3 py-2 text-xs',
  md: 'gap-2 px-4 py-2 text-sm',
  icon: 'p-2 [&_svg]:size-5',
  'icon-sm': 'p-1.5 [&_svg]:size-4.5',
  'icon-xs': 'p-1 [&_svg]:size-4',
} as const;

type ButtonColor = keyof typeof colorClasses;
type ButtonSize = keyof typeof sizeClasses;

type ButtonVariantOptions = {
  color?: ButtonColor;
  size?: ButtonSize;
  className?: string;
};

export function buttonVariants(options: ButtonVariantOptions = {}) {
  const { color = 'primary', size = 'md', className } = options;

  return cn(
    baseButtonClass,
    colorClasses[color],
    sizeClasses[size],
    className,
  );
}
