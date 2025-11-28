import React from "react";
import ProgressCard from "../UI/ProgressCard";
import problemDetails, {
  categoryFromProblemDetails,
} from "@/data/problemDetails";
import { motion } from "motion/react";
import { useUILevel } from "@/contexts/UILevelContext";

export default function SubProgressCard({ className: getProgressStyle }) {

  const {uiLevel} = useUILevel()

  const progressData = (category: string) => {
    const data = {
      title: category,
      completedTask: problemDetails.filter((item) => item.category === category)
        .length,
      progressedPercent:
        Number(
          (
            problemDetails.filter((item) => item.category === category).length /
            problemDetails.length
          ) * 100
        ).toFixed(2),
      totalTask: problemDetails.length,
    };
    return data;
  };
  const categoryData = (category: string) => {
    const specificCategory = problemDetails.filter(
      (item) => item.category === category
    );
    const data = [
      {
        label: "Easy",
        completed: specificCategory.filter((item) => item.difficulty === "Easy")
          .length,
        total: problemDetails.length,
        strokeColor: "#22c55e",
      },
      {
        label: "Medium",
        completed: specificCategory.filter(
          (item) => item.difficulty === "Medium"
        ).length,
        total: problemDetails.length,
        Medium: "#facc15",
      },
      {
        label: "Hard",
        completed: specificCategory.filter((item) => item.difficulty === "Hard")
          .length,
        total: problemDetails.length,
        Hard: "#64748b",
      },
    ];
    return data;
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };
  return (
    <div>
      {/* sliced through index-1 because the category array contains the 'All' category as its first item */}
      {categoryFromProblemDetails.slice(1).map((cate) => (
        <motion.div variants={uiLevel !== "skeleton" && itemVariants} key={cate}>
          <ProgressCard className={` scale-95 ${getProgressStyle()}`}>
            <ProgressCard.Progress progress={progressData(cate)} />
            <ProgressCard.Category category={categoryData(cate)} />
          </ProgressCard>
        </motion.div>
      ))}
    </div>
  );
}
