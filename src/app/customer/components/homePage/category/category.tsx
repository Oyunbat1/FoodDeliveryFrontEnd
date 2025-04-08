"use client";
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
import { Pizza } from "lucide-react";

function Category() {
  const categoryData = [
    {
      id: 1,
      foodName: "Appeizers",
    },
    {
      id: 2,
      foodName: "Salads",
    },
    {
      id: 3,
      foodName: "Pizzas",
    },
    {
      id: 4,
      foodName: "Lunch favorites",
    },
    {
      id: 5,
      foodName: "Main dishes",
    },
    {
      id: 6,
      foodName: "Fish & Sea foods",
    },
    {
      id: 7,
      foodName: "Side dish",
    },
    {
      id: 8,
      foodName: "Brunch",
    },
    {
      id: 9,
      foodName: "Desserts",
    },
    {
      id: 10,
      foodName: "Beverages",
    },
  ];

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
          <CarouselContent className="w-full flex gap-2">
            {categoryData.map((category) => (
              <CarouselItem key={category.id} className="basis-1/8 ">
                <Button
                  key={category.id}
                  className="h-[26px] rounded-full border bg-white text-black  hover:bg-gray-500 hover:text-white hover:border"
                >
                  {category.foodName}
                </Button>
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
