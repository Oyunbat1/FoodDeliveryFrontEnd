"use client";
import React, { useEffect } from "react";
import CategoryItem from "./category/Category";

import { FoodItem } from "@/app/customer/types/foodCategoriesItems";
import BASE_URL from "@/constants";
import { useState } from "react";

function MenuContainer() {
  const [categories, setCategories] = useState<FoodItem[]>([]);
  useEffect(() => {
    const fetchFoodsFromFrontEnd = async () => {
      const categoryResponse = await fetch(
        `${BASE_URL}/categories/with-foods`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const categories = await categoryResponse.json();
      setCategories(categories.categories);
    };

    fetchFoodsFromFrontEnd();
  }, []);

  return (
    <div className="flx flex-cols-3px-8">
      <div className="p-[50px]">
        {categories.map((category) => (
          <div key={category._id}>
            <h1 className="text-white text-[30px] my-[30px]">
              {category.categoryName}
            </h1>
            <CategoryItem foodCategory={category.foods} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuContainer;
