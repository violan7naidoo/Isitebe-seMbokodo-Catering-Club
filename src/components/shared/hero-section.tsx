import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import placeholderImages from '@/lib/placeholder-images.json';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: {
    src: string;
    alt: string;
  };
  height?: string;
}

export function HeroSection({
  title,
  subtitle,
  primaryButtonText = 'Join Our Sisterhood',
  primaryButtonLink = '/membership',
  secondaryButtonText = 'Learn More',
  secondaryButtonLink = '/about',
  backgroundImage = {
    src: placeholderImages.hero.src,
    alt: placeholderImages.hero.alt,
  },
  height = 'h-[70vh] min-h-[550px]',
}: HeroSectionProps) {
  return (
    <section className={`relative w-full overflow-hidden ${height}`}>
      <div className="absolute inset-0">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          data-ai-hint="hero background"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl animate-fade-in-up">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl font-headline text-lg text-white/90 drop-shadow-md md:text-xl lg:text-2xl animate-fade-in-up animation-delay-300">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-600">
            {primaryButtonText && primaryButtonLink && (
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href={primaryButtonLink}>{primaryButtonText}</Link>
              </Button>
            )}
            {secondaryButtonText && secondaryButtonLink && (
              <Button asChild variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
