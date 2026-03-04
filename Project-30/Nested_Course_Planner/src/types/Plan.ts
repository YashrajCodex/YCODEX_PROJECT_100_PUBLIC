import { StudyNode } from "./StudyNode";

export interface Plan {
  id: string;
  name: string;
  rootNode: StudyNode;
  createdAt: string;
  updatedAt: string;
  folderId: string | null;
  groupId: string | null;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  children: Folder[];
}

export interface Group {
  id: string;
  name: string;
  color: string;
}

export function createPlan(name: string): Plan {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name,
    rootNode: {
      id: crypto.randomUUID(),
      title: name,
      deadline: null,
      rating: 0,
      isDone: false,
      difficulty: null,
      revisions: 0,
      notesLink: null,
      children: []
    },
    createdAt: now,
    updatedAt: now,
    folderId: null,
    groupId: null
  };
}

export function createFolder(name: string, parentId: string | null = null): Folder {
  return {
    id: crypto.randomUUID(),
    name,
    parentId,
    children: []
  };
}

export function createGroup(name: string, color: string): Group {
  return {
    id: crypto.randomUUID(),
    name,
    color
  };
}
