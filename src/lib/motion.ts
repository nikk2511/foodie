// Motion configuration for Framer Motion
// Spring configs, transition presets, and animation variants

export const springConfigs = {
  // Soft and smooth
  gentle: { type: 'spring', stiffness: 100, damping: 15, mass: 0.5 },
  
  // Standard interaction
  default: { type: 'spring', stiffness: 300, damping: 25, mass: 0.8 },
  
  // Snappy interactions
  snappy: { type: 'spring', stiffness: 500, damping: 30, mass: 0.5 },
  
  // Bouncy effect
  bouncy: { type: 'spring', stiffness: 400, damping: 10, mass: 0.5 },
  
  // Smooth but fast
  smooth: { type: 'spring', stiffness: 150, damping: 20, mass: 1 },
  
  // Heavy, dramatic motion
  heavy: { type: 'spring', stiffness: 100, damping: 30, mass: 2 },
} as const;

export const transitionPresets = {
  // Fast micro-interactions (hover states)
  micro: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  
  // Standard element transitions
  default: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  
  // Smooth page elements
  smooth: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  
  // Dramatic reveals
  dramatic: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
  
  // Very slow, cinematic
  cinematic: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  
  // Slow fade
  slowFade: { duration: 1.5, ease: 'easeInOut' },
} as const;

// Common animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitionPresets.smooth,
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitionPresets.smooth,
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitionPresets.smooth,
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitionPresets.smooth,
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springConfigs.default,
  },
};

export const slideUp = {
  hidden: { y: '100%' },
  visible: { 
    y: 0,
    transition: transitionPresets.dramatic,
  },
};

export const revealMask = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { 
    clipPath: 'inset(0 0 0% 0)',
    transition: transitionPresets.cinematic,
  },
};

// Stagger container
export const staggerContainer = (staggerDelay = 0.1) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});

// Letter by letter reveal
export const letterReveal = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: custom * 0.03,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Word reveal
export const wordReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      ...transitionPresets.smooth,
    },
  }),
};

// 3D Card tilt effect values
export const tiltConfig = {
  max: 15, // Max tilt in degrees
  scale: 1.02, // Scale on hover
  speed: 400, // Transition speed in ms
  perspective: 1000, // Perspective distance
};

// Magnetic effect config
export const magneticConfig = {
  strength: 0.3, // How much the element follows cursor (0-1)
  ease: 0.1, // Easing factor for smooth movement
  maxDistance: 100, // Max distance in pixels element can move
};

// Particle system defaults
export const particleDefaults = {
  steam: {
    count: 20,
    size: { min: 2, max: 8 },
    speed: { min: 0.5, max: 2 },
    opacity: { min: 0.1, max: 0.4 },
    color: 'rgba(255, 255, 255, 0.3)',
  },
  fire: {
    count: 30,
    size: { min: 1, max: 4 },
    speed: { min: 1, max: 3 },
    opacity: { min: 0.5, max: 1 },
    colors: ['#ff4500', '#ff6b35', '#ffd700', '#ff8c00'],
  },
  sparkle: {
    count: 15,
    size: { min: 1, max: 3 },
    speed: { min: 0.2, max: 1 },
    opacity: { min: 0.3, max: 1 },
    color: '#ffd700',
  },
};
