import React from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodCategory } from "@/app/customer/types/foodCategoriesItems";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
type CategoryItemProps = {
  foodCategory: FoodCategory;
};

function CategoryItem({ foodCategory }: CategoryItemProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-20 w-full ">
        {foodCategory.foodCategoriesItems.map((categoryItem) => (
          <div
            key={categoryItem.id}
            className="flex flex-col w-[397.33px] h-[342px] bg-white rounded-md items-center pt-4 relative"
          >
            <Image
              src={`${categoryItem.img}`}
              alt="images"
              width={365.33}
              height={210}
              className="w-[365.33px] h-[210px] rounded-md object-cover"
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[40px] h-[40px] bg-white rounded-full absolute top-40 right-10 flex items-center justify-around"
                >
                  <Plus className="text-red-600"></Plus>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[826px] h-[262px] grid grid-cols-2 ">
                <div>
                  <AlertDialogTitle>
                    <VisuallyHidden>Dialog Title</VisuallyHidden>
                  </AlertDialogTitle>
                  <Image
                    src={`${categoryItem.img}`}
                    alt="images"
                    width={365.33}
                    height={210}
                    className="w-[365.33px] h-[210px] rounded-md object-cover"
                  />
                </div>
                <div className=" flex flex-col justify-between">
                  {" "}
                  <div>
                    {" "}
                    <div className="flex justify-end">
                      <AlertDialogCancel className="w-[36px] rounded-full h-[36px]">
                        <X></X>
                      </AlertDialogCancel>
                    </div>
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
                        <h1 className="font-bold">{categoryItem.price}</h1>
                      </div>
                      <div>aa</div>
                    </div>
                    <div>
                      <Button className="w-full h-[34px] rounded-full">
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex justify-between items-center w-full px-4 mt-4">
              <h1 className="text-red-600 text-[24px] font-[600]">
                {categoryItem.foodTitle}
              </h1>
              <p className="text-[18px] font-[600]">{categoryItem.price}</p>
            </div>
            <div className="flex">
              <p className="text-[14px] font-[400] px-4">
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
