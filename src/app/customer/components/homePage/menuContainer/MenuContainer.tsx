import React from "react";
import CategoryItem from "./category/Category";
import { FoodCategory } from "@/app/customer/types/foodCategoriesItems";
import BASE_URL from "@/constants";

function MenuContainer() {
  const Categroy = [];
  const fetchFoodsFromFrontEnd = async () => {
    const response = await fetch(`${BASE_URL}/foods`, {
      headers: { "Content-Type": "application/json" },
    });
    const foods = await response.json();
    Categroy.push(foods);
  };

  fetchFoodsFromFrontEnd();
  return <div className="flex flex-cols-3 bg-gray-500"></div>;
}

export default MenuContainer;
