"use client";
import React, { useEffect } from "react";
import CategoryItem from "./category/Category";
import { FoodCategory } from "@/app/customer/types/foodCategoriesItems";
import { FoodItem } from "@/app/customer/types/foodCategoriesItems";
import BASE_URL from "@/constants";
import { useState } from "react";

function MenuContainer() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  console.log(categories);
  useEffect(() => {
    const fetchFoodsFromFrontEnd = async () => {
      const response = await fetch(`${BASE_URL}/foods`, {
        headers: { "Content-Type": "application/json" },
      });
      const categoryResponse = await fetch(
        `${BASE_URL}/categories/with-foods`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const categories = await categoryResponse.json();
      const foods = await response.json();
      setFoods(foods);
      setCategories(categories.categories);
    };

    fetchFoodsFromFrontEnd();
  }, []);

  return (
    <div className="flx flex-cols-3 bg-gray-500">
      <div className="p-[50px]">
        {categories.map((category) => (
          <div key={category._id}>
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
