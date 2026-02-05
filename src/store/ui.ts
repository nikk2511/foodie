import { create } from 'zustand';

type CursorType = 'default' | 'pointer' | 'fork' | 'flame' | 'star' | 'hidden';

interface UIState {
    // Cursor state
    cursorType: CursorType;
    cursorText: string;
    setCursorType: (type: CursorType) => void;
    setCursorText: (text: string) => void;
    resetCursor: () => void;

    // Reduced motion preference
    reducedMotion: boolean;
    setReducedMotion: (value: boolean) => void;

    // Menu open state
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
    toggleMenu: () => void;

    // Loading state
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;

    // Scroll position
    scrollY: number;
    setScrollY: (y: number) => void;

    // Active section for nav highlighting
    activeSection: string;
    setActiveSection: (section: string) => void;

    // Cart state (basic)
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    cartOpen: boolean;
    setCartOpen: (open: boolean) => void;
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export const useUIStore = create<UIState>((set) => ({
    // Cursor
    cursorType: 'default',
    cursorText: '',
    setCursorType: (type) => set({ cursorType: type }),
    setCursorText: (text) => set({ cursorText: text }),
    resetCursor: () => set({ cursorType: 'default', cursorText: '' }),

    // Reduced motion
    reducedMotion: false,
    setReducedMotion: (value) => set({ reducedMotion: value }),

    // Menu
    menuOpen: false,
    setMenuOpen: (open) => set({ menuOpen: open }),
    toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),

    // Loading
    isLoading: true,
    setIsLoading: (loading) => set({ isLoading: loading }),

    // Scroll
    scrollY: 0,
    setScrollY: (y) => set({ scrollY: y }),

    // Active section
    activeSection: 'hero',
    setActiveSection: (section) => set({ activeSection: section }),

    // Cart
    cartItems: [],
    addToCart: (item) => set((state) => {
        const existingItem = state.cartItems.find(i => i.id === item.id);
        if (existingItem) {
            return {
                cartItems: state.cartItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
            };
        }
        return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
    }),
    removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter(i => i.id !== id),
    })),
    clearCart: () => set({ cartItems: [] }),
    cartOpen: false,
    setCartOpen: (open) => set({ cartOpen: open }),
}));
