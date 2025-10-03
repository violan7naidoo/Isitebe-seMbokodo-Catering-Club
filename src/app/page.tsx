import Image from 'next/image';
import Link from 'next/link';
import { HeartHandshake, ChefHat, Sprout, CheckCircle, Star, Heart, Users, Shield, Handshake } from 'lucide-react';
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
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
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
      'Select a membership package that best suits your needs, from basic funeral support to comprehensive event and business support.',
  },
  {
    step: 2,
    title: 'Join the Sisterhood',
    icon: <Users className="h-6 w-6" />,
    description:
      'Pay a once-off joining fee to become a full member of our supportive and growing community of sisters.',
  },
  {
    step: 3,
    title: 'Access Benefits',
    icon: <CheckCircle className="h-6 w-6" />,
    description:
      'After a standard waiting period, you gain full access to our catering services and community support for your family\'s needs.',
  },
  {
    step: 4,
    title: 'Grow With Us',
    icon: <Sprout className="h-6 w-6" />,
    description:
      'Participate in our empowerment programs, from business support to wellness sessions, and contribute to the strength of our sisterhood.',
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Isithebe seMbokodo"
        subtitle=""
        primaryButtonText="Join Our Sisterhood"
        primaryButtonLink="/membership"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
        backgroundImage={{
          src: "/images/logo2.png",
          alt: "Isithebe seMbokodo Catering Club event"
        }}
      />

      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <AnimateIn delay={1} direction="up">
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Rooted in Community, Serving with <span className="text-primary">Heart</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={2} direction="up">
              <p className="text-lg text-foreground/80">
                Isithebe seMbokodo Catering Club is a unique membership-based organization that provides catering services for funerals and other family events. Our club is built on the principle of sisterhood and mutual support, where members contribute a premium to access our catering services. We aim to empower our sisters by creating job and business opportunities in the catering industry.
              </p>
            </AnimateIn>
            <AnimateIn delay={3} direction="up" className="pt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/gallery-3.jpg"
                    alt="Our catering team in action"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/gallery-5.jpg"
                    alt="Event catering showcase"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/gallery-7.jpg"
                    alt="Happy guests at our events"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </AnimateIn>
          </div>
          <AnimateIn delay={4} direction="up" className="relative h-96 w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={placeholderImages.sharingFood.src}
              alt={placeholderImages.sharingFood.alt}
              data-ai-hint={placeholderImages.sharingFood.hint}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
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
              Our Core <span className="text-primary">Principles</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Guiding our actions and shaping our community.
            </p>
          </AnimateIn>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimateIn delay={1} direction="up">
              <div className="group h-full rounded-2xl bg-background shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/gallery-5.jpg"
                    alt="Our Mission in Action"
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
                  <CardContent className="p-0 flex-grow flex items-start">
                    <p className="text-foreground/80">
                      To provide quality catering services to our members during times of need, while building a strong sense of community and support among sisters.
                    </p>
                  </CardContent>
                </div>
              </div>
            </AnimateIn>
            
            <AnimateIn delay={2} direction="up">
              <div className="group h-full rounded-2xl bg-background shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/gallery-6.jpg"
                    alt="Our Vision for the Future"
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
                      To become a leading catering club in South Africa, known for our commitment to quality, community, and sisterhood, where every member is empowered.
                    </p>
                  </CardContent>
                </div>
              </div>
            </AnimateIn>
            
            <AnimateIn delay={3} direction="up">
              <div className="group h-full rounded-2xl bg-background shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/gallery-23.jpg"
                    alt="Beautiful food presentation"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"></div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary -mt-14 relative z-10">
                    <Sprout className="h-8 w-8" />
                  </div>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="font-headline text-2xl">
                      Our Aim
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow flex items-start">
                    <p className="text-foreground/80">
                      To deliver an excellent service and create a lifetime legacy for our members, working together to ensure growth, success, and a lasting impact.
                    </p>
                  </CardContent>
                </div>
              </div>
            </AnimateIn>
          </div>
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
            <span className="text-sm font-medium text-primary mb-4 inline-block">Our Services</span>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              What We <span className="relative">
                Offer
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-primary/20 -z-10 rounded-full"></span>
              </span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              More than just food, we offer a pillar of support that strengthens our community from within.
            </p>
          </AnimateIn>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <ChefHat className="h-8 w-8 text-primary" />,
                title: "Catering Services",
                description: "Delicious and nutritious meals for funerals and other family events, prepared with care and cultural sensitivity.",
                delay: 100
              },
              {
                icon: <HeartHandshake className="h-8 w-8 text-primary" />,
                title: "Family Support",
                description: "Our membership structure provides a strong support network for members and their families during life's most challenging moments.",
                delay: 200
              },
              {
                icon: <Sprout className="h-8 w-8 text-primary" />,
                title: "Economic Empowerment",
                description: "Creating sustainable job and business opportunities that foster financial independence and community growth.",
                delay: 300
              }
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

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimateIn direction="up">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div>
                    <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
                      Financial Empowerment
                    </span>
                    <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl mb-4">
                      Introducing <span className="text-primary">Umgalelo Package</span>
                    </h2>
                    <p className="text-lg text-foreground/80">
                      Join our community-driven initiative, designed to provide financial support and empowerment to our sisters.
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
                      <h3 className="font-medium text-foreground">Access Financial Assistance</h3>
                      <p className="text-foreground/80 text-sm">No traditional lending institutions or credit score worries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Supportive Community</h3>
                      <p className="text-foreground/80 text-sm">Tap into a network of sisters committed to helping one another thrive</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Grow Without Stress</h3>
                      <p className="text-foreground/80 text-sm">Pursue your business or passion without financial burdens</p>
                    </div>
                  </div>
                </div>
                
                  <div className="pt-4">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                      <Link href="/membership">Join the Movement</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/woman-support.jpg"
                      alt="Women entrepreneurs supporting each other"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-background/5 to-transparent"></div>
                  </div>
                  <p className="text-center text-foreground/80 italic">
                    "We're here for you, Sis!"
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
                      Empowering <span className="text-primary">Sisters in Business</span>
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80">
                      Supporting women entrepreneurs to grow and thrive in the catering industry
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-foreground/90">
                      At Isithebe seMbokodo Catering Club, we're dedicated to supporting our sisters in business. Our mission is to empower and uplift women entrepreneurs by:
                    </p>
                    
                    <ul className="space-y-3">
                      {[
                        'Marketing their businesses to reach a wider audience',
                        'Providing effective marketing strategies to drive growth',
                        'Identifying new trends and opportunities to help them stay ahead',
                        'Sparking innovative ideas to fuel their success'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <p className="text-foreground/90">
                      As your trusted partner, Isithebe seMbokodo Catering Club is committed to being your source of support, guidance, and inspiration. Together, let's elevate your business and celebrate your achievements!
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-border/50">
                  <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-6">
                      Ready to Join Our Family?
                    </h2>
                    <p className="text-lg text-foreground/80 mb-8">
                      Become a part of a sisterhood that cares, supports, and uplifts. Your journey towards empowerment and community starts here.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link href="/membership">Become a Member</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link href="/about">Learn More</Link>
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
