"use client";
import { Plus, Check, ChevronsUpDown, Image, Pen, Trash } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import * as React from "react";
import BASE_URL from "@/constants";
import { FoodItem } from "@/app/customer/types/foodCategoriesItems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [openEditCatigory, setOpenEditCategory] = useState(false);
  const [successMessageFoodItem, setSuccessMessageFoodItem] = useState("");
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [editFoodName, setEditFoodName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editIngredients, setEditIngredients] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState("");
  const CLOUD_NAME = "dbtl9obi3";
  const NEXT_PUBLIC_UPLOAD_PRESET = "ml_default";

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", NEXT_PUBLIC_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error during Cloudinary upload:", error);
      throw error;
    }
  };
  interface FileInputEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & {
      files: FileList;
    };
  }
  const handleUpdateFood = async () => {
    if (!editingFood) return;

    const ingredientsArray = editIngredients.split(",").map((name, index) => ({
      id: index + 1,
      name: name.trim(),
    }));

    try {
      const response = await fetch(`${BASE_URL}/foods/${editingFood._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodName: editFoodName,
          catergoy: editCategory,
          price: parseFloat(editPrice),
          ingredients: ingredientsArray,
          imageUrl: editImageUrl,
        }),
      });

      if (!response.ok) throw new Error("Failed to update food");

      const updatedResponse = await fetch(`${BASE_URL}/categories/with-foods`);
      const updatedData = await updatedResponse.json();
      setCategories(updatedData.categories);

      setEditingFood(null);
      setSuccessMessageFoodItem("Food item updated successfully");
      setTimeout(() => setSuccessMessageFoodItem(""), 2000);
    } catch (err) {
      console.error("Error updating food:", err);
    }
  };

  const handleDeleteFood = async () => {
    if (!editingFood) return;

    try {
      const response = await fetch(`${BASE_URL}/foods/${editingFood._id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete food");

      const updatedResponse = await fetch(`${BASE_URL}/categories/with-foods`);
      const updatedData = await updatedResponse.json();
      setCategories(updatedData.categories);

      setEditingFood(null);
      setSuccessMessageFoodItem("Food item deleted successfully");
      setTimeout(() => setSuccessMessageFoodItem(""), 2000);
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  const OnChange = async (event: FileInputEvent) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUrl(URL.createObjectURL(file));

      try {
        const uploadedUrl = await uploadToCloudinary(file);
        console.log(`cloud url ${uploadedUrl}`);
        setUrl(uploadedUrl);
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    }
  };

  const uploadImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

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
    if (
      !foodName ||
      !price ||
      !ingredients ||
      !selectedCategoryId ||
      !url.startsWith("https://")
    )
      return;
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
          imageUrl: url,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      setFoodName("");
      setPrice("");
      setIngredients("");
      setUrl("");
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
                    className="border rounded-full w-[38px] p-1 bg-red-600 hover:bg-red-400"
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
                            className="border rounded-full w-[38px]  bg-red-600 hover:bg-red-400"
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
                              <div className="flex flex-col">
                                <label className="text-black text-[14px] font-[600]">
                                  Food image
                                </label>
                                {url ? (
                                  <img
                                    className="mt-[10px] h-[138px] w-full rounded-md object-cover"
                                    src={url}
                                    alt="Profile Preview"
                                  />
                                ) : (
                                  <div
                                    onClick={uploadImage}
                                    className=" bg-slate-200 h-[132px] w-full rounded-md flex flex-col gap-1 justify-center items-center cursor-pointer"
                                  >
                                    <div className=" rounded-full border-[1px]  h-[32px] w-[32px] bg-white flex justify-center items-center">
                                      <Image className="w-[12[px] h-[12px]" />
                                    </div>
                                    <div className="text-[14px] font-[500]">
                                      {" "}
                                      Choose a file or drag & drop it here
                                    </div>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  ref={imageRef}
                                  accept="image/*"
                                  className="hidden"
                                  onChange={OnChange}
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
                        className="flex flex-col w-[270.75px] h-[241px] bg-white  rounded-[20px] border-[1px] items-center  justify-around relative"
                      >
                        <div className="absolute right-14 top-[90px]">
                          {" "}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="border rounded-full  w-[38px]  bg-white  "
                                onClick={() => {
                                  setEditingFood(food);
                                  setEditFoodName(food.foodName);
                                  setEditCategory(food.categoryName);
                                  setEditPrice(food.price.toString());
                                  setEditIngredients(
                                    food.ingredients
                                      .map((el) => el.name)
                                      .join(", ")
                                  );
                                  setEditImageUrl(food.imageUrl);
                                }}
                              >
                                {" "}
                                <Pen className="text-red-600"></Pen>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Dishes info</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="name"
                                    className="text-right text-[12px]"
                                  >
                                    Dish name
                                  </Label>
                                  <Input
                                    id="foodname"
                                    value={editFoodName}
                                    className="col-span-3 focus-visible:ring-0"
                                    onChange={(el) =>
                                      setEditFoodName(el.target.value)
                                    }
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="catergory"
                                    className="text-right w-[30px] text-[12px]"
                                  >
                                    Dish category
                                  </Label>
                                  <Input
                                    id="category"
                                    value={editCategory}
                                    className="col-span-3 focus-visible:ring-0"
                                    onChange={(el) =>
                                      setEditCategory(el.target.value)
                                    }
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="ingridients"
                                    className="text-right text-[12px]"
                                  >
                                    Ingredients
                                  </Label>
                                  <Input
                                    id="ingridients"
                                    value={editIngredients}
                                    className="col-span-3 focus-visible:ring-0"
                                    onChange={(el) =>
                                      setEditIngredients(el.target.value)
                                    }
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4 ">
                                  <Label
                                    htmlFor="price"
                                    className="text-right text-[12px]"
                                  >
                                    Price
                                  </Label>
                                  <Input
                                    id="price"
                                    value={editPrice}
                                    className="col-span-3 focus-visible:ring-0"
                                    onChange={(el) =>
                                      setEditPrice(el.target.value)
                                    }
                                  />
                                </div>
                                <div className="flex justify-between">
                                  <label className="text-black text-[14px] font-[600]">
                                    Image
                                  </label>
                                  {url ? (
                                    <img
                                      className="mt-[10px] w-[314px] h-[138px]  rounded-md object-cover"
                                      src={url}
                                      alt="Profile Preview"
                                    />
                                  ) : (
                                    <div
                                      onClick={uploadImage}
                                      className=" bg-slate-200 w-[314px] h-[132px]  rounded-md flex flex-col gap-1 justify-center items-center cursor-pointer"
                                    >
                                      <div className=" rounded-full border-[1px]  h-[32px] w-[32px] bg-white flex justify-center items-center">
                                        <Image className="w-[12[px] h-[12px]" />
                                      </div>
                                      <div className="text-[14px] font-[500]">
                                        {" "}
                                        Choose a file or drag & drop it here
                                      </div>
                                    </div>
                                  )}
                                  <Input
                                    type="file"
                                    ref={imageRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={OnChange}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <div className="flex justify-between w-full">
                                  {" "}
                                  <Button
                                    type="submit"
                                    className="border-[1px] border-red-600 bg-transparent hover:bg-red-200"
                                    onClick={handleDeleteFood}
                                  >
                                    <Trash className="text-red-600"></Trash>
                                  </Button>
                                  <Button
                                    onClick={handleUpdateFood}
                                    type="submit"
                                  >
                                    Save changes
                                  </Button>
                                </div>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <img
                          src={`${food.imageUrl}`}
                          alt="images"
                          width={265.33}
                          height={129}
                          className="w-[238.75px] h-[129px] rounded-md object-cover"
                        />
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center w-[240px]  ">
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
