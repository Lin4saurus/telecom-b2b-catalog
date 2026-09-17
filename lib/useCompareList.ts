"use client";

import { useSyncExternalStore } from "react";
import {
  MAX_COMPARE_ITEMS,
  clearCompareList,
  getCompareListServerSnapshot,
  getCompareListSnapshot,
  removeCompareItem,
  subscribeToCompareList,
  toggleCompareItem,
} from "./compareList";

export function useCompareList() {
  const items = useSyncExternalStore(
    subscribeToCompareList,
    getCompareListSnapshot,
    getCompareListServerSnapshot
  );

  return {
    items,
    count: items.length,
    isFull: items.length >= MAX_COMPARE_ITEMS,
    isSelected: (productId: string) =>
      items.some((item) => item.productId === productId),
    toggle: toggleCompareItem,
    remove: removeCompareItem,
    clear: clearCompareList,
  };
}
