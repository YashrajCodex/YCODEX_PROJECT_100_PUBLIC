import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Props: isOpen (bool), onClose (fn), children (ReactNode)
export default function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-lg rounded-2xl p-6 shadow-2xl bg-[#0b1020] border border-white/10 text-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Content */}
            <div className="pt-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
