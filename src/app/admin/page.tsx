import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Scissors, MessageSquare, TrendingUp, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function AdminDashboardPage() {
  const { userId: clerkId } = await auth();
  
  if (!clerkId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId },
 });
  if (user?.role !== "admin") {
    redirect("/");
  }

  // Fetch Stats
  let totalBookings = 0;
  let confirmedBookings = 0;
  let totalUsers = 0;
  let recentBookings: any[] = [];

  try {
    if (process.env.DATABASE_URL?.startsWith("mongodb")) {
      totalBookings = await prisma.booking.count();
      confirmedBookings = await prisma.booking.count({ where: { status: "confirmed" } });
      totalUsers = await prisma.user.count();
      
      recentBookings = await prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { service: true }
      });
    }
  } catch (e) {
    console.warn("Database not ready.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold uppercase tracking-tighter">Salon Admin Panel</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mt-2">Business Operations & Management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="rounded-3xl border-none shadow-sm bg-primary/5">
             <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-primary/10 rounded-xl text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Total Bookings</p>
                <p className="text-3xl font-black mt-1">{totalBookings}</p>
             </CardContent>
          </Card>
          <Card className="rounded-3xl border-none shadow-sm bg-secondary/20">
             <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-secondary/30 rounded-xl text-foreground">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Total Clients</p>
                <p className="text-3xl font-black mt-1">{totalUsers}</p>
             </CardContent>
          </Card>
          <Card className="rounded-3xl border-none shadow-sm bg-green-50">
             <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-green-100 rounded-xl text-green-700">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Active Appts</p>
                <p className="text-3xl font-black mt-1 text-green-700">{confirmedBookings}</p>
             </CardContent>
          </Card>
          <Card className="rounded-3xl border-none shadow-sm bg-blue-50">
             <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-100 rounded-xl text-blue-700">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Est. Revenue</p>
                <p className="text-3xl font-black mt-1 text-blue-700">$12,450</p>
             </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Links */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-tight mb-4">Management</h3>
            <div className="grid grid-cols-1 gap-4">
              <Link href="/admin/bookings">
                <Button className="w-full h-16 rounded-2xl justify-start gap-4 px-6 text-lg" variant="outline">
                  <Calendar className="h-6 w-6 text-primary" /> View All Bookings
                </Button>
              </Link>
              <Link href="/admin/services">
                <Button className="w-full h-16 rounded-2xl justify-start gap-4 px-6 text-lg" variant="outline">
                  <Scissors className="h-6 w-6 text-primary" /> Manage Services
                </Button>
              </Link>
              <Link href="/admin/inquiries">
                <Button className="w-full h-16 rounded-2xl justify-start gap-4 px-6 text-lg" variant="outline">
                  <MessageSquare className="h-6 w-6 text-primary" /> Support Inquiries
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold uppercase tracking-tight mb-4">Recent Activity</h3>
            <Card className="rounded-3xl border-none shadow-xl overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-secondary/50 text-[10px] uppercase font-bold tracking-widest text-muted-foreground border-b">
                      <tr>
                        <th className="px-6 py-4">Client</th>
                        <th className="px-6 py-4">Service</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-secondary/10 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-sm">{booking.guestInfo.name}</p>
                            <p className="text-[10px] text-muted-foreground">{booking.guestInfo.phone}</p>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2">
                                <Scissors className="h-3 w-3 text-primary" />
                                <span className="text-sm font-medium">{booking.service.name}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                               {booking.status}
                             </span>
                          </td>
                          <td className="px-6 py-4">
                             <p className="text-sm font-medium">{format(new Date(booking.date), "MMM d")}</p>
                             <p className="text-[10px] text-muted-foreground uppercase">{booking.time}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
               {recentBookings.length === 0 && (
                 <div className="p-12 text-center text-muted-foreground">
                   No recent bookings found.
                 </div>
               )}
            </Card>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
