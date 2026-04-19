import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  };
  className?: string;
}

export default function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <Card className={cn("w-80 flex-shrink-0 border-none bg-secondary/10", className)}>
      <CardContent className="p-6">
        <Quote className="h-8 w-8 text-primary/20 mb-4" />
        <div className="mb-4 flex gap-1">
          {Array(5).fill(0).map((_, i) => (
            <Star
              key={i}
              className={cn("h-4 w-4", i < review.rating ? "fill-primary text-primary" : "text-muted")}
            />
          ))}
        </div>
        <p className="mb-6 text-sm italic leading-relaxed text-muted-foreground">
          "{review.comment}"
        </p>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs uppercase">
            {review.name.substring(0, 2)}
          </div>
          <div>
            <h5 className="text-sm font-bold">{review.name}</h5>
            <span className="text-[10px] text-muted-foreground uppercase">{review.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
