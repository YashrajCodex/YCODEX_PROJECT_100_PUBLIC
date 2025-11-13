import { StudyNode } from "@/types/StudyNode";

export function calculateProgress(node: StudyNode): number {
  if (node.children.length === 0) {
    return node.isDone ? 100 : 0;
  }

  const childrenProgress = node.children.map(calculateProgress);
  const total = childrenProgress.reduce((sum, progress) => sum + progress, 0);
  return total / node.children.length;
}

export function getTotalNodes(node: StudyNode): number {
  return 1 + node.children.reduce((sum, child) => sum + getTotalNodes(child), 0);
}

export function getCompletedNodes(node: StudyNode): number {
  const current = node.isDone ? 1 : 0;
  return current + node.children.reduce((sum, child) => sum + getCompletedNodes(child), 0);
}

export function updateParentProgress(node: StudyNode): boolean {
  if (node.children.length === 0) {
    return node.isDone;
  }

  const allChildrenDone = node.children.every(child => updateParentProgress(child));
  node.isDone = allChildrenDone;
  return allChildrenDone;
}
