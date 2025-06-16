"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image"; 
// For Next.js, images should be imported from the public folder using string paths
import proj1 from "../public/assets/proj1.jpeg";
import proj2 from "../public/assets/proj2.jpeg";
import proj3 from "../public/assets/proj3.jpeg";
import proj4 from "../public/assets/proj4.jpeg";
import proj5 from "../public/assets/proj5.jpeg";
import proj6 from "../public/assets/proj6.jpeg";
import { useMotionTemplate, useMotionValue, motion, animate, AnimatePresence } from "framer-motion";

interface ProjectType {
    id: number;
    year: number;
    title: string;
    description: string;
    category: string;
    technologies: string[];
    icons: string[];
    image: StaticImageData;
    demoUrl: string;
    size?: 'small' | 'medium' | 'large';
}

const projects: ProjectType[] = [
    {
        id: 1,
        year: 2025,
        title: "Movie Web Application",
        description: "A movie web application that allows users to search for movies and view details about them.",
        category: "Web App",
        technologies: ["React", "Appwrite", "Tailwind CSS"],
        icons: ["/assets/icons8-react.svg", "/assets/Appwrite.svg", "/assets/icons8-tailwind.svg"],
        image: proj1,
        demoUrl: "https://cje-movies.vercel.app/",
        size: 'large'
    },
    {
        id: 2,
        year: 2025,
        title: "Sushiro- Sushi Restaurant Website",
        description: "A front-end website for a sushi restaurant",
        category: "Website",
        technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        icons: ["/assets/icons8-html.svg", "/assets/icons8-css3.svg", "/assets/icons8-bootstrap.svg", "/assets/icons8-js.svg"],
        image: proj2,
        demoUrl: "https://sushi-1xnq.vercel.app/",
        size: 'large'
    },
    {
        id: 3,
        year: 2025,
        title: "New CBIS design",
        description: "A new web design for the CBIS website",
        category: "Website",
        technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        icons: ["/assets/icons8-html.svg", "/assets/icons8-css3.svg", "/assets/icons8-bootstrap.svg", "/assets/icons8-js.svg"],
        image: proj3,
        demoUrl: "https://cedrix49.github.io/cbis",
        size: 'large'
    },
    {   
        id: 4,
        year: 2024,
        title: "Grease Monkey Automotive Repair: Web-Based Scheduling & Management System",
        description: "A web-based scheduling and management system for a grease monkey automotive repair shop",
        category: "Management System",
        technologies: ["HTML", "CSS", "PHP", "JavaScript", "MySQL"],
        icons: ["/assets/icons8-html.svg", "/assets/icons8-css3.svg", "/assets/icons8-php.svg", "/assets/icons8-js.svg", "/assets/icons8-sql.svg"],
        image: proj4,
        demoUrl: "https://cedrix49.github.io/cbis",
        size: 'large'
    },
    {
        id: 5,
        year: 2025,
        title: "Complete Authentication System using JWT - Build In MERN Stack",
        description: "A complete authentication system built in MERN Stack",
        category: "Practice",
        technologies: ["React", "Express.js", "MongoDB", "Tailwind", "MongoDB"],
        icons: ["/assets/icons8-react.svg", "/assets/icons8-express-js.svg", "/assets/icons8-mongodb.svg", "/assets/icons8-tailwind.svg", "/assets/icons8-node-js.svg"],
        image: proj6,
        demoUrl: "https://completauth.vercel.app",
        size: 'large'
    },
    {
        id: 6,
        year: 2025,
        title: "Mental Health Journal",
        description: "A mental health journal built using MERN Stack for people to write their thoughts",
        category: "Practice",
        technologies: ["React", "Express.js", "MongoDB", "Tailwind", "MongoDB"],
        icons: ["/assets/icons8-react.svg", "/assets/icons8-express-js.svg", "/assets/icons8-mongodb.svg", "/assets/icons8-tailwind.svg", "/assets/icons8-node-js.svg"],
        image: proj5,
        demoUrl: "https://mental-health-journal-five.vercel.app",
        size: 'large'
    },
];

const COLORS_TOP = [
    '#13FFAA',
    '#1E67C6',
    '#CE84CF',
    '#DD335C',
]

// Project Filter Component
interface ProjectFilterProps {
    categories: string[];
    onFilterChange: (filter: string) => void;
    activeFilter: string;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({ categories, onFilterChange, activeFilter }) => {
    return (
        <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.button
                className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 backdrop-blur-md border-2
                    ${activeFilter === "all" 
                        ? "bg-white text-black shadow-2xl border-white scale-105" 
                        : "bg-white/5 text-white hover:bg-white/10 border-white/20 hover:border-white/40"}`}
                whileHover={{ scale: activeFilter === "all" ? 1.05 : 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFilterChange("all")}
            >
                All Projects
            </motion.button>
            
            {categories.map((category) => (
                <motion.button
                    key={category}
                    className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 backdrop-blur-md border-2
                        ${activeFilter === category 
                            ? "bg-white text-black shadow-2xl border-white scale-105" 
                            : "bg-white/5 text-white hover:bg-white/10 border-white/20 hover:border-white/40"}`}
                    whileHover={{ scale: activeFilter === category ? 1.05 : 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onFilterChange(category)}
                >
                    {category}
                </motion.button>
            ))}
        </motion.div>
    );
};

// Individual Project Card Component
interface ProjectCardProps {
    project: ProjectType;
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const handleDemoClick = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
        e.stopPropagation();
        window.open(url, '_blank');
    };

    // Simplified grid sizing for better mobile compatibility
    const getBentoSize = (size: string = 'small') => {
        // On mobile, all cards are single column
        if (isMobile) {
            return 'col-span-1 h-[400px]';
        }
        
        // Desktop sizing
        switch (size) {
            case 'large':
                return 'col-span-1 md:col-span-2 row-span-2 h-[500px] md:h-[600px]';
            case 'medium':
                return 'col-span-1 md:col-span-2 lg:col-span-1 row-span-1 h-[300px] md:h-[350px]';
            case 'small':
            default:
                return 'col-span-1 row-span-1 h-[250px] md:h-[300px]';
        }
    };

    // Show content by default on mobile, on hover for desktop
    const shouldShowContent = isMobile || isHovered;

    return (
        <motion.div
            className={`relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer 
                ${getBentoSize(project.size)} shadow-2xl border border-white/10`}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.9 }}
            transition={{ 
                delay: index * 0.1, 
                duration: 0.7,
                ease: [0.23, 1, 0.320, 1] 
            }}
            whileHover={{ 
                scale: isMobile ? 1 : 1.02,
                y: isMobile ? 0 : -8,
                transition: { duration: 0.4, ease: "easeOut" }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`object-cover transition-all duration-700 ${
                        shouldShowContent ? 'scale-110 blur-[2px]' : 'scale-100'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Gradient Overlay - Always visible on mobile */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${
                    shouldShowContent 
                        ? 'from-black/90 via-black/60 to-black/30' 
                        : 'from-black/20 via-transparent to-transparent'
                }`} />
                
                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:20px_20px] opacity-20" />
            </div>

            {/* Minimal Default State - Just Category (Desktop only) */}
            <AnimatePresence>
                {!shouldShowContent && (
                    <motion.div
                        className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10"
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm text-white font-medium border border-white/30">
                            {project.category}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content - Always visible on mobile, hover on desktop */}
            <AnimatePresence>
                {shouldShowContent && (
                    <motion.div
                        className="absolute inset-0 flex flex-col justify-between p-4 sm:p-8 z-20"
                        initial={{ opacity: isMobile ? 1 : 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: isMobile ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Top Section - Year and Category */}
                        <motion.div
                            className="flex items-center justify-between flex-wrap gap-2"
                            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: isMobile ? 0 : 0.1, duration: 0.4 }}
                        >
                            <div className="flex gap-2 sm:gap-3 flex-wrap">
                                <span className="px-3 sm:px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-xs sm:text-sm text-white font-semibold border border-white/20">
                                    {project.year}
                                </span>
                                <span className="px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm text-white font-semibold border border-white/30">
                                    {project.category}
                                </span>
                            </div>
                        </motion.div>

                        {/* Bottom Section - Main Content */}
                        <motion.div
                            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: isMobile ? 0 : 0.2, duration: 0.4 }}
                        >
                            {/* Title */}
                            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                                {project.title}
                            </h3>
                            
                            {/* Description - Truncated on mobile */}
                            <p className="text-gray-200 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3">
                                {project.description}
                            </p>
                            
                            {/* Technologies - Show fewer on mobile */}
                            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                                {project.technologies.slice(0, isMobile ? 3 : 4).map((tech, techIndex) => (
                                    <motion.div
                                        key={techIndex}
                                        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl text-xs sm:text-sm text-white font-medium border border-white/20"
                                        initial={{ opacity: isMobile ? 1 : 0, scale: isMobile ? 1 : 0.8, y: isMobile ? 0 : 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ delay: isMobile ? 0 : 0.3 + techIndex * 0.05, duration: 0.3 }}
                                    >
                                        {project.icons[techIndex] && (
                                            <Image 
                                                src={project.icons[techIndex]} 
                                                alt={tech} 
                                                width={isMobile ? 12 : 16} 
                                                height={isMobile ? 12 : 16} 
                                                className="rounded"
                                            />
                                        )}
                                        <span className="hidden sm:inline">{tech}</span>
                                        <span className="sm:hidden">{tech.split(' ')[0]}</span>
                                    </motion.div>
                                ))}
                                {project.technologies.length > (isMobile ? 3 : 4) && (
                                    <motion.span 
                                        className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-lg sm:rounded-xl text-xs sm:text-sm text-white font-medium border border-white/20"
                                        initial={{ opacity: isMobile ? 1 : 0, scale: isMobile ? 1 : 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: isMobile ? 0 : 0.5, duration: 0.3 }}
                                    >
                                        +{project.technologies.length - (isMobile ? 3 : 4)}
                                    </motion.span>
                                )}
                            </div>
                            
                            {/* Action Buttons */}
                            <motion.div
                                className="flex gap-3 sm:gap-4"
                                initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: isMobile ? 0 : 0.4, duration: 0.4 }}
                            >
                                <motion.button
                                    onClick={(e) => handleDemoClick(e, project.demoUrl)}
                                    className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm hover:bg-gray-100 transition-all duration-300 shadow-lg group/btn border-2 border-transparent hover:border-white/20"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Live Demo</span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover/btn:translate-x-1" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                    >
                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hover Border Effect - Disabled on mobile */}
            {!isMobile && (
                <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                    isHovered ? 'ring-2 ring-white/30 ring-offset-2 ring-offset-transparent' : ''
                }`} />
            )}
        </motion.div>
    );
};

export const Projects = () => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [filteredProjects, setFilteredProjects] = useState(projects);
    
    const color = useMotionValue(COLORS_TOP[0]);
    
    // Extract unique categories
    const categories = [...new Set(projects.map(project => project.category))];
    
    // Filter projects when activeFilter changes
    useEffect(() => {
        const newFilteredProjects = activeFilter === "all" 
            ? projects 
            : projects.filter(project => project.category === activeFilter);
        
        setFilteredProjects(newFilteredProjects);
    }, [activeFilter]);
    
    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
    };
    
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
    
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                duration: 0.8,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };
    
    
    return (
        <motion.div 
            style={{
                backgroundImage
            }}
        >
            <motion.section 
                id="projects" 
                className="py-16 sm:py-32 text-white min-h-screen"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div 
                        className="text-center mb-12 sm:mb-20"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-10 tracking-tight">
                            My{" "}
                            <motion.span 
                                style={{ color }}
                                className="relative inline-block"
                            >
                                Projects
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
                        </h2>
                        <motion.p 
                            className="text-lg text-gray-400 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Showcase of my creative work and technical expertise
                        </motion.p>
                    </motion.div>
                    
                    {/* Project Filter */}
                    <ProjectFilter 
                        categories={categories} 
                        onFilterChange={handleFilterChange} 
                        activeFilter={activeFilter}
                    />
                    
                    {/* Mobile-First Grid */}
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 auto-rows-min"
                    >
                        <AnimatePresence mode="wait">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard 
                                    key={`${project.id}-${activeFilter}`}
                                    project={project} 
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.section>
            
            {/* Footer */}
            <motion.footer 
                className="py-8 text-white"
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col items-center">
                        <motion.div 
                            className="flex space-x-6 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
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
                            className="text-gray-400 text-center text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <p>&copy; 2025 Copyright <br className="sm:hidden" />Cedrix James Estoquia. All rights reserved.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.footer>
        </motion.div>
    )
}