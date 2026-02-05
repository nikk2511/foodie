'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { RevealText } from '@/components/animations/RevealText';
import { GlowCard } from '@/components/ui/GlowCard';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { NeonDivider } from '@/components/animations/SectionTransition';

const stats = [
    { value: 50, suffix: '+', label: 'Locations Worldwide', icon: '🌍' },
    { value: 2, suffix: 'M+', label: 'Happy Customers', icon: '😊' },
    { value: 15, suffix: '+', label: 'Awards Won', icon: '🏆' },
    { value: 500, suffix: '+', label: 'Team Members', icon: '👨‍🍳' },
];

const benefits = [
    {
        title: 'Proven Business Model',
        description: 'Join a brand with demonstrated success across multiple markets.',
        icon: '📈',
    },
    {
        title: 'Comprehensive Training',
        description: '6-week intensive program covering operations, marketing, and leadership.',
        icon: '🎓',
    },
    {
        title: 'Marketing Support',
        description: 'National campaigns and local marketing resources to drive traffic.',
        icon: '📣',
    },
    {
        title: 'Ongoing Innovation',
        description: 'Continuous menu development and operational improvements.',
        icon: '💡',
    },
];

function CountUpNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let current = 0;
        const step = value / 50;
        const interval = setInterval(() => {
            current += step;
            if (current >= value) {
                setDisplayValue(value);
                clearInterval(interval);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, 20);

        return () => clearInterval(interval);
    }, [isInView, value]);

    return (
        <span ref={ref} className="text-4xl md:text-5xl font-bold text-gradient-gold">
            {displayValue}{suffix}
        </span>
    );
}

export function Franchise() {
    return (
        <section id="franchise" className="relative py-32 bg-background overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(245,158,11,0.08)_0%,transparent_50%)]" />

            <div className="relative z-10 container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        className="inline-block text-amber text-sm font-medium tracking-widest mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        FRANCHISE & CAREERS
                    </motion.span>

                    <RevealText
                        text="Join the Fire"
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
                        Be part of the culinary revolution. Whether you want to own a
                        franchise or join our team, we&apos;re looking for passionate people.
                    </motion.p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassPanel className="p-6 rounded-2xl text-center" delay={index * 0.1}>
                                <motion.div
                                    className="text-4xl mb-4"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                >
                                    {stat.icon}
                                </motion.div>
                                <CountUpNumber value={stat.value} suffix={stat.suffix} />
                                <p className="text-muted-light text-sm mt-2">{stat.label}</p>
                            </GlassPanel>
                        </motion.div>
                    ))}
                </div>

                <NeonDivider color="amber" className="mb-20" />

                {/* Two columns: Franchise & Careers */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Franchise */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="text-3xl">🔥</span>
                            Franchise Opportunities
                        </h3>

                        <div className="space-y-4 mb-8">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <GlowCard glowColor="amber" className="p-4">
                                        <div className="flex items-start gap-4">
                                            <span className="text-2xl">{benefit.icon}</span>
                                            <div>
                                                <h4 className="text-white font-semibold">{benefit.title}</h4>
                                                <p className="text-muted-light text-sm">{benefit.description}</p>
                                            </div>
                                        </div>
                                    </GlowCard>
                                </motion.div>
                            ))}
                        </div>

                        <AnimatedButton size="lg">
                            Become a Franchise Partner
                        </AnimatedButton>
                    </motion.div>

                    {/* Careers */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="text-3xl">💼</span>
                            Join Our Team
                        </h3>

                        <GlassPanel className="p-8 rounded-2xl mb-8">
                            <p className="text-muted-light mb-6">
                                We&apos;re always looking for talented individuals who share our
                                passion for exceptional food and service. Current openings:
                            </p>

                            <div className="space-y-4">
                                {[
                                    { role: 'Head Chef', location: 'New York', type: 'Full-time' },
                                    { role: 'Restaurant Manager', location: 'London', type: 'Full-time' },
                                    { role: 'Marketing Lead', location: 'Remote', type: 'Full-time' },
                                    { role: 'Line Cook', location: 'Tokyo', type: 'Part-time' },
                                ].map((job, index) => (
                                    <motion.div
                                        key={job.role}
                                        className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated hover:bg-surface-light transition-colors cursor-pointer"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <div>
                                            <h4 className="text-white font-medium">{job.role}</h4>
                                            <p className="text-muted text-sm">{job.location}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-amber/20 text-amber text-xs rounded-full">
                                            {job.type}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </GlassPanel>

                        <AnimatedButton variant="outline" size="lg">
                            View All Positions
                        </AnimatedButton>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
