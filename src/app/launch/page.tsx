import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSection } from '@/components/shared/hero-section';
import { AnimateIn } from '@/components/ui/animate-in';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  Users,
  UtensilsCrossed,
  ChefHat,
  Gift,
  Sparkles,
  Handshake,
  HandCoins,
  ShieldCheck,
  Heart,
  Music,
  Mic,
  Quote,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Launch Event',
  description:
    "You're invited to the official launch of Isithebe seMbokodo Catering Club on 5 September 2026 in KwaBhaca.",
};

const eventDetails = [
  { icon: CalendarDays, label: '5 September 2026' },
  { icon: Clock, label: '12:00 PM' },
  { icon: MapPin, label: 'Lubbs Cozy Corner Guest House, ELubhacweni, KwaBhaca' },
  { icon: Ticket, label: 'R150 per person — tickets are limited' },
];

const whatToExpect = [
  { icon: Users, title: 'Ladies Networking' },
  { icon: UtensilsCrossed, title: 'Live Product Demonstrations' },
  { icon: ChefHat, title: 'Delicious Food Experience' },
  { icon: Gift, title: 'Exclusive Catering Packages' },
  { icon: Sparkles, title: 'Empowerment & Inspiration' },
];

const whyChooseUs = [
  { icon: ChefHat, title: 'Culinary Standards' },
  { icon: Handshake, title: 'Professional Service' },
  { icon: Heart, title: 'Peace of Mind on Your Event Day' },
  { icon: HandCoins, title: 'Affordable Quality Solutions' },
  { icon: ShieldCheck, title: 'Trusted, Reliable & Solution Driven' },
];

const musicJourney = [
  { year: '2020', label: '1st Album', detail: '"(God 1st)"' },
  { year: '2021', label: '1st Single', detail: '"TREASURE" — featuring Zambian artist ThatBoyMassin' },
  { year: '2022', label: '2nd Single', detail: '"NEW LIFE" — featuring Nigerian gospel rapper Snyper' },
  { year: '2022', label: '3rd Single', detail: '"IGAMA LAKHO"' },
  { year: 'Now', label: '4th Album', detail: '"HLALA NAM" — out now' },
];

const beyondTheMic = [
  {
    title: 'Community Builder',
    description: 'Building meaningful connections and creating spaces for growth, unity and transformation.',
  },
  {
    title: 'Founder of Kingdom Shakers Christian',
    description: 'A Kingdom vision with ±50 members, including all 5-fold ministries from different churches.',
  },
  {
    title: 'Founder of Job Seekers Page',
    description: 'A community of more than 360 members providing support, opportunities and assistance with unemployment.',
  },
  {
    title: 'Founder of 3AM',
    description: 'A spiritual coach for new souls who have just received Christ, guiding them on their new journey of faith.',
  },
];

const talksOffered = [
  'Motivational Talks',
  'Bible Talks',
  'Family Talks',
  'Inspirational Talks',
  'Beauty Talks',
  'Spiritual Talks',
];

export default function LaunchPage() {
  return (
    <div className="bg-background">
      <HeroSection
        title="You're Invited to the Launch"
        subtitle="Isithebe seMbokodo Catering Club — A Celebration of Purpose, Passion & Excellence"
        primaryButtonText="Get Your Ticket"
        primaryButtonLink="/contact"
        secondaryButtonText="Meet the Lineup"
        secondaryButtonLink="#lineup"
        backgroundImage={{
          src: '/images/logo2.png',
          alt: 'Isithebe seMbokodo Catering Club event',
        }}
      />

      {/* Event overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 items-center max-w-5xl mx-auto">
            <AnimateIn direction="up">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-xl aspect-[3/4] bg-muted">
                <Image
                  src="/images/thelaunch.png"
                  alt="Launch of Isithebe seMbokodo Catering Club invitation"
                  fill
                  className="object-contain"
                />
              </div>
            </AnimateIn>
            <AnimateIn delay={1} direction="up" className="space-y-6">
              <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary">
                You&apos;re Invited
              </span>
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                A Celebration of Purpose, Passion &amp; a <span className="text-primary">Solution Designed With You in Mind</span>
              </h2>
              <p className="text-lg text-foreground/80">
                Come experience our catering excellence, meet the team, enjoy live demonstrations, and discover packages that will bring peace to your next event.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eventDetails.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-3">
                    <detail.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/90">{detail.label}</span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 text-center">
                <p className="text-foreground/90">
                  This is more than a launch. It&apos;s the beginning of a <span className="font-bold text-primary">movement</span>.
                </p>
                <p className="text-sm text-foreground/70 mt-1">Together, we cater with love. Together, we empower.</p>
              </div>
              <div className="pt-2">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/contact">Book Your Seat Today</Link>
                </Button>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimateIn className="text-center mb-12" direction="up">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              What to Expect at the <span className="text-primary">Launch</span>
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5 max-w-5xl mx-auto">
            {whatToExpect.map((item, index) => (
              <AnimateIn key={item.title} delay={index + 1} direction="up" className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="h-7 w-7" />
                </div>
                <span className="text-sm font-medium text-foreground/90">{item.title}</span>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimateIn className="text-center mb-12" direction="up">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Why Choose <span className="text-primary">Isithebe seMbokodo Catering?</span>
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5 max-w-5xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <AnimateIn key={item.title} delay={index + 1} direction="up" className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="h-7 w-7" />
                </div>
                <span className="text-sm font-medium text-foreground/90">{item.title}</span>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lineup */}
      <section id="lineup" className="py-16 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4">
          <AnimateIn className="text-center mb-16" direction="up">
            <span className="text-sm font-medium text-primary mb-2 inline-block">Meet the Lineup</span>
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              The People Behind the <span className="text-primary">Movement</span>
            </h2>
          </AnimateIn>

          <div className="space-y-16 max-w-5xl mx-auto">
            {/* Host: Bongiwe Mzana */}
            <AnimateIn direction="up">
              <Card className="overflow-hidden shadow-lg">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2">
                    <div className="relative h-72 w-full md:h-full">
                      <Image
                        src="/images/founder.jpeg"
                        alt="Bongiwe Mzana - Founder and Host"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <CardContent className="p-6 md:p-8 space-y-4">
                      <div>
                        <span className="text-sm font-medium text-primary">Meet Your Host</span>
                        <h3 className="font-headline text-2xl font-bold">Bongiwe Mzana</h3>
                        <p className="text-sm text-muted-foreground">Founder of Isithebe seMbokodo Catering Club &middot; 15+ years of catering excellence &middot; Professional Chef &amp; Trainer at Bth Events and Culinary Academy</p>
                      </div>
                      <p className="text-foreground/80">
                        With more than 15 years of experience in the catering industry, Bongiwe has witnessed firsthand the challenges families, organisations and event hosts face when planning successful events. This inspired her to create Isithebe seMbokodo Catering Club — a solution-driven catering service designed to bring peace of mind, professionalism and affordability to every occasion.
                      </p>
                      <p className="text-foreground/80">
                        She is also a Professional Chef and Trainer at Bth Events and Culinary Academy, sharing her culinary expertise and mentoring the next generation of hospitality professionals.
                      </p>
                      <p className="text-foreground/80">
                        &quot;We believe quality catering should be accessible to everyone. Our mission is to deliver exceptional culinary experiences, outstanding customer service and elegant event solutions without placing unnecessary financial pressure on our clients.&quot;
                      </p>
                      <div className="flex gap-3 bg-primary/5 rounded-xl p-4">
                        <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="italic text-foreground/80 text-sm">
                          &quot;Don&apos;t let the pressure of those eating their harvest make you eat your seed. Tyala uzovuna.&quot;
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </AnimateIn>

            {/* MC: Zan the MC */}
            <AnimateIn direction="up">
              <Card className="overflow-hidden shadow-lg">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 order-2 md:order-1">
                    <div className="relative h-72 w-full md:h-full bg-muted">
                      <Image
                        src="/images/Launch3.jpeg"
                        alt="Zan the MC"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3 order-1 md:order-2">
                    <CardContent className="p-6 md:p-8 space-y-4">
                      <div>
                        <span className="text-sm font-medium text-primary">Meet Our MC</span>
                        <h3 className="font-headline text-2xl font-bold">Zan the MC</h3>
                        <p className="text-sm text-muted-foreground">MC &amp; Public Speaker &middot; 4 years in the industry since 2022</p>
                      </div>
                      <p className="text-foreground/80">
                        Zan the MC is a dynamic communicator, passionate about people, purpose and building lasting impact. She continues to inspire, uplift and create platforms where women, families and communities can grow together.
                      </p>
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">Beyond the Mic:</p>
                        <ul className="space-y-2">
                          {beyondTheMic.map((item) => (
                            <li key={item.title} className="flex items-start gap-2">
                              <Mic className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                              <span className="text-sm text-foreground/80"><span className="font-medium text-foreground">{item.title}:</span> {item.description}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </AnimateIn>

            {/* Artist of the Day: Nande Mpambane */}
            <AnimateIn direction="up">
              <Card className="overflow-hidden shadow-lg">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2">
                    <div className="relative h-72 w-full md:h-full bg-muted">
                      <Image
                        src="/images/Launch4.jpeg"
                        alt="Nande Mpambane, Artist of the Day"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <CardContent className="p-6 md:p-8 space-y-4">
                      <div>
                        <span className="text-sm font-medium text-primary">Meet Our Artist of the Day</span>
                        <h3 className="font-headline text-2xl font-bold">Nande Mpambane <span className="text-base font-normal text-muted-foreground">(aka Nande.M)</span></h3>
                        <p className="text-sm text-muted-foreground">Artist &middot; Business Woman &middot; All the way from Port Shepstone, KZN to KwaBhaca</p>
                      </div>
                      <p className="text-foreground/80">
                        Music has always been Nande&apos;s escape and passion, from singing with friends in high school to joining the church choir. Gospel music chose her so she could deliver God&apos;s message to His children through beautiful spiritual melodies.
                      </p>
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Music className="h-4 w-4 text-primary" /> My Music Journey
                        </p>
                        <ul className="space-y-2">
                          {musicJourney.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-xs font-semibold text-primary w-10 flex-shrink-0">{item.year}</span>
                              <span className="text-sm text-foreground/80"><span className="font-medium text-foreground">{item.label}</span> &mdash; {item.detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </AnimateIn>

            {/* Guest Speaker: Intombi Yakwa Langa */}
            <AnimateIn direction="up">
              <Card className="overflow-hidden shadow-lg">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 order-2 md:order-1">
                    <div className="relative h-72 w-full md:h-full bg-muted">
                      <Image
                        src="/images/Launch5.jpeg"
                        alt="Intombi Yakwa Langa, Guest Speaker"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3 order-1 md:order-2">
                    <CardContent className="p-6 md:p-8 space-y-4">
                      <div>
                        <span className="text-sm font-medium text-primary">Meet Our Honorable Guest Speaker</span>
                        <h3 className="font-headline text-2xl font-bold">Intombi Yakwa Langa</h3>
                        <p className="text-sm text-muted-foreground">Preacher &middot; Motivator &middot; Public Speaker &middot; All the way from Bloemfontein to KwaBhaca</p>
                      </div>
                      <p className="text-foreground/80">
                        A woman of purpose, meaning and hope wherever she goes &mdash; a mother, a preacher, a motivator, and a community builder who lives to inspire, lead and serve.
                      </p>
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">She empowers and equips women through:</p>
                        <div className="flex flex-wrap gap-2">
                          {talksOffered.map((talk) => (
                            <span key={talk} className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1">
                              {talk}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 bg-primary/5 rounded-xl p-4">
                        <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="italic text-foreground/80 text-sm">
                          &quot;I am a woman of purpose, called to inspire, lead and serve. I build, I empower, I uplift and I bring hope. This is my season to shake, to speak and to shine.&quot;
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimateIn direction="up">
            <div className="max-w-3xl mx-auto text-center bg-primary/10 rounded-3xl p-10 md:p-14">
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Good Food. Great Memories. Unforgettable Moments.
              </h2>
              <p className="text-lg text-foreground/80 mb-8">
                Tickets are limited &mdash; pay prior to secure your seat at the official launch of Isithebe seMbokodo Catering Club.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/contact">Book Your Seat Today</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/membership">View Membership Packages</Link>
                </Button>
              </div>
              <p className="mt-8 text-sm text-foreground/70">
                065 743 4928 &middot; info@isithebesembokodo.co.za
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
