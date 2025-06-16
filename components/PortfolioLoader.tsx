'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, animate, useMotionTemplate } from 'framer-motion';

const COLORS_TOP = [
  '#13FFAA',
  '#1E67C6', 
  '#CE84CF',
  '#DD335C',
];

interface PortfolioLoaderProps {
  onComplete?: () => void;
}

export const PortfolioLoader: React.FC<PortfolioLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0); // 0: loading, 1: name reveal, 2: complete
  const color = useMotionValue(COLORS_TOP[0]);
  const [currentColor, setCurrentColor] = useState(COLORS_TOP[0]);

  // Color animation cycle
  useEffect(() => {
    let animationRunning = true;
    
    const sequence = async () => {
      while (animationRunning) {
        for (let i = 1; i < COLORS_TOP.length && animationRunning; i++) {
          await animate(color, COLORS_TOP[i], {
            duration: 2,
            ease: 'easeInOut',
          });
        }
        for (let i = COLORS_TOP.length - 2; i >= 0 && animationRunning; i--) {
          await animate(color, COLORS_TOP[i], {
            duration: 2,
            ease: 'easeInOut',
          });
        }
      }
    };
    
    sequence();
    
    return () => {
      animationRunning = false;
    };
  }, [color]);

  useEffect(() => {
    const unsubscribe = color.on("change", (latest) => {
      setCurrentColor(latest);
    });
    return () => unsubscribe();
  }, [color]);

  // Progress simulation with better timing
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Move to name reveal phase
          setTimeout(() => setCurrentPhase(1), 500);
          // Move to complete phase
          setTimeout(() => setCurrentPhase(2), 2500);
          return 100;
        }
        // More realistic progress increments
        const increment = Math.random() * 8 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;

  const logoVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    })
  };

  const name = "CEDRIX JAMES";

  if (currentPhase === 2) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundImage }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        onAnimationComplete={onComplete}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center space-x-1 mb-4">
            {name.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-6xl font-bold text-white tracking-wider"
                style={{ color: letter === ' ' ? 'transparent' : currentColor }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="text-gray-300 text-lg font-light tracking-wide"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            Full Stack Developer
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundImage }}
    >
      {/* Logo/Brand */}
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <div className="relative">
          {/* Outer rotating ring */}
          <motion.div
            className="w-24 h-24 rounded-full border-4 border-transparent"
            style={{ 
              borderTopColor: currentColor,
              borderRightColor: currentColor + '40'
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Inner pulsing core */}
          <motion.div
            className="absolute inset-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: currentColor + '20' }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: currentColor }}
              animate={{
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
        </div>
      </motion.div>

      {/* Name reveal during phase 1 */}
      {currentPhase === 1 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center space-x-1">
            {name.split('').map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl md:text-5xl font-bold text-white tracking-wider"
                style={{ color: letter === ' ' ? 'transparent' : currentColor }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Progress section */}
      {currentPhase === 0 && (
        <div className="text-center space-y-6">
          {/* Loading text */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              Loading Portfolio
            </h2>
            <motion.p
              className="text-gray-400 text-sm tracking-wider"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Cedrix James Estoquia
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-80 max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 text-sm">Progress</span>
              <span className="text-gray-300 text-sm font-mono">
                {Math.round(progress)}%
              </span>
            </div>
            
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: currentColor }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            
            {/* Glowing effect */}
            <motion.div
              className="w-full h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full -mt-2"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${currentColor}40, transparent)`
              }}
              animate={{ 
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

        </div>
      )}
    </motion.div>
  );
};

export default PortfolioLoader;