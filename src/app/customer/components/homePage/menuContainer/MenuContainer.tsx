import React from "react";
import CategoryItem from "./category/Category";

function MenuContainer() {
  const foodCategoies = [
    {
      id: 1,
      categoryName: "Appetizer",
    },
    {
      id: 2,
      categoryName: "Salads",
    },
    {
      id: 3,
      categoryName: "Lunch favorites",
    },
    {
      id: 4,
      categoryName: "Salads",
    },
  ];
  return (
    <div className="flex flex-col bg-gray-500 ">
      <div className="p-[50px]">
        {foodCategoies.map((category) => (
          <div key={category.id}>
            <h1 className="text-white text-[30px] my-[30px]">
              {category.categoryName}
            </h1>
            <CategoryItem></CategoryItem>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuContainer;
