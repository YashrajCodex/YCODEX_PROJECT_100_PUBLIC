import { motion } from "framer-motion";

export default function HomeLoader() {
  const shimmer =
    "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent";

  return (
    <div className="w-full min-h-screen bg-[#0f172a] p-6 text-white">
      {/* Header Stats Skeleton */}
      <div className="flex gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`h-20 w-40 rounded-xl bg-white/10 ${shimmer}`}
          />
        ))}
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`h-44 rounded-xl bg-white/10 p-4 ${shimmer}`}
          >
            <div className="h-5 w-3/4 rounded-md bg-white/20 mb-3"></div>
            <div className="h-3 w-full rounded-md bg-white/20 mb-2"></div>
            <div className="h-3 w-5/6 rounded-md bg-white/20 mb-2"></div>
            <div className="h-3 w-2/3 rounded-md bg-white/20"></div>
          </motion.div>
        ))}
      </div>

      {/* Shimmer Animation */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
