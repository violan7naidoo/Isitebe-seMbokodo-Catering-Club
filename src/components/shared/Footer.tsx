import Link from 'next/link';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { Logo } from './Logo';
import { Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="max-w-xs text-foreground/70">
              A sisterhood providing strength, support, and exceptional
              catering services.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-foreground/70">
                <Phone className="h-5 w-5 text-primary" />
                <span>+27 12 345 6789</span>
              </li>
              <li className="flex items-center gap-2 text-foreground/70">
                <Mail className="h-5 w-5 text-primary" />
                <span>contact@isithebe.co.za</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 transition-colors hover:text-primary"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} Isithebe seMbokodo Catering Club.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
