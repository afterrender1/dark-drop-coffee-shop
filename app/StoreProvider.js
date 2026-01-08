"use client";
import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./lib/store";
import { hydrateCart } from "./lib/features/cart/cartSlice";

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // Load from LocalStorage on mount
    const savedCart = localStorage.getItem("coffee_cart");
    if (savedCart) {
      try {
        storeRef.current.dispatch(hydrateCart(JSON.parse(savedCart)));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }

    // Save to LocalStorage on every state change
    const unsubscribe = storeRef.current.subscribe(() => {
      const state = storeRef.current.getState();
      localStorage.setItem("coffee_cart", JSON.stringify(state.cart.items));
    });

    return () => unsubscribe();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}