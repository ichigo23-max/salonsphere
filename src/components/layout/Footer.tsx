import Link from "next/link";
import { Scissors, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
              <div className="rounded-full bg-primary p-1.5 text-primary-foreground">
                <Scissors className="h-5 w-5" />
              </div>
              <span>LUMINA</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Elevating your natural beauty through expert care and modern techniques.
            </p>
            <div className="flex gap-4">
              <Instagram className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary cursor-pointer" />
              <Facebook className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary cursor-pointer" />
              <Youtube className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">Services</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/book" className="hover:text-primary">Hair Styling</Link></li>
              <li><Link href="/book" className="hover:text-primary">Spa & Wellness</Link></li>
              <li><Link href="/book" className="hover:text-primary">Nail Artistry</Link></li>
              <li><Link href="/book" className="hover:text-primary">Skin Care</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">Salon</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/gallery" className="hover:text-primary">Our Gallery</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Lumina Blog</Link></li>
              <li><Link href="/rewards" className="hover:text-primary">Loyalty Rewards</Link></li>
              <li><Link href="/gift-cards" className="hover:text-primary">Gift Cards</Link></li>
              <li><Link href="/support" className="hover:text-primary">Help & Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">Hours</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>Mon - Fri: 9am - 8pm</li>
              <li>Saturday: 10am - 6pm</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Lumina Salon & Wellness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
