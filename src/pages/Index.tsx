import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GameScreen } from "@/components/GameScreen";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HelpPopup } from "@/components/HelpPopup";
import { CATEGORIES, DIFFICULTY } from "@/lib/constants";
import { useGameLogic } from "@/hooks/useGameLogic";
import type { Category } from "@/types/game";

const Index = () => {
  const { gameState, startGame, setGameState } = useGameLogic();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMode, setSelectedMode] = useState<"random" | Category | null>(null);

  const filteredCategories = Object.keys(CATEGORIES).filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <HelpPopup />
          <ThemeToggle />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {gameState.screen === "menu" ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="space-y-8">
              <motion.h1 
                className="text-4xl sm:text-7xl font-bold text-center sm:mt-[--1000px] mt-0"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
              >
                Hangman X
              </motion.h1>

              <div className="relative max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                />
              </div>
              {/* Random Mode Button */}
              <div className="w-full flex justify-center mt-6">
                <Button
                  variant="outline"
                  className={`relative button-hover w-full sm:w-[600px] h-32 text-lg flex items-center justify-center p-4 bg-background/95 ${
                    selectedMode === "random" ? 'ring-2 ring-primary font-bold' : ''
                  }`}
                  onClick={() => setSelectedMode(selectedMode === "random" ? null : "random")}
                >
                  <span className="text-sm sm:text-xl font-semibold text-center">Random Mode</span>

                  {/* Difficulty Selector */}
                  <AnimatePresence>
                    {selectedMode === "random" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 flex flex-col items-center justify-center"
                      >
                        <div className="flex gap-4 p-4 bg-black rounded-md w-[%]">
                          {(Object.keys(DIFFICULTY) as Array<keyof typeof DIFFICULTY>).map((diff) => (
                            <Button
                              key={diff}
                              variant="ghost"
                              size="sm"
                              className="text-lg font-bold hover:bg-[#333333] min-w-[40px] text-white hover:text-white flex items-center justify-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                startGame("random", diff);
                              }}
                            >
                              {diff}
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>



              {/* Categories List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
                {filteredCategories.map((category) => {
                  const isSelected = selectedMode === category;

                  return (
                    <div key={category} className="relative">
                      <Button
                        variant="outline"
                        className={`button-hover h-24 sm:h-32 text-lg flex items-center justify-center p-4 w-full bg-background/95 ${
                          isSelected ? 'ring-2 ring-primary font-bold' : ''
                        }`}
                        onClick={() => {
                          if (selectedMode === category) {
                            setSelectedMode(null);
                          } else {
                            setSelectedMode(category as Category);
                          }
                        }}
                      >
                        <span className="text-sm sm:text-xl font-semibold text-center">{category}</span>

                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 flex items-center justify-center rounded-md"
                          >
                            <div className="flex gap-4 p-4 bg-black rounded-md w-[180px]">
                              {(Object.keys(DIFFICULTY) as Array<keyof typeof DIFFICULTY>).map((diff) => (
                                <Button
                                  key={diff}
                                  variant="ghost"
                                  size="sm"
                                  className="text-lg font-bold hover:bg-[#333333] min-w-[40px] text-white hover:text-white flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startGame("category", category as Category, diff);
                                  }}
                                >
                                  {diff}
                                </Button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <GameScreen
            key="game"
            word={gameState.word!}
            category={gameState.mode === "random" 
              ? `Random (${gameState.category})` 
              : gameState.category!}
            difficulty={gameState.difficulty!}
            onExit={() => {
              setGameState({ screen: "menu", usedCategories: [] });
              setSelectedMode(null);
            }}
            onRestart={() => {
              if (gameState.mode === "random") {
                startGame("random", gameState.difficulty!);
              } else {
                startGame("category", gameState.category!, gameState.difficulty!);
              }
            }}
            soundEnabled={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
