import { getCompletedNodes, getTotalNodes } from "@/lib/progress";
import { exportToJSON } from "@/lib/storage";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar({ rootNode, fileInputRef, handleImport }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });
  const handleExport = () => {
    exportToJSON(rootNode);
    // toast.success("Exported successfully");
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  const totalNodes = getTotalNodes(rootNode);
  const completedNodes = getCompletedNodes(rootNode);
  const overallProgress =
    totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0;
  return (
    <header className="border-b border-border/50 bg-gradient-to-br from-card to-card/95 shadow-md animate-fade-in">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              📚 Study Progress Tracker
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-medium">
              Recursive nested learning roadmaps
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={handleExport}
              className="shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              📥 Export
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              📤 Import
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="rounded-full hover:scale-110 transition-transform duration-200 shadow-sm"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mt-6 space-y-3 bg-background/50 p-4 rounded-xl border border-border/30 shadow-inner animate-scale-in">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">
              Overall Progress
            </span>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {completedNodes} / {totalNodes} tasks •{" "}
              {overallProgress.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-primary via-accent to-primary h-4 rounded-full transition-all duration-500 ease-out animate-pulse-slow"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
