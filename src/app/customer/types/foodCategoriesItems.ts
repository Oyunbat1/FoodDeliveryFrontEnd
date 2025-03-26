
export type FoodItem = {
  id: number;
  foodTitle: string;
  img: string;
  price: string;
  overview: string;
};


export type FoodCategory = {
  id: number;
  categoryName: string;
  foodCategoriesItems: FoodItem[]; 
};
