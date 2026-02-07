'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './interactive-burger.module.css';

export function InteractiveBurger() {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        setIsOpen(true);

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Close after 3 seconds
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 3000);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Wrapper */}
            <div className={styles.burgerWrapper}>
                <div
                    className={`${styles.scene} ${isOpen ? styles.isOpen : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className={styles.burgerContainer}>
                        <div className={`${styles.layer} ${styles.bunTop}`}><div className={styles.bunTopShape}></div></div>
                        <div className={`${styles.layer} ${styles.lettuce}`}><div className={styles.lettuceShape}></div></div>
                        <div className={`${styles.layer} ${styles.tomato}`}><div className={styles.tomatoShape}></div></div>
                        <div className={`${styles.layer} ${styles.cheese}`}><div className={styles.cheeseShape}></div></div>
                        <div className={`${styles.layer} ${styles.patty}`}><div className={styles.pattyShape}></div></div>
                        <div className={`${styles.layer} ${styles.bunBottom}`}><div className={styles.bunBottomShape}></div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
