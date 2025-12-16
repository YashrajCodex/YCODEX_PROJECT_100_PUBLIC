import { motion } from "framer-motion";
import { Trophy, Zap, Target, Calendar, Award } from "lucide-react";
import { LevelBadge } from "@/components/UI/LevelBadge";
import { ProgressBar } from "@/components/UI/ProgressBar";
import { challenges } from "@/data/challenges";
import { UserProgress } from "@/lib/storage/indexDB";

interface userDataProps {
  user: UserProgress;
  xpInCurrentLevel: number;
  totalXPEarned: number;
  completionPercentage: number;
}
export default function UserData({
  user,
  xpInCurrentLevel,
  totalXPEarned,
  completionPercentage,
}: userDataProps) {
  return (
    <div className="min-h-screen py-4 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-card border border-border rounded-xl p-8 text-center"
          >
            <LevelBadge level={user.level} size="lg" />
            <h2 className="text-2xl font-bold mt-6 mb-2">{user.username}</h2>
            <p className="text-muted-foreground">Crypto Enthusiast</p>

            <div className="mt-8">
              <ProgressBar
                current={xpInCurrentLevel}
                max={1000}
                label="Progress to Next Level"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total XP</span>
                <span className="font-bold text-primary font-mono">
                  {user.xp}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Current Streak
                </span>
                <span className="font-bold text-accent font-mono">
                  {user.streak} days
                </span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Target className="text-primary" size={20} />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Completed
                  </span>
                </div>
                <p className="text-3xl font-bold text-primary font-mono">
                  {user.completedChallenges.length}/{challenges.length}
                </p>
              </div>

              <div className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <Zap className="text-accent" size={20} />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    XP Earned
                  </span>
                </div>
                <p className="text-3xl font-bold text-accent font-mono">
                  {totalXPEarned}
                </p>
              </div>

              <div className="bg-gradient-to-br from-success/20 to-success/5 border border-success/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-success/20 rounded-lg">
                    <Trophy className="text-success" size={20} />
                  </div>
                  <span className="text-sm text-muted-foreground">Level</span>
                </div>
                <p className="text-3xl font-bold text-success font-mono">
                  {user.level}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4">Overall Progress</h3>
              <ProgressBar
                current={user.completedChallenges.length}
                max={challenges.length}
                label="Challenges Completed"
              />
              <p className="text-sm text-muted-foreground mt-3">
                {completionPercentage.toFixed(1)}% of all challenges completed
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="text-primary" size={24} />
                Completed Challenges
              </h3>
              {user.completedChallenges.length > 0 ? (
                <div className="space-y-2">
                  {challenges
                    .filter((c) => user.completedChallenges.includes(c.cId))
                    .map((challenge) => (
                      <div
                        key={challenge.cId}
                        className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-success rounded-full" />
                          <span className="font-medium">{challenge.title}</span>
                        </div>
                        <span className="text-sm text-accent font-mono">
                          +{challenge.xpReward} XP
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No challenges completed yet. Start your journey!
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="text-primary" size={24} />
                Account Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="font-mono">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last active</span>
                  <span className="font-mono">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
