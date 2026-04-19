"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { purchaseGiftCard } from "@/app/actions/gift-cards";
import { Gift, Mail, CreditCard, CheckCircle2, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftCardsPage() {
  const [amount, setAmount] = useState<number>(50);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purchasedCode, setPurchasedCode] = useState<string | null>(null);

  const amounts = [50, 100, 200, 500];

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment
    const result = await purchaseGiftCard({ amount, recipientEmail: email });
    
    if (result.success) {
      setPurchasedCode(result.code);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
             <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-4">Glow Gift Cards</h1>
             <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">The gift of ultimate self-care</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             
             {/* Preview Card */}
             <div className="space-y-8">
                <motion.div 
                  initial={{ rotate: -5 }}
                  animate={{ rotate: 0 }}
                  className="relative aspect-[1.6/1] w-full rounded-[40px] bg-gradient-to-br from-primary via-primary/80 to-primary/60 p-12 text-primary-foreground shadow-2xl overflow-hidden group"
                >
                   <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                      <Gift className="h-64 w-64" />
                   </div>
                   <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                         <h2 className="text-3xl font-black tracking-tighter italic uppercase">Lumina</h2>
                         <CreditCard className="h-8 w-8 opacity-50" />
                      </div>
                      <div>
                         <p className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">Gift Card Value</p>
                         <p className="text-6xl font-black">${amount}</p>
                      </div>
                   </div>
                </motion.div>
                
                <div className="p-8 rounded-[40px] bg-secondary/20 border border-primary/10">
                   <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">Card Details</h4>
                   <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        Valid for all salon and spa services.
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        Digital delivery within minutes.
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        Never expires. Always glowing.
                      </li>
                   </ul>
                </div>
             </div>

             {/* Purchase Form */}
             <div>
                <AnimatePresence mode="wait">
                  {!purchasedCode ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">Purchase Digital Card</h2>
                      <form onSubmit={handlePurchase} className="space-y-8">
                         <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Select Amount</label>
                            <div className="grid grid-cols-4 gap-3">
                               {amounts.map((a) => (
                                 <button
                                   key={a}
                                   type="button"
                                   onClick={() => setAmount(a)}
                                   className={`h-12 rounded-xl border-2 font-black transition-all ${
                                     amount === a ? "border-primary bg-primary text-primary-foreground scale-105" : "border-muted hover:border-primary/50"
                                   }`}
                                 >
                                   ${a}
                                 </button>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                               <Mail className="h-4 w-4" /> Recipient Email
                            </label>
                            <Input 
                              type="email" 
                              required
                              placeholder="friend@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="h-14 rounded-2xl text-lg px-6"
                            />
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Digital code will be sent to this email</p>
                         </div>

                         <Button 
                           disabled={isSubmitting || !email}
                           className="w-full h-16 rounded-[28px] text-xl font-black uppercase tracking-tighter"
                         >
                            {isSubmitting ? "Processing Payment..." : "Purchase Gift Card"}
                         </Button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 px-6 rounded-[50px] bg-green-50 border-2 border-green-200"
                    >
                       <div className="h-20 w-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-6 text-green-700">
                          <CheckCircle2 className="h-10 w-10" />
                       </div>
                       <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Thank You!</h2>
                       <p className="text-sm text-green-700/80 mb-8 px-8 font-bold uppercase tracking-widest">Your digital gift card has been created.</p>
                       
                       <div className="bg-white rounded-3xl p-6 shadow-xl border border-green-100 mb-8">
                          <p className="text-[10px] uppercase font-bold text-muted-foreground mb-2">Your Unique Code</p>
                          <div className="flex items-center justify-center gap-4">
                             <span className="text-3xl font-black tracking-[0.2em] font-mono">{purchasedCode}</span>
                             <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(purchasedCode)}>
                                <Copy className="h-5 w-5" />
                             </Button>
                          </div>
                       </div>

                       <Button 
                         variant="outline" 
                         className="rounded-xl border-green-200 text-green-700 font-bold"
                         onClick={() => setPurchasedCode(null)}
                       >
                          Purchase Another
                       </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
