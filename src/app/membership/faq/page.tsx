import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroSection } from '@/components/shared/hero-section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers to common questions about Isithebe seMbokodo Catering Club membership.',
};

const faqs = [
  {
    question: 'Who can become a member?',
    answer: 'Anyone aged 18 years or older with a valid South African ID can apply.',
  },
  {
    question: 'What is the joining fee?',
    answer: 'A once-off, non-refundable registration fee of R200.',
  },
  {
    question: 'What are the waiting periods?',
    answer: (
      <>
        <ul className="list-disc pl-6 space-y-1">
          <li>Funerals: 3 months</li>
          <li>Weddings, birthdays, graduations, traditional ceremonies, and other events: 12 months</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Can I add family members?',
    answer: 'Yes. Registered dependants may be covered in accordance with your membership package.',
  },
  {
    question: 'What happens if I miss a payment?',
    answer: 'Your membership may be suspended until all outstanding contributions are paid, and if you skip 3 months your membership will be automatically terminated.',
  },
  {
    question: 'Can I cancel my membership?',
    answer: 'Yes. Written notice is required. The registration fee is non-refundable, and any refunds will be handled in accordance with the Membership Agreement and applicable South African law.',
  },
  {
    question: 'How do I book catering?',
    answer: 'Contact our office once you have completed the applicable waiting period. Our team will assist you with planning and confirming your booking.',
  },
  {
    question: 'Where do you provide services?',
    answer: 'We currently serve KwaBhaca, the Eastern Cape, and surrounding areas, with expansion planned to other provinces soon.',
  },
  {
    question: 'Can I pay my annual membership in one lump sum?',
    answer: (
      <div className="space-y-3">
        <p>
          Yes. Members may choose to pay 12 months of membership contributions in advance as a once-off annual payment.
        </p>
        <p>
          Paying annually can make budgeting easier and helps ensure your membership remains active for the full 12-month period, provided you continue to comply with the Membership Agreement.
        </p>
        <p>
          Please note: Paying your membership in advance does not waive, shorten, or remove the applicable waiting periods. Waiting periods are based on the date your membership becomes active, not on the amount or frequency of your payment. These waiting periods apply equally to all members to ensure fairness and the long-term sustainability of the Club.
        </p>
        <p className="font-medium">For example:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>If you pay 12 months upfront on 1 January, your 3-month funeral waiting period will still end on 1 April.</li>
          <li>Your 12-month waiting period for weddings, graduations, birthdays, traditional ceremonies, and other qualifying events will still end on 1 January of the following year.</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'I paid for the whole year upfront. Can the waiting period be reduced?',
    answer: (
      <div className="space-y-3">
        <p>
          No. The waiting periods are a standard condition of membership and apply equally to every member, regardless of whether contributions are paid monthly or annually.
        </p>
        <p>
          Annual payment keeps your membership active and avoids missed monthly payments, but it does not provide immediate access to benefits or shorten the waiting period.
        </p>
      </div>
    ),
  },
];

export default function FAQPage() {
  return (
    <div className="bg-background">
      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Answers to help you feel confident about joining Isithebe seMbokodo"
        primaryButtonText="Apply for Membership"
        primaryButtonLink="/membership/apply"
        secondaryButtonText="Membership Packages"
        secondaryButtonLink="/membership"
        backgroundImage={{
          src: '/images/logo2.png',
          alt: 'Isithebe seMbokodo Catering Club event',
        }}
      />

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-headline text-lg text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 text-center">
            <p className="text-foreground/80 mb-6">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/membership/apply">Apply for Membership</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
