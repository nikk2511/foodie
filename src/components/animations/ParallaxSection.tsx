'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    speed?: number; // Positive = slower, Negative = faster
    direction?: 'up' | 'down';
    offset?: string[]; // Scroll trigger offset
}

export function ParallaxSection({
    children,
    className = '',
    speed = 0.5,
    direction = 'up',
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const factor = direction === 'up' ? -1 : 1;
    const y = useTransform(scrollYProgress, [0, 1], [factor * speed * 100, factor * -speed * 100]);

    return (
        <motion.div ref={ref} className={className} style={{ y }}>
            {children}
        </motion.div>
    );
}

// Parallax layer for stacking multiple elements at different speeds
interface ParallaxLayerProps {
    children: ReactNode;
    className?: string;
    speed: number;
    zIndex?: number;
}

export function ParallaxLayer({
    children,
    className = '',
    speed,
    zIndex = 0,
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [speed * 150, -speed * 150]);

    return (
        <motion.div
            ref={ref}
            className={`absolute inset-0 ${className}`}
            style={{ y, zIndex }}
        >
            {children}
        </motion.div>
    );
}

// Horizontal parallax for side-scrolling effects
interface HorizontalParallaxProps {
    children: ReactNode;
    className?: string;
    speed?: number;
    direction?: 'left' | 'right';
}

export function HorizontalParallax({
    children,
    className = '',
    speed = 0.3,
    direction = 'left',
}: HorizontalParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const factor = direction === 'left' ? -1 : 1;
    const x = useTransform(scrollYProgress, [0, 1], [0, factor * speed * 200]);

    return (
        <motion.div ref={ref} className={className} style={{ x }}>
            {children}
        </motion.div>
    );
}

// Scale on scroll (zoom in/out as you scroll)
interface ParallaxScaleProps {
    children: ReactNode;
    className?: string;
    scaleRange?: [number, number];
}

export function ParallaxScale({
    children,
    className = '',
    scaleRange = [0.8, 1.2],
}: ParallaxScaleProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

    return (
        <motion.div ref={ref} className={className} style={{ scale }}>
            {children}
        </motion.div>
    );
}

// Rotate on scroll
interface ParallaxRotateProps {
    children: ReactNode;
    className?: string;
    rotateRange?: [number, number]; // degrees
}

export function ParallaxRotate({
    children,
    className = '',
    rotateRange = [-10, 10],
}: ParallaxRotateProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);

    return (
        <motion.div ref={ref} className={className} style={{ rotate }}>
            {children}
        </motion.div>
    );
}

// Opacity fade on scroll
interface ParallaxFadeProps {
    children: ReactNode;
    className?: string;
    fadeRange?: [number, number];
}

export function ParallaxFade({
    children,
    className = '',
    fadeRange = [0, 1],
}: ParallaxFadeProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], fadeRange);

    return (
        <motion.div ref={ref} className={className} style={{ opacity }}>
            {children}
        </motion.div>
    );
}
