'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MagneticWrapper } from '@/components/animations/MagneticWrapper';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { useUIStore } from '@/store/ui';

const navLinks = [
    { href: '#menu', label: 'Menu' },
    { href: '#story', label: 'Our Story' },
    { href: '#experience', label: 'Experience' },
    { href: '#locations', label: 'Locations' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { menuOpen, setMenuOpen, setCursorType, resetCursor } = useUIStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-4' : 'py-6'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <MagneticWrapper strength={0.15}>
                        <Link
                            href="/"
                            className="flex items-center gap-3"
                            onMouseEnter={() => setCursorType('pointer')}
                            onMouseLeave={() => resetCursor()}
                        >
                            <motion.div
                                className="relative w-12 h-12"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <img src="/logo.png" alt="Flame Kitchen Logo" className="w-full h-full object-contain" />
                            </motion.div>
                            <div className="hidden sm:block">
                                <h1 className="text-2xl font-bold text-gradient-fire">FLAME</h1>
                                <p className="text-sm text-muted-light tracking-widest">KITCHEN</p>
                            </div>
                        </Link>
                    </MagneticWrapper>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <MagneticWrapper key={link.href} strength={0.2}>
                                <Link
                                    href={link.href}
                                    className="text-base font-medium text-muted-light hover:text-white transition-colors relative group"
                                    onMouseEnter={() => setCursorType('pointer')}
                                    onMouseLeave={() => resetCursor()}
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber group-hover:w-full transition-all duration-300" />
                                </Link>
                            </MagneticWrapper>
                        ))}
                    </nav>

                    {/* CTA + Menu Button */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <AnimatedButton size="sm">Order Now</AnimatedButton>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden flex flex-col gap-1.5 p-2"
                            onClick={() => setMenuOpen(!menuOpen)}
                            onMouseEnter={() => setCursorType('pointer')}
                            onMouseLeave={() => resetCursor()}
                        >
                            <motion.span
                                className="w-6 h-0.5 bg-white"
                                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                            />
                            <motion.span
                                className="w-6 h-0.5 bg-white"
                                animate={{ opacity: menuOpen ? 0 : 1 }}
                            />
                            <motion.span
                                className="w-6 h-0.5 bg-white"
                                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                            />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 glass-strong lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <nav className="flex flex-col items-center justify-center h-full gap-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-3xl font-bold text-white hover:text-amber transition-colors"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <AnimatedButton size="lg" onClick={() => setMenuOpen(false)}>
                                    Order Now
                                </AnimatedButton>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
