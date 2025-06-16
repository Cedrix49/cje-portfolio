"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
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

const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ 
            y: -10,
            transition: { duration: 0.3 }
        }}
        className="relative"
    >
        {children}
    </motion.div>
);

const SkillBubble = ({ skill, index, activeColor }: { skill: any; index: number; activeColor: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
            duration: 0.4, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
        }}
        whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
        }}
        className="relative group cursor-pointer"
    >
        <div 
            className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-900 border-2 border-gray-700 transition-all duration-300 group-hover:border-opacity-100"
            style={{
                borderColor: `${activeColor}50`,
                boxShadow: `0 0 20px ${activeColor}20`
            }}
        >
            <Image 
                src={skill.icon} 
                alt={skill.name} 
                width={24} 
                height={24} 
                className="filter brightness-90 group-hover:brightness-110 transition-all duration-300" 
            />
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-gray-800 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                {skill.name}
            </div>
        </div>
    </motion.div>
);

const ExperienceCard = ({ experience, index, activeColor }: { experience: any; index: number; activeColor: string }) => (
    <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-opacity-100 transition-all duration-300"
        style={{
            borderColor: `${activeColor}30`,
            boxShadow: `0 4px 20px ${activeColor}10`
        }}
    >
        <div 
            className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
            style={{ backgroundColor: activeColor }}
        />
        <p className="text-gray-400 text-sm mb-2">{experience.period}</p>
        <h4 className="text-xl font-semibold mb-3 text-white">{experience.role}</h4>
        <p className="text-gray-300 leading-relaxed">{experience.description}</p>
    </motion.div>
);

export const About = () => {
    const [activeSection, setActiveSection] = useState<string>("intro");
    const color = useMotionValue(COLORS_TOP[0]);
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    
    useEffect(() => {
        const sequence = async () => {
            while (true) {
                for (let i = 1; i < COLORS_TOP.length; i++) {
                    await animate(color, COLORS_TOP[i], {
                        duration: 3,
                        ease: 'easeInOut',
                    });
                    setCurrentColorIndex(i);
                }
                for (let i = COLORS_TOP.length - 2; i >= 0; i--) {
                    await animate(color, COLORS_TOP[i], {
                        duration: 3,
                        ease: 'easeInOut',
                    });
                    setCurrentColorIndex(i);
                }
            }
        };
        sequence();
    }, [color]);

    const experiences = [
        {
            period: "Present",
            role: "Freelancer", 
            description: "Developed responsive websites and web applications using modern frameworks and technologies."
        },
        {
            period: "January 2025 - March 2025",
            role: "Full Stack Developer Intern",
            description: "Assisted in developing the company's procurement and inventory management system as well as designing the company's website."
        }
    ];

    const sections = [
        { id: "intro", label: "Introduction" },
        { id: "skills", label: "Skills" },
        { id: "experience", label: "Experience" }
    ];
    
    return (
        <section className="py-20 bg-black text-white min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-10 tracking-tight">
                        About{" "}
                        <motion.span 
                            style={{ color }}
                            className="relative inline-block"
                        >
                            Me
                            <motion.div
                                className="absolute -inset-1 rounded-lg opacity-30 blur"
                                style={{ backgroundColor: color.get() }}
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.span>
                    </h1>
                    <motion.p 
                        className="text-lg text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Passionate full-stack developer crafting digital experiences
                    </motion.p>
                </motion.div>

                {/* Navigation */}
                <motion.div 
                    className="flex justify-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="flex space-x-2 bg-gray-900 p-2 rounded-full border border-gray-700">
                        {sections.map((section) => (
                            <motion.button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                                    activeSection === section.id 
                                        ? 'text-white shadow-lg' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                                style={{
                                    backgroundColor: activeSection === section.id ? color.get() : 'transparent'
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-lg"></span>
                                <span>{section.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Content Sections */}
                <AnimatePresence mode="wait">
                    {activeSection === "intro" && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <FloatingCard>
                                <div className="max-w-3xl mx-auto">
                                    <div 
                                        className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700"
                                        style={{
                                            borderColor: `${COLORS_TOP[currentColorIndex]}30`,
                                            boxShadow: `0 8px 32px ${COLORS_TOP[currentColorIndex]}20`
                                        }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                                            className="text-6xl mb-6"
                                        >
                                            👨‍💻
                                        </motion.div>
                                        <h3 className="text-3xl font-bold mb-6">Hello, I'm a Developer</h3>
                                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                            I'm an aspiring full stack developer passionate about creating interactive and responsive web applications. 
                                            With experience in both front-end and back-end technologies, I enjoy bringing ideas to life 
                                            through clean, efficient code and thoughtful design.
                                        </p>
                                        <motion.div
                                            className="flex justify-center space-x-4"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <div className="text-center">
                                                <div className="text-2xl font-bold" style={{ color: color.get() }}>2+</div>
                                                <div className="text-sm text-gray-400">Years Learning</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold" style={{ color: color.get() }}>10+</div>
                                                <div className="text-sm text-gray-400">Projects Built</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold" style={{ color: color.get() }}>11</div>
                                                <div className="text-sm text-gray-400">Technologies</div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </FloatingCard>
                        </motion.div>
                    )}

                    {activeSection === "skills" && (
                        <motion.div
                            key="skills"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-center mb-12">
                                <h3 className="text-4xl font-bold mb-4">Technical Arsenal</h3>
                                <p className="text-gray-400">Technologies I work with</p>
                            </div>
                            
                            <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
                                {skills.map((skill, index) => (
                                    <SkillBubble 
                                        key={skill.name}
                                        skill={skill}
                                        index={index}
                                        activeColor={COLORS_TOP[currentColorIndex]}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeSection === "experience" && (
                        <motion.div
                            key="experience"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-center mb-12">
                                <h3 className="text-4xl font-bold mb-4">Journey So Far</h3>
                                <p className="text-gray-400">My professional experience</p>
                            </div>
                            
                            <div className="max-w-4xl mx-auto space-y-6">
                                {experiences.map((experience, index) => (
                                    <ExperienceCard
                                        key={index}
                                        experience={experience}
                                        index={index}
                                        activeColor={COLORS_TOP[currentColorIndex]}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};