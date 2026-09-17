"use client";

import { useSyncExternalStore } from "react";
import {
  addQuoteCartItem,
  clearQuoteCart,
  getQuoteCartServerSnapshot,
  getQuoteCartSnapshot,
  removeQuoteCartItem,
  subscribeToQuoteCart,
  updateQuoteCartItemQuantity,
} from "./quoteCart";

export function useQuoteCart() {
  const items = useSyncExternalStore(
    subscribeToQuoteCart,
    getQuoteCartSnapshot,
    getQuoteCartServerSnapshot
  );

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    totalCount,
    addItem: addQuoteCartItem,
    updateQuantity: updateQuoteCartItemQuantity,
    removeItem: removeQuoteCartItem,
    clear: clearQuoteCart,
  };
}
