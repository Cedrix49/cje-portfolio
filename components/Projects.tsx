"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import proj1 from "../public/assets/proj1.jpeg";
import proj2 from "../public/assets/proj2.jpeg";
import proj3 from "../public/assets/proj3.jpeg";
import { useMotionTemplate, useMotionValue, motion, animate, AnimatePresence, useInView } from "framer-motion";

const projects = [
    {
        id: 1,
        year: 2025,
        title: "Movie Web Application",
        description: "A movie web application that allows users to search for movies and view details about them.",
        technologies: ["React", "Appwrite", "Tailwind CSS"],
        icons: ["/assets/icons8-react.svg", "/assets/Appwrite.svg", "/assets/icons8-tailwind.svg"],
        image: proj1,
        demoUrl: "https://cje-movies.vercel.app/", 
    },
    {
        id: 2,
        year: 2025,
        title: "Sushiro- Sushi Restaurant Website",
        description: "A front-end website for a sushi restaurant",
        technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        icons: ["/assets/icons8-html.svg", "/assets/icons8-css3.svg", "/assets/icons8-bootstrap.svg", "/assets/icons8-js.svg"],
        image: proj2,
        demoUrl: "https://sushi-1xnq.vercel.app/", 
    },
    {
        id: 3,
        year: 2025,
        title: "New CBIS design",
        description: "A new web design for the CBIS website",
        technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        icons: ["/assets/icons8-html.svg", "/assets/icons8-css3.svg", "/assets/icons8-bootstrap.svg", "/assets/icons8-js.svg"],
        image: proj3,
        demoUrl: "https://cedrix49.github.io/cbis", 
    },
];

const COLORS_TOP = [
    '#13FFAA',
    '#1E67C6',
    '#CE84CF',
    '#DD335C',
]

// Animation variants for content sections
const contentVariants = {
    hidden: { 
        opacity: 0, 
        x: -20 
    },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: { 
        opacity: 0, 
        x: 20,
        transition: { 
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

// Animation variants for project headers
const headerVariants = {
    normal: { scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
};

// Animation variants for the divider
const dividerVariants = {
    hidden: { width: "0%" },
    visible: { 
        width: "100%",
        transition: { 
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(projects[0]);  
    const color = useMotionValue(COLORS_TOP[0]);
    
    // Refs for scroll animations
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    
    // InView hooks for triggering animations
    const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const isImageInView = useInView(imageRef, { once: true, amount: 0.5 });
    
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
    
    const backgroundImage = useMotionTemplate`radial-gradient( 125% 125% at 50% 0%, #000 50%, ${color})`
    
    const handleDemoClick = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
        e.stopPropagation();
        window.open(url, '_blank');
    };
    
    // Animation variants for section container
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                duration: 0.8,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };
    
    // Animation variants for children elements
    const childVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };
    
    // Animation variants for project image
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    // Animation variants for project item transitions
    const projectItemVariants = {
        initial: { opacity: 0, height: 0 },
        animate: { 
            opacity: 1, 
            height: "auto",
            transition: {
                duration: 0.4,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: { 
            opacity: 0, 
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    // Animation variants for technology items
    const techItemVariants = {
        initial: { opacity: 0, x: -10 },
        animate: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.3
            }
        }
    };
    
    return (
        <motion.div 
            style={{
                backgroundImage
            }}
            ref={sectionRef}
        >
            <motion.section 
                id="projects" 
                className="py-32 text-white"
                variants={sectionVariants}
                initial="hidden"
                animate={isSectionInView ? "visible" : "hidden"}
            >
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
                    <motion.div ref={contentRef}>
                        <motion.h2 
                            className="text-6xl font-bold mb-10"
                            variants={childVariants}
                        >
                            Completed <motion.span style={{ color }}>Projects</motion.span>
                        </motion.h2>
                        {projects.map((project, index) => (
                            <motion.div 
                                key={project.id} 
                                className="mb-10"
                                variants={childVariants}
                                custom={index}
                                transition={{
                                    delay: index * 0.15
                                }}
                            >
                                <motion.div
                                    onClick={() => setSelectedProject(project)}
                                    className="cursor-pointer mb-8 group"
                                    variants={headerVariants}
                                    initial="normal"
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <p className="text-gray-400 text-large mb-2">{project.year}</p>
                                    <h3 className={`text-3xl font-semibold group-hover:text-gray-400 transition-colors 
                                        ${selectedProject.id === project.id ? 'text-gray-200' : ''} duration-300`}>
                                        {project.title}
                                    </h3>
                                    
                                    <AnimatePresence>
                                        {selectedProject.id === project.id && (
                                            <motion.div 
                                                className="border-b-2 border-gray-200 my-4"
                                                variants={dividerVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                            />
                                        )}
                                    </AnimatePresence>
                                    
                                    <AnimatePresence>
                                        {selectedProject.id === project.id && (
                                            <motion.div
                                                variants={projectItemVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                            >
                                                <motion.p 
                                                    className="text-gray-400 transition-all duration-500 ease-in-out mb-3"
                                                    variants={contentVariants}
                                                >
                                                    {project.description}
                                                </motion.p>
                                                
                                                <div className="flex flex-wrap gap-4 mb-4">
                                                    {project.technologies.map((tech, index) => (
                                                        <motion.div 
                                                            key={index} 
                                                            className="flex items-center text-white"
                                                            variants={techItemVariants}
                                                        >
                                                            <Image 
                                                                src={project.icons[index]} 
                                                                alt={tech} 
                                                                width={20} 
                                                                height={20} 
                                                                className="mr-2"
                                                            />
                                                            <span>{tech}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                                
                                                <motion.button
                                                    onClick={(e) => handleDemoClick(e, project.demoUrl)}
                                                    className="mt-4 cursor-pointer px-4 py-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-md transition-all duration-300 flex items-center gap-2"
                                                    variants={techItemVariants}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <span>Live Demo</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                                    </svg>
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>  
                        ))}
                    </motion.div>
                    <motion.div 
                        className="relative w-full mx-auto"
                        ref={imageRef}
                        variants={imageVariants}
                        initial="hidden"
                        animate={isImageInView ? "visible" : "hidden"}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedProject.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Image 
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="rounded-xl shadow-lg transition-opacity duration-500 ease-in-out w-full object-cover"
                                    width={800}
                                    height={450}
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL={selectedProject.image.src}
                                />
                            </motion.div>
                        </AnimatePresence>

                    </motion.div>
                </div>
            </motion.section>
            
            {/* Footer */}
            <motion.footer 
                className="py-8 text-white"
                variants={childVariants}
                initial="hidden"
                animate={isSectionInView ? "visible" : "hidden"}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col items-center">
                        <motion.div 
                            className="flex space-x-6 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <motion.a 
                                href="https://github.com/cedrix49" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="GitHub" 
                                className="hover:opacity-80 transition-opacity"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </motion.a>
                            
                            <motion.a 
                                href="https://www.linkedin.com/in/cedrix-james-estoquia/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="LinkedIn" 
                                className="hover:opacity-80 transition-opacity"
                                whileHover={{ scale: 1.2, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </motion.a>
                            
                            <motion.a 
                                href="https://web.facebook.com/H1raethhhh/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Facebook" 
                                className="hover:opacity-80 transition-opacity"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </motion.a>
                        </motion.div>
                        
                        <motion.div 
                            className="text-gray-400 text-center"
                            initial={{ opacity: 0 }}
                            animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <p>&copy; 2025 Copyright <br />Cedrix James Estoquia. All rights reserved.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.footer>
        </motion.div>
    )
}