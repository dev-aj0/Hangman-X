import { Moon, Sun, Sunset, Droplet, Candy, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [currentIcon, setCurrentIcon] = useState<JSX.Element>(<Sun className="h-[1.2rem] w-[1.2rem]" />);

  const handleThemeChange = (theme: string, icon: JSX.Element) => {
    document.documentElement.className = theme;
    setCurrentIcon(icon);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 right-4">
          {currentIcon}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {
          setTheme("light");
          handleThemeChange("light", <Sun className="h-[1.2rem] w-[1.2rem]" />);
        }}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          setTheme("dark");
          handleThemeChange("dark", <Moon className="h-[1.2rem] w-[1.2rem]" />);
        }}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('candy-theme', <Candy className="h-[1.2rem] w-[1.2rem]" />)}>
          <Candy className="mr-2 h-4 w-4" />
          Candy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('sunset-theme', <Sunset className="h-[1.2rem] w-[1.2rem]" />)}>
          <Sunset className="mr-2 h-4 w-4" />
          Sunset
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('forest-theme', <Trees className="h-[1.2rem] w-[1.2rem]" />)}>
          <Trees className="mr-2 h-4 w-4" />
          Forest
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}