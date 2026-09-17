import type { Product } from "@/data/products";

export type CompareItem = {
  productId: string;
  name: string;
  brand: string;
  sku?: string;
  image?: string;
};

export const MAX_COMPARE_ITEMS = 4;

const STORAGE_KEY = "telesev_compare_list";

type Listener = () => void;
const listeners = new Set<Listener>();

let cachedSnapshot: CompareItem[] = [];
let hasReadFromStorage = false;

const EMPTY_COMPARE_LIST: CompareItem[] = [];

function isBrowser() {
  return typeof window !== "undefined";
}

function readFromStorage(): CompareItem[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeToStorage(items: CompareItem[]) {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Si el navegador bloquea localStorage, la comparación sigue
    // funcionando en memoria durante la sesión actual.
  }
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function setItems(items: CompareItem[]) {
  cachedSnapshot = items;
  writeToStorage(items);
  emitChange();
}

export function subscribeToCompareList(listener: Listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function getCompareListSnapshot(): CompareItem[] {
  if (!hasReadFromStorage) {
    cachedSnapshot = readFromStorage();
    hasReadFromStorage = true;
  }
  return cachedSnapshot;
}

// Igual criterio que el carrito de cotización (M26): en el servidor y en el
// primer render del cliente asumimos una lista vacía, y React vuelve a
// consultar el valor real apenas termina de hidratar, sin desajustes.
export function getCompareListServerSnapshot(): CompareItem[] {
  return EMPTY_COMPARE_LIST;
}

export type CompareToggleResult = {
  added: boolean;
  reason?: "limit";
};

export function addCompareItem(product: Product): CompareToggleResult {
  const current = getCompareListSnapshot();

  if (current.some((item) => item.productId === product.id)) {
    return { added: true };
  }

  if (current.length >= MAX_COMPARE_ITEMS) {
    return { added: false, reason: "limit" };
  }

  const newItem: CompareItem = {
    productId: product.id,
    name: product.name,
    brand: product.brand,
    sku: product.sku,
    image: product.image,
  };
  setItems([...current, newItem]);
  return { added: true };
}

export function removeCompareItem(productId: string) {
  const current = getCompareListSnapshot();
  setItems(current.filter((item) => item.productId !== productId));
}

export function toggleCompareItem(product: Product): CompareToggleResult {
  const current = getCompareListSnapshot();
  const exists = current.some((item) => item.productId === product.id);

  if (exists) {
    removeCompareItem(product.id);
    return { added: false };
  }

  return addCompareItem(product);
}

export function clearCompareList() {
  setItems([]);
}
