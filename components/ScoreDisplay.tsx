
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 min-w-[120px]">
      <span className="text-xs uppercase tracking-widest text-white/50 mb-1">Satisfacción</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={score}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-[#00D9FF]"
        >
          {score}%
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default ScoreDisplay;
