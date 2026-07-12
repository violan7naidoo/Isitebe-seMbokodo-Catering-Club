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
import { Goal, Handshake, Lightbulb, Users, Award, Shield, Sparkles } from 'lucide-react';
import { HeroSection } from '@/components/shared/hero-section';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Isithebe seMbokodo's founder, mission, vision, and the objectives that drive our community.",
};

const coreValues = [
  {
    icon: Award,
    title: 'We Serve With Excellence',
    description: 'Delivering professional catering services with pride and passion.',
  },
  {
    icon: Users,
    title: 'We Empower Women',
    description: 'Creating opportunities, skills, and spaces for women to thrive.',
  },
  {
    icon: Handshake,
    title: 'We Build Communities',
    description: 'Working together to uplift and support each other.',
  },
  {
    icon: Shield,
    title: 'We Act With Integrity',
    description: 'Honest, transparent, and accountable in everything we do.',
  },
  {
    icon: Sparkles,
    title: 'We Leave a Lasting Legacy',
    description: 'Building a future where members support one another for generations.',
  },
];

const objectives = [
  {
    icon: Goal,
    title: 'Provide Quality Catering Services',
    description: 'Deliver high-quality catering services to our members during times of need.',
  },
  {
    icon: Handshake,
    title: 'Build Community',
    description: 'Create a supportive community where members can connect, share, and support one another.',
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
  const founderMessage = `My name is Bongiwe Mzana, and I am the Founder and Managing Director of Isithebe seMbokodo Catering Club.

My journey in the catering industry has been built on passion, perseverance, and a deep desire to serve people with dignity, excellence, and love. I have witnessed firsthand the challenges families face when preparing for funerals and life's most important events. The financial burden, the emotional stress, and the lack of support can be overwhelming.

I longed to receive the same support, guidance, and opportunities that I now strive to give to other women. But I learned that sometimes, if you want to see change, you must be the change. So I decided to start the culture myself.

I created Isithebe seMbokodo Catering Club as a movement of women supporting women, families supporting families, and communities uplifting one another.

My vision is to build a legacy of service, empowerment, and excellence that will reach every home, every community, and every member who needs us.

With love and purpose,
Bongiwe Mzana
Founder & Managing Director`;

  return (
    <div className="bg-background">
      <HeroSection
        title="Our Story & Purpose"
        subtitle="Together We Serve. Together We Grow. Together We Thrive."
        primaryButtonText="Become a Member"
        primaryButtonLink="/membership/apply"
        secondaryButtonText="Contact Us"
        secondaryButtonLink="/contact"
        backgroundImage={{
          src: "/images/logo2.png",
          alt: "Isithebe seMbokodo Catering Club event"
        }}
      />

      <section className="container mx-auto px-4">
        <Card className="overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="relative h-64 w-full md:h-full">
                <Image
                  src="/images/founder.jpeg"
                  alt="Bongiwe Mzana, Founder of Isithebe seMbokodo Catering Club"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <CardHeader>
                <CardTitle className="font-headline text-3xl">
                  Message from the Founder
                </CardTitle>
                <CardDescription>Bongiwe Mzana &mdash; Founder &amp; Managing Director</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/80">
                <p className="whitespace-pre-line">{founderMessage}</p>
              </CardContent>
            </div>
          </div>
        </Card>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Why I Chose This Name</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/80">
              <p>
                This name comes from my history, my pain, and my passion. There was a time when I struggled to find support. I wished for a space where women like me could stand together, be uplifted, and grow. Because I couldn&apos;t find that space, I built it.
              </p>
              <p>
                Isithebe seMbokodo is that space. A place where women are empowered, families are supported, and communities are strengthened through compassion, service, and excellence.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">The Meaning of Isithebe seMbokodo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/80">
              <p>
                <strong>&quot;Isithebe&quot;</strong> means Foundation or Support.<br />
                <strong>&quot;seMbokodo&quot;</strong> refers to Women of Strength.
              </p>
              <p className="font-medium text-foreground">
                Together, Isithebe seMbokodo means &quot;The Foundation of Strong Women.&quot;
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Our Core <span className="text-primary">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-headline font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-foreground/80">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
                  We are committed to providing affordable professional catering services for families and communities, delivered with dignity, compassion, and excellence.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>Providing affordable professional catering services for families and communities.</li>
                    <li>Delivering exceptional service with dignity, compassion, and excellence.</li>
                    <li>Supporting members during funerals, weddings, celebrations, and community events.</li>
                    <li>Empowering women and creating sustainable employment opportunities.</li>
                    <li>Developing future hospitality professionals through training and mentorship.</li>
                    <li>Building stronger communities through partnership, service, and Ubuntu.</li>
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
                  To become South Africa&apos;s leading membership-based catering organisation by making professional catering services affordable, accessible, and reliable for every household.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>Every member has access to quality catering services during times of need.</li>
                    <li>Our members are empowered to achieve their full potential.</li>
                    <li>Our club is a symbol of community built on Ubuntu, where families support and uplift one another.</li>
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

      {/* Meet the Founder Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Meet <span className="text-primary">Our Founder</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              The passion behind Isithebe seMbokodo Catering Club
            </p>
          </div>

          <div className="max-w-sm mx-auto">
            <Card className="overflow-hidden group h-full flex flex-col">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/founder.jpeg"
                  alt="Bongiwe Mzana - Founder"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Bongiwe Mzana</CardTitle>
                  <CardDescription className="text-primary font-medium">Founder & Managing Director</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80">
                    With over 15 years in the catering industry, Bongiwe brings expertise and passion to every event. Her vision of creating a supportive membership community has transformed the way families experience catering services.
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
