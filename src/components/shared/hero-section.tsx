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
    <section className={`relative w-full overflow-hidden ${height}`} style={{ backgroundColor: '#5E5E09' }}>
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={backgroundImage.src}
              alt={backgroundImage.alt}
              data-ai-hint="hero background"
              fill
              className="object-contain"
              style={{
                objectPosition: 'center',
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'transparent'
              }}
              priority
              quality={100}
              sizes="100vw"
            />
          </div>
        </div>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-start pt-8 sm:justify-center sm:pt-0">
        <div className="w-full">
          <div className="container mx-auto px-4 text-center">
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl animate-fade-in-up">
                {title}
              </h1>
              <p className="mx-auto max-w-3xl font-headline text-lg text-white/90 drop-shadow-md md:text-xl lg:text-2xl animate-fade-in-up animation-delay-300">
                {subtitle}
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-600">
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
        </div>
      </div>
    </section>
  );
}
