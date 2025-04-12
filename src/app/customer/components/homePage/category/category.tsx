"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { FoodItem } from "@/app/customer/types/foodCategoriesItems";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BASE_URL from "@/constants";
import { useState, useEffect } from "react";

function Category() {
  const [category, setCategories] = useState<FoodItem[]>([]);

  const plugin = React.useRef(
    Autoplay({ delay: 1400, stopOnInteraction: true })
  );

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(`${BASE_URL}/categories`, {
        headers: { "Content-Type": "application/json" },
      });
      const categories = await response.json();
      setCategories(categories.categories);
    };
    getCategories();
  }, []);
  return (
    <div>
      <div className="h-[176px] w-full  flex flex-col justify-center items-start  pl-[120px] ">
        <h1 className="text-white text-[30px] mb-[20px] ">Categories</h1>
        <Carousel
          className="w-[1220px] mr-4"
          plugins={[plugin.current]}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="w-full flex gap-2">
            {category.map((categoryItem) => (
              <CarouselItem key={categoryItem._id} className="basis-1/8 ">
                <Button
                  key={categoryItem._id}
                  className="h-[26px] rounded-full border bg-white text-black  hover:bg-gray-500 hover:text-white hover:border"
                >
                  {categoryItem.categoryName}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-gray-500 text-white" />
          <CarouselNext className="bg-gray-500 text-white mr-[110px]" />
        </Carousel>
      </div>
    </div>
  );
}

export default Category;
