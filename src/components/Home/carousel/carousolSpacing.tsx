"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

export function CarouselSpacing() {
  // MODIFIED: add your own image paths here inside the array (place images in the /public folder)
  const images = [
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

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 1000,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
        }),
      ]}
      className="w-full  py-10"
    >
      <CarouselContent className="-ml-1">
        {/* MODIFIED: maps over images array instead of numbers */}
        {images.map((src, index) => (
          // MODIFIED: basis-1/5 shows 5 cards at a time so the remaining 5 can slide in
          <CarouselItem key={index} className="basis-1/5 pl-1">
            <div className="p-1">
              <Card>
                <CardContent className="flex min-h-50 items-center justify-center p-0 overflow-hidden">
                  <img
                    src={src}
                    alt={`slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
