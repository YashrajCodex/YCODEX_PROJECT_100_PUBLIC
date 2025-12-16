import { Award, CheckCircle, Lock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { extendedChallenges } from "./ChallengesProvider";
import { Challenge } from "@/data/challenges";

interface MapChallengesProps {
  challenge: Challenge | extendedChallenges;
  selectChallenge: (challenge: Challenge | extendedChallenges) => void;
  isCompleted: boolean;
  getDifficultyColor: (string: "easy" | "medium" | "hard") => string;
  index: number;
}
export default function MapChallenges({
  challenge,
  selectChallenge,
  isCompleted,
  getDifficultyColor,
  index,
}: MapChallengesProps) {
  return (
    <div>
      <motion.div
        key={challenge.cId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02, y: -4 }}
        onClick={() => selectChallenge(challenge)}
        className="bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-primary/50 transition-all relative overflow-hidden"
      >
        {isCompleted && (
          <div className="absolute top-4 right-4">
            <CheckCircle className="text-success" size={24} />
          </div>
        )}

        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            {challenge?.category === "classic" ? (
              <Lock className="text-primary" size={24} />
            ) : (
              <Zap className="text-primary" size={24} />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{challenge?.title}</h3>
            <p className="text-muted-foreground text-sm mb-3">
              {challenge?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
              challenge?.difficulty
            )}`}
          >
            {challenge?.difficulty?.toUpperCase()}
          </span>
          <div className="flex items-center gap-2 text-sm">
            <Award className="text-accent" size={16} />
            <span className="font-mono font-semibold text-accent">
              {challenge?.xpReward} XP
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
