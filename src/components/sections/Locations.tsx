'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealText } from '@/components/animations/RevealText';
import { GlowCard } from '@/components/ui/GlowCard';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { useUIStore } from '@/store/ui';

const locations = [
    {
        id: 'nyc',
        city: 'New York',
        country: 'USA',
        address: '420 Fifth Avenue, Manhattan',
        hours: '11:00 AM - 11:00 PM',
        phone: '+1 (212) 555-0123',
        image: '🗽',
        coordinates: { x: 25, y: 35 },
        featured: true,
    },
    {
        id: 'london',
        city: 'London',
        country: 'UK',
        address: '15 Covent Garden, Westminster',
        hours: '12:00 PM - 10:00 PM',
        phone: '+44 20 7946 0958',
        image: '🎡',
        coordinates: { x: 48, y: 28 },
        featured: false,
    },
    {
        id: 'tokyo',
        city: 'Tokyo',
        country: 'Japan',
        address: '3-14-1 Shibuya, Shibuya-ku',
        hours: '11:00 AM - 12:00 AM',
        phone: '+81 3-5456-7890',
        image: '🗼',
        coordinates: { x: 82, y: 38 },
        featured: true,
    },
    {
        id: 'dubai',
        city: 'Dubai',
        country: 'UAE',
        address: 'The Dubai Mall, Downtown',
        hours: '10:00 AM - 12:00 AM',
        phone: '+971 4 325 3322',
        image: '🏙️',
        coordinates: { x: 58, y: 45 },
        featured: false,
    },
    {
        id: 'sydney',
        city: 'Sydney',
        country: 'Australia',
        address: '200 George Street, CBD',
        hours: '11:00 AM - 10:00 PM',
        phone: '+61 2 9241 3022',
        image: '🌉',
        coordinates: { x: 88, y: 72 },
        featured: false,
    },
];

export function Locations() {
    const [activeLocation, setActiveLocation] = useState(locations[0]);
    const [isNight, setIsNight] = useState(true);
    const { setCursorType, resetCursor } = useUIStore();

    return (
        <section id="locations" className="relative py-32 bg-surface overflow-hidden">
            {/* Background */}
            <div className={`absolute inset-0 transition-colors duration-1000 ${isNight ? 'bg-surface' : 'bg-surface-light'
                }`} />

            <div className="relative z-10 container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <div>
                        <motion.span
                            className="inline-block text-amber text-sm font-medium tracking-widest mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            OUR LOCATIONS
                        </motion.span>

                        <RevealText
                            text="Find Us Worldwide"
                            as="h2"
                            type="word"
                            className="text-headline text-white"
                        />
                    </div>

                    {/* Day/Night toggle */}
                    <motion.button
                        className="mt-6 md:mt-0 flex items-center gap-3 px-4 py-2 rounded-full bg-surface-elevated"
                        onClick={() => setIsNight(!isNight)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => setCursorType('pointer')}
                        onMouseLeave={() => resetCursor()}
                    >
                        <span className="text-2xl">{isNight ? '🌙' : '☀️'}</span>
                        <span className="text-white text-sm">{isNight ? 'Night Mode' : 'Day Mode'}</span>
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Interactive Map */}
                    <GlassPanel className="rounded-3xl p-8 aspect-video lg:aspect-square relative overflow-hidden">
                        {/* Simple world map placeholder */}
                        <div className={`absolute inset-4 rounded-2xl transition-colors duration-500 ${isNight
                                ? 'bg-gradient-to-br from-surface-elevated to-background'
                                : 'bg-gradient-to-br from-blue-900/30 to-blue-800/20'
                            }`}>
                            {/* Map grid lines */}
                            <div className="absolute inset-0 opacity-20">
                                {[...Array(10)].map((_, i) => (
                                    <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-white/20" style={{ top: `${i * 10}%` }} />
                                ))}
                                {[...Array(10)].map((_, i) => (
                                    <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-white/20" style={{ left: `${i * 10}%` }} />
                                ))}
                            </div>

                            {/* Location pins */}
                            {locations.map((location) => (
                                <motion.button
                                    key={location.id}
                                    className={`absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center rounded-full transition-all ${activeLocation.id === location.id
                                            ? 'bg-amber scale-125 z-10'
                                            : 'bg-surface-elevated hover:bg-amber/50'
                                        }`}
                                    style={{
                                        left: `${location.coordinates.x}%`,
                                        top: `${location.coordinates.y}%`,
                                    }}
                                    onClick={() => setActiveLocation(location)}
                                    whileHover={{ scale: 1.3 }}
                                    animate={activeLocation.id === location.id ? {
                                        boxShadow: ['0 0 0 0 rgba(245, 158, 11, 0.4)', '0 0 0 20px rgba(245, 158, 11, 0)', '0 0 0 0 rgba(245, 158, 11, 0)'],
                                    } : {}}
                                    transition={{ duration: 1.5, repeat: activeLocation.id === location.id ? Infinity : 0 }}
                                    onMouseEnter={() => setCursorType('pointer')}
                                    onMouseLeave={() => resetCursor()}
                                >
                                    <span className="text-xs">{location.image}</span>
                                </motion.button>
                            ))}
                        </div>
                    </GlassPanel>

                    {/* Location Details */}
                    <div className="flex flex-col gap-6">
                        {/* Active location card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeLocation.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <GlowCard glowColor="amber" className="p-8">
                                    <div className="flex items-start gap-6">
                                        <div className="text-6xl">{activeLocation.image}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-2xl font-bold text-white">{activeLocation.city}</h3>
                                                {activeLocation.featured && (
                                                    <span className="px-2 py-1 bg-amber/20 text-amber text-xs rounded-full">Featured</span>
                                                )}
                                            </div>
                                            <p className="text-muted-light mb-4">{activeLocation.country}</p>

                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-amber">📍</span>
                                                    <span className="text-muted-light">{activeLocation.address}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-amber">🕐</span>
                                                    <span className="text-muted-light">{activeLocation.hours}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-amber">📞</span>
                                                    <span className="text-muted-light">{activeLocation.phone}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 mt-6">
                                                <AnimatedButton size="sm">Get Directions</AnimatedButton>
                                                <AnimatedButton variant="outline" size="sm">View Menu</AnimatedButton>
                                            </div>
                                        </div>
                                    </div>
                                </GlowCard>
                            </motion.div>
                        </AnimatePresence>

                        {/* Location list */}
                        <div className="grid grid-cols-2 gap-4">
                            {locations.map((location, index) => (
                                <motion.button
                                    key={location.id}
                                    className={`p-4 rounded-xl text-left transition-all ${activeLocation.id === location.id
                                            ? 'bg-amber/20 border border-amber'
                                            : 'bg-surface-elevated hover:bg-surface-light border border-transparent'
                                        }`}
                                    onClick={() => setActiveLocation(location)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onMouseEnter={() => setCursorType('pointer')}
                                    onMouseLeave={() => resetCursor()}
                                >
                                    <span className="text-2xl mb-2 block">{location.image}</span>
                                    <span className="text-white font-medium block">{location.city}</span>
                                    <span className="text-muted text-xs">{location.country}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
