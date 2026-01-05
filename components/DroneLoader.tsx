
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DroneLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Incremento aleatorio para simular carga real
        return prev + Math.floor(Math.random() * 5) + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        transition: { duration: 0.8, ease: "easeIn" } 
      }}
      className="fixed inset-0 z-[100] bg-[#0F1419] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Resplandor de fondo dinámico */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] bg-[#0066FF] blur-[150px] rounded-full" 
      />

      {/* Contenedor del Dron */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-48 h-48 mb-12 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          {/* Cuerpo Central */}
          <rect x="42" y="42" width="16" height="16" rx="4" className="text-white/90" />
          <path d="M30 30 L70 70 M70 30 L30 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-white/30" />
          
          {/* Motores y Hélices con rotación de alta velocidad */}
          {[
            { x: 30, y: 30, dir: 1, color: '#00D9FF' },
            { x: 70, y: 30, dir: -1, color: '#00D9FF' },
            { x: 30, y: 70, dir: -1, color: '#00D9FF' },
            { x: 70, y: 70, dir: 1, color: '#00D9FF' }
          ].map((rotor, i) => (
            <g key={i} transform={`translate(${rotor.x}, ${rotor.y})`}>
              <motion.circle
                animate={{ rotate: 360 * rotor.dir }}
                transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
                cx="0" cy="0" r="14" fill="none" stroke={rotor.color} strokeWidth="1" strokeDasharray="4 3" opacity="0.6"
              />
              <circle cx="0" cy="0" r="3.5" fill="currentColor" />
            </g>
          ))}
        </svg>

        {/* Luz de escaneo inferior */}
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-[#00D9FF] blur-lg rounded-full"
        />
      </motion.div>

      {/* Indicadores de Carga */}
      <div className="flex flex-col items-center w-full max-w-xs px-6">
        <h3 className="text-white font-medium tracking-[0.3em] uppercase text-xs mb-6 text-center opacity-80">
          Iniciando Sistemas de Vuelo
        </h3>
        
        {/* Barra de progreso optimizada */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-3 border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 50 }}
            className="h-full bg-gradient-to-r from-[#0066FF] via-[#00D9FF] to-[#00D9FF] relative shadow-[0_0_10px_rgba(0,217,255,0.5)]"
          >
            {/* Brillo dinámico que recorre la barra */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-white/30 skew-x-[45deg] blur-sm"
            />
          </motion.div>
        </div>
        
        <div className="flex justify-between w-full">
          <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Status: OK</span>
          <span className="text-[#00D9FF] font-mono text-sm font-bold drop-shadow-[0_0_5px_rgba(0,217,255,0.3)]">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DroneLoader;
