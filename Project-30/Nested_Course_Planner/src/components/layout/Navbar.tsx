import { useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme, ThemeName } from "@/context/ThemeContext";
import { Modal } from "@/components/ui/Modal";

const THEMES: { name: ThemeName; label: string; preview: string }[] = [
  { name: "blue-nebula", label: "Blue Nebula", preview: "bg-gradient-to-r from-blue-500 to-cyan-400" },
  { name: "red-inferno", label: "Red Inferno", preview: "bg-gradient-to-r from-red-500 to-orange-500" },
  { name: "green-quantum", label: "Green Quantum", preview: "bg-gradient-to-r from-green-500 to-teal-400" },
  { name: "purple-mystic", label: "Purple Mystic", preview: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { name: "black-ice", label: "Black Ice", preview: "bg-gradient-to-r from-slate-400 to-cyan-300" },
];

export const Navbar = () => {
  const { theme, mode, setTheme, toggleMode } = useTheme();
  const [showThemePicker, setShowThemePicker] = useState(false);

  return (
    <>
      <nav className="glass border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="text-3xl animate-pulse-glow">📚</div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
                  Study Progress Tracker
                </h1>
                <p className="text-xs text-muted-foreground">Infinite Nested Learning</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowThemePicker(true)}
                glow
                className="rounded-full"
              >
                <Sparkles className="h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMode}
                className="rounded-full"
              >
                {mode === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Theme Picker Modal */}
      <Modal
        isOpen={showThemePicker}
        onClose={() => setShowThemePicker(false)}
        title="Choose Theme Pack"
        size="md"
      >
        <div className="grid grid-cols-1 gap-3">
          {THEMES.map(t => (
            <button
              key={t.name}
              onClick={() => {
                setTheme(t.name);
                setShowThemePicker(false);
              }}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                theme === t.name
                  ? "border-primary bg-primary/10 glow-primary"
                  : "border-border hover:border-accent hover:bg-accent/5"
              }`}
            >
              <div className={`w-16 h-16 rounded-lg ${t.preview}`} />
              <span className="font-medium text-foreground">{t.label}</span>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
};
