"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import profilePic from "../public/assets/profile.jpg"; 
import { useMotionValue, motion, animate } from "framer-motion";

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
                    <h2 className="text-6xl font-bold mb-10">About <motion.span style={{ color }}>Me</motion.span></h2>
                    
                    {/* Who I Am Section */}
                    <div className="mb-10">
                        <div 
                            onClick={() => toggleSection("whoIAm")}
                            className="cursor-pointer"
                        >
                            <h3 className="text-3xl font-semibold mb-4 hover:text-gray-300 transition-colors">Who I Am</h3>
                            <div className="border-b-2 border-gray-200 my-4"></div>
                        </div>
                        {activeSection === "whoIAm" && (
                            <p className="text-gray-400 mb-6">
                                I&apos;m an aspiring full stack developer passionate about creating interactive and responsive web applications.
                                With experience in both front-end and back-end technologies, I enjoy bringing ideas to life
                                through clean, efficient code and thoughtful design.
                            </p>
                        )}
                    </div>
                    
                    {/* Technical Skills Section */}
                    <div className="mb-10">
                        <div 
                            onClick={() => toggleSection("skills")}
                            className="cursor-pointer"
                        >
                            <h3 className="text-3xl font-semibold mb-4 hover:text-gray-300 transition-colors">Technical Skills</h3>
                            <div className="border-b-2 border-gray-200 my-4"></div>
                        </div>
                        {activeSection === "skills" && (
                            <div className="flex flex-wrap gap-4 mb-6">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex items-center text-white">
                                        <Image 
                                            src={skill.icon} 
                                            alt={skill.name} 
                                            width={20} 
                                            height={20} 
                                            className="mr-2" 
                                        />
                                        <span>{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Experience Section */}
                    <div>
                        <div 
                            onClick={() => toggleSection("experience")}
                            className="cursor-pointer"
                        >
                            <h3 className="text-3xl font-semibold mb-4 hover:text-gray-300 transition-colors">Experience</h3>
                            <div className="border-b-2 border-gray-200 my-4"></div>
                        </div>
                        {activeSection === "experience" && (
                            <>
                                <div className="mb-4">
                                    <p className="text-gray-400 text-large mb-1">Present</p>
                                    <h4 className="text-xl font-medium">Freelancer</h4>
                                    <p className="text-gray-400">Developed responsive websites and web applications using modern frameworks and technologies.</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-large mb-1">January 2025 - April 2025</p>
                                    <h4 className="text-xl font-medium">Full Stack Developer Intern</h4>
                                    <p className="text-gray-400">Assisted in developing the company&apos;s procurement and inventory management system as well as designing the company&apos;s website.</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                
                <div className="relative flex items-center justify-center">
                    <div className="relative w-4/5 aspect-square">
                        {/* Glowing circle behind the image */}
                        <div 
                            className="absolute inset-0 rounded-full blur-md" 
                            style={{ 
                                background: `radial-gradient(circle at center, ${COLORS_TOP[0]}40 0%, transparent 70%)`,
                                transform: 'scale(1.1)'
                            }}
                        ></div>
                        
                        {/* Profile image with subtle border */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-opacity-30" style={{ borderColor: COLORS_TOP[0] }}>
                            <Image 
                                src={profilePic}
                                alt="Profile Picture"
                                className="object-cover"
                                fill
                                priority
                            />
                        </div>
                        
                        {/* Decorative circle element */}
                        <motion.div 
                            className="absolute rounded-full w-20 h-20 border-2 border-opacity-60"
                            style={{ 
                                borderColor: color,
                                top: '10%',
                                right: '-5%'
                            }}
                        ></motion.div>
                        
                        {/* Decorative dot element */}
                        <motion.div 
                            className="absolute rounded-full w-4 h-4"
                            style={{ 
                                backgroundColor: color,
                                bottom: '15%',
                                right: '10%'
                            }}
                        ></motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}