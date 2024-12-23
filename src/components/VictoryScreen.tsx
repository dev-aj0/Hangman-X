import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface VictoryScreenProps {
  word: string;
  onRestart: () => void;
  onExit: () => void;
}

export const VictoryScreen = ({ word, onRestart, onExit }: VictoryScreenProps) => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="text-center space-y-6 p-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-2 rounded-lg shadow-lg max-w-md mx-auto">
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold"
        >
          Congratulations!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl"
        >
          You correctly guessed the word:
          <span className="block mt-2 font-mono font-bold text-2xl">{word}</span>
        </motion.p>
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={onExit}
            className="button-hover bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            size="lg"
            onClick={onRestart}
            className="button-hover"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
        </div>
      </div>
    </motion.div>
  );
};