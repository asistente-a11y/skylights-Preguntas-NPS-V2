
import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          y: [0, -40, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-[10%] md:left-[25%] w-96 h-96 bg-[#0066FF] rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
        className="absolute bottom-0 right-[10%] md:right-[25%] w-96 h-96 bg-[#FF6B35] rounded-full blur-[100px]"
      />
      <div className="absolute top-[30%] right-[15%] w-64 h-64 bg-[#00D9FF] opacity-10 rounded-full blur-[80px]" />
    </div>
  );
};

export default Background;
