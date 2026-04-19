"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { reviews } from "@/lib/mock-data";
import ReviewCard from "@/components/shared/ReviewCard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    // Simulate API call
    console.log("Submitting feedback:", { rating, comment });
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            
            {/* Feedback Form */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <h1 className="text-4xl font-bold tracking-tighter uppercase mb-2">Share Your Experience</h1>
                <p className="text-muted-foreground mb-8">Your feedback helps us elevate our mastery and service.</p>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                    >
                      <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-widest">Rate your visit</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setRating(s)}
                              className={cn(
                                "h-12 w-12 rounded-xl flex items-center justify-center transition-all",
                                rating >= s ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                              )}
                            >
                              <Star className={cn("h-6 w-6", rating >= s && "fill-current")} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest">Your Comments</label>
                        <Textarea 
                          required
                          placeholder="Tell us about your transformation..." 
                          className="min-h-[150px] rounded-2xl p-4 text-lg"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={rating === 0}
                        className="w-full h-14 text-lg font-bold rounded-2xl gap-2"
                      >
                        <Send className="h-5 w-5" />
                        Submit Review
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-3xl border-2 border-primary/20 bg-primary/5 p-12 text-center"
                    >
                      <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold uppercase mb-2">Thank You!</h3>
                      <p className="text-muted-foreground mb-6">Your review has been shared with our team.</p>
                      <Button variant="outline" onClick={() => setIsSubmitted(false)}>Send another</Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Existing Feedback */}
            <div className="lg:col-span-3">
              <h2 className="text-lg font-bold uppercase tracking-[0.2em] mb-8 text-primary">Recent Testimonials</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} className="w-full bg-card shadow-sm border" />
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
