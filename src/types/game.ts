import { CATEGORIES, DIFFICULTY } from "@/lib/constants";

export type Category = keyof typeof CATEGORIES;
export type Difficulty = keyof typeof DIFFICULTY;

export interface GameState {
  screen: "menu" | "game";
  mode?: "random" | "category";
  category?: Category;
  difficulty?: Difficulty;
  word?: string;
  subcategory?: string;
  usedCategories: Category[];
}