import { useState } from "react";
import { StudyNode } from "@/types/StudyNode";
import { calculateProgress } from "@/lib/progress";

interface TreeNodeProps {
  node: StudyNode;
  isRoot?: boolean;
  onUpdate: (node: StudyNode) => void;
  onDelete: (nodeId: string) => void;
  onMove: (nodeId: string, direction: "up" | "down") => void;
}

export function TreeNode({ node, isRoot = false, onUpdate, onDelete, onMove }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(node.title);
  const [editDeadline, setEditDeadline] = useState(node.deadline || "");
  const [editDifficulty, setEditDifficulty] = useState(node.difficulty || "");
  const [editNotes, setEditNotes] = useState(node.notesLink || "");

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

  const handleToggleDone = () => {
    if (!node.isDone && !node.deadline) {
      alert("Please set a deadline before marking as complete!");
      return;
    }
    onUpdate({ ...node, isDone: !node.isDone });
  };

  const handleRevision = () => {
    onUpdate({ ...node, revisions: node.revisions + 1 });
  };

  const handleSaveEdit = () => {
    onUpdate({
      ...node,
      title: editTitle.trim() || node.title,
      deadline: editDeadline || null,
      difficulty: (editDifficulty as StudyNode["difficulty"]) || null,
      notesLink: editNotes.trim() || null
    });
    setIsEditing(false);
  };

  const handleRatingChange = (rating: number) => {
    if (node.isDone) {
      onUpdate({ ...node, rating });
    }
  };

  return (
    <div className="ml-4 border-l-2 border-primary/20 pl-4 animate-fade-in">
      <div className="p-4 mb-2 shadow-md hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-card/95">
        <div className="space-y-3">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              {node.children.length > 0 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary hover:text-accent transition-all duration-200 hover:scale-110"
                >
                  <span className={`inline-block transition-transform duration-300 ${isExpanded ? "rotate-0" : "-rotate-90"}`}>
                    ▼
                  </span>
                </button>
              )}
              {isEditing ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1"
                  autoFocus
                />
              ) : (
                <span className={`font-semibold transition-colors duration-200 ${node.isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {node.title}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                // size="sm"
                // variant="outline"
                onClick={handleAddChild} className="hover:scale-105 transition-transform">
                ➕
              </button>
              {isEditing ? (
                <>
                  <button
                    // size="sm"
                    // variant="default"
                    onClick={handleSaveEdit} className="hover:scale-105 transition-transform">
                    💾
                  </button>
                  <button
                    // size="sm"
                    // variant="outline"
                    onClick={() => setIsEditing(false)} className="hover:scale-105 transition-transform">
                    ✖
                  </button>
                </>
              ) : (
                <>
                    <button
                      // size="sm"
                      // variant="outline"
                      onClick={() => setIsEditing(true)} className="hover:scale-105 transition-transform">
                    ✏️
                  </button>
                    <button
                      // size="sm"
                      // variant="outline"
                      onClick={handleToggleDone} className="hover:scale-105 transition-transform">
                    {node.isDone ? "↩️" : "✅"}
                  </button>
                    <button
                      // size="sm"
                      // variant="outline"
                      onClick={handleRevision} className="hover:scale-105 transition-transform">
                    🔁 {node.revisions}
                  </button>
                    <button
                      // size="sm"
                      // variant="outline"
                      onClick={() => onMove(node.id, "up")} className="hover:scale-105 transition-transform">
                    ⬆️
                  </button>
                    <button
                      // size="sm"
                      // variant="outline"
                      onClick={() => onMove(node.id, "down")} className="hover:scale-105 transition-transform">
                    ⬇️
                  </button>
                  {!isRoot && (
                    <button 
                      // variant="destructive" 
                      onClick={() => onDelete(node.id)}
                      className="hover:scale-105 transition-transform"
                    >
                      🗑
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Edit Mode Fields */}
          {isEditing && (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Deadline</label>
                <input
                  type="date"
                  value={editDeadline}
                  onChange={(e) => setEditDeadline(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Difficulty</label>
                <select
                  value={editDifficulty}
                  onChange={(e) => setEditDifficulty(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-input bg-background"
                >
                  <option value="">None</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Notes Link</label>
                <input
                  type="url"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
          )}

          {/* Info Row */}
          <div className="flex items-center gap-4 text-sm">
            {node.deadline && (
              <span className="text-muted-foreground">
                📅 {new Date(node.deadline).toLocaleDateString()}
              </span>
            )}
            {node.difficulty && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium shadow-sm transition-all duration-200 hover:scale-105 ${
                node.difficulty === "Easy" ? "bg-success text-success-foreground" :
                node.difficulty === "Medium" ? "bg-warning text-warning-foreground" :
                "bg-destructive text-destructive-foreground"
              }`}>
                {node.difficulty}
              </span>
            )}
            {node.notesLink && (
              <a 
                href={node.notesLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-200 hover:underline font-medium"
              >
                📝 Notes
              </a>
            )}
            {node.isDone && (
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Rating:</span>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={star <= node.rating ? "text-warning" : "text-muted"}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {node.children.length > 0 && (
            <div className="space-y-1">
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {progress.toFixed(0)}% complete
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Children */}
      {isExpanded && node.children.length > 0 && (
        <div className="mt-2">
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              onUpdate={(updatedChild) => {
                const newChildren = node.children.map(c => 
                  c.id === updatedChild.id ? updatedChild : c
                );
                onUpdate({ ...node, children: newChildren });
              }}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
