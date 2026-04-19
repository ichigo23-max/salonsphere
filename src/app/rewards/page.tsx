import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Star, Trophy, ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function RewardsPage() {
  const { userId: clerkId } = await auth();
  
  let user = null;
  try {
    if (process.env.DATABASE_URL?.startsWith("mongodb")) {
      user = await prisma.user.findUnique({
        where: { clerkId: clerkId || undefined }
      });
    }
  } catch (e) {
    console.warn("DB not ready.");
  }

  const points = user?.loyaltyPoints || 0;
  const nextMilestone = 500;
  const progress = Math.min((points / nextMilestone) * 100, 100);

  const availableRewards = [
    { title: "$10 Discount", cost: 100, description: "Redeem 100 points for $10 off your next service." },
    { title: "Free Hair Treatment", cost: 300, description: "Intense conditioning treatment for healthy hair." },
    { title: "VIP Lounge Access", cost: 500, description: "Access our premium lounge for your next 3 visits." },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 italic">Loyalty Rewards</h1>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Earn points every time you glow</p>
          </div>

          {/* Points Status */}
          <Card className="rounded-[40px] overflow-hidden border-none bg-primary p-8 md:p-12 text-primary-foreground shadow-2xl mb-12 relative">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Trophy className="h-48 w-48" />
             </div>
             
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                   <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Available Balance</p>
                   <h2 className="text-7xl font-black">{points} Points</h2>
                   <div className="mt-8 space-y-4">
                      <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white transition-all duration-1000" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                         {points >= nextMilestone ? "You've reached Gold Status!" : `${nextMilestone - points} points to Gold Status`}
                      </p>
                   </div>
                </div>
                <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
                   <h4 className="font-bold text-lg mb-2">How it works?</h4>
                   <ul className="space-y-3 text-sm opacity-90">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>Earn 1 point for every $1 spent on any service.</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>Refer a friend and get 50 bonus points.</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>Points never expire for active members.</span>
                      </li>
                   </ul>
                </div>
             </div>
          </Card>

          {/* Reward Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
             {availableRewards.map((reward, i) => (
                <Card key={i} className="rounded-3xl border-none shadow-xl hover:scale-105 transition-transform">
                   <CardContent className="p-8">
                      <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                        <Gift className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
                      <p className="text-xs text-muted-foreground mb-6 h-12">{reward.description}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-6 border-t">
                         <span className="font-bold text-sm">{reward.cost} pts</span>
                         <Button 
                           size="sm" 
                           disabled={points < reward.cost}
                           className="rounded-lg gap-2"
                         >
                            Redeem <ArrowRight className="h-3 w-3" />
                         </Button>
                      </div>
                   </CardContent>
                </Card>
             ))}
          </div>

          <div className="text-center">
             <Link href="/book">
                <Button variant="link" className="gap-2 text-primary font-bold">
                   <ShoppingBag className="h-4 w-4" /> Book more services to earn points
                </Button>
             </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
