'use client';

import { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { tiltConfig } from '@/lib/motion';
import { useUIStore } from '@/store/ui';

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: 'amber' | 'gold' | 'crimson' | 'lime';
    tiltEnabled?: boolean;
    onClick?: () => void;
}

const glowColors = {
    amber: 'rgba(245, 158, 11, 0.4)',
    gold: 'rgba(212, 165, 116, 0.4)',
    crimson: 'rgba(220, 38, 38, 0.4)',
    lime: 'rgba(132, 204, 22, 0.4)',
};

export function GlowCard({
    children,
    className = '',
    glowColor = 'amber',
    tiltEnabled = true,
    onClick,
}: GlowCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
    const { setCursorType, resetCursor } = useUIStore();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || !tiltEnabled) return;

        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (y - 0.5) * tiltConfig.max;
        const tiltY = (x - 0.5) * -tiltConfig.max;

        setTilt({ x: tiltX, y: tiltY });
        setGlowPosition({ x: x * 100, y: y * 100 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setGlowPosition({ x: 50, y: 50 });
        resetCursor();
    };

    const handleMouseEnter = () => {
        setCursorType('pointer');
    };

    return (
        <motion.div
            ref={ref}
            className={`relative overflow-hidden rounded-2xl bg-surface-light border border-border ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onClick={onClick}
            animate={{
                rotateX: tilt.x,
                rotateY: tilt.y,
                scale: tiltEnabled && (tilt.x !== 0 || tilt.y !== 0) ? tiltConfig.scale : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ perspective: tiltConfig.perspective, transformStyle: 'preserve-3d' }}
        >
            {/* Glow follow effect */}
            <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColors[glowColor]} 0%, transparent 50%)`,
                    opacity: tilt.x !== 0 || tilt.y !== 0 ? 0.6 : 0,
                }}
            />

            {/* Border glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                    boxShadow: tilt.x !== 0 || tilt.y !== 0
                        ? `0 0 30px ${glowColors[glowColor]}, inset 0 0 20px ${glowColors[glowColor].replace('0.4', '0.1')}`
                        : '0 0 0 transparent',
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>
        </motion.div>
    );
}
