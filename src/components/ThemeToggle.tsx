import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "smart_choice_shop_theme";

const getInitialDark = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved === "dark";
  } catch {
    // Storage blocked — fall back to the OS preference.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const ThemeToggle = () => {
  const [dark, setDark] = useState(getInitialDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch {
      // Preference just won't persist.
    }
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition-colors hover:bg-stone-100"
    >
      {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
    </button>
  );
};

export default ThemeToggle;
