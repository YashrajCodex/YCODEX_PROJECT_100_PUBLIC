import { useState, useEffect, useRef } from "react";
import { StudyNode, createNode } from "@/types/StudyNode";
import { TreeNode } from "@/components/TreeNode";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  importFromJSON,
} from "@/lib/storage";
import {
  updateParentProgress,
  getCompletedNodes,
  getTotalNodes,
} from "@/lib/progress";
import { deleteNode, moveNode } from "@/lib/nodeUtils";
import { Moon, Sun } from "lucide-react";
import Navbar from "@/components/UI/Navbar";

const Index = () => {
  const [rootNode, setRootNode] = useState<StudyNode>(() => {
    const saved = loadFromLocalStorage();
    return saved || createNode("My Study Plan");
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      saveToLocalStorage(rootNode);
    }, 500);
    return () => clearTimeout(timer);
  }, [rootNode]);

  const handleUpdate = (updatedNode: StudyNode) => {
    const updated = { ...updatedNode };
    updateParentProgress(updated);
    setRootNode(updated);
  };

  const handleDelete = (nodeId: string) => {
    const updated = { ...rootNode };
    if (deleteNode(updated, nodeId)) {
      updateParentProgress(updated);
      setRootNode(updated);
      // toast.success("Node deleted");
    } else {
      // toast.error("Cannot delete root node");
    }
  };

  const handleMove = (nodeId: string, direction: "up" | "down") => {
    const updated = { ...rootNode };
    if (moveNode(updated, nodeId, direction)) {
      setRootNode(updated);
      // toast.success(`Moved ${direction}`);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imported = await importFromJSON(file);
      setRootNode(imported);
      // toast.success("Imported successfully");
    } catch (error) {
      // toast.error("Failed to import file");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <Navbar
        rootNode={rootNode}
        fileInputRef={fileInputRef}
        handleImport={handleImport}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto animate-slide-in">
          <TreeNode
            node={rootNode}
            isRoot
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onMove={handleMove}
          />
        </div>
      </main>

      {/* Instructions */}
      <footer className="border-t border-border/50 bg-gradient-to-br from-card to-card/95 mt-12 shadow-lg animate-fade-in">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-5xl mx-auto text-sm text-muted-foreground space-y-3">
            <p className="font-bold text-foreground text-base">
              💡 Quick Guide:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">➕</span>
                <span>Add child nodes to any level (infinite nesting)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✏️</span>
                <span>Edit to set deadline, difficulty, and notes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✅</span>
                <span>Mark done (requires deadline first)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">🔁</span>
                <span>Track revisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">⭐</span>
                <span>Rate after completion (0-5 stars)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">⬆️⬇️</span>
                <span>Reorder sibling nodes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">📥📤</span>
                <span>Export/Import JSON backups</span>
              </li>
            </ul>
            <p className="text-xs text-center pt-2 border-t border-border/30 mt-4">
              Built with React + TypeScript + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
