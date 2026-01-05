
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string | number;
  onSelect: (value: string | number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedAnswer, onSelect }) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50, rotateY: 15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: -50, rotateY: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl"
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-8 text-white leading-tight">
        {question.text}
      </h2>

      {question.type === 'open' ? (
        <textarea
          value={selectedAnswer || ''}
          onChange={(e) => onSelect(e.target.value)}
          placeholder={question.placeholder}
          className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF] transition-colors resize-none"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options?.map((option) => {
            const isSelected = selectedAnswer === option.label;
            return (
              <motion.button
                key={option.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(option.label)}
                className={`
                  relative group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300
                  ${isSelected 
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#00D9FF] border-transparent shadow-[0_0_20px_rgba(0,102,255,0.4)]' 
                    : 'bg-white/5 border-white/10 hover:border-[#0066FF]/50 hover:bg-white/10'}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-sm md:text-base font-medium text-left">
                    {option.label}
                  </span>
                </div>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      className="bg-white rounded-full p-1"
                    >
                      <svg className="w-4 h-4 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default QuestionCard;
