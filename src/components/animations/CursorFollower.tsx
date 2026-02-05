'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useUIStore } from '@/store/ui';

export function CursorFollower() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { cursorType, cursorText } = useUIStore();

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [cursorX, cursorY, isVisible]);

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(pointer: coarse)').matches);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        if (!isMobile) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseleave', handleMouseLeave);
            document.addEventListener('mouseenter', handleMouseEnter);
            document.body.classList.add('cursor-none');
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.body.classList.remove('cursor-none');
        };
    }, [isMobile, handleMouseMove, handleMouseLeave, handleMouseEnter]);

    if (isMobile) return null;

    const getCursorSize = () => {
        switch (cursorType) {
            case 'pointer': return 48;
            case 'fork': return 56;
            case 'flame': return 56;
            case 'star': return 56;
            case 'hidden': return 0;
            default: return 20;
        }
    };

    const getCursorContent = () => {
        switch (cursorType) {
            case 'fork':
                return (
                    <span className="text-2xl">🍴</span>
                );
            case 'flame':
                return (
                    <span className="text-2xl">🔥</span>
                );
            case 'star':
                return (
                    <span className="text-2xl">⭐</span>
                );
            default:
                return cursorText ? (
                    <span className="text-xs font-medium whitespace-nowrap">{cursorText}</span>
                ) : null;
        }
    };

    const size = getCursorSize();

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
            >
                <motion.div
                    className="flex items-center justify-center rounded-full bg-white"
                    animate={{
                        width: size,
                        height: size,
                        opacity: isVisible && cursorType !== 'hidden' ? 1 : 0,
                        scale: cursorType === 'pointer' ? 1 : 1,
                    }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    style={{
                        marginLeft: -size / 2,
                        marginTop: -size / 2,
                    }}
                >
                    {getCursorContent()}
                </motion.div>
            </motion.div>

            {/* Cursor trail / glow effect */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
            >
                <motion.div
                    className="rounded-full"
                    animate={{
                        width: size * 2,
                        height: size * 2,
                        opacity: isVisible && (cursorType === 'flame' || cursorType === 'fork') ? 0.3 : 0,
                        background: cursorType === 'flame'
                            ? 'radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                        marginLeft: -size,
                        marginTop: -size,
                    }}
                />
            </motion.div>
        </>
    );
}
