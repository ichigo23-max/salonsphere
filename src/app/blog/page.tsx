import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function BlogPage() {
  // Fetch blog posts from DB
  let posts: any[] = [];
  try {
    if (process.env.DATABASE_URL?.startsWith("mongodb")) {
      posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" }
      });
    }
  } catch (e) {
    console.warn("Database not ready during build.");
  }

  // Fallback / Featured posts if DB is empty for demo
  const fallbackPosts = [
    {
      id: "1",
      slug: "luxury-hair-care-tips",
      title: "10 Luxury Hair Care Tips for Summer",
      excerpt: "Keep your hair glowing and hydrated during the hottest months with our expert guide.",
      author: "Elena Rossi",
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
      createdAt: new Date("2024-05-15")
    },
    {
      id: "2",
      slug: "skincare-routine-guide",
      title: "Mastering Your 10-Step Skincare Routine",
      excerpt: "The ultimate guide to achieving that glass skin look with modern skincare techniques.",
      author: "Marco V",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
      createdAt: new Date("2024-06-01")
    }
  ];

  const displayPosts = posts.length > 0 ? posts : fallbackPosts;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-6xl font-black uppercase tracking-tighter italic">The Lumina Blog</h1>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mt-4">Industry trends & beauty secrets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="group cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] mb-6 shadow-2xl">
                    <img 
                      src={post.image || ""} 
                      alt={post.title} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                       <span className="text-[10px] uppercase font-bold tracking-widest bg-primary text-primary-foreground px-3 py-1 rounded-full mb-3 inline-block">
                         Beauty
                       </span>
                       <h2 className="text-2xl font-bold text-white line-clamp-2">{post.title}</h2>
                    </div>
                  </div>
                  
                  <div className="space-y-4 px-4">
                    <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                       <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                       <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 min read</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Read Article <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
