import type { Metadata } from 'next';
import { HeroSection } from '@/components/shared/hero-section';
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
    price: 'R150',
    joiningFee: 'R500',
    description: 'Community-driven event support.',
    features: [
      'All Premium Package benefits',
      'Contribute R50 (umgalelo) for fellow sister events',
      'R500 once-off joining fee',
    ],
  },
  {
    name: 'Sisters in Business',
    price: 'R150',
    joiningFee: 'R500',
    description: 'For entrepreneurs seeking growth.',
    features: [
      'All Premium Package benefits',
      'Access to business financial support (T&Cs apply)',
      'R500 once-off joining fee',
    ],
  },
  {
    name: 'Both Packages',
    price: 'R150',
    joiningFee: 'R750',
    description: 'Get both Umgalelo and Sisters in Business benefits.',
    features: [
      'All Premium Package benefits',
      'Contribute R50 (umgalelo) for fellow sister events',
      'Access to business financial support (T&Cs apply)',
      'Discounted R750 joining fee for both packages',
    ],
    highlight: true,
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
        subtitle=""
        primaryButtonText="Become a Member"
        primaryButtonLink="#membership-packages"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
        backgroundImage={{
          src: "/images/logo2.png",
          alt: "Isithebe seMbokodo Catering Club event"
        }}
      />
      
      <section id="membership-packages" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl mb-4">Our Membership Packages</h2>
          <p className="text-foreground/80 max-w-3xl mx-auto">Choose the package that best suits your needs and join our sisterhood today.</p>
        </div>
        
        <div className="space-y-8">
          {/* First row - 2 packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.slice(0, 2).map((pkg) => (
              <div key={pkg.name} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-md border-border/50 hover:border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">{pkg.price}</span>
                        <span className="ml-2 text-muted-foreground">/month</span>
                      </div>
                      {pkg.joiningFee && (
                        <div className="text-sm text-muted-foreground">
                          + {pkg.joiningFee} one-time joining fee
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-4 w-4 mt-1 mr-2 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" variant={pkg.highlight ? 'default' : 'outline'}>
                      <Link href="/contact">
                        {pkg.highlight ? 'Get Started' : 'Choose Plan'}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Second row - 2 packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.slice(2, 4).map((pkg) => (
              <div key={pkg.name} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-md border-border/50 hover:border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">{pkg.price}</span>
                        <span className="ml-2 text-muted-foreground">/month</span>
                      </div>
                      {pkg.joiningFee && (
                        <div className="text-sm text-muted-foreground">
                          + {pkg.joiningFee} one-time joining fee
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-4 w-4 mt-1 mr-2 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" variant={pkg.highlight ? 'default' : 'outline'}>
                      <Link href="/contact">
                        {pkg.highlight ? 'Get Started' : 'Choose Plan'}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Third row - Full width package */}
          <div className="grid grid-cols-1 gap-6">
            {packages.slice(4).map((pkg) => (
              <div key={pkg.name} className="group">
                <Card className="transition-all duration-300 hover:shadow-md border-border/50 hover:border-primary/30">
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div>
                      <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                        <CardDescription>{pkg.description}</CardDescription>
                      </CardHeader>
                      <div className="mt-4">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold">{pkg.price}</span>
                          <span className="ml-2 text-muted-foreground">/month</span>
                        </div>
                        {pkg.joiningFee && (
                          <div className="text-sm text-muted-foreground">
                            + {pkg.joiningFee} one-time joining fee
                          </div>
                        )}
                      </div>
                      <div className="mt-6">
                        <Button asChild className="w-full" size="lg" variant={pkg.highlight ? 'default' : 'outline'}>
                          <Link href="/contact">
                            {pkg.highlight ? 'Get Started' : 'Choose Plan'}
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div>
                      <ul className="space-y-3">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="h-5 w-5 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
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
                  <span>Standard membership has a once-off joining fee of <span className="font-semibold text-foreground">R200</span>.</span>
                </li>
                <li className="flex items-start">
                  <Info className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>Umgalelo Package and Sisters in Business each have a <span className="font-semibold text-foreground">R500</span> joining fee.</span>
                </li>
                <li className="flex items-start">
                  <Info className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>Take both packages for a discounted joining fee of <span className="font-semibold text-foreground">R750</span> (save R250).</span>
                </li>
                <li className="flex items-start">
                  <Info className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>Monthly premiums are payable before the 7th of each month.</span>
                </li>
                <li className="flex items-start">
                  <Info className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>There is a <span className="font-semibold text-foreground">6-month waiting period</span> for funeral benefits to ensure community stability.</span>
                </li>
                <li className="flex items-start">
                  <Info className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>There is a <span className="font-semibold text-foreground">12-month waiting period</span> for significant event benefits.</span>
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

      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Claiming Process for Catering Services
              </h2>
              <p className="mt-2 text-foreground/80">
                Our clear and fair process for addressing any service concerns
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>How to Make a Claim</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">1. Notification</h3>
                    <p className="text-muted-foreground">
                      Notify Isithebe seMbokodo Catering Club in writing of any issues or disputes related to catering services, providing detailed information about the problem.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">2. Claim Form</h3>
                    <p className="text-muted-foreground">
                      Complete a claim form, which can be obtained from Isithebe seMbokodo Catering Club.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">3. Supporting Documentation</h3>
                    <p className="text-muted-foreground">
                      Attach relevant documents, such as receipts, invoices, or proof of service delivery issues.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">4. Submission Deadlines</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Funeral services: 7 days from the date of the incident</li>
                      <li>Major events: 3 months from the date of the event</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">5. Review Process</h3>
                    <p className="text-muted-foreground">
                      Isithebe seMbokodo Catering Club will review claims and verify the information provided.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">6. Resolution</h3>
                    <p className="text-muted-foreground">
                      The club will communicate the outcome of the claim, which may include approval, rejection, or a request for additional information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Required Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Completed claim form</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Receipts or invoices</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Proof of service delivery issues</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Correspondence with Isithebe seMbokodo Catering Club</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <Info className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Ensure timely submission of claims</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Provide detailed information and supporting documentation</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Follow up to confirm receipt and status of your claim</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
