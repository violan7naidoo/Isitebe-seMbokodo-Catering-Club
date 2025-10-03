import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative h-10 w-10">
        <Image
          src="/images/logo-blank.png"
          alt="Isithebe seMbokodo Logo"
          fill
          className="object-contain"
          sizes="40px"
          priority
        />
      </div>
      <span className="font-headline text-xl font-bold text-foreground">
        Isithebe seMbokodo
      </span>
    </div>
  );
}
