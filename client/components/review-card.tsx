import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReviewCardProps {
  name: string;
  image: string;
  rating: number;
  review: string;
  date?: string;
  location?: string;
}

export default function ReviewCard({
  name,
  image,
  rating,
  review,
  date,
  location,
}: ReviewCardProps) {
  const isMobile = useIsMobile();

  return (
    <div className="rounded-lg border bg-background p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <Quote className="absolute -top-2 -left-1 h-8 w-8 text-primary/20 rotate-180" />
        <p className="text-muted-foreground pt-6 pb-4 italic">{review}</p>
      </div>

      <div className="flex items-center gap-4 border-t pt-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/10">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-primary">{name}</h4>
            {date && !isMobile && (
              <span className="text-xs text-muted-foreground">
                {new Date(date).toLocaleDateString()}
              </span>
            )}
          </div>
          {location && (
            <p className="text-xs text-muted-foreground">{location}</p>
          )}
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            {date && isMobile && (
              <span className="text-xs text-muted-foreground ml-2 self-center">
                {new Date(date).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
