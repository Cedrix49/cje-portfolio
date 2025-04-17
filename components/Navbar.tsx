"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useMotionValue, motion, animate } from "framer-motion";

// import { Logo } from "./Logo";

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

    return (
    <div className="z-50 fixed flex justify-center w-full text-gray-300">
        {/* <Logo /> */}
        <div className="border border-white/20 rounded-3xl md:text-[16px] font-extenda tracking-[0.3em] mt-8 backdrop-blur-3xl
                        hidden md:flex items-center justify-between p-4 max-w-[600px] mx-auto">
            <ul className="flex flex-row space-x-8">
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <motion.div style={{ color }}>
                            <motion.div 
                                className="relative py-2 px-1 cursor-pointer"
                                whileHover="hover"
                            >
                                <Link href={link.path} className="transform transition-all duration-300 ease-in-out">
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
                            </motion.div>
                        </motion.div>
                    </li>
                ))}
            </ul>
        </div>

        <div onClick={toggleNav} className="cursor-pointer md:hidden absolute top-5 right-5 
                                          z-50 text-white/70 p-2 hover:text-white transition-colors duration-300">
            {nav ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </div>

        <div className={`fixed left-0 top-0 w-full h-full bg-black/90 transform transition-transform
                        duration-300 ${nav ? "translate-x-0" : "translate-x-full"}`}
        >
            <ul className="flex flex-col items-center justify-center space-y-8 h-full">
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <motion.div style={{ color }}>
                            <motion.div 
                                className="relative py-2 px-1 cursor-pointer"
                                whileHover="hover"
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
                                    variants={{
                                        hover: { width: "100%" }
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </motion.div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}