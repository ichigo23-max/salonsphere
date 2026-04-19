import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share2, Bookmark, Clock, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export async function generateStaticParams() {
  try {
    if (!process.env.DATABASE_URL?.startsWith("mongodb")) return [];
    const posts = await prisma.blogPost.findMany({
      select: { slug: true }
    });
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (e) {
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Fetch post from DB
  let post = null;
  try {
    if (process.env.DATABASE_URL?.startsWith("mongodb")) {
      post = await prisma.blogPost.findUnique({
        where: { slug }
      });
    }
  } catch (e) {
    console.warn("Database not ready during build.");
  }

  // Fallback for demo
  const fallbackPost = {
    luxury: {
      title: "10 Luxury Hair Care Tips for Summer",
      content: `
        <p>Keeping your hair healthy during the summer months requires more than just a simple wash and go. The sun, salt water, and chlorine can all take a toll on your hair's health and vibrancy.</p>
        <br/>
        <h3>1. UV Protection for Your Hair</h3>
        <p>Just as you protect your skin from the sun, your hair needs protection too. Look for hair products that contain UV filters or wear a chic wide-brimmed hat when spending long hours outdoors.</p>
        <br/>
        <h3>2. Deep Conditioning Treatments</h3>
        <p>Incorporate a weekly deep conditioning mask into your routine. This helps restore moisture lost to heat and environment, keeping your locks silky and manageable.</p>
        <br/>
        <h3>3. Professional Glossing</h3>
        <p>Visit the salon for a glossing treatment once a month. This acts as a protective shield and adds a layer of intense shine that reflects the summer light beautifully.</p>
      `,
      excerpt: "Keep your hair glowing and hydrated during the hottest months with our expert guide.",
      author: "Elena Rossi",
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=80",
      createdAt: new Date("2024-05-15")
    }
  };

  const displayPost = post || fallbackPost.luxury;

  if (!displayPost && !fallbackPost.luxury) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow">
        {/* Hero Header */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <img 
            src={displayPost.image || ""} 
            alt={displayPost.title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
               <Link href="/blog">
                 <Button variant="ghost" className="mb-8 p-0 hover:bg-transparent -ml-2 text-foreground/80 hover:text-primary transition-colors">
                   <ChevronLeft className="mr-2 h-4 w-4" /> Back to Articles
                 </Button>
               </Link>
               <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none italic">{displayPost.title}</h1>
               <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> {displayPost.author}</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {format(displayPost.createdAt, "MMMM d, yyyy")}</span>
                  <div className="flex gap-4 ml-auto">
                     <Share2 className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
                     <Bookmark className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 max-w-4xl">
           <div 
             className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed font-serif italic"
             dangerouslySetInnerHTML={{ __html: displayPost.content }}
           />
           
           <div className="mt-20 border-t pt-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 bg-secondary/20 rounded-[40px]">
                 <div className="space-y-2">
                    <h4 className="text-xl font-bold uppercase italic">Loved this article?</h4>
                    <p className="text-sm">Subscribe to our newsletter for more beauty secrets and tips.</p>
                 </div>
                 <div className="flex gap-4 w-full md:w-auto">
                    <Button className="rounded-xl px-8 h-12 uppercase font-bold tracking-widest text-xs">Stay Informed</Button>
                 </div>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
