"use client";
import { Plus, Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import * as React from "react";
import BASE_URL from "@/constants";
import { FoodItem } from "@/app/customer/types/foodCategoriesItems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

function FoodMenu() {
  const [categories, setCategories] = useState<FoodItem[]>([]);
  const [catergoy, setCatergoy] = useState(" ");
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openFoodItem, setOpenFoodItem] = useState(false);
  const [successMessageFoodItem, setSuccessMessageFoodItem] = useState("");
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories/with-foods`);
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!catergoy.trim()) return;
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: catergoy }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const updatedResponse = await fetch(`${BASE_URL}/categories/with-foods`);
      const updatedData = await updatedResponse.json();
      setCategories(updatedData.categories);
      setCatergoy("");
      setOpen(false);
      setSuccessMessage(`New Category is being added to the menu`);
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleAddFoodItem = async () => {
    if (!foodName || !price || !ingredients || !selectedCategoryId) return;
    const ingredientsArray = ingredients.split(",").map((name, index) => ({
      id: index + 1,
      name: name.trim(),
    }));
    try {
      const response = await fetch(`${BASE_URL}/foods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodName,
          price: parseFloat(price),
          ingredients: ingredientsArray,
          categoryId: selectedCategoryId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      setFoodName("");
      setPrice("");
      setIngredients("");
      setOpenFoodItem(false);
      setSuccessMessageFoodItem("New food is being added to the menu");
      setTimeout(() => setSuccessMessageFoodItem(""), 2000);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  return (
    <>
      {successMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-lg z-50 flex gap-2">
          <Check /> {successMessage}
        </div>
      )}
      {successMessageFoodItem && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-lg z-50 flex gap-2">
          <Check /> {successMessageFoodItem}
        </div>
      )}
      <div className="w-screen h-auto pl-[260px] pt-[60px] bg-slate-200 ">
        <div className="h-auto w-[1100px] rounded-md   bg-white p-4">
          <h1 className="text-[20px] font-[600]">Dishes category</h1>
          <div className="flex  w-[1100px] h-auto items-center gap-2 mt-3 ">
            <div className="flex flex-wrap gap-4 py-4">
              {" "}
              <div className="border px-3 py-1 rounded-full flex gap-3 border-red-600">
                <h1>All dishes</h1>
                <div className="border rounded-full  px-2 bg-black text-white">
                  4
                </div>
              </div>
              {categories.map((category) => (
                <div
                  className="border px-3 py-1 rounded-full flex  gap-3"
                  key={category._id}
                >
                  <p>{category.categoryName}</p>
                  <div className="border rounded-full  px-2 bg-black text-white">
                    {category.foods.length}
                  </div>
                </div>
              ))}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border rounded-full p-1 bg-red-600 hover:bg-red-400"
                  >
                    {" "}
                    <Plus className="text-white"></Plus>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add new category</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col justify-start  gap-4">
                      <Label htmlFor="name" className="text-right text-[14px]">
                        Category name
                      </Label>
                      <Input
                        placeholder="Type categoty name"
                        id="name"
                        value={catergoy}
                        className="col-span-3 border focus-visible:ring-0"
                        onChange={(el) => setCatergoy(el.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleAddCategory}>
                      Add category
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="h-auto w-[1100px] rounded-md bg-white p-4 mt-4">
          <div className="flex gap-4 py-4">
            {" "}
            <div className="flex flex-col gap-[30px]">
              {categories.map((category) => (
                <div key={category._id}>
                  <div
                    className="pl-2 py-1 rounded-full flex gap-3"
                    key={category._id}
                  >
                    <p>{category.categoryName}</p>
                    <div className=" text-black flex">
                      (<div className="font-bold">{category.foods.length}</div>)
                    </div>
                  </div>
                  <div className="mt-[10px] flex flex-wrap gap-10">
                    {" "}
                    <div className="w-[270.75px] h-[241px] rounded-[20px] border-[1px] border-dashed  border-red-600 flex flex-col items-center justify-center  gap-2 text-center">
                      <Dialog
                        open={openFoodItem}
                        onOpenChange={setOpenFoodItem}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border rounded-full  bg-red-600 hover:bg-red-400"
                            onClick={() =>
                              setSelectedCategoryId(category._id.toString())
                            }
                          >
                            {" "}
                            <Plus className="text-white"></Plus>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>
                              Add new Dish to {category.categoryName}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-col justify-start  gap-4">
                              <div className="flex gap-2">
                                <div>
                                  <Label
                                    htmlFor="name"
                                    className="text-right text-[14px]"
                                  >
                                    Food name
                                  </Label>
                                  <Input
                                    placeholder="Add food name"
                                    id="name"
                                    value={foodName}
                                    className="col-span-3 border focus-visible:ring-0"
                                    onChange={(el) =>
                                      setFoodName(el.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor="name"
                                    className="text-right text-[14px]"
                                  >
                                    Food price
                                  </Label>
                                  <Input
                                    onChange={(el) => setPrice(el.target.value)}
                                    placeholder="Add food price"
                                    id="name"
                                    value={price}
                                    className="col-span-3 border focus-visible:ring-0"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label
                                  htmlFor="name"
                                  className="text-right text-[14px]"
                                >
                                  Ingridients
                                </Label>
                                <Input
                                  onChange={(el) =>
                                    setIngredients(el.target.value)
                                  }
                                  placeholder="List ingredients.."
                                  id="name"
                                  type="text"
                                  value={ingredients}
                                  className="col-span-3 border focus-visible:ring-0"
                                />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" onClick={handleAddFoodItem}>
                              Add dish
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <p className="w-[154px] h-[40px] text-[14px] font-[500]">
                        {" "}
                        Add new Dish to {category.categoryName}
                      </p>
                    </div>
                    {category.foods.map((food) => (
                      <div
                        key={food._id}
                        className="flex flex-col w-[270.75px] h-[241px] bg-white  rounded-[20px] border-[1px] items-center pt-4 relative justify-around"
                      >
                        <div>aa</div>
                        {/* <Image
                          src={`${categoryItem.img}`}
                          alt="images"
                          width={365.33}
                          height={210}
                          className="w-[365.33px] h-[230px] rounded-md object-cover"
                        /> */}
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center w-[240px] mt-4 ">
                            <h1 className="text-red-600 text-[14px] font-[600]">
                              {food.foodName}
                            </h1>
                            <p className="text-[12px] font-[600]">
                              ${food.price}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <div className="text-[12px] font-[400] flex gap-2 ">
                              {food.ingredients.map((ingries) => (
                                <div key={ingries.id}>{ingries.name}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default FoodMenu;
