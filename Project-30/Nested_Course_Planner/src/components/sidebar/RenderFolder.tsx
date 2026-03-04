import { Folder, Plan } from "@/types/Plan";
import {  FolderOpen, Folder as FolderIcon, FileText } from "lucide-react";
import { useState } from "react";

interface RenderFolderProps{
  folder: Folder;
  plans: Plan[];
  currentPlan: Plan;
  setCurrentPlan: (id: string) => void;
}
export default function RenderFolder({ folder, plans, currentPlan, setCurrentPlan }: RenderFolderProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
    const isExpanded = expandedFolders.has(folder.id);
  const folderPlans = plans.filter(p => p.folderId === folder.id);
   const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };
 
    return (
      <div key={folder.id} className="ml-4">
        <button
          onClick={() => toggleFolder(folder.id)}
          className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-accent/10 transition-colors"
        >
          {isExpanded ? (
            <FolderOpen className="h-4 w-4 text-accent" />
          ) : (
            <FolderIcon className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium text-foreground">{folder.name}</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {folderPlans.length}
          </span>
        </button>
        
        {isExpanded && (
          <div className="ml-6 mt-1 space-y-1">
            {folderPlans.map(plan => (
              <button
                key={plan.id}
                onClick={() => setCurrentPlan(plan.id)}
                className={`flex items-center gap-2 w-full p-2 rounded-lg transition-all ${
                  currentPlan?.id === plan.id
                    ? "bg-primary/20 text-primary border-l-2 border-primary glow-primary"
                    : "hover:bg-accent/10 text-foreground"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span className="text-sm truncate">{plan.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };