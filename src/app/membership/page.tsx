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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Membership Packages',
  description:
    'Choose the Isithebe seMbokodo Catering Club membership package that fits your family: Essential, Comfort, or Premium.',
};

const packages = [
  {
    slug: 'essential',
    name: 'Essential Package',
    bestFor: 'Best for: Families seeking reliable funeral catering support.',
    servesUpTo: 'Serves up to 200 guests',
    registrationFee: 'R200 (Once-off)',
    monthlyContribution: 'R150 - R200',
    nonMemberPrice: 'R15,000 for a once-off service (non-members)',
    features: [
      'All catering equipment (stoves, gas, pots, plates, cutlery, glasses, serving spoons, etc.)',
      'Catering service – chefs to cook, serve, and manage',
      'Event setup and clean-up',
    ],
    provides: 'Food is not included. Member provides the food.',
    ctaLabel: 'Join Essential Package',
  },
  {
    slug: 'comfort',
    name: 'Comfort Package',
    bestFor: null,
    servesUpTo: 'Serves up to 200 guests',
    registrationFee: 'R200',
    monthlyContribution: 'From R250 - R300',
    nonMemberPrice: 'R30,000 for a once-off service (non-members)',
    features: [
      'Everything in Essential, plus:',
      'Serving tent – fully set up (200 chairs, 20 tables, serving points)',
      'Mobile fridge',
    ],
    provides: 'Food is not included. Member provides the food.',
    ctaLabel: 'Join Comfort Package',
  },
  {
    slug: 'premium',
    name: 'Premium Package',
    bestFor: null,
    servesUpTo: 'Serves up to 300 guests',
    registrationFee: 'R200',
    monthlyContribution: 'From R390*',
    nonMemberPrice: 'We quote according to family members (non-members)',
    features: [
      'Everything in Comfort, plus:',
      'Food for 300 people (breakfast and lunch for the funeral or event)',
      'Additional food items and refreshments',
      'Extra serving and kitchen staff for large events',
    ],
    provides: null,
    ctaLabel: 'Join Premium Package',
    highlight: true,
  },
];

const policies = [
    {
        title: "Membership Policy",
        content: (
            <div className="space-y-4">
                <p><strong>Purpose:</strong><br />
                Isithebe seMbokodo is a collective organization that aims to provide affordable professional catering services and empowerment to its members. This policy outlines the membership requirements, benefits, and responsibilities.</p>

                <div>
                    <p className="font-semibold">Membership Eligibility:</p>
                    <p>Membership is open to individuals who:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Meet the specified eligibility criteria for each package</li>
                        <li>Agree to abide by the rules and regulations of Isithebe seMbokodo</li>
                        <li>Pay the required contributions on time</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Membership Benefits:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Access to professional catering services and support</li>
                        <li>Support from a community built on Ubuntu</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Membership Responsibilities:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Pay contributions on time</li>
                        <li>Adhere to the rules and regulations of Isithebe seMbokodo</li>
                        <li>Provide accurate and truthful information</li>
                        <li>Nominate beneficiaries and keep information up-to-date</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Package Details:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Different packages have varying benefits, waiting periods, and requirements</li>
                        <li>Members must choose a package that suits their needs and adhere to its terms</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Termination of Membership:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Membership may be terminated due to non-payment of contributions or breach of rules and regulations. If you skip 3 months your membership will be automatically terminated.</li>
                        <li>Members may also choose to terminate their membership by providing written notice. The registration fee is non-refundable, and any refunds will be handled in accordance with the Membership Agreement and applicable South African law.</li>
                    </ul>
                </div>

                <p><strong>Amendments to Policy:</strong><br />
                Isithebe seMbokodo reserves the right to amend this policy as necessary. Members will be notified of any changes.</p>

                <p><strong>Acceptance:</strong><br />
                By joining Isithebe seMbokodo, members acknowledge that they have read, understood, and agree to abide by this policy.</p>
            </div>
        )
    },
    {
        title: "Waiting Periods",
        content: (
            <div className="space-y-4">
                <p>To ensure fairness and the long-term sustainability of the Club, the following waiting periods apply equally to all members:</p>
                <ul className="list-disc pl-6 space-y-1 mt-1">
                    <li><strong>Funerals:</strong> 3 months</li>
                    <li><strong>Weddings, birthdays, graduations, traditional ceremonies, and other events:</strong> 12 months</li>
                </ul>
                <p>Waiting periods are based on the date your membership becomes active, not on the amount or frequency of your payment. Paying your membership in advance (including as an annual lump sum) does not waive, shorten, or remove the applicable waiting periods.</p>
            </div>
        )
    },
    {
        title: "Confidentiality Policy",
        content: (
            <div className="space-y-4">
                <p><strong>Purpose:</strong><br />
                This policy outlines the confidentiality requirements for Isithebe seMbokodo members, business partners, team members, and employees.</p>

                <div>
                    <p className="font-semibold">Confidential Information:</p>
                    <p>Confidential information includes, but is not limited to:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Member personal and financial information</li>
                        <li>Business strategies and plans</li>
                        <li>Financial records and reports</li>
                        <li>Proprietary information and trade secrets</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Protection of Personal Information (POPI Act):</p>
                    <p>Isithebe seMbokodo adheres to the Protection of Personal Information Act (POPI Act) and is committed to protecting the personal information of its members, employees, and business partners. We ensure that all personal information is:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Collected lawfully and processed with consent</li>
                        <li>Used only for the intended purpose</li>
                        <li>Kept secure and protected against unauthorized access</li>
                        <li>Not retained for longer than necessary</li>
                    </ul>
                </div>

                <p><strong>Acknowledgement:</strong><br />
                By accessing confidential information, individuals acknowledge that they have read, understood, and agree to abide by this confidentiality policy and the POPI Act.</p>
            </div>
        )
    },
    {
        title: "Dispute Resolution Policy",
        content: (
            <div className="space-y-4">
                <p><strong>Purpose:</strong><br />
                This policy outlines the procedures for resolving disputes that may arise between members, business partners, team members, or employees of Isithebe seMbokodo.</p>

                <div>
                    <p className="font-semibold">Dispute Resolution Process:</p>
                    <ol className="list-decimal pl-6 space-y-2 mt-1">
                        <li><strong>Internal Resolution:</strong> Parties involved in the dispute will attempt to resolve the issue through internal discussions and negotiations.</li>
                        <li><strong>Mediation:</strong> If internal resolution is unsuccessful, a neutral third-party mediator will be appointed to facilitate a resolution.</li>
                        <li><strong>Arbitration:</strong> If mediation is unsuccessful, the dispute will be referred to arbitration in accordance with the Arbitration Act.</li>
                        <li><strong>Litigation:</strong> As a last resort, disputes may be resolved through litigation.</li>
                    </ol>
                </div>

                <div>
                    <p className="font-semibold">Timeframes:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Internal resolution: 7-14 days</li>
                        <li>Mediation: 14-30 days</li>
                        <li>Arbitration: 30-60 days</li>
                    </ul>
                </div>

                <p><strong>Confidentiality:</strong><br />
                All parties involved in the dispute resolution process will maintain confidentiality.</p>
            </div>
        )
    }
];

export default function MembershipPage() {
  return (
    <div className="bg-background">
      <HeroSection
        title="Choose the Membership That Fits Your Family"
        subtitle="South Africa's First Membership-Based Catering Organisation"
        primaryButtonText="Apply for Membership"
        primaryButtonLink="/membership/apply"
        secondaryButtonText="Member Benefits"
        secondaryButtonLink="/membership/benefits"
        backgroundImage={{
          src: "/images/logo2.png",
          alt: "Isithebe seMbokodo Catering Club event"
        }}
      />

      <section id="membership-packages" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl mb-4">Membership Packages</h2>
          <p className="text-foreground/80 max-w-3xl mx-auto">
            At Isithebe seMbokodo Catering Club, we understand that every family has different needs. That&apos;s why we offer affordable membership packages designed to provide professional catering support for life&apos;s most important occasions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
          {packages.map((pkg) => (
            <Card
              key={pkg.slug}
              className={`h-full flex flex-col transition-all duration-300 hover:shadow-md border-border/50 hover:border-primary/30 ${pkg.highlight ? 'border-primary shadow-lg' : ''}`}
            >
              <CardHeader>
                {pkg.highlight && <Badge className="w-fit mb-2">Most Popular</Badge>}
                <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                <CardDescription className="font-medium text-primary">{pkg.servesUpTo}</CardDescription>
                {pkg.bestFor && <CardDescription>{pkg.bestFor}</CardDescription>}
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground">Registration Fee:</span>
                    <span className="font-semibold">{pkg.registrationFee}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground">Monthly Contribution:</span>
                    <span className="text-2xl font-bold text-primary">{pkg.monthlyContribution}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className={feature.startsWith('Everything in') ? 'font-medium text-sm text-foreground' : 'flex items-start'}>
                      {!feature.startsWith('Everything in') && (
                        <Check className="h-4 w-4 mt-1 mr-2 text-green-500 flex-shrink-0" />
                      )}
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {pkg.provides && (
                  <p className="mt-4 text-sm text-muted-foreground italic">{pkg.provides}</p>
                )}
                {pkg.nonMemberPrice && (
                  <p className="mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">{pkg.nonMemberPrice}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" size="lg" variant={pkg.highlight ? 'default' : 'outline'}>
                  <Link href={`/membership/apply?package=${pkg.slug}`}>
                    {pkg.ctaLabel}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-foreground/60">*Premium monthly contribution depends on the number and age band of family members covered.</p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/membership/how-it-works">See How It Works</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/membership/faq">Read the FAQ</Link>
          </Button>
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
