export interface StudyNode {
  id: string;
  title: string;
  deadline: string | null;
  rating: number; // 0–5
  isDone: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | null;
  revisions: number;
  notesLink: string | null;
  children: StudyNode[];
}

export function createNode(title: string): StudyNode {
  return {
    id: crypto.randomUUID(),
    title,
    deadline: null,
    rating: 0,
    isDone: false,
    difficulty: null,
    revisions: 0,
    notesLink: null,
    children: []
  };
}
