'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface GlassPanelProps {
    children: ReactNode;
    className?: string;
    blur?: 'sm' | 'md' | 'lg' | 'xl';
    border?: boolean;
    animate?: boolean;
    delay?: number;
}

const blurValues = {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl',
};

const variants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        backdropFilter: 'blur(0px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        backdropFilter: 'blur(20px)',
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export function GlassPanel({
    children,
    className = '',
    blur = 'lg',
    border = true,
    animate = true,
    delay = 0,
}: GlassPanelProps) {
    const Component = animate ? motion.div : 'div';

    const animationProps = animate ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true },
        variants,
        transition: { delay },
    } : {};

    return (
        <Component
            className={`
        bg-black/40 backdrop-${blurValues[blur]}
        ${border ? 'border border-white/10' : ''}
        ${className}
      `}
            style={{
                backdropFilter: `blur(${blur === 'sm' ? 8 : blur === 'md' ? 12 : blur === 'lg' ? 20 : 30}px)`,
                WebkitBackdropFilter: `blur(${blur === 'sm' ? 8 : blur === 'md' ? 12 : blur === 'lg' ? 20 : 30}px)`,
            }}
            {...animationProps}
        >
            {children}
        </Component>
    );
}

// Floating glass orb decoration
interface GlassOrbProps {
    size?: number;
    color?: string;
    className?: string;
    animate?: boolean;
}

export function GlassOrb({
    size = 200,
    color = 'rgba(245, 158, 11, 0.2)',
    className = '',
    animate = true,
}: GlassOrbProps) {
    return (
        <motion.div
            className={`rounded-full pointer-events-none ${className}`}
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)`,
                filter: 'blur(40px)',
            }}
            animate={animate ? {
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.1, 1],
            } : undefined}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        />
    );
}
