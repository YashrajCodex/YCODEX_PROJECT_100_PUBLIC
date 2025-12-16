import { Shield } from 'lucide-react'
import { motion } from "framer-motion";

export default function HomeLoading() {
  return (
   <div className="min-h-screen flex items-center justify-center">
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
           >
             <Shield className="text-primary" size={48} />
           </motion.div>
         </div>
  )
}
