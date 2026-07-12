import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroSection } from '@/components/shared/hero-section';
import { AnimateIn } from '@/components/ui/animate-in';
import { Button } from '@/components/ui/button';
import { Shield, FileText, BadgeCheck, CalendarCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Join Isithebe seMbokodo Catering Club in four simple steps.',
};

const steps = [
  {
    step: 1,
    title: 'Choose Your Package',
    icon: <Shield className="h-6 w-6" />,
    description: 'Select the package that best suits your family and budget.',
  },
  {
    step: 2,
    title: 'Complete Your Application',
    icon: <FileText className="h-6 w-6" />,
    description: 'Fill in the online application form and upload your required documents.',
  },
  {
    step: 3,
    title: 'Activate Your Membership',
    icon: <BadgeCheck className="h-6 w-6" />,
    description: "Pay the registration fee and your first monthly contribution. Once approved, you'll receive your Membership Number.",
  },
  {
    step: 4,
    title: 'Book Your Catering Service',
    icon: <CalendarCheck className="h-6 w-6" />,
    description: 'After the applicable waiting period, simply contact us to book your event. Our professional team will handle the catering while you focus on your family and guests.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-background">
      <HeroSection
        title="Join in Four Simple Steps"
        subtitle="How It Works"
        primaryButtonText="Apply for Membership"
        primaryButtonLink="/membership/apply"
        secondaryButtonText="Membership Packages"
        secondaryButtonLink="/membership"
        backgroundImage={{
          src: '/images/logo2.png',
          alt: 'Isithebe seMbokodo Catering Club event',
        }}
      />

      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="absolute left-0 right-0 top-16 h-0.5 bg-gradient-to-r from-transparent via-border/30 to-transparent hidden lg:block" />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((item, index) => (
                <AnimateIn key={item.step} delay={index * 2} direction="up" className="relative">
                  <div className="group relative h-full bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/20">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white font-headline text-xl font-bold shadow-lg">
                        {item.step}
                      </div>
                    </div>

                    <div className="flex justify-center mb-6 pt-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        {item.icon}
                      </div>
                    </div>

                    <h3 className="font-headline text-xl font-bold mb-3 text-center text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-foreground/80 text-center">{item.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
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
