import { Challenge } from "@/data/challenges";
import { openDB, DBSchema, IDBPDatabase } from "idb";
import { v4 as uuidV4 } from "uuid";
import { notifyDBUpdate } from "../dbEvents";
import { extendedChallenges } from "@/components/features/Challenges/ChallengesProvider";

interface CryptoQuestDB extends DBSchema {
  user: {
    key: string;
    value: UserProgress;
  };
  challengeProgress: {
    key: string;
    value: ChallengeProgress;
  };
  newChallenges: {
    key: string;
    value: extendedChallenges;
  };
}

export interface UserProgress {
  uId: string;
  username: string;
  xp: number;
  level: number;
  streak: number;
  lastActive: string;
  completedChallenges: string[];
  badges: string[];
  createdAt: string;
  current: boolean;
}

export interface ChallengeProgress {
  CpId: string;
  completed: boolean;
  attempts: number;
  bestTime?: number;
  completedAt?: string;
  hints: number;
}

let db: IDBPDatabase<CryptoQuestDB> | null = null;

//initialize the data base
async function getDB() {
  if (!db) {
    db = await openDB<CryptoQuestDB>("crypto-quest-db", 3, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("user")) {
          db.createObjectStore("user", {keyPath: "uId"});
        }
        if (!db.objectStoreNames.contains("challengeProgress")) {
          db.createObjectStore("challengeProgress", {keyPath: "CpId"});
        }
        if (!db.objectStoreNames.contains("newChallenges")) {
          db.createObjectStore("newChallenges", {keyPath: "cId"});
        }
      },
    });
  }
  return db;
}

//initialize the user
export async function initializeUser(username: string, uId: string): Promise<UserProgress> {
  const database = await getDB();
  const existingUser = await database.get("user", uId);

  if (existingUser) {
    return { ...existingUser, current: true };
  }

  const newUser: UserProgress = {
    uId: uId,
    username,
    xp: 0,
    level: 1,
    streak: 0,
    lastActive: new Date().toISOString(),
    completedChallenges: [],
    badges: [],
    createdAt: new Date().toISOString(),
    current: true,
  };

  await database.put("user", newUser);
  notifyDBUpdate();
  return newUser;
}
//read all users
export async function getAllUser(): Promise<UserProgress[] | null> {
  const database = await getDB();
  return (await database.getAll("user")) || null;
}
//read user's data
export async function getUser(uId: string): Promise<UserProgress | null> {
  const database = await getDB();
  return (await database.get("user", uId)) || null;
}

//LogOut user
export async function LogOutUser(uId: string) {
  const database = await getDB();
  const foundUser = await database.get("user", uId);
  const updateUser = { ...foundUser, current: false };
  await database.put("user", updateUser);
}
//remove user
export async function removeUser(uId: string) {
  const database = await getDB();
  database.delete("user", uId);
}

//update user
export async function updateUserProgress(updates: Partial<UserProgress>,uId: string): Promise<UserProgress> {
  const database = await getDB();
  const user = await getUser(uId);

  if (!user) {
    throw new Error("User not initialized");
  }

  const updatedUser = {
    ...user,
    ...updates,
    lastActive: new Date().toISOString(),
  };

  await database.put("user", updatedUser);
  notifyDBUpdate();
  return updatedUser;
}
//update user
export async function addXP(amount: number,uId: string): Promise<UserProgress> {
  const user = await getUser(uId);
  if (!user) throw new Error("User not initialized");

  const newXp = user.xp + amount;
  const newLevel = Math.floor(newXp / 1000) + 1;

  return await updateUserProgress(
    {
      xp: newXp,
      level: newLevel,
    },
    uId
  );
}

//update challenge progress
export async function completeChallenge(challengeId: string, xpReward: number, uId: string): Promise<UserProgress> {
  const user = await getUser(uId);
  if (!user) throw new Error("User not initialized");

  const database = await getDB();
  const challengeProgress = (await database.get("challengeProgress",challengeId)) || {
    CpId: challengeId,
    completed: false,
    attempts: 0,
    hints: 0,
  };

  await database.put("challengeProgress",
    {
      ...challengeProgress,
      completed: true,
      completedAt: new Date().toISOString(),
    },
  );

  if (!user.completedChallenges.includes(challengeId)) {
    return await updateUserProgress(
      {
        completedChallenges: [...user.completedChallenges, challengeId],
        xp: user.xp + xpReward,
        level: Math.floor((user.xp + xpReward) / 1000) + 1,
      },
      uId
    );
  }
  notifyDBUpdate();
  return user;
}

// read challenge progress
export async function getChallengeProgress(challengeId: string): Promise<ChallengeProgress | null> {
  const database = await getDB();
  return (await database.get("challengeProgress", challengeId)) || null;
}
//update user progress
export async function updateStreak(uId: string): Promise<UserProgress> {
  const user = await getUser(uId);
  if (!user) throw new Error("User not initialized");

  const lastActive = new Date(user.lastActive);
  const now = new Date();
  const daysDiff = Math.floor(
    (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
  );

  let newStreak = user.streak;
  if (daysDiff === 1) {
    newStreak += 1;
  } else if (daysDiff > 1) {
    newStreak = 1;
  }

  return await updateUserProgress({ streak: newStreak }, uId);
}
//create new challenge
export async function addNewChallenge(cl: extendedChallenges) {
  const database = await getDB();

  await database.put("newChallenges", cl);
  return database.getAll("newChallenges");
}
//read new challenge
export async function getNewChallenges() {
  const database = (await getDB()).getAll("newChallenges");

  return database;
}
//del new-challenge
export async function delNewChallenges(uId: string) {
  const database = await getDB()

  await database.delete("newChallenges", uId);
  return database;
}