import { StudyNode } from "@/types/StudyNode";

export function findNodeById(root: StudyNode, id: string): StudyNode | null {
  if (root.id === id) return root;
  
  for (const child of root.children) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  
  return null;
}

export function findParentNode(root: StudyNode, childId: string): StudyNode | null {
  for (const child of root.children) {
    if (child.id === childId) return root;
    const found = findParentNode(child, childId);
    if (found) return found;
  }
  return null;
}

export function deleteNode(root: StudyNode, nodeId: string): boolean {
  if (root.id === nodeId) return false; // Cannot delete root
  
  const parent = findParentNode(root, nodeId);
  if (parent) {
    parent.children = parent.children.filter(child => child.id !== nodeId);
    return true;
  }
  return false;
}

export function moveNode(root: StudyNode, nodeId: string, direction: "up" | "down"): boolean {
  const parent = findParentNode(root, nodeId);
  if (!parent) return false;

  const index = parent.children.findIndex(child => child.id === nodeId);
  if (index === -1) return false;

  if (direction === "up" && index > 0) {
    [parent.children[index], parent.children[index - 1]] = 
    [parent.children[index - 1], parent.children[index]];
    return true;
  }

  if (direction === "down" && index < parent.children.length - 1) {
    [parent.children[index], parent.children[index + 1]] = 
    [parent.children[index + 1], parent.children[index]];
    return true;
  }

  return false;
}
