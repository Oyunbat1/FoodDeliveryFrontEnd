import React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
function CategoryItem() {
  const foodCategoriesItems = [
    {
      id: 1,
      foodTitle: "Finger Food",
      img: `/customer/categoryItems/Cranberry-pie.png`,
      price: " $12.99",
      overview:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    },
    {
      id: 2,
      foodTitle: "Cranberry Brie Bites",
      img: `/customer/categoryItems/Finger-Food.png`,
      price: " $12.99",
      overview:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    },
    {
      id: 3,
      foodTitle: "Sunshine Stackers ",
      img: `/customer/categoryItems/sunshine-stacker.png`,
      price: " $12.99",
      overview:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    },
  ];
  return (
    <div>
      {" "}
      <div className="grid grid-cols-3">
        {foodCategoriesItems.map((categoryItem) => (
          <div
            key={categoryItem.id}
            className=" flex flex-col w-[397.33px] h-[342px] bg-white rounded-md items-center pt-4 relative"
          >
            <Image
              src={`${categoryItem.img}`}
              alt="images"
              width={365.33}
              height={210}
              className="w-[365.33px] h-[210px] rounded-md object-fit"
            ></Image>
            <div className="w-[40px] h-[40px] bg-white rounded-full absolute top-40 right-10 flex items-center justify-around">
              <Plus className="text-red-600"></Plus>
            </div>
            <div className="flex justify-between items-center w-full px-4 mt-4">
              <h1 className="text-red-600 text-[24px] font-[600]">
                {categoryItem.foodTitle}
              </h1>
              <p className="text-[18px] font-[600] ">{categoryItem.price}</p>
            </div>
            <div className="flex ">
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
