import React from "react";
import CategoryItem from "./category/Category";
import { FoodCategory } from "@/app/customer/types/foodCategoriesItems";

function MenuContainer() {
  
  const foodCategories: FoodCategory[] = [
    {
      id: 1,
      categoryName: "Appetizer",
      foodCategoriesItems: [
        {
          id: 1,
          foodTitle: "Finger Food",
          img: `/customer/categoryItems/Cranberry-pie.png`,
          price: " $12.99",
          overview:
            "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
        },
  
       
      ],
    },
    {
      id: 2,
      categoryName: "Salads",
      foodCategoriesItems: [
        {
          id:1 ,
          foodTitle: "Sunshine Stackers",
          img: `/customer/categoryItems/sunshine-stacker.png`,
          price: " $12.99",
          overview:
            "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
        },
        {
          id: 2,
          foodTitle: " Brie Bites",
          img: `/customer/categoryItems/Finger-Food.png`,
          price: " $12.99",
          overview:
            "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
        },
        {
          id: 3,
          foodTitle: " Bites",
          img: `/customer/categoryItems/Finger-Food.png`,
          price: " $12.99",
          overview:
            "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
        }, {
          id: 4,
          foodTitle: "Stackers",
          img: `/customer/categoryItems/Finger-Food.png`,
          price: " $12.99",
          overview:
            "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
        },
        

      ],
    },
    {
      id: 3,
      categoryName: "Lunch Favorites",
      foodCategoriesItems: [
        {
          id: 1,
          foodTitle: "Sunshine Stackers",
          img: `/customer/categoryItems/sunshine-stacker.png`,
          price: " $12.99",
          overview:
            "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
        },
        
      ],
    },
  ];

  return (
    <div className="flex flex-cols-3 bg-gray-500">
      <div className="p-[50px]">
        {foodCategories.map((category) => (
          <div key={category.id}>
            <h1 className="text-white text-[30px] my-[30px]">
              {category.categoryName}
            </h1>
            <CategoryItem foodCategory={category} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuContainer;
