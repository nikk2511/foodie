'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Add lenis class to html
        document.documentElement.classList.add('lenis', 'lenis-smooth');

        return () => {
            lenis.destroy();
            document.documentElement.classList.remove('lenis', 'lenis-smooth');
        };
    }, []);

    return lenisRef;
}

// Provider component for Lenis
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useSmoothScroll();
    return <>{ children } </>;
}
