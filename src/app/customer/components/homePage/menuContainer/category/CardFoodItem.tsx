"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus } from "lucide-react";
function CardFoodItem() {
  const [count, setCount] = useState(1);
  const HandleCountPlus = () => {
    const plus = count + 1;
    setCount(plus);
  };
  const HandleCountMinus = () => {
    const minus = count - 1;
    if (minus >= 0) {
      setCount(minus);
    }
    {
      return;
    }
  };
  return (
    <div>
      <div className="w-[310px] h-[100px] mt-4 flex gap-2">
        <div>
          <Image
            alt="img"
            width={100}
            height={50}
            src={`/customer/categoryItems/Cranberry-pie.png`}
            className="h-[100px] w-[120px] rounded-md"
          ></Image>
        </div>
        <div className="flex flex-col justify-between mb-1">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-[16px] text-red-600">
                Sunshine Stackers
              </h1>
              <p className="text-[12px]">Fluffy pancakes stacked with fruits</p>
            </div>
            <Button className="rounded-full w-[20px] h-[24px] border border-red-600 bg-white hover:bg-red-200">
              <X className="text-red-600"></X>
            </Button>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <Minus
                onClick={() => HandleCountMinus()}
                className="fixed right-[188px] h-[20px] w-[20px] cursor-pointer"
              ></Minus>
              <h1 className="fixed right-[172px]">{count}</h1>

              <Plus
                onClick={() => HandleCountPlus()}
                className="fixed right-[138px] h-[20px] w-[20px] cursor-pointer"
              ></Plus>
            </div>
            <p className="">$12.99$</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-600 border-t border-dashed mt-2"></div>
    </div>
  );
}

export default CardFoodItem;
