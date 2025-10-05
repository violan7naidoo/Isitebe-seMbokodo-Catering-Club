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
      'Contribute R50 (umgalelo) for fellow sister events'
    ],
  },
  {
    name: 'Sisters in Business',
    price: 'R150',
    joiningFee: 'R500',
    description: 'For entrepreneurs seeking growth.',
    features: [
      'All Premium Package benefits',
      'Access to business financial support (T&Cs apply)'
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
    { 
        title: "Membership Policy", 
        content: (
            <div className="space-y-4">
                <p><strong>Purpose:</strong><br />
                Isithebe seMbokodo is a collective organization that aims to provide financial support and empowerment to its members. This policy outlines the membership requirements, benefits, and responsibilities.</p>
                
                <div>
                    <p className="font-semibold">Membership Eligibility:</p>
                    <p>Membership is open to individuals who:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Meet the specified eligibility criteria for each package</li>
                        <li>Agree to abide by the rules and regulations of Isithebe seMbokodo</li>
                        <li>Pay the required premiums on time</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Membership Benefits:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Access to financial support and assistance</li>
                        <li>Opportunity to participate in Umgalelo and Sisters in Business initiatives</li>
                        <li>Support from a community of like-minded individuals</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Membership Responsibilities:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Pay premiums on time</li>
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
                        <li>Membership may be terminated due to non-payment of premiums or breach of rules and regulations</li>
                        <li>Members may also choose to terminate their membership by providing written notice</li>
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
        title: "Benefit Policy", 
        content: (
            <div className="space-y-4">
                <p><strong>Purpose:</strong><br />
                This policy outlines the benefits provided by Isithebe seMbokodo to its members.</p>
                
                <div>
                    <p className="font-semibold">Benefits:</p>
                    <ol className="list-decimal pl-6 space-y-2 mt-1">
                        <li><strong>Financial Support:</strong> Members can access financial assistance to support their business or personal needs.</li>
                        <li><strong>Umgalelo Package:</strong> Members can participate in the Umgalelo package, which provides financial support and empowerment.</li>
                        <li><strong>Sisters in Business:</strong> Members can benefit from the Sisters in Business initiative, which provides support and resources for women in business.</li>
                        <li><strong>Support Network:</strong> Members become part of a supportive community of like-minded individuals.</li>
                    </ol>
                </div>

                <div>
                    <p className="font-semibold">Benefit Details:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Benefits vary depending on the package chosen by the member.</li>
                        <li>Members must meet the eligibility criteria and adhere to the rules and regulations to access benefits.</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Claiming Benefits:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Members must follow the claiming process outlined by Isithebe seMbokodo.</li>
                        <li>Benefits will be paid out according to the terms and conditions of the package.</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Benefit Limitations:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Benefits are limited to biological family members only.</li>
                        <li>Benefits may not be payable in certain circumstances, such as non-payment of premiums or breach of rules and regulations.</li>
                    </ul>
                </div>

                <p><strong>Beneficiary Nomination:</strong><br />
                Members must nominate a beneficiary to receive benefits in the event of their passing.</p>
            </div>
        )
    },
    { 
        title: "Umgalelo Policy", 
        content: (
            <div className="space-y-4">
                <p><strong>Purpose:</strong><br />
                The Umgalelo package is a collective financial support initiative where members contribute to support one another in times of need.</p>
                
                <div>
                    <p className="font-semibold">Member Agreement:</p>
                    <p>Members who enter the Umgalelo package must sign an agreement to:</p>
                    <ol className="list-decimal pl-6 space-y-1 mt-1">
                        <li>Contribute to the collective fund as required.</li>
                        <li>Repay the contributions received from other members in a timely manner.</li>
                    </ol>
                </div>

                <div>
                    <p className="font-semibold">No Tolerance for Non-Compliance:</p>
                    <p>Isithebe seMbokodo has a zero-tolerance policy for members who fail to comply with the rules and regulations of the Umgalelo package. Members who attempt to take advantage of the system or fail to meet their obligations will face consequences.</p>
                </div>

                <div>
                    <p className="font-semibold">Consequences of Non-Compliance:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Failure to contribute to the collective fund will result in the lapse of premiums.</li>
                        <li>Failure to repay contributions received from other members will result in legal action being taken against the member.</li>
                    </ul>
                </div>

                <p><strong>Terms of Repayment:</strong><br />
                Members who receive Umgalelo contributions are required to repay the full amount contributed by other members. Failure to do so will be considered a breach of the agreement.</p>

                <p><strong>Legal Action:</strong><br />
                In the event of non-repayment, Isithebe seMbokodo reserves the right to pursue legal action against the member to recover the outstanding amount.</p>

                <p><strong>No Chancers Allowed:</strong><br />
                We emphasize that no chancers will be tolerated in the Umgalelo package. All members are expected to abide by the rules and regulations, and any attempts to exploit or manipulate the system will be dealt with swiftly and fairly.</p>

                <p><strong>Acknowledgement:</strong><br />
                By participating in the Umgalelo package, members acknowledge that they have read, understood, and agree to abide by the terms and conditions outlined in this policy.</p>
            </div>
        )
    },
    { 
        title: "Sisters in Business Policy", 
        content: (
            <div className="space-y-4">
                <p><strong>Purpose:</strong><br />
                The Sisters in Business package is a collective support initiative designed to empower women in business, particularly black-owned businesses that have faced historical disadvantages. Our aim is to provide a platform for growth, exposure, and success.</p>
                
                <div>
                    <p className="font-semibold">Objectives:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Support the growth and development of black-owned businesses and women-led enterprises.</li>
                        <li>Provide a platform for women to market their businesses and reach a larger audience.</li>
                        <li>Foster a community of like-minded women who support and uplift each other.</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Member Agreement:</p>
                    <p>Members who enter the Sisters in Business package must sign an agreement to:</p>
                    <ol className="list-decimal pl-6 space-y-1 mt-1">
                        <li>Contribute to the collective fund as required.</li>
                        <li>Repay the contributions received from other members in a timely manner.</li>
                    </ol>
                </div>

                <div>
                    <p className="font-semibold">Benefits:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Access to financial support and resources.</li>
                        <li>Exposure to a larger market through our platforms and networks.</li>
                        <li>Opportunities for business growth and development.</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">No Tolerance for Non-Compliance:</p>
                    <p>Isithebe seMbokodo has a zero-tolerance policy for members who fail to comply with the rules and regulations of the Sisters in Business package. Members who attempt to take advantage of the system or fail to meet their obligations will face consequences.</p>
                </div>

                <div>
                    <p className="font-semibold">Consequences of Non-Compliance:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Failure to contribute to the collective fund will result in the lapse of premiums.</li>
                        <li>Failure to repay contributions received from other members will result in legal action being taken against the member.</li>
                    </ul>
                </div>

                <p><strong>Terms of Repayment:</strong><br />
                Members who receive support from the Sisters in Business package are required to repay the full amount contributed by other members. Failure to do so will be considered a breach of the agreement.</p>

                <p><strong>Legal Action:</strong><br />
                In the event of non-repayment, Isithebe seMbokodo reserves the right to pursue legal action against the member to recover the outstanding amount.</p>

                <p><strong>No Chancers Allowed:</strong><br />
                We emphasize that no chancers will be tolerated in the Sisters in Business package. All members are expected to abide by the rules and regulations, and any attempts to exploit or manipulate the system will be dealt with swiftly and fairly.</p>

                <p><strong>Growing Your Business:</strong><br />
                As members of this package, we aim to grow your business by exposing it to a larger market. We believe in the potential of women-led businesses and are committed to supporting their growth and success.</p>

                <p><strong>Acknowledgement:</strong><br />
                By participating in the Sisters in Business package, members acknowledge that they have read, understood, and agree to abide by the terms and conditions outlined in this policy.</p>
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
                    <p className="font-semibold">Scope:</p>
                    <p>This policy applies to all individuals who have access to confidential information, including:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Members of Isithebe seMbokodo</li>
                        <li>Business partners</li>
                        <li>Team members</li>
                        <li>Employees</li>
                    </ul>
                </div>

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
                    <p className="font-semibold">Confidentiality Obligations:</p>
                    <p>Individuals with access to confidential information must:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Keep confidential information secure and protected</li>
                        <li>Not disclose confidential information to unauthorized parties</li>
                        <li>Use confidential information only for authorized purposes</li>
                        <li>Return or destroy confidential information when no longer needed</li>
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

                <div>
                    <p className="font-semibold">Consequences of Breach:</p>
                    <p>Failure to maintain confidentiality and adhere to the POPI Act may result in:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Termination of membership or partnership</li>
                        <li>Legal action</li>
                        <li>Disciplinary action, up to and including termination of employment</li>
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
                    <p className="font-semibold">Scope:</p>
                    <p>This policy applies to all disputes related to Isithebe seMbokodo's activities, including but not limited to:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Membership disputes</li>
                        <li>Business partnership disputes</li>
                        <li>Employment disputes</li>
                        <li>Contractual disputes</li>
                    </ul>
                </div>

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
                    <p className="font-semibold">Principles:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                        <li>Fairness and impartiality</li>
                        <li>Timely resolution</li>
                        <li>Confidentiality</li>
                        <li>Respect for all parties involved</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Procedure:</p>
                    <ol className="list-decimal pl-6 space-y-1 mt-1">
                        <li>Notify Isithebe seMbokodo's management team of the dispute.</li>
                        <li>Provide detailed information about the dispute.</li>
                        <li>Follow the dispute resolution process outlined above.</li>
                    </ol>
                </div>

                <div>
                    <p className="font-semibold">Timeframes:</p>
                    <p>Disputes will be resolved in a timely manner, with the following timeframes:</p>
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
                  <span>Umgalelo Package has a joining fee of <span className="font-semibold text-foreground">R500</span>.</span>
                </li>
                <li className="flex items-start">
                  <Info className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>Sisters in Business Package has a joining fee of <span className="font-semibold text-foreground">R500</span>.</span>
                </li>
                <li className="flex items-start">
                  <Info className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>Take both packages together for a <span className="font-semibold text-foreground">25% discount</span> and pay only <span className="font-semibold text-foreground">R750</span> total joining fee (save R250).</span>
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
