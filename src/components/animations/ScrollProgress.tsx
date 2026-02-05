'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
    color?: string;
    height?: number;
    position?: 'top' | 'bottom';
    showPercentage?: boolean;
}

export function ScrollProgress({
    color = '#f59e0b',
    height = 3,
    position = 'top',
}: ScrollProgressProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed left-0 right-0 z-50"
            style={{
                [position]: 0,
                height,
                background: color,
                transformOrigin: 'left',
                scaleX,
            }}
        />
    );
}

// Circular scroll progress indicator
interface CircularProgressProps {
    size?: number;
    strokeWidth?: number;
    color?: string;
    bgColor?: string;
    showPercentage?: boolean;
}

export function CircularProgress({
    size = 60,
    strokeWidth = 4,
    color = '#f59e0b',
    bgColor = 'rgba(255,255,255,0.1)',
    showPercentage = false,
}: CircularProgressProps) {
    const { scrollYProgress } = useScroll();

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    const strokeDashoffset = useSpring(
        scrollYProgress,
        { stiffness: 100, damping: 30 }
    );

    return (
        <div
            className="fixed bottom-8 right-8 z-50"
            style={{ width: size, height: size }}
        >
            <svg width={size} height={size} className="-rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={bgColor}
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{
                        strokeDashoffset: strokeDashoffset.get() * circumference,
                    }}
                />
            </svg>
            {showPercentage && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-xs font-medium"
                    style={{ color }}
                >
                    {Math.round(scrollYProgress.get() * 100)}%
                </motion.div>
            )}
        </div>
    );
}
