import { Challenge, challenges } from "@/data/challenges";
import React, { useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";
import { addNewChallenge, delNewChallenges, getNewChallenges } from "@/lib/storage/indexDB";
import { useUserContext } from "../UserData/useUserContext";

export interface extendedChallenges extends Challenge {
  uId: string;
}
export interface ChallengesContextType {
  newChallenges: extendedChallenges[];
  loading: boolean;
  error: string;
  addCl: (cL: extendedChallenges) => void;
  delChallenges: () => void;
  setNewChallenges: React.Dispatch<React.SetStateAction<extendedChallenges[]>>
}
export default function ChallengesProvider({ children }) {
  const [newChallenges, setNewChallenges] = useState<
    extendedChallenges[] | null
  >();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const { user } = useUserContext();

  useEffect(() => {
    async function getSCl() {
      setLoading(true);
      try {
        const data = await getNewChallenges();
        if (data) {
          const filteredData = data.filter(c => c.uId === user.uId);
          setNewChallenges(filteredData);
        }
      } catch (e) {
        setError(e?.message || "Failed to load stored Challenges");
      } finally {
        setLoading(false);
      }
    }
    getSCl();
  }, [user?.uId]);

  async function addCl(cL: extendedChallenges) {
    setLoading(true);
    try {
      const data = await addNewChallenge(cL);
        if (data) {
          const savedCl = data.filter((cl) => cl?.uId === user?.uId);
        setNewChallenges(()=> [...savedCl]);
      }
    } catch (error) {
      setError(error?.message || "Failed to add challenge");
    } finally {
      setLoading(false);
    }
  }
  async function delChallenges() {
    setLoading(true);
    try {
      await delNewChallenges(user?.uId);
      setNewChallenges(null);
    } catch (error) {
      setError(error?.message || "Failed to add challenge");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ChallengesContext.Provider
      value={{ newChallenges, loading, error, addCl, setNewChallenges, delChallenges }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
