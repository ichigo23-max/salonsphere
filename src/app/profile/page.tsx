"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookingStore } from "@/store/useBookingStore";
import { User, Calendar, History, Settings, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Show } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { guestInfo } = useBookingStore();

  const mockHistory = [
    { id: 1, service: "Luxury Haircut", date: "2024-02-10", status: "Completed", price: 85 },
    { id: 2, service: "Aromatherapy Facial", date: "2023-12-05", status: "Completed", price: 120 },
  ];

  if (!isLoaded) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="rounded-3xl overflow-hidden border-none shadow-xl bg-secondary/20">
              <div className="h-24 bg-primary/20" />
              <CardContent className="relative px-6 pb-6 pt-0">
                <div className="absolute -top-12 left-6">
                  <div className="h-24 w-24 rounded-2xl border-4 border-background bg-card shadow-lg flex items-center justify-center overflow-hidden">
                    <Show when="signed-in">
                      {user?.imageUrl ? (
                        <img src={user.imageUrl} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-10 w-10 text-primary" />
                      )}
                    </Show>
                    <Show when="signed-out">
                      <User className="h-10 w-10 text-muted-foreground" />
                    </Show>
                  </div>
                </div>
                
                <div className="pt-16">
                  <Show when="signed-in">
                    <h2 className="text-2xl font-bold">{user?.fullName || "Salon Guest"}</h2>
                    <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                  </Show>
                  <Show when="signed-out">
                    <h2 className="text-2xl font-bold">{guestInfo.name || "Guest User"}</h2>
                    <p className="text-sm text-muted-foreground">{guestInfo.email || "Sign in to save profile"}</p>
                  </Show>
                </div>

                <div className="mt-8 space-y-2">
                  <Button variant="ghost" className="w-full justify-start gap-2 h-12 rounded-xl">
                    <User className="h-4 w-4" /> Personal Info
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-2 h-12 rounded-xl text-primary font-bold bg-primary/5">
                    <History className="h-4 w-4" /> Booking History
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-2 h-12 rounded-xl">
                    <Settings className="h-4 w-4" /> Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Show when="signed-out">
               <Card className="rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 p-6 text-center">
                  <h4 className="font-bold mb-2">Want to save your history?</h4>
                  <p className="text-xs text-muted-foreground mb-4">Create an account to track your sessions and earn loyalty points.</p>
                  <Button className="w-full rounded-xl">Create Account</Button>
               </Card>
            </Show>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
             <div>
                <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">Booking History</h2>
                
                <div className="space-y-4">
                  {mockHistory.map((item) => (
                    <Card key={item.id} className="rounded-2xl border-none bg-card shadow-md overflow-hidden transition-transform hover:scale-[1.01]">
                        <div className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                              <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                               <h4 className="font-bold">{item.service}</h4>
                               <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-8">
                             <div className="text-right">
                                <span className="text-sm font-bold block">${item.price}</span>
                                <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{item.status}</span>
                             </div>
                             <Button variant="outline" size="sm" className="rounded-lg">
                               Details
                             </Button>
                          </div>
                        </div>
                    </Card>
                  ))}
                  
                  {mockHistory.length === 0 && (
                    <div className="text-center py-20 bg-secondary/10 rounded-3xl border-2 border-dashed">
                       <p className="text-muted-foreground">No bookings found yet.</p>
                       <Link href="/book">
                          <Button className="mt-4" variant="link">Book your first session</Button>
                       </Link>
                    </div>
                  )}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-3xl p-6 bg-secondary/10 border-none">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    Rewards Points
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-black text-primary">450</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Silver Tier</span>
                  </div>
                </Card>
                 <Card className="rounded-3xl p-6 bg-secondary/10 border-none">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    Quick Actions
                  </h4>
                  <Button className="w-full rounded-xl h-12" variant="outline">Schedule Next Appt</Button>
                </Card>
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
