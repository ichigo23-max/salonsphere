import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Scissors, Settings, Star, History, XCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { cancelBooking } from "@/app/actions/booking";

export default async function DashboardPage() {
  const { userId: clerkId } = await auth();
  
  if (!clerkId) {
    redirect("/sign-in");
  }

  let user = null;
  try {
    if (process.env.DATABASE_URL?.startsWith("mongodb")) {
      user = await prisma.user.findUnique({
        where: { clerkId: clerkId! },
        include: {
          bookings: {
            include: { service: true },
            orderBy: { date: "desc" }
          }
        }
      });
    }
  } catch (e) {
    console.warn("DB not ready.");
  }

  const upcomingBookings = user?.bookings.filter(b => b.status === "confirmed" && new Date(b.date) >= new Date()) || [];
  const pastBookings = user?.bookings.filter(b => b.status !== "confirmed" || new Date(b.date) < new Date()) || [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-tighter">Your Dashboard</h1>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mt-2">Manage your glow experience</p>
          </div>
          <div className="flex gap-4">
            <Link href="/book">
              <Button className="rounded-xl h-12 px-8 font-bold">New Booking</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Stats & Loyalty */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="rounded-3xl border-none bg-primary/5 shadow-none overflow-hidden">
              <CardHeader className="bg-primary/10">
                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> Loyalty Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-end justify-between mb-4">
                  <span className="text-5xl font-black text-primary">{user?.loyaltyPoints || 0}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Points earned</span>
                </div>
                <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${Math.min(((user?.loyaltyPoints || 0) % 100), 100)}%` }} 
                  />
                </div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground mt-4 text-center">
                  {100 - ((user?.loyaltyPoints || 0) % 100)} points until next $10 reward
                </p>
                <Link href="/rewards">
                  <Button variant="outline" className="w-full mt-6 rounded-xl border-primary/20 hover:bg-primary/5">View Rewards Page</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-none shadow-xl bg-card">
              <CardContent className="p-6 space-y-2">
                <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Quick Settings</h4>
                <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl">
                  <Settings className="h-4 w-4" /> Account Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl text-destructive hover:bg-destructive/5">
                  <XCircle className="h-4 w-4" /> Cancel Policies
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Section */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Upcoming */}
            <section>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Upcoming Appointments
              </h3>
              <div className="space-y-4">
                {upcomingBookings.length > 0 ? upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="rounded-2xl border-none bg-card shadow-md overflow-hidden border-l-4 border-primary">
                    <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                          <Scissors className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">{booking.service.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {format(new Date(booking.date), "PPP")}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {booking.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <form action={async () => {
                          "use server"
                          await cancelBooking(booking.id);
                        }}>
                          <Button variant="ghost" size="sm" className="rounded-xl text-destructive hover:bg-destructive/5">Cancel</Button>
                        </form>
                         <Button variant="outline" size="sm" className="rounded-xl border-primary/20">Reschedule</Button>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <div className="text-center py-12 bg-secondary/10 rounded-3xl border-2 border-dashed border-muted">
                    <p className="text-muted-foreground">No upcoming appointments.</p>
                  </div>
                )}
              </div>
            </section>

            {/* History */}
            <section>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
                <History className="h-5 w-5 text-muted-foreground" /> Booking History
              </h3>
              <div className="space-y-4 opacity-70">
                {pastBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/20 transition-all hover:opacity-100">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                       </div>
                       <div>
                          <p className="font-bold text-sm">{booking.service.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">{format(new Date(booking.date), "MMM d, yyyy")}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-sm">${booking.totalPrice}</p>
                       <p className="text-[10px] uppercase font-bold text-muted-foreground">{booking.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
