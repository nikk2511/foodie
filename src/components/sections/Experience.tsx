'use client';

import { motion } from 'framer-motion';
import { RevealText } from '@/components/animations/RevealText';
import { ParallaxSection, ParallaxFade } from '@/components/animations/ParallaxSection';
import { GlassPanel } from '@/components/ui/GlassPanel';

const features = [
    {
        icon: '🌙',
        title: 'Ambient Lighting',
        description: 'Set the mood with our signature warm glow atmosphere.',
    },
    {
        icon: '🎵',
        title: 'Curated Music',
        description: 'Hand-picked playlists that complement your dining experience.',
    },
    {
        icon: '🍷',
        title: 'Premium Bar',
        description: 'Craft cocktails and fine wines from around the world.',
    },
    {
        icon: '👨‍🍳',
        title: 'Open Kitchen',
        description: 'Watch our chefs create culinary magic before your eyes.',
    },
];

const testimonials = [
    {
        quote: "The best burger I've ever had. Period.",
        author: 'James M.',
        role: 'Food Critic',
        rating: 5,
    },
    {
        quote: 'An experience that transcends dining.',
        author: 'Sarah K.',
        role: 'Chef',
        rating: 5,
    },
    {
        quote: 'Finally, street food done right.',
        author: 'Michael R.',
        role: 'Foodie',
        rating: 5,
    },
];

export function Experience() {
    return (
        <section id="experience" className="relative py-32 bg-background overflow-hidden">
            {/* Background video mask effect */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
                <motion.div
                    className="w-full h-full"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        className="inline-block text-amber text-sm font-medium tracking-widest mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        THE EXPERIENCE
                    </motion.span>

                    <RevealText
                        text="More Than a Meal"
                        as="h2"
                        type="word"
                        className="text-headline text-white mb-6"
                    />

                    <motion.p
                        className="text-muted-light max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Step into a world where every detail is crafted to elevate
                        your senses. This is dining reimagined.
                    </motion.p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {features.map((feature, index) => (
                        <ParallaxFade key={feature.title}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassPanel className="p-8 rounded-2xl text-center h-full" delay={index * 0.1}>
                                    <motion.div
                                        className="text-5xl mb-4"
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-muted-light text-sm">{feature.description}</p>
                                </GlassPanel>
                            </motion.div>
                        </ParallaxFade>
                    ))}
                </div>

                {/* Testimonials */}
                <ParallaxSection speed={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.author}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <GlassPanel className="p-8 rounded-2xl h-full" delay={0.2 + index * 0.1}>
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <motion.span
                                                key={i}
                                                className="text-amber"
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                                            >
                                                ★
                                            </motion.span>
                                        ))}
                                    </div>

                                    <blockquote className="text-white text-lg italic mb-6">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </blockquote>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber to-gold flex items-center justify-center text-black font-bold">
                                            {testimonial.author[0]}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{testimonial.author}</p>
                                            <p className="text-muted text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </GlassPanel>
                            </motion.div>
                        ))}
                    </div>
                </ParallaxSection>
            </div>
        </section>
    );
}
