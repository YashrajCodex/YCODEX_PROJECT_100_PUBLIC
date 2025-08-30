import React, { ReactNode } from "react";
import { Circle, Line } from "rc-progress";

interface ProgressCardProps {
  className?: any;
  children?: ReactNode;
  attributes?: [];
}
interface progressProps {
  title: string;
  progressedPercent: number;
  totalTask: number;
  completedTask: number;
}
interface categoryItemProps {
  label: string;
  completed: number;
  total: number;
  strokeColor?: string;
  trailColor?: string;
}

const ProgressCard = ({
  className="bg-black",
  children,
  attributes,
}: ProgressCardProps) => {
  return (
    <div
      className={`select-none mb-4 px-4 py-2 flex justify-between items-center gap-6 overflow-auto ${className} `}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default ProgressCard;

function CategoryItem({
  label,
  completed,
  total,
  strokeColor,
  trailColor,
}: categoryItemProps) {
  return (
    <div className="flex flex-col items-center text-center flex-1">
      <h3 className="font-semibold text-lg">{label}</h3>
      <p className="md:text-xl text-sm font-bold w-[70px]">
        {completed} / {total}
      </p>
      <div className="w-full mt-1">
        <Line
          percent={(completed / total) * 100}
          strokeWidth={2}
          trailWidth={2}
          strokeColor={strokeColor ? strokeColor : "#f97316"}
          trailColor={trailColor ? trailColor : "#1f2937"}
          strokeLinecap="square"
        />
        {/* <div className="h-1 rounded bg-gray-700">
          <div
            className="h-1 rounded"
            style={{
              width: `${(completed / total) * 100}%`,
              backgroundColor: color,
            }}
          ></div>
        </div> */}
      </div>
    </div>
  );
}
function CategoryCard({ className = 'text-black dark:text-white', category }: { className?: string, category: categoryItemProps[]}) {
  {
    /* Difficulty Breakdown */
  }
  if (!category) return null;
  return (
    <div className={`w-full flex justify-around items-center gap-4 ${className} overflow-auto`}>
      {category?.map((item) => (
        <CategoryItem
          key={item.label}
          label={item.label}
          completed={item.completed}
          total={item.total}
          strokeColor={item?.strokeColor}
          trailColor={item?.trailColor}
        />
      ))}
    </div>
  );
}
function Progress({ className = 'text-black dark:text-white', progress }: { className?: string, progress: progressProps}) {
  // Total Progress

  if (!progress) return null;
  const { title, progressedPercent, totalTask, completedTask } = progress;
  return (
    <div className="flex flex-col items-center text-center w-1/5">
      <h2 className={`${className} font-semibold text-lg`}>{title}</h2>
      <div className="relative flex items-center justify-center w-14 h-14">
        <Circle
          percent={Number(progressedPercent)}
          strokeWidth={8}
          trailWidth={8}
          strokeColor="#f97316"
          trailColor="#1f2937"
        />
        <span className={`absolute ${className} font-semibold text-sm`}>
          {progressedPercent}
        </span>
      </div>
      <p className="md:text-xl text-sm  font-bold mt-1">
        {completedTask} / {totalTask}
      </p>
    </div>
  );
}

ProgressCard.Category = CategoryCard;
ProgressCard.Progress = Progress;
