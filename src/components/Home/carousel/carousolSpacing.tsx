"use client";

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";

const IMAGES = [
  "/images/istockphoto-2247792230-2048x2048.webp",
  "/images/pexels-cottonbro-5483071.jpg",
  "/images/pexels-jeshoots-com-147458-714699.jpg",
  "/images/pexels-karola-g2-5775.jpg",
  "/images/pexels-pixabay-256417.jpg",
  "/images/pexels-thisisengineering-3862130.jpg",
  "/images/photo-1554475901-4538ddfbccc2.avif",
  "/images/photo-1565022536102-f7645c84354a.avif",
  "/images/photo-1649180556628-9ba704115795.avif",
  "/images/premium_photo-1661715935533-507e796866e5.avif",
];

export function CarouselSpacing() {
  return (
    <Carousel
      opts={{ loop: true, align: "start", dragFree: true }}
      plugins={[
        Autoplay({
          delay: 1800,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
        }),
      ]}
      className="w-full overflow-hidden"
    >
      <CarouselContent className="-ml-3">
        {IMAGES.map((src, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-3"
          >
            <Card className="border-0 rounded-xl overflow-hidden shadow-sm">
              <CardContent className="flex h-48 items-center justify-center p-0 overflow-hidden">
                <img
                  src={src}
                  alt={`session ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
