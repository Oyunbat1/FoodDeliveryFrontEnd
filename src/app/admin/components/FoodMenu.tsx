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
import Category from "@/app/customer/components/homePage/category/Category";

function FoodMenu() {
  const [categories, setCategories] = useState<FoodItem[]>([]);
  const [catergoy, setCatergoy] = useState(" ");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  // const [value, setValue] = React.useState("");

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

  return (
    <>
      {successMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-lg z-50 flex gap-2">
          <Check /> {successMessage}
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
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddCategory();
                          }
                        }}
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
            {categories.slice(0, 1).map((category) => (
              <div key={category._id}>
                {" "}
                <div
                  className="border px-3 py-1 rounded-full flex gap-3"
                  key={category._id}
                >
                  <p>{category.categoryName}</p>
                  <div className="border rounded-full  px-2 bg-black text-white">
                    {category.foods.length}
                  </div>
                </div>
                <div className="mt-[10px]">
                  {" "}
                  <div className="w-[270.75px] h-[241px] rounded-[20px] border-[1px] flex flex-col items-center justify-center  gap-2 text-center">
                    <div className="border rounded-full p-1 bg-red-600 ">
                      <Plus className="text-white"></Plus>
                    </div>
                    <p className="w-[154px] h-[40px] text-[14px] font-[500]">
                      {" "}
                      Add new Dish to {category.categoryName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-auto w-[1100px] rounded-md bg-white p-4 mt-4">
          <div className="flex gap-4 py-4">
            {" "}
            {categories.slice(1, 2).map((category) => (
              <div key={category._id}>
                {" "}
                <div
                  className="border px-3 py-1 rounded-full flex gap-3"
                  key={category._id}
                >
                  <p>{category.categoryName}</p>
                  <div className="border rounded-full  px-2 bg-black text-white">
                    {category.foods.length}
                  </div>
                </div>
                <div className="mt-[10px]">
                  {" "}
                  <div className="w-[270.75px] h-[241px] rounded-[20px] border-[1px] flex flex-col items-center justify-center  gap-2 text-center">
                    <div className="border rounded-full p-1 bg-red-600 ">
                      <Plus className="text-white"></Plus>
                    </div>
                    <p className="w-[154px] h-[40px] text-[14px] font-[500]">
                      {" "}
                      Add new Dish to {category.categoryName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-auto w-[1100px] rounded-md bg-white p-4 mt-4">
          <div className="flex gap-4 py-4">
            {" "}
            {categories.slice(2, 3).map((category) => (
              <div key={category._id}>
                {" "}
                <div
                  className="border px-3 py-1 rounded-full flex gap-3"
                  key={category._id}
                >
                  <p>{category.categoryName}</p>
                  <div className="border rounded-full  px-2 bg-black text-white">
                    {category.foods.length}
                  </div>
                </div>
                <div className="mt-[10px]">
                  {" "}
                  <div className="w-[270.75px] h-[241px] rounded-[20px] border-[1px] flex flex-col items-center justify-center  gap-2 text-center">
                    <div className="border rounded-full p-1 bg-red-600 ">
                      <Plus className="text-white"></Plus>
                    </div>
                    <p className="w-[154px] h-[40px] text-[14px] font-[500]">
                      {" "}
                      Add new Dish to {category.categoryName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default FoodMenu;
