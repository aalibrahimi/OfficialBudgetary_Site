import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

/**
 * Our own Dark Mode toggle for tailwindcss
 */
const ModeToggle = () => {
  const defaultMode = "dark";
  const html = document.getElementsByTagName("html").item(0);
  const [isDarkMode, setIsDarkMode] = useState(
    defaultMode === "dark" ? true : false
  );

  useEffect(() => {
    const mode = localStorage.getItem("darkMode");
    switch (mode) {
      case "true":
        html!.classList.add("dark");
        return;
      case "false":
        html!.classList.remove("dark");
    }
    const checkMode = html!.classList.contains("dark");
    setIsDarkMode(checkMode);
  }, []);

  const toggleMode = () => {
    html!.classList.toggle(defaultMode);
    const checkMode = html!.classList.contains("dark");
    setIsDarkMode(checkMode);
    switch (checkMode) {
      case true:
        localStorage.setItem("darkMode", "true");
        return;
      default:
        localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Removed animation for now bc was causing performance issue ( slow mode change ) */}
      <Sun
        className="h-4 w-4 dark:text-gray-500 text-amber-500"
      />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleMode}
        className="!bg-teal-500 dark:!bg-blue-900 hover:cursor-pointer [&_span]:dark:bg-slate-200"
      />
      <Moon
        className="h-4 w-4 dark:text-teal-400 text-gray-400"
      />
    </div>
  );
};

export default ModeToggle;
