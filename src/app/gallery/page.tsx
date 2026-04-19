"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { galleryImages } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-24">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl uppercase mb-4">The Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A visual showcase of our sanctuary for wellness, aesthetic mastery, and client transformations.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[1200px] md:h-[800px]">
          {galleryImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative overflow-hidden rounded-3xl border bg-secondary/10 group cursor-pointer",
                i === 0 && "md:col-span-2 md:row-span-2",
                i === 1 && "md:col-span-2",
                i === 2 && "md:col-span-1",
                i === 5 && "md:col-span-1"
              )}
            >
              <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-6 left-6 opacity-0 transition-all transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Portfolio</p>
                <h3 className="text-xl font-bold">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
           <p className="text-sm text-muted-foreground font-medium uppercase tracking-[0.2em]">Want to see more?</p>
           <h4 className="text-2xl font-bold mt-2 lowercase">follow us @lumina_salon</h4>
        </div>
      </main>

      <Footer />
    </div>
  );
}
