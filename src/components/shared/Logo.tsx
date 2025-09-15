import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M6 34C6 30.6863 8.68629 28 12 28H36C39.3137 28 42 30.6863 42 34V36H6V34Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
        <path
          d="M12 28C8.68629 28 6 25.3137 6 22V20H42V22C42 25.3137 39.3137 28 36 28"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 14C28.4183 14 32 15.7909 32 18V20H16V18C16 15.7909 19.5817 14 24 14Z"
          fill="currentColor"
        />
        <path
          d="M32 18C32 20.2091 28.4183 22 24 22C19.5817 22 16 20.2091 16 18C16 15.7909 19.5817 14 24 14C28.4183 14 32 15.7909 32 18Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-headline text-xl font-bold text-foreground">
        Isithebe seMbokodo
      </span>
    </div>
  );
}
