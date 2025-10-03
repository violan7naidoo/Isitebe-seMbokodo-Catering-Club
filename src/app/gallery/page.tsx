import type { Metadata } from 'next';
import { GalleryGrid } from './GalleryGrid';
import { HeroSection } from '@/components/shared/hero-section';
import placeholderImages from '@/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'View a gallery of our catering events and delicious food.',
};

export default function GalleryPage() {
  return (
    <div>
      <HeroSection
        title="A Taste of Our Craft"
        subtitle=""
        primaryButtonText="View Our Menu"
        primaryButtonLink="/membership"
        secondaryButtonText="Book Us"
        secondaryButtonLink="/contact"
        backgroundImage={{
          src: "/images/logo2.png",
          alt: "Isithebe seMbokodo Catering Club event"
        }}
      />

      <section className="container mx-auto px-4">
        <GalleryGrid />
      </section>
    </div>
  );
}
