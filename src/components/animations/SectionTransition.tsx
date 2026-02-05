'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionTransitionProps {
    children: ReactNode;
    className?: string;
    type?: 'fade' | 'wipe' | 'mask' | 'slide';
    direction?: 'up' | 'down' | 'left' | 'right';
}

export function SectionTransition({
    children,
    className = '',
    type = 'fade',
    direction = 'up',
}: SectionTransitionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Different transform values based on type
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const getTranslate = () => {
        switch (direction) {
            case 'up':
                return useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
            case 'down':
                return useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-100, 0, 0, 100]);
            case 'left':
                return useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
            case 'right':
                return useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-100, 0, 0, 100]);
        }
    };

    const translate = getTranslate();

    const getClipPath = () => {
        switch (type) {
            case 'wipe':
                return useTransform(
                    scrollYProgress,
                    [0, 0.5],
                    ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']
                );
            case 'mask':
                return useTransform(
                    scrollYProgress,
                    [0, 0.5],
                    ['circle(0% at 50% 50%)', 'circle(100% at 50% 50%)']
                );
            default:
                return undefined;
        }
    };

    const clipPath = type === 'wipe' || type === 'mask' ? getClipPath() : undefined;

    const style: Record<string, unknown> = { opacity };

    if (type === 'slide') {
        if (direction === 'up' || direction === 'down') {
            style.y = translate;
        } else {
            style.x = translate;
        }
    }

    if (clipPath) {
        style.clipPath = clipPath;
    }

    return (
        <motion.div ref={ref} className={className} style={style}>
            {children}
        </motion.div>
    );
}

// Horizontal wipe transition
interface WipeTransitionProps {
    children: ReactNode;
    className?: string;
    direction?: 'left' | 'right';
    color?: string;
}

export function WipeTransition({
    children,
    className = '',
    direction = 'left',
    color = '#f59e0b',
}: WipeTransitionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    const wipeProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 100]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.6], [0, 0, 1]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            {/* Wipe overlay */}
            <motion.div
                className="absolute inset-0 z-10 origin-left"
                style={{
                    background: color,
                    scaleX: useTransform(wipeProgress, (v) => v / 100),
                    transformOrigin: direction === 'left' ? 'left' : 'right',
                }}
            />

            {/* Content */}
            <motion.div style={{ opacity: contentOpacity }}>
                {children}
            </motion.div>
        </div>
    );
}

// Neon divider
interface NeonDividerProps {
    color?: 'amber' | 'gold' | 'crimson' | 'lime';
    className?: string;
    animated?: boolean;
}

const dividerColors = {
    amber: 'from-transparent via-amber to-transparent',
    gold: 'from-transparent via-gold to-transparent',
    crimson: 'from-transparent via-crimson to-transparent',
    lime: 'from-transparent via-lime to-transparent',
};

const glowShadows = {
    amber: '0 0 20px rgba(245, 158, 11, 0.5)',
    gold: '0 0 20px rgba(212, 165, 116, 0.5)',
    crimson: '0 0 20px rgba(220, 38, 38, 0.5)',
    lime: '0 0 20px rgba(132, 204, 22, 0.5)',
};

export function NeonDivider({
    color = 'amber',
    className = '',
    animated = true,
}: NeonDividerProps) {
    return (
        <motion.div
            className={`h-px w-full bg-gradient-to-r ${dividerColors[color]} ${className}`}
            style={{ boxShadow: glowShadows[color] }}
            initial={animated ? { scaleX: 0, opacity: 0 } : undefined}
            whileInView={animated ? { scaleX: 1, opacity: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
    );
}
