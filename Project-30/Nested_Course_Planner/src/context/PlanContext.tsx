import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Plan, Folder, Group, createPlan } from "@/types/Plan";

interface PlanContextType {
  plans: Plan[];
  folders: Folder[];
  groups: Group[];
  currentPlan: Plan | null;
  addPlan: (name: string, folderId?: string | null) => void;
  updatePlan: (plan: Plan) => void;
  deletePlan: (id: string) => void;
  setCurrentPlan: (id: string) => void;
  addFolder: (name: string, parentId?: string | null) => void;
  updateFolder: (folder: Folder) => void;
  deleteFolder: (id: string) => void;
  addGroup: (name: string, color: string) => void;
  updateGroup: (group: Group) => void;
  deleteGroup: (id: string) => void;
  movePlanToFolder: (planId: string, folderId: string | null) => void;
  assignPlanToGroup: (planId: string, groupId: string | null) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlans = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlans must be used within PlanProvider");
  }
  return context;
};

const STORAGE_KEYS = {
  PLANS: "study-tracker-plans",
  FOLDERS: "study-tracker-folders",
  GROUPS: "study-tracker-groups",
  CURRENT: "study-tracker-current-plan"
};

interface PlanProviderProps {
  children: ReactNode;
}

export const PlanProvider = ({ children }: PlanProviderProps) => {
  const [plans, setPlans] = useState<Plan[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PLANS);
    if (saved) {
      return JSON.parse(saved);
    }
    const defaultPlan = createPlan("My Study Plan");
    return [defaultPlan];
  });

  const [folders, setFolders] = useState<Folder[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FOLDERS);
    return saved ? JSON.parse(saved) : [];
  });

  const [groups, setGroups] = useState<Group[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GROUPS);
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPlanId, setCurrentPlanId] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT);
    return saved || (plans.length > 0 ? plans[0].id : null);
  });

  const currentPlan = plans.find(p => p.id === currentPlanId) || null;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    if (currentPlanId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT, currentPlanId);
    }
  }, [currentPlanId]);

  const addPlan = (name: string, folderId: string | null = null) => {
    const newPlan = createPlan(name);
    newPlan.folderId = folderId;
    setPlans(prev => [...prev, newPlan]);
    setCurrentPlanId(newPlan.id);
  };

  const updatePlan = (plan: Plan) => {
    setPlans(prev => prev.map(p => p.id === plan.id ? { ...plan, updatedAt: new Date().toISOString() } : p));
  };

  const deletePlan = (id: string) => {
    setPlans(prev => {
      const filtered = prev.filter(p => p.id !== id);
      if (currentPlanId === id && filtered.length > 0) {
        setCurrentPlanId(filtered[0].id);
      }
      return filtered;
    });
  };

  const setCurrentPlan = (id: string) => {
    setCurrentPlanId(id);
  };

  const addFolder = (name: string, parentId: string | null = null) => {
    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name,
      parentId,
      children: []
    };
    setFolders(prev => [...prev, newFolder]);
  };

  const updateFolder = (folder: Folder) => {
    setFolders(prev => prev.map(f => f.id === folder.id ? folder : f));
  };

  const deleteFolder = (id: string) => {
    // Move plans out of folder
    setPlans(prev => prev.map(p => p.folderId === id ? { ...p, folderId: null } : p));
    // Delete folder and children
    setFolders(prev => prev.filter(f => f.id !== id && f.parentId !== id));
  };

  const addGroup = (name: string, color: string) => {
    const newGroup: Group = {
      id: crypto.randomUUID(),
      name,
      color
    };
    setGroups(prev => [...prev, newGroup]);
  };

  const updateGroup = (group: Group) => {
    setGroups(prev => prev.map(g => g.id === group.id ? group : g));
  };

  const deleteGroup = (id: string) => {
    setPlans(prev => prev.map(p => p.groupId === id ? { ...p, groupId: null } : p));
    setGroups(prev => prev.filter(g => g.id !== id));
  };

  const movePlanToFolder = (planId: string, folderId: string | null) => {
    setPlans(prev => prev.map(p => p.id === planId ? { ...p, folderId } : p));
  };

  const assignPlanToGroup = (planId: string, groupId: string | null) => {
    setPlans(prev => prev.map(p => p.id === planId ? { ...p, groupId } : p));
  };

  return (
    <PlanContext.Provider value={{
      plans,
      folders,
      groups,
      currentPlan,
      addPlan,
      updatePlan,
      deletePlan,
      setCurrentPlan,
      addFolder,
      updateFolder,
      deleteFolder,
      addGroup,
      updateGroup,
      deleteGroup,
      movePlanToFolder,
      assignPlanToGroup
    }}>
      {children}
    </PlanContext.Provider>
  );
};
