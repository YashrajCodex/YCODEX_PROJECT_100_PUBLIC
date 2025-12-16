import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EllipsisVertical, Trophy } from "lucide-react";
import { challenges } from "@/data/challenges";
import UserData from "@/components/features/UserData/UserData";
import Modal from "@/components/UI/Modal";
import ProfileOptions from "@/components/UI/ProfileOptions";
import { useUserContext } from "@/components/features/UserData/useUserContext";
export default function Profile() {
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUserContext();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            No profile found. Please restart your journey.
          </p>
          <a href="/" className="text-primary hover:underline">
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  const xpForNextLevel = user.level * 1000;
  const xpInCurrentLevel = user.xp % 1000;
  const completionPercentage =
    (user.completedChallenges.length / challenges.length) * 100;
  const totalXPEarned = challenges
    .filter((c) => user.completedChallenges.includes(c.cId))
    .reduce((sum, c) => sum + c.xpReward, 0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex text-center my-12 items-center justify-around gap-5"
      >
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Your Profile
          </h1>
          <p className="text-muted-foreground">
            Track your cryptography journey
          </p>
        </div>
        <button
          className="p-4 rounded-lg font-semibold"
          onClick={() => setIsOpen((op) => !op)}
        >
          <EllipsisVertical />
        </button>
      </motion.div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen((state) => !state)}>
        <ProfileOptions/>
      </Modal>
      <UserData
        user={user}
        completionPercentage={completionPercentage}
        xpInCurrentLevel={xpInCurrentLevel}
        totalXPEarned={totalXPEarned}
      />
    </>
  );
}
