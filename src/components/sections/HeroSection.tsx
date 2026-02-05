'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText } from '@/components/animations/RevealText';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ParallaxLayer } from '@/components/animations/ParallaxSection';
import { GlassOrb } from '@/components/ui/GlassPanel';

// Dynamically import 3D components to avoid SSR issues
const Scene3D = dynamic(
    () => import('@/components/3d/Scene').then((mod) => mod.Scene3D),
    { ssr: false }
);
const BurgerModel = dynamic(
    () => import('@/components/3d/FoodModel').then((mod) => mod.BurgerModel),
    { ssr: false }
);
const AmbientParticles = dynamic(
    () => import('@/components/3d/Particles').then((mod) => mod.AmbientParticles),
    { ssr: false }
);
const SteamParticles = dynamic(
    () => import('@/components/3d/Particles').then((mod) => mod.SteamParticles),
    { ssr: false }
);

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden grain"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

            {/* Radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.15)_0%,transparent_50%)]" />

            {/* Parallax decorative orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <ParallaxLayer speed={0.3} zIndex={1}>
                    <GlassOrb size={400} color="rgba(245, 158, 11, 0.15)" className="absolute -top-40 -left-40" />
                </ParallaxLayer>
                <ParallaxLayer speed={0.5} zIndex={1}>
                    <GlassOrb size={300} color="rgba(220, 38, 38, 0.1)" className="absolute -bottom-20 -right-20" />
                </ParallaxLayer>
                <ParallaxLayer speed={0.2} zIndex={1}>
                    <GlassOrb size={200} color="rgba(132, 204, 22, 0.1)" className="absolute top-1/3 right-1/4" />
                </ParallaxLayer>
            </div>

            {/* Main content */}
            <motion.div
                className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12"
                style={{ y, opacity, scale }}
            >
                {/* Text content */}
                <div className="flex-1 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-4"
                    >
                        <span className="inline-block px-4 py-2 rounded-full border border-amber/30 text-amber text-sm font-medium">
                            ✨ Premium Street Gourmet
                        </span>
                    </motion.div>

                    <RevealText
                        text="TASTE THE"
                        as="h1"
                        type="word"
                        className="text-display text-white mb-2"
                        delay={0.5}
                    />

                    <motion.h1
                        className="text-display text-gradient-gold mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        FLAME
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-muted-light max-w-lg mx-auto lg:mx-0 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    >
                        Where fire meets flavor. Experience luxury street food
                        crafted with passion, served with perfection.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                    >
                        <AnimatedButton size="lg">
                            <span>Order Now</span>
                            <span className="ml-2">🔥</span>
                        </AnimatedButton>
                        <AnimatedButton variant="outline" size="lg">
                            Explore Menu
                        </AnimatedButton>
                    </motion.div>
                </div>

                {/* 3D Food Model */}
                <motion.div
                    className="flex-1 h-[400px] md:h-[500px] lg:h-[600px] w-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <Scene3D cameraPosition={[0, 0, 6]}>
                        <BurgerModel scale={1.5} />
                        <SteamParticles position={[0, 1, 0]} />
                        <AmbientParticles count={50} />
                    </Scene3D>
                </motion.div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <span className="text-muted text-sm">Scroll to explore</span>
                <motion.div
                    className="w-6 h-10 rounded-full border-2 border-muted flex items-start justify-center p-1"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-amber"
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
