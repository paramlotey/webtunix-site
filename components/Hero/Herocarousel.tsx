import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';
const Herocarousel = () => {
  return (
       <div className="flex justify-center px-4 relative z-50">
          <div className="bg-transparent px-4 sm:px-6 md:px-8 py-2 sm:py-4 w-full max-w-6xl">
            <p className="text-center text-[#A7AABB] text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 capitalize">
              Already chosen by industry leaders
            </p>
            <div className="w-full max-w-4xl mx-auto overflow-hidden">
              <Carousel
                className="w-full"
                opts={{ align: "start", loop: true }}
                plugins={[Autoplay({ stopOnInteraction: false, delay: 2000 })]}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {[
                    "/Hero/company-logo-1.svg",
                    "/Hero/company-logo-2.svg",
                    "/Hero/company-logo-3.svg",
                    "/Hero/company-logo-4.svg",
                    "/Hero/company-logo-1.svg",
                    "/Hero/company-logo-2.svg",
                    "/Hero/company-logo-3.svg",
                    "/Hero/company-logo-4.svg",
                  ].map((src, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/4 flex justify-center"
                    >
                      <Image
                        src={src}
                        alt={`company-logo-${index + 1}`}
                        width={160}
                        height={100}
                        className="max-w-full h-auto object-contain"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>  )
}

export default Herocarousel