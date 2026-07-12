import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroSection } from '@/components/shared/hero-section';
import { AnimateIn } from '@/components/ui/animate-in';
import { Button } from '@/components/ui/button';
import {
  ChefHat,
  Utensils,
  Tent,
  Armchair,
  ClipboardList,
  CalendarClock,
  Heart,
  Handshake,
  GraduationCap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Member Benefits',
  description: 'Why become an Isithebe seMbokodo member? Explore the full list of membership benefits.',
};

const benefits = [
  {
    icon: <ChefHat className="h-7 w-7" />,
    title: 'Professional chefs and hospitality staff',
  },
  {
    icon: <Utensils className="h-7 w-7" />,
    title: 'Professional catering for funerals, weddings, graduations, birthdays, church events, and traditional ceremonies',
  },
  {
    icon: <Tent className="h-7 w-7" />,
    title: 'Catering equipment (according to your package)',
  },
  {
    icon: <Armchair className="h-7 w-7" />,
    title: 'Tables, chairs, tents, and mobile refrigeration (Comfort and Premium)',
  },
  {
    icon: <ClipboardList className="h-7 w-7" />,
    title: 'Professional event planning assistance',
  },
  {
    icon: <CalendarClock className="h-7 w-7" />,
    title: 'Priority booking',
  },
  {
    icon: <Heart className="h-7 w-7" />,
    title: 'Affordable monthly contributions',
  },
  {
    icon: <Handshake className="h-7 w-7" />,
    title: 'A trusted community built on Ubuntu',
  },
  {
    icon: <GraduationCap className="h-7 w-7" />,
    title: 'Opportunities for women and youth through training and employment',
  },
];

export default function MemberBenefitsPage() {
  return (
    <div className="bg-background">
      <HeroSection
        title="Why Become an Isithebe seMbokodo Member?"
        subtitle="Member Benefits"
        primaryButtonText="Apply for Membership"
        primaryButtonLink="/membership/apply"
        secondaryButtonText="Membership Packages"
        secondaryButtonLink="/membership"
        backgroundImage={{
          src: '/images/logo2.png',
          alt: 'Isithebe seMbokodo Catering Club event',
        }}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimateIn className="max-w-2xl mx-auto text-center mb-16" direction="up">
            <p className="text-lg text-foreground/80">
              Your membership gives you more than access to catering&mdash;it gives your family confidence, support, and peace of mind.
            </p>
          </AnimateIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <AnimateIn
                key={index}
                delay={index + 1}
                direction="up"
                className="flex items-start gap-4 bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-border/50"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  {benefit.icon}
                </div>
                <span className="text-foreground/90 leading-snug pt-2">{benefit.title}</span>
              </AnimateIn>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg">
              <Link href="/membership/apply">Apply for Membership</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
