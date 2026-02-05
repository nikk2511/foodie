'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealText } from '@/components/animations/RevealText';
import { GlowCard } from '@/components/ui/GlowCard';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { useUIStore } from '@/store/ui';

const menuCategories = ['All', 'Burgers', 'Pizza', 'Sushi', 'Desserts'];

const menuItems = [
    {
        id: '1',
        name: 'The Inferno Burger',
        category: 'Burgers',
        price: 18.99,
        calories: 850,
        description: 'Triple patty, ghost pepper sauce, aged cheddar, caramelized onions',
        image: '🍔',
        color: 'amber' as const,
        popular: true,
    },
    {
        id: '2',
        name: 'Truffle Margherita',
        category: 'Pizza',
        price: 24.99,
        calories: 720,
        description: 'Fresh mozzarella, San Marzano tomatoes, black truffle oil',
        image: '🍕',
        color: 'crimson' as const,
        popular: false,
    },
    {
        id: '3',
        name: 'Dragon Roll',
        category: 'Sushi',
        price: 22.99,
        calories: 480,
        description: 'Eel, avocado, cucumber, spicy mayo, tobiko',
        image: '🍣',
        color: 'lime' as const,
        popular: true,
    },
    {
        id: '4',
        name: 'Molten Lava Cake',
        category: 'Desserts',
        price: 12.99,
        calories: 620,
        description: 'Belgian chocolate, vanilla bean ice cream, gold leaf',
        image: '🍰',
        color: 'gold' as const,
        popular: false,
    },
    {
        id: '5',
        name: 'Wagyu Smash',
        category: 'Burgers',
        price: 28.99,
        calories: 920,
        description: 'A5 Wagyu, foie gras, black truffle, brioche bun',
        image: '🍔',
        color: 'amber' as const,
        popular: true,
    },
    {
        id: '6',
        name: 'Omakase Platter',
        category: 'Sushi',
        price: 48.99,
        calories: 650,
        description: "Chef's selection of 12 premium nigiri pieces",
        image: '🍱',
        color: 'lime' as const,
        popular: false,
    },
];

function MenuItem({ item, index, onSelect }: { item: typeof menuItems[0]; index: number; onSelect: () => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart, setCursorType, resetCursor } = useUIStore();

    const handleAddToCart = () => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-[300px] md:w-[350px]"
        >
            <GlowCard
                glowColor={item.color}
                className="h-full"
                onClick={onSelect}
            >
                <div
                    className="p-6"
                    onMouseEnter={() => {
                        setIsHovered(true);
                        setCursorType('fork');
                    }}
                    onMouseLeave={() => {
                        setIsHovered(false);
                        resetCursor();
                    }}
                >
                    {/* Image/Icon area */}
                    <motion.div
                        className="text-8xl text-center mb-4 relative"
                        animate={{
                            rotateY: isHovered ? 20 : 0,
                            scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {item.popular && (
                            <span className="absolute -top-2 -right-2 text-sm bg-amber text-black px-2 py-1 rounded-full font-bold">
                                🔥 Popular
                            </span>
                        )}
                        {item.image}
                    </motion.div>

                    {/* Details */}
                    <h3 className="text-white font-bold text-xl mb-2">{item.name}</h3>
                    <p className="text-muted-light text-sm mb-4 line-clamp-2">{item.description}</p>

                    {/* Price and calories */}
                    <div className="flex items-center justify-between mb-4">
                        <motion.span
                            className="text-2xl font-bold text-amber"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={item.price}
                        >
                            ${item.price}
                        </motion.span>
                        <span className="text-muted text-sm">{item.calories} cal</span>
                    </div>

                    {/* Add to cart */}
                    <div onClick={(e) => e.stopPropagation()}>
                        <AnimatedButton
                            variant="primary"
                            size="sm"
                            className="w-full"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </AnimatedButton>
                    </div>
                </div>
            </GlowCard>
        </motion.div>
    );
}

export function MenuExplorer() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);
    const { setCursorType, resetCursor } = useUIStore();

    const filteredItems = activeCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    return (
        <section id="menu" className="relative py-32 bg-background overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.08)_0%,transparent_50%)]" />

            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.span
                        className="inline-block text-amber text-sm font-medium tracking-widest mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        OUR MENU
                    </motion.span>

                    <RevealText
                        text="Explore Flavors"
                        as="h2"
                        type="word"
                        className="text-headline text-white mb-6"
                    />
                </div>

                {/* Category filters */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {menuCategories.map((category) => (
                        <motion.button
                            key={category}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                ? 'bg-amber text-black'
                                : 'bg-surface-light text-muted-light hover:bg-surface-elevated hover:text-white'
                                }`}
                            onClick={() => setActiveCategory(category)}
                            onMouseEnter={() => setCursorType('pointer')}
                            onMouseLeave={() => resetCursor()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Horizontal scroll carousel */}
                <div className="relative">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item, index) => (
                                <MenuItem
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onSelect={() => setSelectedItem(item)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Scroll fade indicators */}
                    <div className="absolute left-0 top-0 bottom-8 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-8 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Item detail modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                        <motion.div
                            className="relative w-full max-w-lg"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <GlassPanel className="p-8 rounded-3xl" blur="xl">
                                <button
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                                    onClick={() => setSelectedItem(null)}
                                >
                                    ✕
                                </button>

                                <div className="text-center">
                                    <motion.div
                                        className="text-9xl mb-6"
                                        animate={{ rotateY: [0, 360] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    >
                                        {selectedItem.image}
                                    </motion.div>

                                    <h3 className="text-3xl font-bold text-white mb-2">{selectedItem.name}</h3>
                                    <p className="text-muted-light mb-6">{selectedItem.description}</p>

                                    <div className="flex justify-center gap-8 mb-8">
                                        <div>
                                            <span className="block text-3xl font-bold text-amber">${selectedItem.price}</span>
                                            <span className="text-muted text-sm">Price</span>
                                        </div>
                                        <div>
                                            <span className="block text-3xl font-bold text-white">{selectedItem.calories}</span>
                                            <span className="text-muted text-sm">Calories</span>
                                        </div>
                                    </div>

                                    <AnimatedButton size="lg" className="w-full">
                                        Add to Cart - ${selectedItem.price}
                                    </AnimatedButton>
                                </div>
                            </GlassPanel>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
