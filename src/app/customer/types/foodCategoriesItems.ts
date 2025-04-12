export type FoodItem = {
  _id: number;
  foodName: string;
  img: string;
  price: string;
  ingredients: [];
  categoryName: string;
  foodCategoriesItems: FoodItem[];
  foods: FoodItem[];
};
