export interface notes{
    id: string;
    title: string;
    content: string;
    date: string;
}

export interface createNoteEvent{
  note: notes;
  sel: string;
}