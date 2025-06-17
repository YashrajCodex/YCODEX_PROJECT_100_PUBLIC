import React from "react";

export interface Goal {
  id: string;
  title: string;
  description: string;
  startDate: string;
  deadline: string;
  completionDate?: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'starred';
  noteLinks: { url: string; title: string }[];
  isStarred: boolean;
}

type S = string

export interface NavProps{
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<S>>;
}
