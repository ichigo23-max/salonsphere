"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { services } from "@/lib/mock-data";
import { useBookingStore } from "@/store/useBookingStore";
import TimeSlotPicker from "@/components/booking/TimeSlotPicker";
import { createBooking } from "@/app/actions/booking";
import { validateGiftCard } from "@/app/actions/gift-cards";
import { CheckCircle2, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Scissors, UserCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

function BookingContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  
  const { 
    selectedService, setService, 
    selectedDate, setDate, 
    selectedTime, setTime,
    guestInfo, setGuestInfo,
    resetBooking 
  } = useBookingStore();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Initialize service from URL if present
  useEffect(() => {
    if (serviceId) {
      const service = services.find(s => s.id === serviceId);
      if (service) setService(service);
    }
  }, [serviceId, setService]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const [giftCardCode, setGiftCardCode] = useState("");
  const [giftCardBalance, setGiftCardBalance] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const bookingResult = await createBooking({
      serviceId: selectedService.id,
      date: selectedDate!,
      time: selectedTime!,
      guestInfo: guestInfo,
      totalPrice: selectedService.price - (giftCardBalance || 0), // Basic discount logic
    });

    if (bookingResult.success) {
      // Logic for WhatsApp handled in server actions or here
      setIsConfirmed(true);
    }
    
    setIsSubmitting(false);
  };

  if (isConfirmed) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex grow items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-3xl border bg-card p-12 text-center shadow-2xl"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="mb-2 text-3xl font-bold uppercase tracking-tight">Confirmed!</h2>
            <p className="mb-8 text-sm text-muted-foreground">
              We've received your booking. You'll receive a WhatsApp confirmation shortly.
            </p>
            <Button className="w-full h-12 text-lg font-bold" onClick={() => {
              resetBooking();
              window.location.href = "/";
            }}>
              Return Home
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold transition-all",
                  step >= s ? "border-primary bg-primary text-primary-foreground scale-110" : "border-muted text-muted-foreground"
                )}>
                  {s}
                </div>
                {s < 3 && <div className={cn("h-[2px] w-12 md:w-24 mx-2", step > s ? "bg-primary" : "bg-muted")} />}
              </div>
            ))}
            <div className="ml-4 flex grow flex-col">
              <h2 className="text-xl font-bold uppercase tracking-tight">
                {step === 1 && "Select Service"}
                {step === 2 && "Pick Date & Time"}
                {step === 3 && "Final Details"}
              </h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                Step {step} of 3
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => {
                        setService(service);
                        handleNext();
                      }}
                      className={cn(
                        "group cursor-pointer rounded-2xl border-2 p-6 transition-all",
                        selectedService?.id === service.id 
                          ? "border-primary bg-primary/5 shadow-xl scale-105" 
                          : "border-muted hover:border-primary/50 hover:bg-secondary/30"
                      )}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="rounded-xl bg-primary/10 p-3 text-primary">
                          <Scissors className="h-6 w-6" />
                        </div>
                        <span className="text-lg font-bold">${service.price}</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-12 lg:flex-row">
                  <div className="grow space-y-6">
                    <h3 className="text-xl font-bold uppercase flex items-center gap-2">
                       <CalendarIcon className="h-5 w-5 text-primary" />
                       Select Date
                    </h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate || undefined}
                      onSelect={(date) => date && setDate(date)}
                      className="rounded-2xl border shadow-lg bg-card"
                    />
                  </div>
                  <div className="grow space-y-6">
                     <h3 className="text-xl font-bold uppercase flex items-center gap-2">
                       <CheckCircle2 className="h-5 w-5 text-primary" />
                       Select Time
                    </h3>
                    <TimeSlotPicker />
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </label>
                      <Input
                        required
                        placeholder="John Doe"
                        value={guestInfo.name}
                        onChange={(e) => setGuestInfo({ name: e.target.value })}
                        className="h-12 text-lg rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        Email Address
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({ email: e.target.value })}
                         className="h-12 text-lg rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        Phone Number
                      </label>
                      <Input
                        required
                        placeholder="+1 (555) 000-0000"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({ phone: e.target.value })}
                         className="h-12 text-lg rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-secondary/30 p-6 border-2 border-dashed border-primary/20">
                     <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Booking Summary</h4>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service:</span>
                          <span className="font-bold">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-bold">{selectedDate?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time:</span>
                          <span className="font-bold">{selectedTime}</span>
                        </div>

                         <div className="flex flex-col gap-2 pt-4">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Apply Gift Card</label>
                           <div className="flex gap-2">
                             <Input 
                               placeholder="CODE123" 
                               value={giftCardCode}
                               onChange={(e) => setGiftCardCode(e.target.value.toUpperCase())}
                               className="h-10 rounded-xl"
                             />
                             <Button 
                               type="button"
                               variant="outline" 
                               onClick={async () => {
                                 const res = await validateGiftCard(giftCardCode);
                                 if (res.valid) setGiftCardBalance(res.balance!);
                               }}
                               className="h-10 rounded-xl"
                             >
                               Apply
                             </Button>
                           </div>
                           {giftCardBalance !== null && (
                             <p className="text-xs font-bold text-green-600 mt-1">-${giftCardBalance} applied!</p>
                           )}
                         </div>

                         <div className="mt-4 border-t pt-4 flex justify-between text-lg font-bold">
                           <span>Total:</span>
                           <span className="text-primary">${Math.max(0, selectedService?.price - (giftCardBalance || 0))}</span>
                         </div>
                     </div>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex justify-between border-t pt-8">
            <Button
              variant="outline"
              disabled={step === 1}
              onClick={handleBack}
              className="h-12 gap-2 rounded-xl px-8"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            
            {step < 3 ? (
              <Button
                disabled={step === 2 && (!selectedDate || !selectedTime)}
                onClick={handleNext}
                className="h-12 gap-2 rounded-xl px-8 font-bold"
              >
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                disabled={isSubmitting || !guestInfo.name || !guestInfo.phone}
                onClick={handleSubmit}
                className="h-12 gap-2 rounded-xl px-8 font-bold"
              >
                {isSubmitting ? "Processing..." : "Complete Booking"}
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Booking...</div>}>
      <BookingContent />
    </Suspense>
  );
}
