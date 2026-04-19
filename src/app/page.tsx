import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceCard from "@/components/booking/ServiceCard";
import ReviewCard from "@/components/shared/ReviewCard";
import Marquee from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";
import { services, reviews } from "@/lib/mock-data";
import { ArrowRight, Sparkles, Star, Scissors, Heart, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 text-center">
        <div className="absolute inset-0 z-0 radial-gradient-custom opacity-20" />
        
        <div className="container relative z-10 mx-auto max-w-4xl">
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border bg-secondary/50 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Experience New York's Finest Salon</span>
            </div>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tighter md:text-7xl lg:text-8xl">
            Unveil Your Most <span className="text-primary italic">Radiant</span> Self
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Where luxury meets artistry. Discover bespoke hair styling, relaxing spa treatments, and premium skincare in the heart of the city.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/book">
              <Button size="lg" className="h-14 px-8 text-lg font-bold">
                Book Your Transformation
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold">
                View Gallery
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 border-t pt-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">4.9/5</span>
              <div className="flex text-primary">
                <Star className="h-4 w-4 fill-primary" />
                <Star className="h-4 w-4 fill-primary" />
                <Star className="h-4 w-4 fill-primary" />
                <Star className="h-4 w-4 fill-primary" />
                <Star className="h-4 w-4 fill-primary" />
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Google Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-secondary/10 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-5xl uppercase">Our Signature Services</h2>
              <p className="text-muted-foreground">Expertly crafted for your unique style and rejuvenation.</p>
            </div>
            <Link href="/book">
              <Button variant="ghost" className="group text-primary font-bold">
                View All Services <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
             <div className="flex flex-col items-center text-center gap-4">
              <div className="rounded-2xl bg-primary/10 p-5 text-primary">
                <Scissors className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">Master Stylists</h3>
              <p className="text-muted-foreground">Years of expertise in cutting-edge trends and timeless classics.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="rounded-2xl bg-primary/10 p-5 text-primary">
                <Heart className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">Personalized Care</h3>
              <p className="text-muted-foreground">Tailored consultations to ensure your results exceed expectations.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="rounded-2xl bg-primary/10 p-5 text-primary">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">Premium Products</h3>
              <p className="text-muted-foreground">We use only the finest organic and high-performance beauty brands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section className="bg-background py-24 overflow-hidden border-y">
        <div className="container mx-auto px-4 mb-12 text-center">
           <h2 className="text-3xl font-bold tracking-tight uppercase">Voices of Joy</h2>
           <p className="text-muted-foreground">Don't just take our word for it—see what our clients say.</p>
        </div>
        
        <Marquee pauseOnHover className="[--duration:30s]">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {/* Repeat reviews for seamless effect */}
          {reviews.map((review) => (
            <ReviewCard key={review.id + '-rep'} review={review} />
          ))}
        </Marquee>
      </section>

      {/* Instagram Preview Placeholder */}
      <section className="py-24 bg-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12">
            <h2 className="mb-2 text-3xl font-bold tracking-tight uppercase">Follow the Journey</h2>
            <p className="text-muted-foreground">Join our community @LuminaSalon</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="aspect-square relative overflow-hidden rounded-2xl bg-neutral-200 group">
                <div className="absolute inset-0 bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                   {/* Instagram icon or image would go here */}
                </div>
              </div>
            ))}
          </div>
          
          {/* Hook for future Instagram integration */}
          <script dangerouslySetInnerHTML={{ __html: `
            // Hook for future Instagram API integration
            function loadInstagramFeed() {
                console.log("Future Instagram Integration Hook Called");
            }
          `}} />
        </div>
      </section>
      
      <Footer />
    </>
  );
}
