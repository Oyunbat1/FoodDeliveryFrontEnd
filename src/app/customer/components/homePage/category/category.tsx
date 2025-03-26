import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
function Category() {
  const plugin = React.useRef(
    Autoplay({ delay: 1400, stopOnInteraction: true })
  );
  return (
    <div>
      <div className="h-[176px] w-full bg-gray-500 flex flex-col justify-center items-start  pl-[100px]">
        <h1 className="text-white text-[30px] mb-[20px] ">Categories</h1>
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="w-[1600px]">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/8 ">
                <div>
                  <Button className="h-[26px] w-[100px] rounded-full bg-white text-black">
                    Hello
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-gray-500 text-white" />
          <CarouselNext className="bg-gray-500 text-white" />
        </Carousel>
      </div>
    </div>
  );
}

export default Category;
