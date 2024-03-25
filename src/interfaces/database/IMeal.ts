import { IIngredients } from "./IIngredients";
import { INutritionValues } from "./INutritionValues";

export default interface IMeal {
  id: number;
  name?: string;
  ingredients?: IIngredients[];
  cousine?: string;
  carbonFootprint?: number;
  dietCategory?: string;
  calories?: number;
  intolerance?: string;
  image?: any;
  providerId?: number;
  rating?: number;
  price?: string;
  stock?: number;
  nutritionValues?: INutritionValues[];
}
