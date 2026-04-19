"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Share2, Users, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialPage() {
  const instagramPosts = [
    { id: 1, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80", likes: 120, comments: 14 },
    { id: 2, image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80", likes: 245, comments: 22 },
    { id: 3, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80", likes: 89, comments: 5 },
    { id: 4, image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80", likes: 156, comments: 18 },
    { id: 5, image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=400&q=80", likes: 312, comments: 45 },
    { id: 6, image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=400&q=80", likes: 178, comments: 12 },
  ];

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Lumina Salon & Wellness',
        text: 'Join me at Lumina for the ultimate beauty experience.',
        url: window.location.origin,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-6xl font-black uppercase tracking-tighter italic mb-4">Social Hub</h1>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Connect with the Lumina community</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Social Stats & Sharing */}
            <div className="lg:col-span-1 space-y-8">
               <Card className="rounded-[40px] bg-gradient-to-br from-pink-500 to-primary p-8 text-white border-none shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                    <Instagram className="h-48 w-48" />
                  </div>
                  <div className="relative z-10">
                     <h3 className="text-2xl font-bold uppercase italic mb-2">@LuminaSalon</h3>
                     <p className="text-sm opacity-80 mb-8 font-bold">Follow us for daily inspo</p>
                     
                     <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                           <p className="text-3xl font-black">25.4K</p>
                           <p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Followers</p>
                        </div>
                        <div>
                           <p className="text-3xl font-black">1.2M</p>
                           <p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Views</p>
                        </div>
                     </div>
                     
                     <Button variant="secondary" className="w-full rounded-2xl h-12 font-bold gap-2">
                        <Instagram className="h-4 w-4" /> Open Instagram
                     </Button>
                  </div>
               </Card>

               <Card className="rounded-[40px] p-8 border-none bg-secondary/20 space-y-6">
                  <h4 className="font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                     <Share2 className="h-4 w-4 text-primary" /> Spread the Glow
                  </h4>
                  <p className="text-sm text-muted-foreground">Share Lumina with your friends and earn <span className="text-primary font-bold">50 points</span> for every referral.</p>
                  <div className="space-y-3">
                     <Button className="w-full rounded-xl h-12 font-bold gap-2" variant="outline" onClick={shareLink}>
                        <Share2 className="h-4 w-4" /> Share Website
                     </Button>
                     <Button className="w-full rounded-xl h-12 font-bold gap-2" variant="outline">
                        <Users className="h-4 w-4" /> Refer a Friend
                     </Button>
                  </div>
               </Card>
            </div>

            {/* Instagram Grid */}
            <div className="lg:col-span-2">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-3 italic">
                    <Instagram className="h-6 w-6 text-primary" /> Recent Feed
                  </h3>
                  <p className="text-xs font-bold uppercase text-primary tracking-widest cursor-pointer hover:underline flex items-center gap-2">
                    View on App <ExternalLink className="h-3 w-3" />
                  </p>
               </div>
               
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {instagramPosts.map((post) => (
                    <motion.div 
                      key={post.id}
                      whileHover={{ scale: 0.98 }}
                      className="relative aspect-square overflow-hidden rounded-3xl group cursor-pointer shadow-lg"
                    >
                       <img 
                         src={post.image} 
                         alt="Insta post" 
                         className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                       />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                          <span className="flex items-center gap-1 font-bold text-sm">
                             <Heart className="h-4 w-4 fill-white" /> {post.likes}
                          </span>
                          <span className="flex items-center gap-1 font-bold text-sm">
                             <MessageCircle className="h-4 w-4 fill-white" /> {post.comments}
                          </span>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
