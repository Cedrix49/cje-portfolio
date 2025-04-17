'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, animate, useMotionTemplate, motion } from 'framer-motion';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';
import { Highlight } from './ui/hero-highlight';

const COLORS_TOP = [
    '#13FFAA',
    '#1E67C6',
    '#CE84CF',
    '#DD335C',
]

export const Hero = () => {
    const color = useMotionValue(COLORS_TOP[0]);
    const [currentColor, setCurrentColor] = useState(COLORS_TOP[0]);
    
    useEffect(() => {
        const sequence = async () => {
            while (true) {
                for (let i = 1; i < COLORS_TOP.length; i++) {
                    await animate(color, COLORS_TOP[i], {
                        duration: 5,
                        ease: 'easeInOut',
                    });
                }
                for (let i = COLORS_TOP.length - 2; i >= 0; i--) {
                    await animate(color, COLORS_TOP[i], {
                        duration: 5,
                        ease: 'easeInOut',
                    });
                }
            }
        };
        sequence();
    }, [color]);

    useEffect(() => {
        const unsubscribe = color.on("change", (latest) => {
            setCurrentColor(latest);
        });
        return () => unsubscribe();
    }, [color]);

    const words = [
        {
          text: "I",
          className: "text-white"
        },
        {
          text: "am",
          className: "text-white"
        },
        {
          text: "Cedrix",
          style: { color: currentColor }
        },
        {
          text: "James",
          style: { color: currentColor }
        },
        {
          text: "Estoquia.",
          style: { color: currentColor }
        },
    ];

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;
    

    // Particles animation
    const particles = Array.from({ length: 20 });

    return (
        <motion.section
            style={{
                backgroundImage,
            }}
            className='relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200'
        >
            {/* Animated particles in the background */}
            {particles.map((_, index) => (
                <motion.div
                    key={index}
                    className="absolute rounded-full"
                    style={{
                        backgroundColor: currentColor,
                        width: Math.random() * 6 + 2, 
                        height: Math.random() * 6 + 2,
                        opacity: Math.random() * 0.3 + 0.1,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, Math.random() * -100 - 50],
                        opacity: [Math.random() * 0.3 + 0.1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                />
            ))}
            
            <div>
                <TypewriterEffectSmooth words={words} />
                
                <motion.div 
                    className="text-center"
                >
                    <p className='text-gray-400 text-center text-sm leading-relaxed md:leading-loose md:text-lg mx-auto'>
                        An aspiring 
                        <motion.span
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: [20, -5, 0],
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.4, 0.0, 0.2, 0.1],
                            }}
                        > 
                            <Highlight className="text-white font-bold text-lg md:text-xl ml-2 py-1 px-2">
                                full stack developer
                            </Highlight>
                        </motion.span> with a passion for creating <br />user-friendly and efficient web applications.
                    </p>
                </motion.div>
            </div>
        </motion.section> 
    );
};