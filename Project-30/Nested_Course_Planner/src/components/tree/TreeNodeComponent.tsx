import { useState } from "react";
import { StudyNode } from "@/types/StudyNode";
import { calculateProgress } from "@/lib/progress";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { ChevronDown, Plus, Edit2, Check, RotateCcw, Trash2 } from "lucide-react";
import { Progress } from "../ui/Progress";
import { Select } from "../ui/select";

interface TreeNodeProps {
  node: StudyNode;
  isRoot?: boolean;
  onUpdate: (node: StudyNode) => void;
  onDelete: (nodeId: string) => void;
}

export const TreeNodeComponent = ({ node, isRoot = false, onUpdate, onDelete }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(node.title);
  const [editDeadline, setEditDeadline] = useState(node.deadline || "");
  const [editDifficulty, setEditDifficulty] = useState(node.difficulty || "");

  const progress = calculateProgress(node);

  const handleAddChild = () => {
    const newChild: StudyNode = {
      id: crypto.randomUUID(),
      title: "New Task",
      deadline: null,
      rating: 0,
      isDone: false,
      difficulty: null,
      revisions: 0,
      notesLink: null,
      children: []
    };
    onUpdate({ ...node, children: [...node.children, newChild] });
    setIsExpanded(true);
  };

  const handleSave = () => {
    onUpdate({
      ...node,
      title: editTitle.trim() || node.title,
      deadline: editDeadline || null,
      difficulty: (editDifficulty as StudyNode["difficulty"]) || null
    });
    setIsEditing(false);
  };

  return (
    <div className="ml-4 animate-fade-in">
      <Card glass glow={node.isDone} className="mb-3 hover:scale-[1.01] transition-transform">
        <div className="p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              {node.children.length > 0 && (
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-primary hover:text-accent transition-colors">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "" : "-rotate-90"}`} />
                </button>
              )}
              {isEditing ? (
                <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} autoFocus />
              ) : (
                <span className={`font-semibold ${node.isDone ? "line-through text-muted-foreground" : ""}`}>
                  {node.title}
                </span>
              )}
            </div>
            
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={handleAddChild}>
                <Plus className="h-4 w-4" />
              </Button>
              {isEditing ? (
                <Button size="icon" variant="default" onClick={handleSave}>
                  <Check className="h-4 w-4" />
                </Button>
              ) : (
                <>
                  <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => onUpdate({ ...node, isDone: !node.isDone })}>
                    {node.isDone ? "↩️" : "✅"}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => onUpdate({ ...node, revisions: node.revisions + 1 })}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  {!isRoot && (
                    <Button size="icon" variant="destructive" onClick={() => onDelete(node.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="grid grid-cols-2 gap-2">
              <Input type="date" label="Deadline" value={editDeadline} onChange={(e) => setEditDeadline(e.target.value)} />
              <Select
                label="Difficulty"
                value={editDifficulty}
                onChange={(e) => setEditDifficulty(e.target.value)}
                options={[
                  { value: "", label: "None" },
                  { value: "Easy", label: "Easy" },
                  { value: "Medium", label: "Medium" },
                  { value: "Hard", label: "Hard" }
                ]}
              />
            </div>
          )}

          {node.children.length > 0 && (
            <Progress value={progress} showLabel glow />
          )}
        </div>
      </Card>

      {isExpanded && node.children.map(child => (
        <TreeNodeComponent
          key={child.id}
          node={child}
          onUpdate={(updated) => {
            onUpdate({ ...node, children: node.children.map(c => c.id === updated.id ? updated : c) });
          }}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
