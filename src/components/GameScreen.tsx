import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HangmanDrawing } from "./HangmanDrawing";
import { DIFFICULTY } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Pause, RotateCcw, Home } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { VictoryScreen } from "./VictoryScreen";
import { useGameSounds } from "@/hooks/useGameSounds";

interface GameScreenProps {
  word: string;
  category: string;
  difficulty: keyof typeof DIFFICULTY;
  onExit: () => void;
  onRestart: () => void;
  soundEnabled: boolean;
}

export const GameScreen = ({ 
  word, 
  category, 
  difficulty, 
  onExit, 
  onRestart,
  soundEnabled 
}: GameScreenProps) => {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const { toast } = useToast();
  const { playCorrect, playWrong, playWin, playLose } = useGameSounds(soundEnabled);
  
  const maxGuesses = DIFFICULTY[difficulty];
  const wrongGuesses = guessedLetters.filter(letter => !word.includes(letter)).length;
  const isWinner = word.split('').every(letter => guessedLetters.includes(letter) || letter === ' ' || !isNaN(Number(letter)));
  const isLoser = wrongGuesses >= maxGuesses;
  const gameOver = isWinner || isLoser;

  useEffect(() => {
    setGuessedLetters([]);
  }, [word]);

  useEffect(() => {
    if (!isPaused && !gameOver) {
      const handler = (e: KeyboardEvent) => {
        const key = e.key.toUpperCase();
        if ((!key.match(/^[A-Z]$/) || guessedLetters.includes(key))) return;
        
        setGuessedLetters(curr => [...curr, key]);
        setSelectedKey(key);
        
        if (word.toUpperCase().includes(key)) {
          playCorrect();
        } else {
          playWrong();
        }
      };

      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }
  }, [guessedLetters, isPaused, gameOver, word, playCorrect, playWrong]);

  useEffect(() => {
    if (isLoser) {
      playLose();
      toast({
        title: "Game Over",
        description: "The word was: " + word,
        variant: "destructive",
        className: "bg-background border-destructive",
      });
    } else if (isWinner) {
      playWin();
    }
  }, [isLoser, isWinner, word, toast, playLose, playWin]);

  const keys = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold">Category: {category}</h2>
          <p className="text-sm">Difficulty: {difficulty}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPaused(!isPaused)}
            className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <Pause className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setGuessedLetters([]);
              onRestart();
            }}
            className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onExit}
            className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <Home className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <HangmanDrawing wrongGuesses={wrongGuesses} maxGuesses={maxGuesses} />

      <div className="text-center space-y-4">
        <div className="game-letter space-x-2">
          {word.split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="inline-block min-w-[1.5rem]"
            >
              {letter === ' ' ? '\u2022' : guessedLetters.includes(letter.toUpperCase()) || !isNaN(Number(letter)) ? letter : '_'}
            </motion.span>
          ))}
        </div>

        <div className="text-sm">
          Wrong guesses: {wrongGuesses} / {maxGuesses}
        </div>

        <div className="max-w-sm mx-auto grid grid-cols-6 sm:grid-cols-9 gap-1 sm:gap-2">
          {keys.map((key) => {
            const isGuessed = guessedLetters.includes(key);
            const isCorrect = word.includes(key);
            const isSelected = selectedKey === key;
            return (
              <Button
                key={key}
                variant={isGuessed ? (isCorrect ? "default" : "destructive") : "outline"}
                className={`w-8 h-8 p-0 text-xs sm:text-sm font-mono ${isSelected ? 'selected-box' : ''} bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
                disabled={isGuessed || gameOver || isPaused}
                onClick={() => {
                  setGuessedLetters(curr => [...curr, key]);
                  setSelectedKey(key);
                  if (word.toUpperCase().includes(key)) {
                    playCorrect();
                  } else {
                    playWrong();
                  }
                }}
              >
                {key}
              </Button>
            );
          })}
        </div>
      </div>

      {isPaused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="text-center space-y-4 bg-background/95 p-6 rounded-lg border-2">
            <h2 className="text-2xl font-bold">Game Paused</h2>
            <Button 
              onClick={() => setIsPaused(false)}
              className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
              Resume
            </Button>
          </div>
        </motion.div>
      )}

      {isWinner && (
        <VictoryScreen
          word={word}
          onRestart={() => {
            setGuessedLetters([]);
            onRestart();
          }}
          onExit={onExit}
        />
      )}
    </motion.div>
  );
};