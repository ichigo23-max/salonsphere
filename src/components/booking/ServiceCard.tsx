import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    category: string;
    image: string;
  };
  className?: string;
}

export default function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <Card className={cn("group overflow-hidden border-none bg-secondary/20 transition-all hover:shadow-2xl hover:-translate-y-2", className)}>
      <div className="relative h-48 w-full overflow-hidden">
         {/* Using a placeholder div for image for now - in a real app would be Next Image */}
        <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity group-hover:from-black/80" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {service.category}
          </span>
          <h3 className="mt-1 text-lg font-bold text-white">{service.name}</h3>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="line-clamp-2 text-sm text-muted-foreground mb-4">
          {service.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">${service.price}</span>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              <Clock className="h-3 w-3" />
              {service.duration}
            </div>
          </div>
          <Link href={`/book?service=${service.id}`}>
            <Button size="icon" variant="ghost" className="rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
