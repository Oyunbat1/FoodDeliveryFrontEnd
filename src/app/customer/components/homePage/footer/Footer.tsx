import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function Footer() {
  const plugin = React.useRef(
    Autoplay({
      delay: 2000,
      playOnInit: true,
      stopOnInteraction: false,
    })
  );

  return (
    <div className="bg-black h-[555px] relative flex flex-col items-center pt-[220px]">
      <div className="h-[92px] w-full overflow-hidden flex items-center bg-red-600 absolute top-14">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
            duration: 2000,
          }}
        >
          <CarouselContent className="flex items-center gap-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/8">
                <div className="w-[300px] ml-[10px]">
                  <h1 className="text-[30px] text-white">
                    Fresh fast delivered
                  </h1>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-gray-500 text-white" />
          <CarouselNext className="bg-gray-500 text-white" />
        </Carousel>
      </div>
      <div className="h-[228px] bg-amber-700 w-[1264px]">
        <div className="flex justify-around items-center h-full">
          {" "}
          <div>
                  <div className="flex flex-col gap-2 items-center text-center">
                    <Image
                      src={`/customer/logo.png`}
                      width={45}
                      height={20}
                      alt="logo"
                      className="h-[37.29px] w-[46px]"
                    ></Image>
                    <div className="text-white">
                      <h1 className="text-[20px] font-[600]">
                        Nom <span className="text-red-600">Nom</span>
                      </h1>
                      <p className="text-[12px] font-[400]">Swift delivery</p>
                    </div>
                  </div>
          </div>
          <div>
            <div>
              <h1>NOMNOM</h1>
              <p>Home</p>
              <p></p>
              <p></p>
            </div>
            <div>
            <h1>MENU</h1>
            </div>
            <div></div>

          </div>
          <div>c</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
