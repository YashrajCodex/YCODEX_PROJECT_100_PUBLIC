import { useState } from "react";
import { FolderPlus, Plus, X, FileText, Move } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { usePlans } from "@/context/PlanContext";
import RenderFolder from "../sidebar/RenderFolder";

export const Sidebar = () => {
  const { 
    plans, 
    folders, 
    currentPlan, 
    addPlan, 
    setCurrentPlan, 
    addFolder,
    movePlanToFolder 
  } = usePlans();
  
  const [showNewPlan, setShowNewPlan] = useState(false);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");

  const handleAddPlan = () => {
    if (newPlanName.trim()) {
      addPlan(newPlanName.trim());
      setNewPlanName("");
      setShowNewPlan(false);
    }
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim());
      setNewFolderName("");
      setShowNewFolder(false);
    }
  };

  const handleMoveToFolder = (pId, fId) => {
    movePlanToFolder(pId, fId)
  }

  const rootPlans = plans.filter(p => !p.folderId);

  return (
    <aside className="w-80 h-screen glass border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">Plans</h2>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowNewFolder(true)}
              className="h-8 w-8"
            >
              <FolderPlus className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="primary"
              onClick={() => setShowNewPlan(true)}
              glow
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* New Plan Input */}
        {showNewPlan && (
          <Card className="p-3 space-y-2">
            <Input
              placeholder="Plan name..."
              value={newPlanName}
              onChange={(e) => setNewPlanName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddPlan()}
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAddPlan} className="flex-1">
                Create
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowNewPlan(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* New Folder Input */}
        {showNewFolder && (
          <Card className="p-3 space-y-2 mt-2">
            <Input
              placeholder="Folder name..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddFolder()}
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAddFolder} className="flex-1">
                Create
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowNewFolder(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Plan List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Root Plans */}
        {rootPlans.map(plan => (
          <div className="plans-container flex gap-6" >
          
          <button
            key={plan.id}
            onClick={() => setCurrentPlan(plan.id)}
            className={`flex items-center gap-2 w-full p-3 rounded-lg transition-all ${
              currentPlan?.id === plan.id
              ? "bg-primary/20 text-primary border-l-2 border-primary glow-primary"
              : "hover:bg-accent/10 text-foreground"
            }`}
            >
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium truncate">{plan.name}</span>
          </button>
          <button className="move_plan" onClick={()=> handleMoveToFolder(plan.id, "")}>
              <Move className="h-4 w-4"/>
          </button>
            </div>
        ))}

        {/* Folders */}
        {folders.filter(f => !f.parentId).map((folder)=>RenderFolder({folder, plans, currentPlan, setCurrentPlan}))}
      </div>
    </aside>
  );
};
