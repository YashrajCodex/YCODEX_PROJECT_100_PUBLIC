import { StudyNode } from "@/types/StudyNode";

const STORAGE_KEY = "study-tracker-data";

export function saveToLocalStorage(rootNode: StudyNode): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rootNode));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

export function loadFromLocalStorage(): StudyNode | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    return null;
  }
}

export function exportToJSON(rootNode: StudyNode): void {
  const dataStr = JSON.stringify(rootNode, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `study-tracker-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function importFromJSON(file: File): Promise<StudyNode> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(new Error("Invalid JSON file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
