"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitInquiry } from "@/app/actions/support";
import { MessageSquare, Phone, MapPin, Send, HelpCircle, CheckCircle2, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const faqs = [
    { q: "How do I cancel my appointment?", a: "You can cancel through your dashboard up to 24 hours before your session. Less than 24 hours may incur a fee." },
    { q: "Do you offer group bookings?", a: "Yes! For groups of 3 or more, please contact us directly via phone for a custom package." },
    { q: "Where can I find my gift card code?", a: "Check the email used during purchase. You can also view active gift cards in your rewards section." },
    { q: "What is your health and safety policy?", a: "We follow strict sterilization protocols for all tools and surfaces to ensure a safe, clean environment." },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    await submitInquiry({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    });
    
    setIsSubmitting(false);
    setIsSent(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-4">Support Center</h1>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">We're here to help you shine</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
               <div className="p-8 rounded-[40px] bg-primary text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Headphones className="h-48 w-48" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase italic mb-8 relative z-10">Get In Touch</h3>
                  <div className="space-y-6 relative z-10">
                     <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                           <Phone className="h-5 w-5" />
                        </div>
                        <div>
                           <p className="text-[10px] uppercase font-bold opacity-70">Phone</p>
                           <p className="font-bold">+1 (555) 000-0000</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                           <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                           <p className="text-[10px] uppercase font-bold opacity-70">Live Chat</p>
                           <p className="font-bold">Available 9am - 8pm</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                           <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                           <p className="text-[10px] uppercase font-bold opacity-70">Visit Us</p>
                           <p className="font-bold">123 Glow St, NY 10001</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-4 pt-4">
                  <h4 className="font-bold uppercase text-xs tracking-widest px-2">Common Questions</h4>
                  {faqs.map((faq, i) => (
                    <Card key={i} className="rounded-2xl border-none bg-secondary/20 shadow-none overflow-hidden hover:bg-secondary/30 transition-colors">
                       <CardContent className="p-6">
                          <h5 className="font-bold text-sm mb-2 flex items-center gap-2">
                             <HelpCircle className="h-4 w-4 text-primary" /> {faq.q}
                          </h5>
                          <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                       </CardContent>
                    </Card>
                  ))}
               </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
               <Card className="rounded-[40px] border-none shadow-xl p-10 md:p-12">
                  {!isSent ? (
                    <div className="space-y-10">
                       <h2 className="text-4xl font-black uppercase tracking-tighter italic">Send a Message</h2>
                       <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Full Name</label>
                               <Input name="name" required className="h-14 rounded-2xl bg-secondary/10 border-none" placeholder="Joe Doe" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Email Address</label>
                               <Input name="email" type="email" required className="h-14 rounded-2xl bg-secondary/10 border-none" placeholder="joe@example.com" />
                            </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Subject</label>
                             <Input name="subject" required className="h-14 rounded-2xl bg-secondary/10 border-none" placeholder="Booking Issue, Service Question..." />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Your Message</label>
                             <Textarea name="message" required className="min-h-[200px] rounded-3xl bg-secondary/10 border-none p-6" placeholder="How can we help you today?" />
                          </div>
                          
                          <Button 
                            disabled={isSubmitting}
                            className="w-full h-16 rounded-[28px] text-xl font-black uppercase tracking-tighter gap-3"
                          >
                             {isSubmitting ? "Sending..." : "Submit Inquiry"} <Send className="h-5 w-5" />
                          </Button>
                       </form>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                    >
                       <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
                          <CheckCircle2 className="h-12 w-12" />
                       </div>
                       <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Message Sent!</h2>
                       <p className="text-muted-foreground max-w-sm mx-auto mb-10">We've received your inquiry and will get back to you within 24 hours.</p>
                       <Button 
                         variant="outline" 
                         className="rounded-xl px-12 h-12 font-bold border-primary/20 hover:bg-primary/5"
                         onClick={() => setIsSent(false)}
                       >
                          Send Another
                       </Button>
                    </motion.div>
                  )}
               </Card>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
