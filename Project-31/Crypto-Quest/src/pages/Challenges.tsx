import { useState } from "react";
import { motion } from "framer-motion";
import { Award, HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { challenges, Challenge } from "@/data/challenges";
import { completeChallenge } from "@/lib/storage/indexDB";
import { XPNotification } from "@/components/UI/XPNotification";
import { generateCaesarChallenge } from "@/lib/crypto/newChallenge";
import { validateSolution } from "@/lib/crypto/validateSolution";
import { useUserContext } from "@/components/features/UserData/useUserContext";
import { extendedChallenges } from "@/components/features/Challenges/ChallengesProvider";
import { useStoredChallenges } from "@/components/features/Challenges/useStoredChallenges";
import MapChallenges from "@/components/features/Challenges/MapChallenges";

export default function Challenges() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(0);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [showXP, setShowXP] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const { user } = useUserContext();
  const {
    newChallenges,
    addCl,
    loading: savedDataLoading,
  } = useStoredChallenges();

  async function handleSubmit() {
    if (!selectedChallenge) return;

    const isCorrect = validateSolution(userAnswer, selectedChallenge?.solution);
    setResult(isCorrect ? "correct" : "incorrect");

    if (isCorrect && !completedChallenges.includes(selectedChallenge?.cId)) {
      await completeChallenge(
        selectedChallenge?.cId,
        selectedChallenge?.xpReward,
        user?.uId
      );
      setCompletedChallenges([...completedChallenges, selectedChallenge?.cId]);
      setEarnedXP(selectedChallenge?.xpReward);
      setShowXP(true);

      const uId = user.uId;
      const newChallenge: extendedChallenges = {
        ...generateCaesarChallenge(),
        uId,
      };
      addCl(newChallenge);
    }
  }

  function selectChallenge(challenge: Challenge) {
    setSelectedChallenge(challenge);
    setUserAnswer("");
    setShowHint(0);
    setResult(null);
  }

  function getDifficultyColor(difficulty: Challenge["difficulty"]) {
    switch (difficulty) {
      case "easy":
        return "text-success border-success/20 bg-success/10";
      case "medium":
        return "text-warning border-warning/20 bg-warning/10";
      case "hard":
        return "text-destructive border-destructive/20 bg-destructive/10";
    }
  }

  if (!selectedChallenge) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gradient mb-4">
              Cipher Challenges
            </h1>
            <p className="text-muted-foreground">
              Test your cryptography skills with puzzles from classic to modern
            </p>
          </motion.div>

          {/* Iterating through challenges array */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => {
              const isCompleted = completedChallenges?.includes(challenge?.cId);
              return (
                <MapChallenges
                  challenge={challenge}
                  getDifficultyColor={getDifficultyColor}
                  index={index}
                  isCompleted={isCompleted}
                  selectChallenge={selectChallenge}
                  key={index}
                />
              );
            })}
            {savedDataLoading ? (
              "Loading...."
            ) : (
              <div>
                  {newChallenges?.map((challenge, index) => {
                    const isCompleted = completedChallenges?.includes(challenge?.cId);
                  return (<MapChallenges
                    challenge={challenge}
                    index={index}
                    getDifficultyColor={getDifficultyColor}
                    isCompleted={isCompleted}
                    selectChallenge={selectChallenge}
                    key={index}
                  />);
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const isCompleted = completedChallenges.includes(selectedChallenge.cId);

  return (
    <div className="min-h-screen py-8 px-4">
      <XPNotification
        xp={earnedXP}
        show={showXP}
        onComplete={() => setShowXP(false)}
      />

      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => setSelectedChallenge(null)}
          className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Challenges
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {selectedChallenge.title}
              </h1>
              <p className="text-muted-foreground">
                {selectedChallenge.description}
              </p>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-lg">
                <CheckCircle className="text-success" size={20} />
                <span className="text-success font-medium">Completed</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                selectedChallenge.difficulty
              )}`}
            >
              {selectedChallenge.difficulty?.toUpperCase()}
            </span>
            <div className="flex items-center gap-2">
              <Award className="text-accent" size={18} />
              <span className="font-mono font-semibold text-accent">
                {selectedChallenge.xpReward} XP
              </span>
            </div>
          </div>

          <div className="bg-secondary/50 border border-border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-3">Challenge:</h3>
            <p className="font-mono text-sm leading-relaxed">
              {selectedChallenge.prompt}
            </p>
          </div>

          {showHint > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4"
            >
              <div className="flex items-start gap-2">
                <HelpCircle className="text-warning mt-1" size={18} />
                <div>
                  <p className="font-medium text-warning mb-1">
                    Hint {showHint}:
                  </p>
                  <p className="text-sm">
                    {showHint === 1
                      ? selectedChallenge.hint1
                      : selectedChallenge.hint2}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                result === "correct"
                  ? "bg-success/10 border border-success/20"
                  : "bg-destructive/10 border border-destructive/20"
              }`}
            >
              {result === "correct" ? (
                <>
                  <CheckCircle className="text-success" size={24} />
                  <div className="flex-1">
                    <p className="font-semibold text-success">
                      Correct! Well done!
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedChallenge.explanation}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="text-destructive" size={24} />
                  <p className="text-destructive">
                    Not quite. Try again or use a hint!
                  </p>
                </>
              )}
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Answer:
              </label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Enter your answer..."
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono"
                disabled={result === "correct"}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim() || result === "correct"}
                className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg disabled:opacity-50"
              >
                Submit Answer
              </button>
              {showHint < 2 && result !== "correct" && (
                <button
                  onClick={() => setShowHint(showHint + 1)}
                  className="px-6 py-3 bg-secondary text-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
                >
                  <HelpCircle size={18} />
                  Hint {showHint + 1}
                </button>
              )}
            </div>
          </div>

          {result === "correct" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-border"
            >
              <h3 className="font-semibold mb-3">Explanation:</h3>
              <p className="text-muted-foreground leading-relaxed">
                {selectedChallenge.explanation}
              </p>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="mt-6 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Next Challenge
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
