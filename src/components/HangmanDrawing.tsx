import { motion } from "framer-motion";

interface Props {
  wrongGuesses: number;
  maxGuesses: number;
}

export const HangmanDrawing = ({ wrongGuesses, maxGuesses }: Props) => {
  const isHardMode = maxGuesses === 8;
  const isMediumMode = maxGuesses === 10;

  const parts = [
    // Base parts (always shown)
    "M10 140 L140 140",  // Base
    "M30 140 L30 10",    // Vertical bar
    "M30 10 L100 10",    // Top bar
    "M100 10 L100 30",   // Rope

    // Core body parts
    "M85 45 A15 15 0 1 0 115 45 A15 15 0 1 0 85 45",  // Head
    "M100 60 L100 90",   // Body
    "M100 90 L60 120",   // Left leg
    "M100 90 L140 120",  // Right leg

    // Additional details for easy/medium mode
    ...(isHardMode ? [] : [
      "M60 120 L50 125 L65 125",  // Left shoe
      "M140 120 L130 125 L145 125",  // Right shoe
      "M95 75 L105 75",    // Belt
      "M97 65 L103 65",    // Neck
    ]),

    // Face and hair (only for easy mode)
    ...(isMediumMode || isHardMode ? [] : [
      "M90 40 A3 3 0 1 0 96 40",  // Left eye
      "M104 40 A3 3 0 1 0 110 40",  // Right eye
      "M95 50 Q100 55 105 50",  // Smile
      "M85 35 Q100 25 115 35",  // Hair
    ])
  ].slice(0, wrongGuesses + 4); // +4 for the base parts that are always shown

  return (
    <div className="w-[200px] h-[200px] mx-auto">
      <svg width="200" height="200" viewBox="0 0 150 150" className="stroke-primary" strokeWidth="2" fill="none">
        {parts.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
};