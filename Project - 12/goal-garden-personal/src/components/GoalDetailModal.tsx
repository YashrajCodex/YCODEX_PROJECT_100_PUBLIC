import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  Calendar,
  BarChart3,
  ExternalLink,
  Edit,
  Check,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Goal } from "@/Interface/GlobalInterface";

interface GoalDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal | null;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onMarkComplete: (id: string) => void;
}

const GoalDetailModal: React.FC<GoalDetailModalProps> = ({
  isOpen,
  onClose,
  goal,
  onEdit,
  onDelete,
  onToggleStar,
  onMarkComplete,
}) => {
  if (!isOpen || !goal) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  const isOverdue =
    goal.status !== "completed" && new Date(goal.deadline) < new Date();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {goal.title}
                  </h1>
                  <button
                    onClick={() => onToggleStar(goal.id)}
                    className={`text-2xl transition-colors ${
                      goal.isStarred
                        ? "text-yellow-400 hover:text-yellow-500"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                  >
                    <Star
                      size={24}
                      fill={goal.isStarred ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    goal.status
                  )}`}
                >
                  {goal.status === "in-progress"
                    ? "In Progress"
                    : goal.status.charAt(0).toUpperCase() +
                      goal.status.slice(1)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={20} className="text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Start Date</h3>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDate(goal.startDate)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={20} className="text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Deadline</h3>
                  </div>
                  <p
                    className={`text-lg font-semibold ${
                      isOverdue ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    {formatDate(goal.deadline)}
                    {isOverdue && (
                      <span className="block text-sm font-normal">
                        (Overdue)
                      </span>
                    )}
                  </p>
                </div>

                {goal.completionDate && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Check size={20} className="text-green-600" />
                      <h3 className="font-semibold text-gray-900">Completed</h3>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(goal.completionDate)}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 size={20} className="text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Progress</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 relative pt-1">
                      <motion.div
                        className="bg-blue-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {goal.description && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {goal.description}
                  </p>
                </div>
              </div>
            )}

            {/* Note Links */}
            {goal.noteLinks.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Related Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goal.noteLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 flex items-center gap-3 transition-colors group"
                    >
                      <ExternalLink
                        size={20}
                        className="text-blue-600 group-hover:text-blue-700"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {link.title || link.url}
                        </p>
                        {link.title && (
                          <p className="text-sm text-gray-600 truncate">
                            {link.url}
                          </p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
              <Button
                onClick={() => onEdit(goal)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Edit size={16} />
                Edit
              </Button>

              {goal.status !== "completed" && (
                <Button
                  onClick={() => onMarkComplete(goal.id)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Check size={16} />
                  Mark Complete
                </Button>
              )}

              <Button
                onClick={() => onDelete(goal.id)}
                variant="destructive"
                className="flex items-center gap-2 ml-auto"
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GoalDetailModal;
