"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import proj1 from "../public/assets/proj1.jpeg";
import proj2 from "../public/assets/proj2.jpeg";
import proj3 from "../public/assets/proj3.jpeg";
import { useMotionTemplate, useMotionValue, motion, animate} from "framer-motion";

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

export const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(projects[0]);  
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
    
    const backgroundImage = useMotionTemplate`radial-gradient( 125% 125% at 50% 0%, #000 50%, ${color})`
    
    const handleDemoClick = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
        e.stopPropagation();
        window.open(url, '_blank');
    };
    
    return (
        <motion.div 
            style={{
                backgroundImage
            }}
        >
            <section 
                id="projects" 
                className="py-32 text-white"
            >
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-6xl font-bold mb-10">Completed <motion.span style={{ color }}>Projects</motion.span></h2>
                        {projects.map((project) => (
                            <div key={project.id} className="mb-10">
                                <div
                                    onClick={() => setSelectedProject(project)}
                                    className="cursor-pointer mb-8 group"
                                >
                                    <p className="text-gray-400 text-large mb-2">{project.year}</p>
                                    <h3 className={`text-3xl font-semibold group-hover:text-gray-400 transition-colors 
                                        ${selectedProject.id === project.id ? 'text-gray-200' : ''} duration-300`}>
                                        {project.title}
                                    </h3>
                                    {selectedProject.id === project.id && (
                                        <div className="border-b-2 border-gray-200 my-4"></div>
                                    )}
                                    {selectedProject.id === project.id && (
                                        <p className="text-gray-400 transition-all duration-500 ease-in-out mb-3">
                                            {project.description}
                                        </p>
                                    )}
                                    {selectedProject.id === project.id && (
                                        <div className="flex flex-wrap gap-4 mb-4">
                                            {project.technologies.map((tech, index) => (
                                                <div key={index} className="flex items-center text-white">
                                                    <Image 
                                                        src={project.icons[index]} 
                                                        alt={tech} 
                                                        width={20} 
                                                        height={20} 
                                                        className="mr-2"
                                                    />
                                                    <span>{tech}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>  
                        ))}
                    </div>
                    <div className="relative w-full mx-auto">
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

                        <div className="absolute top-2 right-2 md:top-4 md:right-4">
                            <button
                                onClick={(e) => handleDemoClick(e, selectedProject.demoUrl)}
                                className="cursor-pointer px-6 py-3 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-md transition-all duration-300 flex items-center gap-2"
                            >
                                <span>Live Demo</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="py-8 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col items-center">
                        <div className="flex space-x-6 mb-6">
                            <a href="https://github.com/cedrix49" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:opacity-80 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </a>
                            
                            <a href="https://www.linkedin.com/in/cedrix-james-estoquia/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                            
                            <a href="https://web.facebook.com/H1raethhhh/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                        </div>
                        
                        <div className="text-gray-400 text-center">
                            <p>&copy; 2025 Copyright <br />Cedrix James Estoquia. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </motion.div>
    )
}   