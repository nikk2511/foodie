'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MagneticWrapper } from '@/components/animations/MagneticWrapper';
import { NeonDivider } from '@/components/animations/SectionTransition';
import { useUIStore } from '@/store/ui';

const footerLinks = {
    company: [
        { label: 'About Us', href: '#story' },
        { label: 'Careers', href: '#careers' },
        { label: 'Franchise', href: '#franchise' },
        { label: 'Press', href: '#' },
    ],
    menu: [
        { label: 'Burgers', href: '#menu' },
        { label: 'Pizza', href: '#menu' },
        { label: 'Sushi', href: '#menu' },
        { label: 'Desserts', href: '#menu' },
    ],
    support: [
        { label: 'Contact', href: '#' },
        { label: 'FAQs', href: '#' },
        { label: 'Delivery', href: '#' },
        { label: 'Gift Cards', href: '#' },
    ],
};

const socialLinks = [
    { label: 'Instagram', icon: '📸', href: '#' },
    { label: 'Twitter', icon: '🐦', href: '#' },
    { label: 'TikTok', icon: '🎵', href: '#' },
    { label: 'YouTube', icon: '📺', href: '#' },
];

export function Footer() {
    const { setCursorType, resetCursor } = useUIStore();

    return (
        <footer className="relative bg-surface pt-20 pb-8">
            <NeonDivider color="amber" className="absolute top-0" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <motion.div
                            className="flex items-center gap-3 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber to-gold flex items-center justify-center">
                                <span className="text-3xl">🔥</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gradient-gold">FLAME</h2>
                                <p className="text-xs text-muted-light tracking-widest">KITCHEN</p>
                            </div>
                        </motion.div>

                        <motion.p
                            className="text-muted-light mb-8 max-w-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Where culinary artistry meets fire-kissed perfection.
                            Experience luxury street food reimagined.
                        </motion.p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <MagneticWrapper key={social.label} strength={0.3}>
                                    <motion.a
                                        href={social.href}
                                        className="w-12 h-12 rounded-full bg-surface-light flex items-center justify-center hover:bg-amber/20 transition-colors"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        onMouseEnter={() => setCursorType('pointer')}
                                        onMouseLeave={() => resetCursor()}
                                        whileHover={{ y: -4 }}
                                    >
                                        <span className="text-xl">{social.icon}</span>
                                    </motion.a>
                                </MagneticWrapper>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * categoryIndex }}
                        >
                            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
                                {category}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-light hover:text-amber transition-colors text-sm"
                                            onMouseEnter={() => setCursorType('pointer')}
                                            onMouseLeave={() => resetCursor()}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter */}
                <motion.div
                    className="glass rounded-2xl p-8 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Stay Hungry, Stay Updated</h3>
                            <p className="text-muted-light text-sm">Get exclusive offers and new menu drops.</p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 md:w-64 bg-surface-light border border-border rounded-full px-6 py-3 text-white placeholder:text-muted focus:outline-none focus:border-amber transition-colors"
                            />
                            <MagneticWrapper strength={0.2}>
                                <button className="bg-amber hover:bg-amber-glow text-black font-semibold px-6 py-3 rounded-full transition-colors">
                                    Subscribe
                                </button>
                            </MagneticWrapper>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-muted text-sm">
                    <p>© 2024 Flame Kitchen. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
