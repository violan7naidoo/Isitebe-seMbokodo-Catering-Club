import Image from 'next/image';
import type { Metadata } from 'next';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Goal, Handshake, Lightbulb, Users } from 'lucide-react';
import { HeroSection } from '@/components/shared/hero-section';
import placeholderImages from '@/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Isithebe seMbokodo's founder, mission, vision, and the objectives that drive our community.",
};

const objectives = [
  {
    icon: Goal,
    title: 'Provide Quality Catering Services',
    description: 'Deliver high-quality catering services to our members during times of need.',
  },
  {
    icon: Handshake,
    title: 'Foster Sisterhood',
    description: 'Create a supportive community where sisters can connect, share, and support one another.',
  },
  {
    icon: Users,
    title: 'Empower Women',
    description: 'Provide job and business opportunities for women in the catering industry, promoting financial independence and growth.',
  },
  {
    icon: Lightbulb,
    title: 'Community Engagement',
    description: 'Engage with the community through health awareness programs, mental health support, and other initiatives.',
  },
];

export default function AboutPage() {
  const founderMessage = `My name is Bongiwe Mzana, and I'm proud to be a daughter of the rural community. With over 15 years of experience in the catering industry, I've witnessed firsthand the struggles families face when hosting funerals and events. The financial burden of hiring a catering company can be overwhelming, and often, family members sacrifice their own time and energy to prepare meals for their guests. I saw a gap that needed to be bridged, and that's why I founded Isithebe seMbokodo Catering Club.

My vision is to create a network of sisters who support one another in times of need. Our club provides catering services, job opportunities, and business support to our members. We believe in the power of sisterhood and the importance of having a support structure in place. Our goal is to empower women, create jobs, and build a strong sense of community.

I'm passionate about making a difference in the lives of our members and their families. I believe that together, we can achieve great things and build a brighter future for ourselves and our communities. Join us, and let's build a network of sisters who uplift and support one another.`;

  return (
    <div className="bg-background">
      <HeroSection 
        title="Our Story & Purpose"
        subtitle="Discover the heart and soul behind Isithebe seMbokodo Catering Club."
        primaryButtonText="Join Our Sisterhood"
        primaryButtonLink="/membership"
        secondaryButtonText="Contact Us"
        secondaryButtonLink="/contact"
        backgroundImage={{
          src: "/images/gallery-4.jpg",
          alt: "Isithebe seMbokodo Catering Club event setup"
        }}
      />

      <section className="container mx-auto px-4">
        <Card className="overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="relative h-64 w-full md:h-full">
                <Image
                  src="/images/gallery-2.jpg"
                  alt="Isithebe seMbokodo Catering Club team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <CardHeader>
                <CardTitle className="font-headline text-3xl">
                  Message from the Founder
                </CardTitle>
                <CardDescription>Bongiwe Mzana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/80">
                <p className="whitespace-pre-line">{founderMessage}</p>
              </CardContent>
            </div>
          </div>
        </Card>
      </section>

      <section className="container mx-auto px-4 py-16">
        <Card className="overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-3 order-2 md:order-1">
              <CardHeader>
                <CardTitle className="font-headline text-3xl">
                Molweni bantu abahle!
                </CardTitle>
                <CardDescription>Thembakazi Ntsantsa - Health, Safety, and Environmental Professional & Wellness Coach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/80">
                <p className="whitespace-pre-line">
                  Molweni bantu abahle! My name is Thembakazi Ntsantsa, employed full time, a wellness coach and a single mother of three lovely daughters - Abenathi, Yololwethu, and Mikhulu - from Bizana. When Bii shared her vision of creating a Sisters' Club, I was immediately on board. As someone who's experienced the challenges of support when having family events firsthand I know the stress, and I believe our communities deserve better.

Our initiative aims to:

1. Ease the burden on catering during significant events like funerals, weddings, and gatherings through shared catering support from Isithebe SeMbokodo.
2. Ensure all family members, especially oMakoti whom always carry the burden of imbiza emakhaya and missing out in fully participate in ceremonies.
3. Promote wellness, learning, and knowledge sharing on health, balance, and overall mental wellbeing.
4. Unite families and communities, highlighting the strength that comes from togetherness.

We envision a community where families can come together, support one another, and celebrate life's milestones without added stress of catering. Our Club Isithebe seMbokodo will provide a platform for sharing, learning to support one another, and growing together.

We invite you Sisters to join us in making this vision a reality. Together, we can build a stronger, more supportive community that values support, dignity, relief, and connection. Ndiyabonga, Enkosi
                </p>
              </CardContent>
            </div>
            <div className="md:col-span-2 order-1 md:order-2">
              <div className="relative h-64 w-full md:h-full">
                <Image
                  src="/images/gallery-1.jpg"
                  alt="Thembakazi Ntsantsa - Partner at Isithebe seMbokodo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="container mx-auto px-4">
        <Tabs defaultValue="mission" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mission">Mission</TabsTrigger>
            <TabsTrigger value="vision">Vision</TabsTrigger>
            <TabsTrigger value="objectives">Objectives</TabsTrigger>
          </TabsList>
          <TabsContent value="mission" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Our Mission Statement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg">
                <p>
                  Our mission is to provide quality catering services to our members
                  during times of need, while building a strong sense of community
                  and support among sisters.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>Deliver high-quality catering services that exceed our members&apos; expectations.</li>
                    <li>Create a supportive community of sisters who can connect, share, and support one another.</li>
                    <li>Empower women through job creation and business opportunities in the catering industry.</li>
                    <li>Provide support and resources to our members during difficult times.</li>
                    <li>Promote financial independence and economic growth among our members.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="vision" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Our Vision for the Future
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg">
                <p>
                  Our vision is to become a leading catering club in South Africa,
                  known for our commitment to quality, community, and sisterhood.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>Every member has access to quality catering services during times of need.</li>
                    <li>Our members are empowered to achieve their full potential.</li>
                    <li>Our club is a symbol of sisterhood and community.</li>
                    <li>We are recognized as a leader in the catering industry for excellence and innovation.</li>
                    <li>Our members are able to build a brighter future for themselves and their families.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="objectives" className="mt-8">
             <div className="grid gap-6 sm:grid-cols-2">
                {objectives.map((objective, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <objective.icon className="h-8 w-8 text-primary" />
                            <CardTitle className="font-headline text-xl">{objective.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-foreground/80">{objective.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
