"use client";

import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "telesev_cookie_consent";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function hasStoredConsent() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return true;
  }
}

// En el servidor (y en el primer render del cliente, antes de hidratar)
// asumimos que ya hay consentimiento para no mostrar nada; React vuelve a
// consultar el valor real apenas termina de hidratar, sin desajustes.
function getServerSnapshot() {
  return true;
}

export function CookieConsent() {
  const storedConsent = useSyncExternalStore(
    subscribe,
    hasStoredConsent,
    getServerSnapshot
  );
  const [dismissed, setDismissed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const isVisible = !storedConsent && !dismissed;

  function handleAccept() {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ status: "accepted", date: new Date().toISOString() })
      );
    } catch {
      // No hay nada más que hacer si no se puede guardar en este navegador.
    }
    setDismissed(true);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-4px_12px_rgba(15,23,42,0.08)] backdrop-blur sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600">
          <p>
            Usamos únicamente cookies esenciales, necesarias para mantener la
            sesión del panel administrativo de Telesev Group. No usamos
            cookies de análisis, publicidad ni rastreo.
          </p>
          {showInfo ? (
            <p className="mt-2 text-slate-500">
              Estas cookies no recopilan datos personales con fines
              comerciales: son imprescindibles para que el panel admin
              funcione correctamente, por lo que no requieren una opción de
              rechazo.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setShowInfo(true)}
              className="mt-1 text-sm font-medium text-blue-700 hover:underline"
            >
              Más información
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleAccept}
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 sm:self-center"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
