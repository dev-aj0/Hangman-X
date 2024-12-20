import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const HelpPopup = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed top-4 right-[4.5rem]"
        >
          <HelpCircle className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Help</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="space-y-4">
          <h3 className="font-bold text-lg">How to Play Hangman X</h3>
          <div className="space-y-2 text-sm">
            <p>1. Choose a category or try Random Mode for a surprise!</p>
            <p>2. Select your difficulty level (Easy, Medium, or Hard)</p>
            <p>3. Guess letters to reveal the hidden word</p>
            <p>4. You can use your keyboard or click the on-screen letters</p>
            <p>5. Be careful! Too many wrong guesses and the game is over</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};