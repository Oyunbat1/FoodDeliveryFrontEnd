export type FoodItem = {
  _id: number;
  foodName: string;
  img: string;
  price: string;
  ingredients: [];
};

export type FoodCategory = {
  _id: number;
  categoryName: string;
  foodCategoriesItems: FoodItem[];
};
