'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MagneticWrapper } from '@/components/animations/MagneticWrapper';
import { useUIStore } from '@/store/ui';

interface AnimatedButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    magnetic?: boolean;
    glowOnHover?: boolean;
}

const variants = {
    primary: 'bg-amber text-black hover:bg-amber-glow',
    secondary: 'bg-surface-elevated text-white hover:bg-surface-light',
    outline: 'bg-transparent border-2 border-amber text-amber hover:bg-amber/10',
    ghost: 'bg-transparent text-white hover:bg-white/10',
};

const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
};

export function AnimatedButton({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    disabled = false,
    magnetic = true,
    glowOnHover = true,
}: AnimatedButtonProps) {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
    const { setCursorType, resetCursor } = useUIStore();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);

        onClick?.();
    };

    const buttonContent = (
        <motion.button
            className={`
        relative overflow-hidden rounded-full font-semibold
        transition-colors duration-300
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
            onClick={handleClick}
            disabled={disabled}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => resetCursor()}
            whileHover={!disabled ? { scale: 1.02 } : undefined}
            whileTap={!disabled ? { scale: 0.98 } : undefined}
            style={{
                boxShadow: glowOnHover && variant === 'primary'
                    ? '0 0 20px rgba(245, 158, 11, 0.3)'
                    : undefined,
            }}
        >
            {/* Ripple effects */}
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30 pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                    }}
                    initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                        width: 400,
                        height: 400,
                        x: -200,
                        y: -200,
                        opacity: 0,
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />
            ))}

            {/* Shimmer effect on hover */}
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
            />

            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );

    if (magnetic && !disabled) {
        return <MagneticWrapper strength={0.2}>{buttonContent}</MagneticWrapper>;
    }

    return buttonContent;
}

// Icon button variant
interface IconButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
};

export function IconButton({
    children,
    onClick,
    className = '',
    size = 'md',
}: IconButtonProps) {
    const { setCursorType, resetCursor } = useUIStore();

    return (
        <MagneticWrapper strength={0.3}>
            <motion.button
                className={`
          flex items-center justify-center rounded-full
          bg-white/10 hover:bg-white/20 text-white
          transition-colors duration-200
          ${iconSizes[size]}
          ${className}
        `}
                onClick={onClick}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => resetCursor()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {children}
            </motion.button>
        </MagneticWrapper>
    );
}
