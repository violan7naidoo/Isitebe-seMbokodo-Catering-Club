import type { Metadata } from 'next';
import { HeroSection } from '@/components/shared/hero-section';
import { Check } from 'lucide-react';
import { ApplicationForm } from './ApplicationForm';

export const metadata: Metadata = {
  title: 'Apply for Membership',
  description: 'Apply online to become a member of Isithebe seMbokodo Catering Club.',
};

const requiredDocuments = [
  'Certified copy of your South African ID',
  'Proof of residence (not older than 3 months)',
  'Details of your dependants (if applicable)',
  'Beneficiary information',
  'Banking details (for debit order, if selected)',
  'Proof of payment of the R200 registration fee (where applicable)',
];

const VALID_PACKAGES = ['essential', 'comfort', 'premium'] as const;

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedPackage = resolvedSearchParams?.package;
  const defaultPackage = (VALID_PACKAGES as readonly string[]).includes(requestedPackage ?? '')
    ? (requestedPackage as (typeof VALID_PACKAGES)[number])
    : undefined;

  return (
    <div className="bg-background">
      <HeroSection
        title="Become Part of the Isithebe seMbokodo Family"
        subtitle="Joining is quick and secure."
        primaryButtonText="Membership Packages"
        primaryButtonLink="/membership"
        secondaryButtonText="FAQ"
        secondaryButtonLink="/membership/faq"
        backgroundImage={{
          src: '/images/logo2.png',
          alt: 'Isithebe seMbokodo Catering Club event',
        }}
      />

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl mb-12">
          <h2 className="font-headline text-2xl font-bold tracking-tight md:text-3xl mb-4 text-center">
            Before You Apply
          </h2>
          <p className="text-foreground/80 text-center mb-6">Please have the following ready:</p>
          <ul className="space-y-3 max-w-md mx-auto">
            {requiredDocuments.map((doc) => (
              <li key={doc} className="flex items-start">
                <Check className="h-5 w-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                <span className="text-foreground/90">{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto max-w-4xl">
          <ApplicationForm defaultPackage={defaultPackage} />
        </div>
      </section>
    </div>
  );
}
