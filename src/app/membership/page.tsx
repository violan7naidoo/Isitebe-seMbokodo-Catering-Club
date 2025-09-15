import type { Metadata } from 'next';
import { HeroSection } from '@/components/shared/hero-section';
import placeholderImages from '@/lib/placeholder-images.json';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Membership',
  description:
    'Explore membership packages, benefits, and policies of Isithebe seMbokodo Catering Club.',
};

const packages = [
  {
    name: 'Basic Package',
    price: 'R100',
    description: 'Essential funeral catering support.',
    features: ['Funeral catering services'],
  },
  {
    name: 'Premium Package',
    price: 'R150',
    description: 'Expanded support for funerals and events.',
    features: [
      'Funeral catering services',
      'One major event catering per annum',
    ],
    highlight: true,
  },
  {
    name: 'Umgalelo Package',
    price: 'R150 + R50',
    description: 'Community-driven event support.',
    features: [
      'All Premium Package benefits',
      'Contribute R50 (umgalelo) for fellow sister events',
    ],
  },
  {
    name: 'Sisters in Business',
    price: 'R150 + R50',
    description: 'For entrepreneurs seeking growth.',
    features: [
      'All Umgalelo Package benefits',
      'Access to business financial support (T&Cs apply)',
    ],
  },
];

const benefits = [
    "Quality Catering: Our members enjoy quality catering services during times of need.",
    "Community Support: Our sisterhood provides a sense of community and support among members.",
    "Family Coverage: Members can register biological family members to be covered under the membership.",
    "Sisterhood Support Sessions: A safe space for sisters to connect, share, and support one another through health awareness, mental health support, and unwinding sessions."
]

const policies = [
    { title: "Membership Policy", content: "Membership is open to individuals who share our values and principles." },
    { title: "Benefit Policy", content: "Benefits are payable according to the package held by the member." },
    { title: "Umgalelo Policy", content: "Members on relevant packages contribute R50 when a fellow sister hosts an event." },
    { title: "Sisters in Business Policy", content: "Business financial support is subject to terms and conditions and is exclusive to sisters in business." },
    { title: "Confidentiality Policy", content: "We maintain strict confidentiality of all member information and transactions." },
    { title: "Dispute Resolution Policy", content: "We have a fair and transparent process for resolving any disputes." },
];

export default function MembershipPage() {
  return (
    <div className="bg-background">
      <HeroSection 
        title="Join Our Sisterhood"
        subtitle="Become part of a supportive community that stands together in times of need and celebration."
        primaryButtonText="Become a Member"
        primaryButtonLink="#membership-packages"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
        backgroundImage={{
          src: placeholderImages.hero.src,
          alt: 'Women supporting each other in community'
        }}
      />
      
      <section id="membership-packages" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`flex flex-col ${
                pkg.highlight ? 'border-primary shadow-lg' : ''
              }`}
            >
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  {pkg.name}
                </CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
                <div className="pt-4">
                  <span className="font-headline text-4xl font-bold">
                    {pkg.price}
                  </span>
                  <span className="text-sm text-foreground/70">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Package</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Membership Benefits & Structure
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="font-headline text-2xl font-semibold mb-4">Core Benefits</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                        <Check className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                        <span className="text-foreground/80">{benefit}</span>
                    </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-2xl font-semibold mb-4">How It Works</h3>
              <ul className="space-y-4 text-foreground/80">
                <li className="flex items-start">
                  <Info className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>Membership is open to individuals who wish to join our sisterhood.</span>
                </li>
                 <li className="flex items-start">
                  <Info className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>A once-off joining fee of <span className="font-semibold text-foreground">R200</span> is payable upon registration.</span>
                </li>
                <li className="flex items-start">
                  <Info className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>Monthly premiums are payable before the 7th of each month.</span>
                </li>
                <li className="flex items-start">
                  <Info className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>There is a <span className="font-semibold text-foreground">6-month waiting period</span> for funeral benefits to ensure community stability.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Our Policies
            </h2>
            <p className="mt-2 text-foreground/80">
              Our commitment to fairness and transparency.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {policies.map((policy, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="font-headline text-lg">{policy.title}</AccordionTrigger>
                    <AccordionContent className="text-foreground/80">
                        {policy.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
