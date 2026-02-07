'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText } from '@/components/animations/RevealText';
import { ParallaxSection } from '@/components/animations/ParallaxSection';



const signatureDishes = [
    {
        id: 'pizza',
        name: 'Volcanic Pizza',
        tagline: 'Erupting with Flavor',
        description: 'Wood-fired perfection with lava-hot cheese pull that defies gravity.',
        image: '/pizza.png',
        gradient: 'from-crimson/20 via-amber/10 to-transparent',
    },
    {
        id: 'sushi',
        name: 'Zen Garden Roll',
        tagline: 'Art You Can Taste',
        description: 'Master-crafted sushi combining centuries of tradition with modern flair.',
        image: '/sushi.png',
        gradient: 'from-lime/20 via-emerald/10 to-transparent',
    },
    {
        id: 'donut',
        name: 'Golden Bliss',
        tagline: 'Sweet Decadence',
        description: 'Cloud-soft donut glazed in 24k gold, topped with artisan sprinkles.',
        image: '/donut.png',
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
            className={`relative min-h-[100svh] py-12 sm:py-16 md:py-20 flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
        >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-radial ${dish.gradient}`} />

            <motion.div
                className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 ${isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                style={{ opacity, x }}
            >
                {/* Text content */}
                <div className={`flex-1 ${isEven ? 'lg:text-left' : 'lg:text-right'} text-center px-4 sm:px-0`}>
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
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-headline text-white mb-4"
                        />

                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl text-gradient-gold font-semibold mb-4 sm:mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            {dish.tagline}
                        </motion.p>

                        <motion.p
                            className="text-muted-light text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            {dish.description}
                        </motion.p>
                    </ParallaxSection>
                </div>

                {/* Image Section */}
                <motion.div
                    className="flex-1 h-[350px] sm:h-[450px] md:h-[550px] lg:h-[65vh] w-full flex items-center justify-center relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative w-full h-full max-w-[90vw] sm:max-w-[75vw] md:max-w-[65vw] lg:max-w-[60vw]">
                        <motion.img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-contain drop-shadow-2xl"
                            animate={{
                                y: [-10, 10, -10],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotate: [0, -2, 2, 0],
                                transition: {
                                    scale: { type: "spring", stiffness: 300, damping: 20 },
                                    rotate: { duration: 0.5 }
                                }
                            }}
                        />
                        {/* Animated Glow effect */}
                        <motion.div
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-gradient-radial ${dish.gradient} blur-[80px] -z-10 rounded-full`}
                            animate={{
                                opacity: [0.4, 0.7, 0.4],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>
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
