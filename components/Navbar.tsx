"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useMotionValue, motion, animate, useScroll, useTransform } from "framer-motion";

const navLinks = [
    {
        title: "Home",
        path: "#",
    },
    {
        title: "About",
        path: "#about",
    },
    {
        title: "Projects",
        path: "#projects",
    },
];

const COLORS_TOP = [
    '#13FFAA',
    '#1E67C6',
    '#CE84CF',
    '#DD335C',
]

export const Navbar = () => {
    const [nav, setNav] = useState(false);
    const color = useMotionValue(COLORS_TOP[0]);
    const [scrolled, setScrolled] = useState(false);
    
    // Scroll animation
    const { scrollY } = useScroll();
    const navbarOpacity = useTransform(scrollY, [0, 100], [0.7, 1]);
    const navbarScale = useTransform(scrollY, [0, 100], [1, 0.98]);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

    const toggleNav = () => {
        setNav(!nav);
    };

    const closeNav = () => {
        setNav(false);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.2,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const mobileItemVariants = {
        closed: { opacity: 0, y: 20 },
        open: { opacity: 1, y: 0 }
    };

    return (
    <div className="z-50 fixed flex justify-center w-full text-gray-300">
        <motion.div 
            className={`border border-white/20 rounded-3xl md:text-[16px] font-extenda tracking-[0.3em] mt-8 
                    backdrop-blur-3xl shadow-lg hidden md:flex items-center justify-between p-4 
                    max-w-[600px] mx-auto transition-all duration-300
                    ${scrolled ? 'bg-black/60 border-white/40' : 'bg-black/30'}`}
            style={{ 
                opacity: navbarOpacity,
                scale: navbarScale,
            }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.ul className="flex flex-row space-x-8">
                {navLinks.map((link, index) => (
                    <motion.li key={index} variants={itemVariants}>
                        <motion.div style={{ color }}>
                            <motion.div 
                                className="relative py-2 px-1 cursor-pointer overflow-hidden"
                                whileHover="hover"
                            >
                                <Link href={link.path} className="transform transition-all duration-300 ease-in-out hover:font-bold">
                                    {link.title}
                                </Link>
                                <motion.span 
                                    className="absolute left-0 bottom-0 h-0.5"
                                    style={{ backgroundColor: color }}
                                    initial={{ width: 0 }}
                                    variants={{
                                        hover: { width: "100%" }
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.div
                                    className="absolute inset-0 bg-white/10 rounded-lg pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    variants={{
                                        hover: { opacity: 0.1 }
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>

        <motion.div 
            onClick={toggleNav} 
            className="cursor-pointer md:hidden absolute top-5 right-5 
                    z-50 text-white/70 p-2 hover:text-white transition-colors duration-300"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
        >
            {nav ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </motion.div>

        <motion.div 
            className="fixed left-0 top-0 w-full h-full bg-black/95 md:hidden"
            initial="closed"
            animate={nav ? "open" : "closed"}
            variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: "100%" }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <motion.ul 
                className="flex flex-col items-center justify-center space-y-8 h-full"
                variants={mobileMenuVariants}
            >
                {navLinks.map((link, index) => (
                    <motion.li key={index} variants={mobileItemVariants}>
                        <motion.div style={{ color }}>
                            <motion.div 
                                className="relative py-2 px-1 cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link 
                                    href={link.path}
                                    onClick={closeNav} 
                                    className="text-2xl font-extenda tracking-[0.3em] transform transition-all duration-300 ease-in-out"
                                >
                                    {link.title}
                                </Link>
                                <motion.span 
                                    className="absolute left-0 bottom-0 h-0.5"
                                    style={{ backgroundColor: color }}
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    </div>
  )
}