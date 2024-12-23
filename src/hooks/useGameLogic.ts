import { useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import { Category, GameState, Difficulty } from "@/types/game";

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    screen: "menu",
    usedCategories: []
  });

  const getRandomCategory = (usedCategories: Category[]) => {
    const categories = Object.keys(CATEGORIES) as Category[];
    const availableCategories = categories.filter(cat => !usedCategories.includes(cat));
    
    if (availableCategories.length === 0) {
      return {
        category: categories[Math.floor(Math.random() * categories.length)],
        resetUsedCategories: true
      };
    }
    
    return {
      category: availableCategories[Math.floor(Math.random() * availableCategories.length)],
      resetUsedCategories: false
    };
  };

  const getRandomWord = (category: Category): string => {
    const categoryData = CATEGORIES[category];
    if (typeof categoryData === 'object' && !Array.isArray(categoryData)) {
      const subcategories = Object.values(categoryData) as string[][];
      const allWords = subcategories.flat();
      return allWords[Math.floor(Math.random() * allWords.length)];
    }
    return (categoryData as string[])[Math.floor(Math.random() * (categoryData as string[]).length)];
  };

  const startGame = (mode: "random" | "category", categoryOrDifficulty: Category | Difficulty, difficulty?: Difficulty) => {
    if (mode === "random") {
      const { category, resetUsedCategories } = getRandomCategory(gameState.usedCategories);
      const newUsedCategories = resetUsedCategories ? [category] : [...gameState.usedCategories, category];
      const word = getRandomWord(category);
      
      setGameState({
        screen: "game",
        mode: "random",
        category,
        difficulty: categoryOrDifficulty as Difficulty,
        word,
        usedCategories: newUsedCategories
      });
    } else {
      const category = categoryOrDifficulty as Category;
      const word = getRandomWord(category);
      
      setGameState({
        screen: "game",
        mode: "category",
        category,
        difficulty: difficulty!,
        word,
        usedCategories: []
      });
    }
  };

  return {
    gameState,
    setGameState,
    startGame
  };
};