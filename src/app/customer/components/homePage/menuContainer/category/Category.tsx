import React, { useState } from "react";
import Image from "next/image";
import { Plus, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodCategory } from "@/app/customer/types/foodCategoriesItems";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type CategoryItemProps = {
  foodCategory: FoodCategory;
};

function CategoryItem({ foodCategory }: CategoryItemProps) {
  const [count, setCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(0);

  const clearFunction = () => {
    const zero = 1;
    setCount(zero);
    setPrice(0);
  };
  const HandleCountPlus = (el) => {
    console.log(el);
    const price = el.replace("$", "").trim();
    const priceNumber = parseFloat(price);
    const newCount = count + 1;
    setCount(newCount);
    setPrice(priceNumber * newCount);
  };

  const HandleCountMinus = (el) => {
    if (count > 1) {
      const price = el.replace("$", "").trim();
      const priceNumber = parseFloat(price);
      const newCount = count - 1;
      setCount(newCount);
      setPrice(priceNumber * newCount);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-20 w-full ">
        {foodCategory.foodCategoriesItems.map((categoryItem) => (
          <div
            key={categoryItem.id}
            className="flex flex-col w-[397.33px] h-[352px] bg-white rounded-md items-center pt-4 relative"
          >
            <Image
              src={`${categoryItem.img}`}
              alt="images"
              width={365.33}
              height={210}
              className="w-[365.33px] h-[230px] rounded-md object-cover"
            />
            <Dialog
              open={isOpen}
              onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) clearFunction();
              }}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => setIsOpen(true)}
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
                    src={`${categoryItem.img}`}
                    alt="images"
                    width={365.33}
                    height={210}
                    className="w-[365.33px] h-[210px] rounded-md object-cover"
                  />
                </div>
                <div className=" flex flex-col justify-between">
                  <div className="mt-[10px]">
                    <h1 className="text-[20px] font-[600] text-red-600">
                      {categoryItem.foodTitle}
                    </h1>
                    <p className="text-[12px] font-[400]">
                      {categoryItem.overview}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-black">
                    <div className="flex justify-between">
                      <div className="flex flex-col ">
                        <p className="text-[12px]">Total price</p>
                        <h1 className="font-bold">${price}</h1>
                      </div>
                      <div className="flex justify-center items-center gap-2 ">
                        <Button
                          onClick={() => HandleCountMinus(categoryItem.price)}
                          className="rounded-full fixed right-[78px] h-[34px] w-[34px] bg-transparent border hover:bg-gray-300 hover:border-gray-500"
                        >
                          <Minus className="text-black "></Minus>
                        </Button>
                        <h1 className="fixed right-[60px]">{count}</h1>
                        <Button
                          onClick={() => HandleCountPlus(categoryItem.price)}
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
                {categoryItem.foodTitle}
              </h1>
              <p className="text-[18px] font-[600]">{categoryItem.price}</p>
            </div>
            <div className="flex">
              <p className="text-[14px] font-[400] px-4 ">
                {categoryItem.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryItem;
