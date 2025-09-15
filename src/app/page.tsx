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
    name: 'Noluthando Khumalo',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    title: 'Grateful Member',
    testimonial:
      'Isithebe seMbokodo was a pillar of strength for my family during a difficult time. The support and professionalism were beyond words. It felt like family helping family.',
  },
  {
    name: 'Siphiwe Zulu',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    title: 'Empowered Sister',
    testimonial:
      "Joining the 'Sisters in Business' program opened so many doors for my small catering business. The financial support and mentorship are invaluable.",
  },
  {
    name: 'Themba Moyo',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    title: 'Community Leader',
    testimonial:
      'This club is more than just catering; it’s a movement. It’s about restoring dignity, building community, and empowering women. We are proud to have them in our community.',
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
        subtitle="A sisterhood providing strength, support, and exceptional catering for life's most significant moments."
        primaryButtonText="Join Our Sisterhood"
        primaryButtonLink="/membership"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
      />

      <section className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          <section className="py-20">
            <div className="container mx-auto px-4">
              <AnimateIn className="mx-auto max-w-3xl text-center">
                <AnimateIn delay={1} direction="up">
                  <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                    Rooted in Community, Serving with <span className="text-primary">Heart</span>
                  </h2>
                </AnimateIn>
                <AnimateIn delay={2} direction="up">
                  <p className="mt-6 text-lg text-foreground/80">
                    Isithebe seMbokodo Catering Club is a unique membership-based organization providing catering services for funerals and other family events. Our mission is to support our members during their most challenging times while fostering a strong sense of community and sisterhood.
                  </p>
                </AnimateIn>
              </AnimateIn>
            </div>
          </section>
          <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg animate-fade-in slide-in-from-right-8 duration-700 md:h-full">
            <Image
              src={placeholderImages.sharingFood.src}
              alt={placeholderImages.sharingFood.alt}
              data-ai-hint={placeholderImages.sharingFood.hint}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <AnimateIn className="mb-12 text-center" direction="up">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Our Core <span className="text-primary">Principles</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Guiding our actions and shaping our community.
            </p>
          </AnimateIn>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimateIn delay={1} direction="up">
              <div className="group relative h-full rounded-xl bg-background p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-3 text-foreground">Our Mission</h3>
                <p className="text-foreground/80">
                  To provide quality catering services to our members during times of need, while building a strong sense of community and support among sisters.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn delay={2} direction="up">
              <div className="group relative h-full rounded-xl bg-background p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-3 text-foreground">Our Vision</h3>
                <p className="text-foreground/80">
                  To become a leading catering club in South Africa, known for
                  our commitment to quality, community, and sisterhood, where
                  every member is empowered.
                </p>
              </div>
            </AnimateIn>
            <Card className="text-center transition-transform hover:scale-105 hover:shadow-xl animate-fade-in-up animation-delay-400">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Sprout className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-2xl">
                  Our Aim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  To deliver an excellent service and create a lifetime legacy for our members, working together to ensure growth, success, and a lasting impact.
                </p>
              </CardContent>
            </Card>
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
          <div className="max-w-4xl mx-auto text-center mb-16 relative">
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
          </div>
          
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
              <div 
                key={index}
                className={`group relative bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-1 ${styles.fadeInUp} ${item.delay === 100 ? styles.delay100 : item.delay === 200 ? styles.delay200 : styles.delay300}`}
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-headline font-bold mb-3 text-foreground">{item.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{item.description}</p>
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
        
      </section>
      
      <section className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            From Our Sisters
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Real stories from the heart of our community.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col animate-fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
              <CardContent className="pt-6 flex-grow">
                <p className="italic text-foreground/80">
                  &quot;{testimonial.testimonial}&quot;
                </p>
              </CardContent>
              <CardFooter className="flex items-center gap-4">
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
          ))}
        </div>
      </section>

      <section className="bg-primary/10">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Ready to Join Our Family?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                Become a part of a sisterhood that cares, supports, and uplifts. Your journey towards empowerment and community starts here.
            </p>
            <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/membership">Become a Member Today</Link>
                </Button>
            </div>
        </div>
      </section>

    </div>
  );
}
