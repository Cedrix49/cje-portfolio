'use client';

import { useEffect } from 'react';
import { useMotionValue, animate, useMotionTemplate, motion } from 'framer-motion';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';
import { useState } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Highlight } from './ui/hero-highlight';

const COLORS_TOP = [
    '#13FFAA',
    '#1E67C6',
    '#CE84CF',
    '#DD335C',
]

const CopyableText = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const textToCopy = 'github.com/Cedrix49';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className="relative flex mt-4 justify-center items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: isHovered ? 'copy' : 'default' }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 256 256"
        className="mr-2"
      >
        <g fill="#9a9494" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
          <g transform="scale(8.53333,8.53333)">
            <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,5.623 3.872,10.328 9.092,11.63c-0.056,-0.162 -0.092,-0.35 -0.092,-0.583v-2.051c-0.487,0 -1.303,0 -1.508,0c-0.821,0 -1.551,-0.353 -1.905,-1.009c-0.393,-0.729 -0.461,-1.844 -1.435,-2.526c-0.289,-0.227 -0.069,-0.486 0.264,-0.451c0.615,0.174 1.125,0.596 1.605,1.222c0.478,0.627 0.703,0.769 1.596,0.769c0.433,0 1.081,-0.025 1.691,-0.121c0.328,-0.833 0.895,-1.6 1.588,-1.962c-3.996,-0.411 -5.903,-2.399 -5.903,-5.098c0,-1.162 0.495,-2.286 1.336,-3.233c-0.276,-0.94 -0.623,-2.857 0.106,-3.587c1.798,0 2.885,1.166 3.146,1.481c0.896,-0.307 1.88,-0.481 2.914,-0.481c1.036,0 2.024,0.174 2.922,0.483c0.258,-0.313 1.346,-1.483 3.148,-1.483c0.732,0.731 0.381,2.656 0.102,3.594c0.836,0.945 1.328,2.066 1.328,3.226c0,2.697 -1.904,4.684 -5.894,5.097c1.098,0.573 1.899,2.183 1.899,3.396v2.734c0,0.104 -0.023,0.179 -0.035,0.268c4.676,-1.639 8.035,-6.079 8.035,-11.315c0,-6.627 -5.373,-12 -12,-12z"></path>
          </g>
        </g>
      </svg>
      <span className="text-white/50">{textToCopy}</span>
      {isHovered && (
        isCopied ? (
          <CheckIcon
            className="w-5 h-5 ml-2 text-gray-500"
          />
        ) : (
        <ClipboardIcon
          className="w-5 h-5 ml-2 cursor-pointer text-gray-500"
          onClick={handleCopy}
        />
        )
      )}
    </div>
  );
};

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
    }, [color]); // Added color as a dependency here

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

    const backgroundImage = useMotionTemplate`radial-gradient( 125% 125% at 50% 0%, #000 50%, ${color})`

    return (
        <motion.section
        style={{
            backgroundImage
        }}
        className='relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200'
        >
            <TypewriterEffectSmooth words={words} />
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
            <CopyableText />
        </motion.section> 
    )
}