'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText } from '@/components/animations/RevealText';
import { NeonDivider } from '@/components/animations/SectionTransition';

const timelineItems = [
    {
        year: '2018',
        title: 'The First Flame',
        description: 'Started as a single food truck with a vision to redefine street food.',
        icon: '🔥',
    },
    {
        year: '2019',
        title: 'Culinary Recognition',
        description: 'Awarded "Best Street Food Innovation" at the International Food Festival.',
        icon: '🏆',
    },
    {
        year: '2020',
        title: 'First Restaurant',
        description: 'Opened our flagship location in the heart of downtown.',
        icon: '🏢',
    },
    {
        year: '2022',
        title: 'Global Expansion',
        description: 'Expanded to 15 locations across 3 continents.',
        icon: '🌍',
    },
    {
        year: '2024',
        title: 'The Future',
        description: 'Pioneering sustainable luxury dining experiences worldwide.',
        icon: '🚀',
    },
];

export function BrandStory() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

    return (
        <section
            ref={sectionRef}
            id="story"
            className="relative py-32 bg-surface overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(245,158,11,0.08)_0%,transparent_50%)]" />

            <div className="container mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-20">
                    <motion.span
                        className="inline-block text-amber text-sm font-medium tracking-widest mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        OUR JOURNEY
                    </motion.span>

                    <RevealText
                        text="Born from Fire"
                        as="h2"
                        type="word"
                        className="text-headline text-white mb-6"
                    />

                    <motion.p
                        className="text-muted-light max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Every great story starts with a spark. Ours ignited with
                        a simple dream: to bring luxury to the streets.
                    </motion.p>
                </div>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
                        <motion.div
                            className="w-full bg-gradient-to-b from-amber via-gold to-amber"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Timeline items */}
                    <div className="space-y-24">
                        {timelineItems.map((item, index) => (
                            <motion.div
                                key={item.year}
                                className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                    }`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                {/* Content card */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                    <motion.div
                                        className="glass p-6 rounded-2xl inline-block"
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <span className="text-amber font-bold text-2xl">{item.year}</span>
                                        <h3 className="text-white font-semibold text-xl mt-2">{item.title}</h3>
                                        <p className="text-muted-light mt-2 text-sm">{item.description}</p>
                                    </motion.div>
                                </div>

                                {/* Center icon */}
                                <motion.div
                                    className="absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-surface-elevated border-2 border-amber flex items-center justify-center z-10"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                </motion.div>

                                {/* Empty space for alignment */}
                                <div className="flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <NeonDivider color="gold" className="mt-32" />
            </div>
        </section>
    );
}
