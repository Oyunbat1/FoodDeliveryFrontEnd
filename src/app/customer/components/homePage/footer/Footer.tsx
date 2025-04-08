"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { FacebookIcon, InstagramIcon } from "lucide-react";
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
      <div className="h-[228px] w-[1264px] relative">
        <div className="flex justify-around items-center h-full ">
          {" "}
          <div>
            <div className="flex flex-col gap-2 items-center text-center  absolute top-0 left-0">
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
          <div className="flex gap-40 absolute top-0">
            <div className="text-white text-[16px]  flex flex-col gap-2">
              <h1 className="text-[16px] text-gray-400 mb-[10px]">NOMNOM</h1>
              <p>Home</p>
              <p>Contact us</p>
              <p>Delivery zone</p>
            </div>
            <div className="text-white  flex flex-col gap-2">
              <h1 className="text-[16px] text-gray-400 mb-[10px]">MENU</h1>
              <p>Appetizers</p>
              <p>Salads</p>
              <p>PIzzas</p>
              <p>Main dishes</p>
              <p>Desserts</p>
            </div>
            <div className="text-white flex flex-col gap-2">
              <p>Side dish</p>
              <p>Brunch</p>
              <p>Desserts</p>
              <p>Beverages</p>
              <p>Fish & Sea foods</p>
            </div>
          </div>
          <div className="text-white  absolute top-0 right-0">
            <h1 className="text-[16px] text-gray-400 mb-[10px]">Follow us</h1>
            <div className="flex gap-4">
              {" "}
              <FacebookIcon></FacebookIcon>
              <InstagramIcon></InstagramIcon>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1264px]  border-t-1 text-[14px] text-gray-400 ">
        <div className="flex gap-40 mt-[20px]">
          <p>Copy right 2024 @ Nomnom LLC</p>
          <p>Privacy policy </p>
          <p>Terms and conditoin</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
