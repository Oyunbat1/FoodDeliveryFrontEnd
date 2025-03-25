import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
function Footer() {
  const plugin = React.useRef(Autoplay({ stopOnInteraction: true }));
  return (
    <div className="bg-black h-[555px] relative flex flex-col items-center pt-[220px]">
      <div className="h-[92px] w-full overflow-hidden flex items-center bg-red-600 absolute top-14">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="flex items-center gap-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/8">
                <div className="w-[300px] ml-[10px]">
                  {" "}
                  <h1 className="text-[30px] text-white">
                    Fresh fast delivered{" "}
                  </h1>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-gray-500 text-white" />
          <CarouselNext className="bg-gray-500 text-white" />
        </Carousel>
      </div>
      <div className="h-[228px] bg-amber-700 w-[1264px]"></div>
    </div>
  );
}

export default Footer;
