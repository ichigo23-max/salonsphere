"use client";

import { useBookingStore } from "@/store/useBookingStore";
import { timeSlots } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export default function TimeSlotPicker() {
  const { selectedTime, setTime } = useBookingStore();

  const sections = [
    { label: "Morning", slots: timeSlots.morning },
    { label: "Afternoon", slots: timeSlots.afternoon },
    { label: "Evening", slots: timeSlots.evening },
  ];

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.label}>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Clock className="h-3 w-3" />
            {section.label}
          </h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {section.slots.map((slot) => (
              <Button
                key={slot}
                variant={selectedTime === slot ? "default" : "outline"}
                className={cn(
                  "h-12 w-full font-medium transition-all",
                  selectedTime === slot 
                    ? "shadow-lg shadow-primary/20 scale-105" 
                    : "hover:border-primary hover:bg-primary/5"
                )}
                onClick={() => setTime(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
