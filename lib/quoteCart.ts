import type { Product } from "@/data/products";

export type QuoteCartItem = {
  productId: string;
  name: string;
  brand: string;
  sku?: string;
  image?: string;
  quantity: number;
};

const STORAGE_KEY = "telesev_quote_cart";

type Listener = () => void;
const listeners = new Set<Listener>();

let cachedSnapshot: QuoteCartItem[] = [];
let hasReadFromStorage = false;

function isBrowser() {
  return typeof window !== "undefined";
}

function readFromStorage(): QuoteCartItem[] {
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

function writeToStorage(items: QuoteCartItem[]) {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Si el navegador bloquea localStorage (modo privado, cuota llena),
    // el carrito sigue funcionando en memoria durante la sesión actual.
  }
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function setItems(items: QuoteCartItem[]) {
  cachedSnapshot = items;
  writeToStorage(items);
  emitChange();
}

export function subscribeToQuoteCart(listener: Listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

// Snapshot para el cliente: la primera vez que se pide, se lee localStorage
// una única vez y se cachea; los cambios posteriores pasan siempre por
// setItems (addItem/updateQuantity/removeItem/clear), que actualiza el
// caché y notifica a los suscriptores.
export function getQuoteCartSnapshot(): QuoteCartItem[] {
  if (!hasReadFromStorage) {
    cachedSnapshot = readFromStorage();
    hasReadFromStorage = true;
  }
  return cachedSnapshot;
}

const EMPTY_QUOTE_CART: QuoteCartItem[] = [];

export function getQuoteCartServerSnapshot(): QuoteCartItem[] {
  return EMPTY_QUOTE_CART;
}

export function addQuoteCartItem(product: Product, quantity = 1) {
  const current = getQuoteCartSnapshot();
  const existingIndex = current.findIndex(
    (item) => item.productId === product.id
  );

  if (existingIndex >= 0) {
    const next = current.slice();
    next[existingIndex] = {
      ...next[existingIndex],
      quantity: next[existingIndex].quantity + quantity,
    };
    setItems(next);
    return;
  }

  const newItem: QuoteCartItem = {
    productId: product.id,
    name: product.name,
    brand: product.brand,
    sku: product.sku,
    image: product.image,
    quantity,
  };
  setItems([...current, newItem]);
}

export function updateQuoteCartItemQuantity(
  productId: string,
  quantity: number
) {
  const current = getQuoteCartSnapshot();

  if (!Number.isFinite(quantity) || quantity <= 0) {
    setItems(current.filter((item) => item.productId !== productId));
    return;
  }

  setItems(
    current.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    )
  );
}

export function removeQuoteCartItem(productId: string) {
  const current = getQuoteCartSnapshot();
  setItems(current.filter((item) => item.productId !== productId));
}

export function clearQuoteCart() {
  setItems([]);
}
