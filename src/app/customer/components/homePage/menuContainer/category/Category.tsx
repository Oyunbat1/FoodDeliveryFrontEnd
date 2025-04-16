"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FoodItem } from "@/app/customer/types/foodCategoriesItems";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  foodCategory: FoodItem[];
};

function CategoryItem({ foodCategory }: Props) {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [itemStates, setItemStates] = useState<
    Record<string, { count: number; price: number }>
  >({});

  const clearFunction = (itemId: string) => {
    setItemStates((prev) => ({
      ...prev,
      [itemId]: { count: 1, price: 0 },
    }));
  };

  const HandleCountPlus = (itemId: string, itemPrice: string) => {
    const price = String(itemPrice).replace("$", "").trim();
    const priceNumber = parseFloat(price);
    const currentState = itemStates[itemId] || { count: 1, price: 0 };
    const newCount = currentState.count + 1;

    setItemStates((prev) => ({
      ...prev,
      [itemId]: {
        count: newCount,
        price: priceNumber * newCount,
      },
    }));
  };

  const HandleCountMinus = (itemId: string, itemPrice: string) => {
    const currentState = itemStates[itemId] || { count: 1, price: 0 };
    if (currentState.count > 1) {
      const price = String(itemPrice).replace("$", "").trim();
      const priceNumber = parseFloat(price);
      const newCount = currentState.count - 1;

      setItemStates((prev) => ({
        ...prev,
        [itemId]: {
          count: newCount,
          price: priceNumber * newCount,
        },
      }));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-20 w-full ">
        {foodCategory.map((categoryItem) => {
          const currentState = itemStates[categoryItem._id] || {
            count: 1,
            price: 0,
          };

          return (
            <div
              key={categoryItem._id}
              className="flex flex-col w-[397.33px] h-[352px] bg-white rounded-md items-center pt-4 relative"
            >
              <Image
                src={`${categoryItem.imageUrl}`}
                alt={`${categoryItem.foodName} image`}
                width={365.33}
                height={210}
                className="w-[365.33px] h-[230px] rounded-md object-cover"
              />
              <Dialog
                open={openDialogId === String(categoryItem._id)}
                onOpenChange={(open) => {
                  if (open) {
                    setOpenDialogId(categoryItem._id.toString());
                  } else {
                    setOpenDialogId(null);
                    clearFunction(categoryItem._id.toString());
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setOpenDialogId(categoryItem._id.toString())}
                    variant="outline"
                    className="w-[40px] h-[40px] bg-white rounded-full absolute top-46 right-10 flex items-center justify-around"
                  >
                    <Plus className="text-red-600"></Plus>
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-[826px] h-[272px] grid grid-cols-2">
                  <div>
                    <DialogTitle>
                      <VisuallyHidden>Dialog Title</VisuallyHidden>
                    </DialogTitle>
                    <Image
                      src={`${categoryItem.imageUrl}`}
                      alt="images"
                      width={365.33}
                      height={210}
                      className="w-[365.33px] h-[210px] rounded-md object-cover"
                    />
                  </div>
                  <div className=" flex flex-col justify-between">
                    <div className="mt-[10px]">
                      <h1 className="text-[20px] font-[600] text-red-600">
                        {categoryItem.foodName}
                      </h1>
                      <div className="text-[12px] font-[400]">
                        {categoryItem.ingredients.map((el) => (
                          <div key={el.id}>{el.name}</div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-black">
                      <div className="flex justify-between">
                        <div className="flex flex-col ">
                          <p className="text-[12px]">Total price</p>
                          <h1 className="font-bold">${currentState.price}</h1>
                        </div>
                        <div className="flex justify-center items-center gap-2 ">
                          <Button
                            onClick={() =>
                              HandleCountMinus(
                                categoryItem._id.toString(),
                                categoryItem.price
                              )
                            }
                            className="rounded-full fixed right-[78px] h-[34px] w-[34px] bg-transparent border hover:bg-gray-300 hover:border-gray-500"
                          >
                            <Minus className="text-black "></Minus>
                          </Button>
                          <h1 className="fixed right-[60px]">
                            {currentState.count}
                          </h1>
                          <Button
                            onClick={() =>
                              HandleCountPlus(
                                categoryItem._id.toString(),
                                categoryItem.price
                              )
                            }
                            className="rounded-full  fixed right-3 h-[34px] w-[34px]"
                          >
                            <Plus></Plus>
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Button className="w-full h-[34px] rounded-full">
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="flex justify-between items-center w-full px-4 mt-4">
                <h1 className="text-red-600 text-[24px] font-[600]">
                  {categoryItem.foodName}
                </h1>
                <p className="text-[18px] font-[600]">${categoryItem.price}</p>
              </div>
              <div className="flex">
                <div className="text-[14px] font-[400] px-4 flex gap-2">
                  {categoryItem.ingredients.map((el) => (
                    <div key={el.id}>{el.name}</div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryItem;
