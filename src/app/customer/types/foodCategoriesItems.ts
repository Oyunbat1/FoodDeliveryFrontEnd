export type FoodItem = {
  _id: number;
  foodName: string;
  img: string;
  price: string;
  ingredients: {
    id: string;
    name: string;
  }[];
  categoryName: string;
  foodCategoriesItems: FoodItem[];
  foods: FoodItem[];
};
