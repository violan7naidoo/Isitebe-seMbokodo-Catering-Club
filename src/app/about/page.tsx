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
import { AnimateIn } from '@/components/ui/animate-in';
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
        subtitle=""
        primaryButtonText="Join Our Sisterhood"
        primaryButtonLink="/membership"
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
                <div className="space-y-6">
                  <p>
                    Molweni bantu abahle! My name is Thembakazi Ntsantsa, a wellness coach and a single mother of three lovely daughters - Abenathi, Yololwethu, and Mikhulu - from Bizana. When Bii shared her vision of creating a Sisters' Club, I was immediately on board. As someone who's experienced the challenges of support during family events firsthand, I understand the stress involved, and I believe our communities deserve better.
                  </p>
                  
                  <p className="font-medium">Our initiative aims to:</p>
                  
                  <ol className="list-decimal pl-6 space-y-3">
                    <li className="pl-2">
                      <span className="font-medium">Ease the burden</span> on catering during significant events like funerals, weddings, and gatherings through shared catering support from Isithebe SeMbokodo.
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">Support all family members</span>, especially oMakoti who often carry the burden of imbiza emakhaya and miss out on fully participating in ceremonies.
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">Promote wellness</span>, learning, and knowledge sharing on health, balance, and overall mental wellbeing.
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">Unite families and communities</span>, highlighting the strength that comes from togetherness.
                    </li>
                  </ol>

                  <p>
                    We envision a community where families can come together, support one another, and celebrate life's milestones without added stress of catering. Our Club Isithebe seMbokodo will provide a platform for sharing, learning to support one another, and growing together.
                  </p>

                  <p>
                    We invite you Sisters to join us in making this vision a reality. Together, we can build a stronger, more supportive community that values support, dignity, relief, and connection. Ndiyabonga, Enkosi
                  </p>
                </div>
              </CardContent>
            </div>
            <div className="md:col-span-2 order-1 md:order-2">
              <div className="relative h-64 w-full md:h-full">
                <Image
                  src="/images/gallery-1.jpg"
                  alt="Thembakazi Ntsantsa - Team Leader at Isithebe seMbokodo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="container mx-auto px-4 py-16">
        <Card className="overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 order-2 md:order-1">
              <div className="relative h-64 w-full md:h-full">
                <Image
                  src="/images/nobonke.jpg"
                  alt="Nobonke Nokeni - Team Leader at Isithebe seMbokodo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <CardHeader>
                <CardTitle className="font-headline text-3xl">
                  Message from Nobonke
                </CardTitle>
                <CardDescription>Nobonke Nokeni - Team Leader at Isithebe seMbokodo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/80">
                <div className="space-y-6">
                  <p>
                    Molweni Bantu bakuthi!
                  </p>
                  
                  <p>
                    Igama ndingu Nobonke Nokeni, I am from Flagstaff. I'm really passionate about Isithebe seMbokodo Catering Club because it's all about empowering women nationwide - supporting their families, contributing to communities, and building a stronger network of women.
                  </p>
                  
                  <p>
                    As someone in the catering business, I know firsthand the struggles people face when it comes to affording quality catering services. That's why I'm excited to join the team in this initiative project - I want to be part of the solution. I'd love to become a sister that's there for people, providing support and care through food that brings us together.
                  </p>
                  
                  <p>
                    I think it's so important to open up job opportunities and create spaces where women can share experiences, uplift each other, and grow together. Financial independence is a game-changer for women's autonomy and status, both in their communities and at home.
                  </p>
                  
                  <div className="space-y-2">
                    <p className="font-medium italic">
                      Ngeke uphinde uthwale umthwalo uwedwa, Isithebe seMbokodo sikhona.
                    </p>
                    <p className="text-sm text-foreground/80 pl-4 italic">
                      You'll never have to carry the burden alone again with Isithebe seMbokodo being here for you
                    </p>
                  </div>
                  
                  <p className="text-right font-medium">
                    Nobonke Nokeni
                  </p>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </section>

      <section className="container mx-auto px-4 py-16">
        <AnimateIn direction="left">
          <Card className="overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2">
                <div className="relative h-64 w-full md:h-full">
                  <Image
                    src="/images/nande.jpg"
                    alt="Nande Mpambane - Partner at Isithebe seMbokodo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="font-headline text-3xl">
                    A Message from Nande
                  </CardTitle>
                  <CardDescription>Nande Mpambane - Team Leader at Isithebe seMbokodo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground/80">
                  <div className="space-y-6">
                    <p>
                      Molweni, Sanibonani, Lekai, Makweras sei! Welcome, beautiful people of our beautiful nation! I'm Nande Mpambane, originally from the Eastern Cape but raised in KZN. I greet you in different languages because that's what Isithebe is all about - unity and empowerment. We bring together women from all over the country to work together and succeed.
                    </p>
                    
                    <p>
                      As the Bible says, "The husband is the head of the wife" (Ephesians 5:23), but let's not forget the neck that supports the head! Imbokodo is that neck that brings families together, providing essential services that allow them to bond during life's most challenging and busiest moments, such as funerals and celebrations.
                    </p>
                    
                    <p>
                      At Isithebe seMbokodo, we take care of the smallest yet most crucial details of your events, including food and catering. From the moment you call us, we take full responsibility for delivering with love, dignity, and kindness. Join us, and you won't want to miss out on this opportunity to be served with excellence!
                    </p>
                    
                    <p className="text-right font-medium">
                      Nande Mpambane
                    </p>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </AnimateIn>
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
                    <li>Our club is a symbol of sisterhood and community, where women support and uplift one another.</li>
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

      {/* Meet the Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Meet <span className="text-primary">Our Team</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              The passionate individuals behind Isithebe seMbokodo Catering Club
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Bongiwe Mzana */}
            <Card className="overflow-hidden group h-full flex flex-col">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/gallery-2.jpg"
                  alt="Bongiwe Mzana - Founder"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Bongiwe Mzana</CardTitle>
                  <CardDescription className="text-primary font-medium">Founder & Catering Director</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80">
                    With over 15 years in the catering industry, Bongiwe brings expertise and passion to every event. Her vision of creating a supportive sisterhood has transformed the way communities experience catering services.
                  </p>
                </CardContent>
              </div>
            </Card>

            {/* Thembakazi Ntsantsa */}
            <Card className="overflow-hidden group h-full flex flex-col">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/gallery-1.jpg"
                  alt="Thembakazi Ntsantsa - Partner"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Thembakazi Ntsantsa</CardTitle>
                  <CardDescription className="text-primary font-medium">Health & Wellness Partner</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80">
                    A dedicated Health, Safety, and Environmental professional and wellness coach, Thembakazi ensures that our services promote not just great food, but overall wellbeing for our members and their communities.
                  </p>
                </CardContent>
              </div>
            </Card>

            {/* Nande Mpambane */}
            <Card className="overflow-hidden group h-full flex flex-col">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/nande.jpg"
                  alt="Nande Mpambane - Team Leader"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Nande Mpambane</CardTitle>
                  <CardDescription className="text-primary font-medium">Operations & Community Team Leader</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80">
                    Hailing from the Eastern Cape and raised in KZN, Nande brings a unique perspective on unity and empowerment. Her dedication to bringing women together from all over the country helps strengthen our community bonds and service delivery.
                  </p>
                </CardContent>
              </div>
            </Card>

            {/* Nobonke Nokeni */}
            <Card className="overflow-hidden group h-full flex flex-col">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/nobonke.jpg"
                  alt="Nobonke Nokeni - Team Leader"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Nobonke Nokeni</CardTitle>
                  <CardDescription className="text-primary font-medium">Catering & Business Development</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80">
                    A passionate advocate for women's empowerment, Nobonke is dedicated to creating opportunities for women in the catering industry. Her experience and commitment help drive our mission of financial independence and community support.
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
