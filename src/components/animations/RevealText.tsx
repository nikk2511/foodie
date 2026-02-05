'use client';

import React, { useRef, ElementType, ComponentPropsWithoutRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface RevealTextProps {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
    delay?: number;
    type?: 'letter' | 'word' | 'line';
    once?: boolean;
    staggerDelay?: number;
}

export function RevealText({
    text,
    className = '',
    as = 'p',
    delay = 0,
    type = 'word',
    once = true,
    staggerDelay,
}: RevealTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-10%' });

    const getElements = () => {
        switch (type) {
            case 'letter':
                return text.split('');
            case 'word':
                return text.split(' ');
            case 'line':
                return text.split('\n');
            default:
                return text.split(' ');
        }
    };

    const elements = getElements();
    const defaultStagger = type === 'letter' ? 0.03 : type === 'word' ? 0.08 : 0.15;
    const stagger = staggerDelay ?? defaultStagger;

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            },
        },
    };

    const childVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -30,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    const WrapperComponent: ElementType = as;

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <WrapperComponent>
                <motion.span
                    className="inline-flex flex-wrap"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    style={{ perspective: '1000px' }}
                >
                    {elements.map((element, index) => (
                        <motion.span
                            key={index}
                            variants={childVariants}
                            className="inline-block origin-top"
                            style={{
                                marginRight: type === 'letter' ? '0' : '0.25em',
                                whiteSpace: type === 'letter' ? 'pre' : 'normal',
                            }}
                        >
                            {element}
                            {type === 'letter' && element === ' ' && '\u00A0'}
                        </motion.span>
                    ))}
                </motion.span>
            </WrapperComponent>
        </div>
    );
}

// Animated headline with mask reveal effect
interface RevealHeadlineProps {
    text: string;
    className?: string;
    delay?: number;
}

export function RevealHeadline({ text, className = '', delay = 0 }: RevealHeadlineProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-10%' });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.h1
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : { y: '100%' }}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.22, 1, 0.36, 1] as const,
                }}
            >
                {text}
            </motion.h1>
        </div>
    );
}

// Split text into lines with stagger
interface SplitLinesProps {
    children: string;
    className?: string;
    delay?: number;
}

export function SplitLines({ children, className = '', delay = 0 }: SplitLinesProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-10%' });
    const lines = children.split('\n');

    return (
        <div ref={ref} className={className}>
            {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                    <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: delay + i * 0.1,
                            ease: [0.22, 1, 0.36, 1] as const,
                        }}
                    >
                        {line}
                    </motion.div>
                </div>
            ))}
        </div>
    );
}
