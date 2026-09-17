"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/data/products";
import { useQuoteCart } from "@/lib/useQuoteCart";
import { QuoteCart } from "./QuoteCart";

type QuoteFormProps = {
  initialProduct: Product | null;
};

type FormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  city: string;
  projectType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  country: "",
  city: "",
  projectType: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Ingresá tu nombre.";
  }

  if (!values.email.trim()) {
    errors.email = "Ingresá tu email.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Ingresá un email válido.";
  }

  return errors;
}

export function QuoteForm({ initialProduct }: QuoteFormProps) {
  const { items, addItem, clear } = useQuoteCart();
  const hasSeededInitialProduct = useRef(false);

  useEffect(() => {
    if (initialProduct && !hasSeededInitialProduct.current) {
      hasSeededInitialProduct.current = true;
      addItem(initialProduct, 1);
    }
  }, [initialProduct, addItem]);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(field: keyof FormValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    // Generamos el id en el cliente (en vez de pedirlo de vuelta con
    // .select() tras el insert) porque la política de "quotes" solo permite
    // SELECT a usuarios autenticados: pedir la fila insertada de vuelta
    // exige permiso de lectura vía RLS y el insert público quedaría
    // rechazado, aunque el insert en sí sea válido.
    const quoteId = crypto.randomUUID();

    const { error: quoteError } = await supabase.from("quotes").insert({
      id: quoteId,
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim() || null,
      phone: values.phone.trim() || null,
      country: values.country.trim() || null,
      city: values.city.trim() || null,
      project_type: values.projectType.trim() || null,
      details: values.message.trim() || null,
    });

    if (quoteError) {
      setStatus("error");
      return;
    }

    if (items.length > 0) {
      const { error: itemsError } = await supabase.from("quote_items").insert(
        items.map((item) => ({
          quote_id: quoteId,
          product_id: item.productId,
          product_name: item.name,
          quantity: item.quantity,
        }))
      );

      if (itemsError) {
        setStatus("error");
        return;
      }
    }

    setStatus("success");
    setValues(initialValues);
    setErrors({});
    clear();
  }

  const isSubmitting = status === "submitting";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Tu solicitud
        </h2>
        <QuoteCart />
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Nombre <span className="text-blue-700">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange("name")}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.name)}
            className="rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email <span className="text-blue-700">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            className="rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="company"
              className="text-sm font-medium text-slate-700"
            >
              Empresa
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={values.company}
              onChange={handleChange("company")}
              disabled={isSubmitting}
              className="rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-slate-700"
            >
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange("phone")}
              disabled={isSubmitting}
              className="rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="country"
              className="text-sm font-medium text-slate-700"
            >
              País
            </label>
            <input
              id="country"
              name="country"
              type="text"
              value={values.country}
              onChange={handleChange("country")}
              disabled={isSubmitting}
              className="rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="city" className="text-sm font-medium text-slate-700">
              Ciudad
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={values.city}
              onChange={handleChange("city")}
              disabled={isSubmitting}
              className="rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="projectType"
            className="text-sm font-medium text-slate-700"
          >
            Tipo de proyecto
          </label>
          <input
            id="projectType"
            name="projectType"
            type="text"
            placeholder="Ej: instalación nueva, ampliación, mantenimiento..."
            value={values.projectType}
            onChange={handleChange("projectType")}
            disabled={isSubmitting}
            className="rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="message"
            className="text-sm font-medium text-slate-700"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange("message")}
            disabled={isSubmitting}
            className="resize-none rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isSubmitting ? "Enviando..." : "Solicitar cotización"}
        </button>

        {status === "success" && (
          <p className="rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            Recibimos tu solicitud, nuestro equipo comercial se pondrá en
            contacto a la brevedad.
          </p>
        )}

        {status === "error" && (
          <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            No pudimos enviar tu solicitud. Por favor, intentá nuevamente en
            unos minutos.
          </p>
        )}
      </form>
    </div>
  );
}
