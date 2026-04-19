import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      
// Inside your useCart.ts
addToCart: (product) => {
  const currentCart = get().cart;
  const existingItem = currentCart.find((item) => item.id === product.id);

  if (existingItem) {
    if (product.decrease) {
      // Decrease logic
      if (existingItem.quantity === 1) {
        set({ cart: currentCart.filter((item) => item.id !== product.id) });
      } else {
        set({
          cart: currentCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        });
      }
    } else {
      // Increase logic
      set({
        cart: currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    }
  } else if (!product.decrease) {
    // Add new item logic
    set({ cart: [...currentCart, { ...product, quantity: 1 }] });
  }
},

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      clearCart: () => set({ cart: [] }),

      totalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
    }),
    { name: 'orchid-cart-storage' } // This saves the cart to LocalStorage
  )
);