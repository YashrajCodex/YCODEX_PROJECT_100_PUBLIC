import React from "react";
import { motion } from "framer-motion";
import { Calendar, Star, Edit, Trash2, ExternalLink } from "lucide-react";
import { Goal } from "@/Interface/GlobalInterface";

interface GoalCardProps {
  goal: Goal;
  index: number;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onMarkComplete: (id: string) => void;
  onViewDetail: (goal: Goal) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  index,
  onEdit,
  onDelete,
  onToggleStar,
  onMarkComplete,
  onViewDetail,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue =
    goal.status !== "completed" && new Date(goal.deadline) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onViewDetail(goal)}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {goal.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar(goal.id);
          }}
          className={`text-2xl transition-colors ${
            goal.isStarred
              ? "text-yellow-400 hover:text-yellow-500"
              : "text-gray-300 hover:text-yellow-400"
          }`}
        >
          <Star size={20} fill={goal.isStarred ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {goal.description}
      </p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} />
          <span>Due: {formatDate(goal.deadline)}</span>
          {isOverdue && (
            <span className="text-red-600 font-medium">(Overdue)</span>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{goal.progress}%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full transition-all"
              initial={{ width: 0 }}
              animate={{ width: `${goal.progress}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              goal.status
            )}`}
          >
            {goal.status === "in-progress"
              ? "In Progress"
              : goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
          </span>

          {goal.noteLinks.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <ExternalLink size={12} />
              {goal.noteLinks.length} link
              {goal.noteLinks.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(goal);
          }}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Edit size={14} />
          Edit
        </button>

        {goal.status !== "completed" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkComplete(goal.id);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
          >
            Complete
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(goal.id);
          }}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors ml-auto"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default GoalCard;
