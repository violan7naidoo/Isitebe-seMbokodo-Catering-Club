import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { SOCIAL_LINKS } from '@/lib/constants';
import { HeroSection } from '@/components/shared/hero-section';
import placeholderImages from '@/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Isithebe seMbokodo Catering Club. We are here to answer your questions.',
};

export default function ContactPage() {
  return (
    <div>
      <HeroSection 
        title="Get in Touch"
        subtitle="We're here to help. Reach out to us with any questions or to join our sisterhood."
        primaryButtonText="Join Our Sisterhood"
        primaryButtonLink="/membership"
        secondaryButtonText="View Gallery"
        secondaryButtonLink="/gallery"
        backgroundImage={{
          src: placeholderImages.gallery[2].src,
          alt: 'Women from the club smiling and working together'
        }}
      />

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="rounded-lg bg-background p-8 shadow-lg">
            <h2 className="font-headline text-3xl font-semibold mb-6">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <h2 className="font-headline text-3xl font-semibold">
              Contact Information
            </h2>
            <div className="space-y-4 text-lg">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="text-foreground/80">
                    <a
                      href="tel:+27123456789"
                      className="hover:text-primary transition-colors"
                    >
                      +27 12 345 6789
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-foreground/80">
                    <a
                      href="mailto:contact@isithebe.co.za"
                      className="hover:text-primary transition-colors"
                    >
                      contact@isithebe.co.za
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-foreground/80">
                    Serving communities across South Africa
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-headline text-2xl font-semibold">
                Follow Us
              </h3>
              <div className="mt-4 flex space-x-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={social.name}
                  >
                    <div className="rounded-full border border-border p-3 transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                      <social.icon className="h-6 w-6" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
