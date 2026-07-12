import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { PageTransition } from '@/components/ui/page-transition';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: "Isithebe seMbokodo Catering Club | South Africa's First Membership-Based Catering Organisation",
    template: '%s | Isithebe seMbokodo',
  },
  description:
    "South Africa's first membership-based catering organisation, providing affordable professional catering for funerals, weddings, and community events while empowering women and creating jobs for young people.",
  keywords: [
    'catering',
    'funerals',
    'membership catering',
    'women empowerment',
    'South Africa',
    'community support',
    'events',
    'weddings',
  ],
  openGraph: {
    title: "Isithebe seMbokodo Catering Club | South Africa's First Membership-Based Catering Organisation",
    description:
      'Affordable, professional catering for funerals, weddings, and community events through monthly membership contributions.',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Isithebe seMbokodo Catering Club',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Isithebe seMbokodo Catering Club | South Africa's First Membership-Based Catering Organisation",
    description:
      "South Africa's first membership-based catering organisation, providing affordable professional catering for funerals, weddings, and community events.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body 
        className={cn('min-h-screen bg-background font-sans antialiased')}
        suppressHydrationWarning={true}
      >
        <Providers>
          <Header />
          <main>
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
