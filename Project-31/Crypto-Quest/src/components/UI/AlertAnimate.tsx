import { AlertCircle, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'

interface alertProp{
    type: "success" | "error",
    message: string;
}
export default function AlertAnimate(alert: alertProp) {
  const [al, setAl] = useState<alertProp | null>();
  useEffect(() => { 
    if (alert) setAl(alert);

    const timeout = setTimeout(() => setAl(null), 5000);
    
    return ()=>clearTimeout(timeout);
  },[alert])
  return (
       <AnimatePresence mode="wait">
          {al && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                al.type === 'success'
                  ? 'bg-success/10 border border-success/20'
                  : 'bg-destructive/10 border border-destructive/20'
              }`}
            >
              {al.type === 'success' ? (
                <CheckCircle className="text-success" size={20} />
              ) : (
                <AlertCircle className="text-destructive" size={20} />
              )}
              <span className="text-sm">{al.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
  )
}
