import Image from 'next/image';
import Link from 'next/link';
import { HeartHandshake, ChefHat, Sprout, CheckCircle, Star, Heart, Users, Shield, Handshake, ArrowRight, Tent, CalendarCheck, GraduationCap, HandCoins, CalendarDays, Clock, MapPin, Ticket } from 'lucide-react';
import { AnimateIn } from '@/components/ui/animate-in';
import styles from './animations.module.css';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeroSection } from '@/components/shared/hero-section';
import placeholderImages from '@/lib/placeholder-images.json';

const testimonials = [
  {
    name: 'Zizipho Dindo',
    avatar: '/images/Zizipho-Dindo.jpg',
    title: 'Empowered Sister',
    testimonial:
      'Joining the "Sisters in Business" program opened so many doors for my small catering business. The financial support and mentorship are invaluable.',
  },
  {
    name: 'Themba Moyo',
    avatar: '/images/Themba-Moyo-2.jpg',
    title: 'Community Leader',
    testimonial:
      'This club is more than just catering; it\'s a movement. It\'s about restoring dignity, building community, and empowering women. We are proud to have them in our community.',
  },
  {
    name: 'Esihle Mhatu',
    avatar: '/images/Esihle.jpg',
    title: 'Valued Member',
    testimonial:
      'For me, joining the organization is not just about convenience—it\'s about empowerment. Knowing that I have a reliable system to lean on allows me to focus on enjoying the moment with my family, friends, and community without the burden of last-minute expenses or overwhelming planning.',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Choose Your Package',
    icon: <Shield className="h-6 w-6" />,
    description:
      'Select the package that best suits your family and budget.',
  },
  {
    step: 2,
    title: 'Complete Your Application',
    icon: <Users className="h-6 w-6" />,
    description:
      'Fill in the online application form and upload your required documents.',
  },
  {
    step: 3,
    title: 'Activate Your Membership',
    icon: <CheckCircle className="h-6 w-6" />,
    description:
      'Pay the registration fee and your first monthly contribution. Once approved, you\'ll receive your Membership Number.',
  },
  {
    step: 4,
    title: 'Book Your Catering Service',
    icon: <Sprout className="h-6 w-6" />,
    description:
      'After the applicable waiting period, simply contact us to book your event. Our professional team will handle the catering while you focus on your family and guests.',
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Rooted in Community. Driven by Excellence. Built for Every Family."
        subtitle="Affordable Catering and Lasting Peace of Mind, Driven by Excellence."
        primaryButtonText="Become a Member"
        primaryButtonLink="/membership/apply"
        secondaryButtonText="View Membership Packages"
        secondaryButtonLink="/membership"
        backgroundImage={{
          src: "/images/logo2.png",
          alt: "Why join Isithebe seMbokodo Catering Club"
        }}
      />

      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 items-center max-w-5xl mx-auto">
            <AnimateIn direction="up">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-xl aspect-[3/2]">
                <Image
                  src="/images/thelaunch.png"
                  alt="Launch of Isithebe seMbokodo Catering Club invitation"
                  fill
                  className="object-contain bg-background"
                />
              </div>
            </AnimateIn>
            <AnimateIn delay={1} direction="up" className="space-y-6">
              <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-primary/20 text-primary">
                Upcoming Event
              </span>
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                You&apos;re Invited to Our <span className="text-primary">Launch Event</span>
              </h2>
              <p className="text-lg text-foreground/80">
                Come, taste, experience and celebrate the Isithebe seMbokodo way &mdash; with live demonstrations of our services and delicious food served on the day.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CalendarDays className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground/90">5 September 2026</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground/90">12:00 PM</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground/90">Lubbs Cozy Corner Guest House, Lubhacweni, KwaBhaca</span>
                </div>
                <div className="flex items-start gap-3">
                  <Ticket className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground/90">R150 per person &mdash; tickets are limited</span>
                </div>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/launch">View Event Details</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Get Your Ticket</Link>
                </Button>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16 items-stretch">
          <div className="space-y-8">
            <AnimateIn delay={1} direction="up">
              <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary mb-2">
                South Africa&apos;s First Membership-Based Catering Organisation
              </span>
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Affordable Catering, <span className="text-primary">Lasting Peace of Mind</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={2} direction="up">
              <div className="space-y-4 text-lg text-foreground/80">
                <p>
                  At Isithebe seMbokodo Catering Club, we believe that every family deserves access to professional catering services without the financial burden that often comes with life&apos;s important occasions.
                </p>
                <p>
                  We are a proudly South African, first membership-based catering organisation that enables individuals and families to prepare for funerals, weddings, graduations, birthdays, traditional ceremonies, church gatherings, and community events through affordable monthly membership contributions.
                </p>
                <p>
                  Our members enjoy access to professional chefs, trained hospitality staff, quality catering equipment, and reliable event support&mdash;allowing families to focus on what truly matters while we take care of the catering.
                </p>
                <p>
                  Beyond catering, we are committed to empowering women, creating employment opportunities for young people, and strengthening communities through hospitality training, entrepreneurship, and skills development.
                </p>
                <p>
                  At Isithebe seMbokodo, we are more than a catering service&mdash;we are a family built on Ubuntu, compassion, excellence, and the belief that together we can make every celebration and every farewell meaningful, dignified, and stress-free.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn delay={3} direction="up" className="pt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/g2.jpeg"
                    alt="Marinated chicken pieces garnished with chives"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/g10.jpeg"
                    alt="Vegetable rice garnished with microgreens"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/g14.jpeg"
                    alt="Potato salad garnished with chives, carrot, and edible flowers"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </AnimateIn>
          </div>
          <AnimateIn delay={4} direction="up" className="relative h-full min-h-[24rem] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={placeholderImages.sharingFood.src}
              alt={placeholderImages.sharingFood.alt}
              data-ai-hint={placeholderImages.sharingFood.hint}
              fill
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
              priority
            />
          </AnimateIn>
        </div>
      </section>

      <section className="bg-muted py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl"></div>
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-secondary/30 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimateIn className="mb-16 text-center" direction="up">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Our Vision &amp; <span className="text-primary">Mission</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Guiding our actions and shaping our community.
            </p>
          </AnimateIn>

          <div className="grid gap-8 md:grid-cols-2">
            <AnimateIn delay={1} direction="up">
              <div className="group h-full rounded-2xl bg-background shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/g9.jpeg"
                    alt="Bongiwe Mzana with the Isithebe seMbokodo catering setup"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"></div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary -mt-14 relative z-10">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardHeader className="p-0 mb-4 text-center">
                    <CardTitle className="font-headline text-2xl">
                      Our Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow flex items-start">
                    <p className="text-foreground/80">
                      To become South Africa&apos;s leading membership-based catering organisation by making professional catering services affordable, accessible, and reliable for every household.
                    </p>
                  </CardContent>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={2} direction="up">
              <div className="group h-full rounded-2xl bg-background shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/g5.jpeg"
                    alt="Chafing dishes of fried and glazed chicken set up at an outdoor event"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"></div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary -mt-14 relative z-10">
                    <Heart className="h-8 w-8" />
                  </div>
                  <CardHeader className="p-0 mb-4 text-center">
                    <CardTitle className="font-headline text-2xl">
                      Our Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <p className="text-foreground/80 mb-3">We are committed to:</p>
                    <ul className="space-y-2 text-left">
                      {[
                        'Providing affordable professional catering services for families and communities.',
                        'Delivering exceptional service with dignity, compassion, and excellence.',
                        'Supporting members during funerals, weddings, celebrations, and community events.',
                        'Empowering women and creating sustainable employment opportunities.',
                        'Developing future hospitality professionals through training and mentorship.',
                        'Building stronger communities through partnership, service, and Ubuntu.',
                      ].map((item) => (
                        <li key={item} className="flex items-start">
                          <CheckCircle className="h-4 w-4 mt-1 mr-2 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn delay={3} direction="up" className="mt-16">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h3 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
                Why Join <span className="text-primary">Isithebe seMbokodo?</span>
              </h3>
            </div>
            <div className="max-w-4xl mx-auto grid gap-4 sm:grid-cols-2">
              {[
                'Affordable monthly membership packages',
                'Professional chefs and trained hospitality staff',
                'Complete catering solutions',
                'Funeral and event catering support',
                'Flexible membership options',
                'Reliable service you can trust',
                'Community empowerment and job creation',
                'Quality, dignity, and peace of mind',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-background/80 rounded-xl p-4 shadow-sm border border-border/30">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                  <span className="text-foreground/90">{item}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <AnimateIn className="text-center mb-16" direction="up">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              A simple path to joining our community of support.
            </p>
          </AnimateIn>
          
          <div className="relative">
            {/* Connector line for desktop */}
            <div className="absolute left-0 right-0 top-16 h-0.5 bg-gradient-to-r from-transparent via-border/30 to-transparent hidden lg:block" />
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((item, index) => (
                <AnimateIn 
                  key={item.step} 
                  delay={index * 2} 
                  direction="up"
                  className="relative"
                >
                  <div className="group relative h-full bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/20">
                    {/* Step number with gradient background */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white font-headline text-xl font-bold shadow-lg">
                        {item.step}
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <div className="flex justify-center mb-6 pt-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-headline text-xl font-bold mb-3 text-center text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-foreground/80 text-center">
                      {item.description}
                    </p>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-background to-muted/50 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimateIn className="max-w-4xl mx-auto text-center mb-16 relative" direction="up">
            <span className="text-sm font-medium text-primary mb-4 inline-block">South Africa&apos;s First Membership-Based Catering Organisation</span>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              What Membership <span className="relative">
                Gives You
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-primary/20 -z-10 rounded-full"></span>
              </span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              More than catering&mdash;your membership gives your family professional support, peace of mind, and access to affordable event services when they matter most.
            </p>
          </AnimateIn>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <ChefHat className="h-8 w-8 text-primary" />,
                title: "Professional Catering Services",
                description: "Qualified chefs, trained hospitality staff, quality equipment, and professional food service for funerals, weddings, traditional ceremonies, birthdays, graduations, church gatherings, and community events.",
              },
              {
                icon: <Heart className="h-8 w-8 text-primary" />,
                title: "Peace of Mind",
                description: "Plan ahead with affordable monthly contributions so your family can focus on supporting one another while we take care of the catering.",
              },
              {
                icon: <Tent className="h-8 w-8 text-primary" />,
                title: "Complete Catering Equipment",
                description: "Access to catering equipment based on your package, including serving stations, tables, chairs, tents, mobile refrigeration, serving utensils, and buffet setup.",
              },
              {
                icon: <CalendarCheck className="h-8 w-8 text-primary" />,
                title: "Easy Booking Process",
                description: "A simple booking system with dedicated planning support from our experienced team to help ensure your event runs smoothly.",
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-primary" />,
                title: "Skills Development & Job Creation",
                description: "We invest in women and young people by providing hospitality training, work experience, and employment opportunities within the catering industry.",
              },
              {
                icon: <Handshake className="h-8 w-8 text-primary" />,
                title: "Community Partnership",
                description: "Become part of a caring membership community built on Ubuntu, where families support one another and receive reliable, professional service.",
              },
            ].map((item, index) => (
              <AnimateIn
                key={index}
                delay={index + 1}
                direction="up"
                className="group relative bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-headline font-bold mb-3 text-foreground">{item.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{item.description}</p>
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none"></div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn direction="up" className="mt-20">
            <div className="max-w-5xl mx-auto text-center mb-10">
              <h3 className="font-headline text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Why Families <span className="text-primary">Choose Us</span>
              </h3>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-2 gap-6 lg:grid-cols-4">
              {[
                { icon: <Users className="h-7 w-7" />, stat: '200+', label: 'Guests catered per Essential and Comfort package' },
                { icon: <Users className="h-7 w-7" />, stat: '300+', label: 'Guests catered under the Premium Package' },
                { icon: <ChefHat className="h-7 w-7" />, stat: '', label: 'Professional Chefs & Hospitality Team' },
                { icon: <HandCoins className="h-7 w-7" />, stat: '', label: 'Affordable Monthly Membership Plans' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-border/50">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {item.icon}
                  </div>
                  {item.stat && (
                    <span className="font-headline text-3xl font-bold text-primary mb-1">{item.stat}</span>
                  )}
                  <span className="text-sm text-foreground/80">{item.label}</span>
                </div>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn direction="up" className="mt-20">
            <div className="max-w-3xl mx-auto text-center bg-primary/10 rounded-3xl p-10 md:p-14">
              <h3 className="font-headline text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Ready to Become a Member?
              </h3>
              <p className="text-lg text-foreground/80 mb-8">
                Join Isithebe seMbokodo Catering Club today and secure affordable professional catering support for your family&apos;s future events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/membership/apply">Become a Member</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/membership">View Membership Packages</Link>
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>

      </section>
      
      <section className="container mx-auto px-4">
        <AnimateIn className="mb-12 text-center" direction="up">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            From Our Sisters
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Real stories from the heart of our community.
          </p>
        </AnimateIn>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimateIn key={index} delay={index * 0.2} direction="up" className="h-full">
              <Card className="flex flex-col h-full">
                <CardContent className="pt-6 pb-4 flex-grow overflow-hidden">
                  <div className="h-full flex flex-col">
                    <p className="italic text-foreground/80 line-clamp-5">
                      &quot;{testimonial.testimonial}&quot;
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center gap-4 pt-0">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-foreground/70">{testimonial.title}</p>
                  </div>
                </CardFooter>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimateIn className="mb-12 text-center" direction="up">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Our <span className="text-primary">Membership</span> Packages
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Choose the package that best suits your family and budget.
            </p>
          </AnimateIn>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-background rounded-lg overflow-hidden shadow-lg border border-border/50">
              <thead className="bg-primary/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/90 uppercase tracking-wider">Package</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/90 uppercase tracking-wider">Registration Fee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/90 uppercase tracking-wider">Monthly Contribution</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/90 uppercase tracking-wider">Guests Covered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">Essential Package</td>
                  <td className="px-6 py-4 whitespace-nowrap">R200 (once-off)</td>
                  <td className="px-6 py-4 whitespace-nowrap">R150 &ndash; R200/month</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">Up to 200 guests</td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">Comfort Package</td>
                  <td className="px-6 py-4 whitespace-nowrap">R200 (once-off)</td>
                  <td className="px-6 py-4 whitespace-nowrap">R250 &ndash; R300/month</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">Up to 200 guests</td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors bg-primary/5">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-foreground">Premium Package</td>
                  <td className="px-6 py-4 whitespace-nowrap">R200 (once-off)</td>
                  <td className="px-6 py-4 whitespace-nowrap">From R390/month*</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-primary">Up to 300 guests</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-sm text-foreground/60">*Premium monthly contribution depends on the number and age band of family members covered.</p>
          </div>

          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link href="/membership">
                View Membership Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimateIn direction="up">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div>
                    <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
                      Membership Packages
                    </span>
                    <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl mb-4">
                      Find the <span className="text-primary">Right Package</span> for Your Family
                    </h2>
                    <p className="text-lg text-foreground/80">
                      From reliable funeral support to full event catering for up to 300 guests, our three membership packages grow with your family&apos;s needs.
                    </p>
                  </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Essential Package</h3>
                      <p className="text-foreground/80 text-sm">Reliable funeral catering support for up to 200 guests, from R150/month</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Comfort Package</h3>
                      <p className="text-foreground/80 text-sm">Everything in Essential, plus a fully set-up serving tent (200 chairs, 20 tables) and a mobile fridge</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Premium Package</h3>
                      <p className="text-foreground/80 text-sm">Everything in Comfort, plus food for up to 300 guests, extra serving and kitchen staff</p>
                    </div>
                  </div>
                </div>

                  <div className="pt-4">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                      <Link href="/membership">Compare All Packages</Link>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/woman-support.jpg"
                      alt="Professional catering team serving a family event"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-background/5 to-transparent"></div>
                  </div>
                  <p className="text-center text-foreground/80 italic">
                    "Professional catering, whichever package you choose."
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="bg-primary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimateIn direction="up">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="text-center md:text-left">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                      Empowering <span className="text-primary">Women &amp; Youth</span>
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80">
                      Creating jobs and building skills in the catering industry
                    </p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-foreground/90">
                      Every Essential, Comfort, and Premium membership contribution helps us invest back into our community. As our membership grows, so does our ability to:
                    </p>

                    <ul className="space-y-3">
                      {[
                        'Provide hospitality training and work experience for young people',
                        'Create sustainable employment opportunities for women in the catering industry',
                        'Support entrepreneurship and skills development across our community',
                        'Strengthen local communities through partnership, service, and Ubuntu'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-foreground/90">
                      Every package you choose helps fund this mission&mdash;because catering with us means catering with purpose.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-border/50">
                  <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-6">
                      Ready to Join Our Family?
                    </h2>
                    <p className="text-lg text-foreground/80 mb-8">
                      Become a part of a caring membership community that supports and uplifts your family. Your journey towards affordable, professional catering starts here.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link href="/membership/apply">Become a Member</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link href="/membership">View Membership Packages</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

    </div>
  );
}
