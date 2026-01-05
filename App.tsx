
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import ProgressBar from './components/ProgressBar';
import ScoreDisplay from './components/ScoreDisplay';
import QuestionCard from './components/QuestionCard';
import Confetti from './components/Confetti';
import DroneLoader from './components/DroneLoader';
import { QUESTIONS } from './data/questions';
import { SurveyAnswers } from './types';
import { submitToMonday } from './services/mondayService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial loading simulation or reset loading
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const score = useMemo(() => {
    const numericValues = Object.entries(answers)
      .filter(([id, val]) => {
        const qId = parseInt(id);
        const q = QUESTIONS.find(q => q.id === qId);
        return q && q.type !== 'open' && typeof val === 'string';
      })
      .map(([id, label]) => {
        const qId = parseInt(id);
        const q = QUESTIONS.find(q => q.id === qId);
        return q?.options?.find(o => o.label === label)?.value as number || 0;
      });

    if (numericValues.length === 0) return 0;
    const avg = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
    return Math.round(avg * 20);
  }, [answers]);

  const handleSelect = (value: string | number) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentStep].id]: value }));
    if (QUESTIONS[currentStep].type !== 'open') {
      setTimeout(() => {
        if (currentStep < QUESTIONS.length - 1) {
          setCurrentStep(prev => prev + 1);
        }
      }, 400);
    }
  };

  const handleNext = async () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await submitToMonday(answers, score);
      setIsCompleted(true);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Failed to fetch') {
        setError("Error de Red (CORS): La API de Monday.com no permite peticiones directas desde el navegador. Por favor, verifica la configuración o usa un proxy.");
      } else {
        setError(err.message || "Hubo un problema al enviar tus respuestas.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    // Reset all states to initial values
    setIsLoading(true); // Show drone loader again for flavor
    setIsCompleted(false);
    setCurrentStep(0);
    setAnswers({});
    setError(null);
  };

  const isNextDisabled = useMemo(() => {
    const q = QUESTIONS[currentStep];
    if (q.type === 'open') return false;
    return !answers[q.id];
  }, [currentStep, answers]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <DroneLoader key="loader" />
      ) : isCompleted ? (
        <motion.div
          key="completed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
        >
          <Background />
          <Confetti />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl"
          >
            <div className="text-6xl mb-6">✨🚀✨</div>
            <h1 className="text-3xl font-bold mb-4">¡Gracias por participar!</h1>
            <p className="text-white/70 mb-8">
              Tus comentarios nos ayudan a seguir creando shows de drones inolvidables.
            </p>
            <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
              <span className="block text-xs uppercase tracking-widest text-white/50 mb-2">Tu puntuación final</span>
              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#00D9FF]">
                {score}%
              </span>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-4 bg-white text-[#0F1419] font-bold rounded-2xl hover:bg-[#F8F9FA] transition-all active:scale-95 shadow-lg shadow-white/5"
            >
              Nueva Encuesta
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="survey"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen flex flex-col p-6 lg:p-12"
        >
          <Background />
          
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-8 md:mb-12"
          >
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">✨ Skylights</h1>
              <p className="text-white/60 text-sm md:text-base">Cuéntanos tu experiencia con nosotros</p>
            </div>
            <ScoreDisplay score={score} />
          </motion.header>

          <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto mb-12">
            <div className="w-full mb-8">
              <ProgressBar currentStep={currentStep} totalSteps={QUESTIONS.length} />
              <div className="flex justify-between mt-2 px-1">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Progreso</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Pregunta {currentStep + 1} de {QUESTIONS.length}</span>
              </div>
            </div>

            <div className="w-full relative">
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={currentStep}
                  question={QUESTIONS[currentStep]}
                  selectedAnswer={answers[QUESTIONS[currentStep].id]}
                  onSelect={handleSelect}
                />
              </AnimatePresence>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-red-400 text-sm font-medium bg-red-400/10 border border-red-400/20 px-6 py-4 rounded-xl max-w-2xl text-center"
              >
                {error}
              </motion.div>
            )}
          </main>

          <footer className="sticky bottom-6 md:bottom-12 w-full max-w-4xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
              className={`
                px-8 py-4 rounded-2xl font-semibold transition-all
                ${currentStep === 0 || isSubmitting
                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20 active:scale-95'}
              `}
            >
              Atrás
            </button>

            <button
              onClick={handleNext}
              disabled={isNextDisabled || isSubmitting}
              className={`
                flex-1 md:flex-none px-12 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2
                ${isNextDisabled || isSubmitting
                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                  : 'bg-white text-[#0F1419] hover:bg-[#F8F9FA] active:scale-95 shadow-xl shadow-white/10'}
              `}
            >
              {isSubmitting ? (
                 <div className="w-6 h-6 border-2 border-[#0F1419] border-t-transparent rounded-full animate-spin" />
              ) : (
                currentStep === QUESTIONS.length - 1 ? '🚀 Finalizar' : 'Siguiente'
              )}
            </button>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
