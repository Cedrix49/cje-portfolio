"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import profilePic from "../public/assets/profile.jpg"; 
import { useMotionValue, motion, animate, AnimatePresence } from "framer-motion";

const COLORS_TOP = [
    '#13FFAA',
    '#1E67C6',
    '#CE84CF',
    '#DD335C',
]

const skills = [
    {
        name: "React",
        icon: "/assets/icons8-react.svg"
    },
    {
        name: "JavaScript",
        icon: "/assets/icons8-js.svg"
    },
    {
        name: "Tailwind CSS",
        icon: "/assets/icons8-tailwind.svg"
    },
    {
        name: "HTML/CSS",
        icon: "/assets/icons8-html.svg"
    },
    {
        name: "Bootstrap",
        icon: "/assets/icons8-bootstrap.svg"
    },
    {
        name: "Next.js",
        icon: "/assets/next.svg"
    },
    {
        name: "PHP",
        icon: "/assets/icons8-php.svg"
    },
    {
        name: "MySQL",
        icon: "/assets/icons8-sql.svg"
    },
    {
        name: "Github",
        icon: "/assets/GitHub.svg"
    },
    {
        name: "Figma",
        icon: "/assets/Figma.svg"
    },
    {
        name: "Appwrite",
        icon: "/assets/Appwrite.svg"
    }
];

// Define a type for the section names
type SectionName = "whoIAm" | "skills" | "experience" | null;

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

// Animation variants for section headers
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

export const About = () => {
    const [activeSection, setActiveSection] = useState<SectionName>("whoIAm"); // Default open section
    const color = useMotionValue(COLORS_TOP[0]);
    
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
    
    const toggleSection = (section: SectionName) => {
        setActiveSection(activeSection === section ? null : section);
    };
    
    return (
        <section 
            id="about" 
            className="py-32 text-white bg-black"
        >
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
                <div>
                    <motion.h2 
                        className="text-6xl font-bold mb-10"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        About <motion.span style={{ color }}>Me</motion.span>
                    </motion.h2>
                    
                    {/* Who I Am Section */}
                    <div className="mb-10">
                        <motion.div 
                            onClick={() => toggleSection("whoIAm")}
                            className="cursor-pointer"
                            variants={headerVariants}
                            initial="normal"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <h3 className="text-3xl font-semibold mb-4 hover:text-gray-300 transition-colors">Who I Am</h3>
                            <AnimatePresence>
                                {activeSection === "whoIAm" && (
                                    <motion.div 
                                        className="border-b-2 border-gray-200 my-4"
                                        variants={dividerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                        <AnimatePresence mode="wait">
                            {activeSection === "whoIAm" && (
                                <motion.div
                                    key="whoIAm"
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <p className="text-gray-400 mb-6">
                                        I&apos;m an aspiring full stack developer passionate about creating interactive and responsive web applications.
                                        With experience in both front-end and back-end technologies, I enjoy bringing ideas to life
                                        through clean, efficient code and thoughtful design.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    
                    {/* Technical Skills Section */}
                    <div className="mb-10">
                        <motion.div 
                            onClick={() => toggleSection("skills")}
                            className="cursor-pointer"
                            variants={headerVariants}
                            initial="normal"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <h3 className="text-3xl font-semibold mb-4 hover:text-gray-300 transition-colors">Technical Skills</h3>
                            <AnimatePresence>
                                {activeSection === "skills" && (
                                    <motion.div 
                                        className="border-b-2 border-gray-200 my-4"
                                        variants={dividerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                        <AnimatePresence mode="wait">
                            {activeSection === "skills" && (
                                <motion.div
                                    key="skills"
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        {skills.map((skill, index) => (
                                            <motion.div 
                                                key={index} 
                                                className="flex items-center text-white"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ 
                                                    delay: index * 0.05,
                                                    duration: 0.3
                                                }}
                                            >
                                                <Image 
                                                    src={skill.icon} 
                                                    alt={skill.name} 
                                                    width={20} 
                                                    height={20} 
                                                    className="mr-2" 
                                                />
                                                <span>{skill.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    
                    {/* Experience Section */}
                    <div>
                        <motion.div 
                            onClick={() => toggleSection("experience")}
                            className="cursor-pointer"
                            variants={headerVariants}
                            initial="normal"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <h3 className="text-3xl font-semibold mb-4 hover:text-gray-300 transition-colors">Experience</h3>
                            <AnimatePresence>
                                {activeSection === "experience" && (
                                    <motion.div 
                                        className="border-b-2 border-gray-200 my-4"
                                        variants={dividerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                        <AnimatePresence mode="wait">
                            {activeSection === "experience" && (
                                <motion.div
                                    key="experience"
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <motion.div 
                                        className="mb-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1, duration: 0.4 }}
                                    >
                                        <p className="text-gray-400 text-large mb-1">Present</p>
                                        <h4 className="text-xl font-medium">Freelancer</h4>
                                        <p className="text-gray-400">Developed responsive websites and web applications using modern frameworks and technologies.</p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                    >
                                        <p className="text-gray-400 text-large mb-1">January 2025 - April 2025</p>
                                        <h4 className="text-xl font-medium">Full Stack Developer Intern</h4>
                                        <p className="text-gray-400">Assisted in developing the company&apos;s procurement and inventory management system as well as designing the company&apos;s website.</p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                
                <div className="relative flex items-center justify-center">
                    <motion.div 
                        className="relative w-4/5 aspect-square"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div 
                            className="relative w-full h-full rounded-full overflow-hidden"
                            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                        >
                            <Image 
                                src={profilePic}
                                alt="Profile Picture"
                                className="object-cover"
                                fill
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}