'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated gradient mesh */}
            <svg className="absolute inset-0 w-full h-full opacity-50">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'rgb(245,158,11)', stopOpacity: 0.3 }}>
                            <animate attributeName="stop-color" values="rgb(245,158,11); rgb(220,38,38); rgb(245,158,11)" dur="10s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" style={{ stopColor: 'rgb(220,38,38)', stopOpacity: 0.2 }}>
                            <animate attributeName="stop-color" values="rgb(220,38,38); rgb(245,158,11); rgb(220,38,38)" dur="10s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>

                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>

                {/* Animated blobs */}
                <g filter="url(#goo)">
                    <circle fill="url(#grad1)" r="100">
                        <animate attributeName="cx" values="20%;80%;20%" dur="20s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="30%;70%;30%" dur="15s" repeatCount="indefinite" />
                        <animate attributeName="r" values="100;150;100" dur="12s" repeatCount="indefinite" />
                    </circle>
                    <circle fill="rgba(220,38,38,0.2)" r="120">
                        <animate attributeName="cx" values="80%;20%;80%" dur="18s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="20%;80%;20%" dur="16s" repeatCount="indefinite" />
                        <animate attributeName="r" values="120;80;120" dur="10s" repeatCount="indefinite" />
                    </circle>
                    <circle fill="rgba(245,158,11,0.25)" r="90">
                        <animate attributeName="cx" values="50%;70%;30%;50%" dur="25s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="50%;30%;70%;50%" dur="22s" repeatCount="indefinite" />
                        <animate attributeName="r" values="90;130;90" dur="14s" repeatCount="indefinite" />
                    </circle>
                </g>
            </svg>

            {/* Floating light beams */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-full w-px"
                    style={{
                        left: `${20 + i * 20}%`,
                        background: 'linear-gradient(to bottom, transparent, rgba(245,158,11,0.3), transparent)',
                    }}
                    animate={{
                        opacity: [0.2, 0.6, 0.2],
                        scaleY: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Rotating gradient rings */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
                style={{
                    background: 'conic-gradient(from 0deg, transparent, rgba(245,158,11,0.4), transparent)',
                }}
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Pulsing circles */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`pulse-${i}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/20"
                    initial={{
                        width: 300 + i * 200,
                        height: 300 + i * 200,
                        opacity: 0.5
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.2, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Moving grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
                <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)">
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        from="0 0"
                        to="50 50"
                        dur="20s"
                        repeatCount="indefinite"
                    />
                </rect>
            </svg>
        </div>
    );
}
