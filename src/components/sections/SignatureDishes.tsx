'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText } from '@/components/animations/RevealText';
import { ParallaxSection } from '@/components/animations/ParallaxSection';

// Dynamic imports for 3D
const Scene3D = dynamic(
    () => import('@/components/3d/Scene').then((mod) => mod.Scene3D),
    { ssr: false }
);
const PizzaModel = dynamic(
    () => import('@/components/3d/FoodModel').then((mod) => mod.PizzaModel),
    { ssr: false }
);
const SushiModel = dynamic(
    () => import('@/components/3d/FoodModel').then((mod) => mod.SushiModel),
    { ssr: false }
);
const DonutModel = dynamic(
    () => import('@/components/3d/FoodModel').then((mod) => mod.DonutModel),
    { ssr: false }
);
const FireParticles = dynamic(
    () => import('@/components/3d/Particles').then((mod) => mod.FireParticles),
    { ssr: false }
);
const SteamParticles = dynamic(
    () => import('@/components/3d/Particles').then((mod) => mod.SteamParticles),
    { ssr: false }
);

const signatureDishes = [
    {
        id: 'pizza',
        name: 'Volcanic Pizza',
        tagline: 'Erupting with Flavor',
        description: 'Wood-fired perfection with lava-hot cheese pull that defies gravity.',
        Model: PizzaModel,
        Particles: FireParticles,
        gradient: 'from-crimson/20 via-amber/10 to-transparent',
    },
    {
        id: 'sushi',
        name: 'Zen Garden Roll',
        tagline: 'Art You Can Taste',
        description: 'Master-crafted sushi combining centuries of tradition with modern flair.',
        Model: SushiModel,
        Particles: SteamParticles,
        gradient: 'from-lime/20 via-emerald/10 to-transparent',
    },
    {
        id: 'donut',
        name: 'Golden Bliss',
        tagline: 'Sweet Decadence',
        description: 'Cloud-soft donut glazed in 24k gold, topped with artisan sprinkles.',
        Model: DonutModel,
        Particles: null,
        gradient: 'from-gold/20 via-amber/10 to-transparent',
    },
];

function DishSection({ dish, index }: { dish: typeof signatureDishes[0]; index: number }) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const x = useTransform(
        scrollYProgress,
        [0, 0.5],
        [index % 2 === 0 ? -100 : 100, 0]
    );

    const isEven = index % 2 === 0;

    return (
        <div
            ref={sectionRef}
            className={`relative min-h-screen flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
        >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-radial ${dish.gradient}`} />

            <motion.div
                className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 ${isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                style={{ opacity, x }}
            >
                {/* Text content */}
                <div className={`flex-1 ${isEven ? 'lg:text-left' : 'lg:text-right'} text-center`}>
                    <ParallaxSection speed={0.2} direction="up">
                        <motion.span
                            className="inline-block text-amber text-sm font-medium tracking-widest mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            SIGNATURE DISH
                        </motion.span>

                        <RevealText
                            text={dish.name}
                            as="h2"
                            type="word"
                            className="text-headline text-white mb-4"
                        />

                        <motion.p
                            className="text-2xl text-gradient-gold font-semibold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            {dish.tagline}
                        </motion.p>

                        <motion.p
                            className="text-muted-light text-lg max-w-md mx-auto lg:mx-0"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            {dish.description}
                        </motion.p>
                    </ParallaxSection>
                </div>

                {/* 3D Model */}
                <motion.div
                    className="flex-1 h-[400px] md:h-[500px] w-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Scene3D cameraPosition={[0, 0, 5]}>
                        <dish.Model scale={1.8} />
                        {dish.Particles && <dish.Particles position={[0, 0.5, 0]} />}
                    </Scene3D>
                </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
    );
}

export function SignatureDishes() {
    return (
        <section id="signature" className="relative bg-surface">
            {/* Section header */}
            <div className="container mx-auto px-6 py-20 text-center">
                <motion.span
                    className="inline-block text-amber text-sm font-medium tracking-widest mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    CHEF'S SPECIAL
                </motion.span>

                <RevealText
                    text="Signature Creations"
                    as="h2"
                    type="word"
                    className="text-headline text-white"
                />
            </div>

            {/* Dish sections */}
            {signatureDishes.map((dish, index) => (
                <DishSection key={dish.id} dish={dish} index={index} />
            ))}
        </section>
    );
}
