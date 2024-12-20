import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GameScreen } from "@/components/GameScreen";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HelpPopup } from "@/components/HelpPopup";
import { Search } from "lucide-react";
import { CATEGORIES, DIFFICULTY } from "@/lib/constants";
import { useGameLogic } from "@/hooks/useGameLogic";
import type { Category } from "@/types/game";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <Button
          variant="outline"
          size="lg"
          className={`button-hover w-40 h-20 ${selectedMode === "random" ? 'ring-2 ring-primary font-bold' : ''}`}
          onClick={() => setSelectedMode("random")}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl">Random Mode</span>
          </div>
        </Button>
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
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="space-y-8">
              <motion.h1 
                className="text-7xl font-bold text-center -mt-12"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
              >
                Hangman X
              </motion.h1>
              
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {filteredCategories.map((category) => {
                  const isSelected = selectedMode === category;
                  
                  return (
                    <div key={category} className="relative">
                      <Button
                        variant="outline"
                        className={`button-hover h-32 text-lg flex flex-col gap-3 items-center justify-center p-4 w-full ${
                          isSelected ? 'ring-2 ring-primary font-bold' : ''
                        }`}
                        onClick={() => setSelectedMode(category as Category)}
                      >
                        <span className="text-xl font-semibold">{category}</span>
                        
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="absolute bottom-0 left-0 right-0 bg-background border border-black"
                          >
                            <TooltipProvider>
                              <div className="grid grid-cols-3 gap-1 p-2 w-48 mx-auto">
                                {(Object.keys(DIFFICULTY) as Array<keyof typeof DIFFICULTY>).map((diff) => (
                                  <Tooltip key={diff}>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (selectedMode === "random") {
                                            startGame("random", diff);
                                          } else if (selectedMode) {
                                            startGame("category", selectedMode, diff);
                                          }
                                        }}
                                      >
                                        {diff[0].toUpperCase()}
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{diff === 'E' ? 'Easy' : diff === 'M' ? 'Medium' : 'Hard'}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                ))}
                              </div>
                            </TooltipProvider>
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