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
        subtitle="Explore moments from our events and the beautiful dishes we create with love."
        primaryButtonText="View Our Menu"
        primaryButtonLink="/membership"
        secondaryButtonText="Book Us"
        secondaryButtonLink="/contact"
        backgroundImage={{
          src: placeholderImages.gallery[0].src,
          alt: 'Beautifully set table for a large event'
        }}
      />

      <section className="container mx-auto px-4">
        <GalleryGrid />
      </section>
    </div>
  );
}
