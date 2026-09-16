"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/data/products";

type QuoteFormProps = {
  initialProduct: Product | null;
  products: Product[];
};

type FormValues = {
  name: string;
  email: string;
  company: string;
  quantity: string;
  details: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  quantity: "",
  details: "",
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

  if (values.quantity.trim()) {
    const quantityNumber = Number(values.quantity);
    if (!Number.isInteger(quantityNumber) || quantityNumber <= 0) {
      errors.quantity = "La cantidad debe ser un número entero mayor a 0.";
    }
  }

  return errors;
}

export function QuoteForm({ initialProduct, products }: QuoteFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProduct?.id ?? ""
  );

  const selectedProduct = initialProduct
    ? initialProduct
    : (products.find((product) => product.id === selectedProductId) ?? null);

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

    const { error } = await supabase.from("quotes").insert({
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim() || null,
      product_id: selectedProduct?.id ?? null,
      product_name: selectedProduct?.name ?? null,
      quantity: values.quantity.trim() ? Number(values.quantity) : null,
      details: values.details.trim() || null,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setValues(initialValues);
    setErrors({});
    if (!initialProduct) {
      setSelectedProductId("");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {initialProduct ? (
        <div className="rounded-md border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-blue-700">
            Producto seleccionado
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {initialProduct.name}
          </p>
          <p className="text-xs text-slate-600">
            {initialProduct.brand} · {initialProduct.technologies.join(", ")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="product"
            className="text-sm font-medium text-slate-700"
          >
            Producto (opcional)
          </label>
          <select
            id="product"
            name="product"
            value={selectedProductId}
            onChange={(event) => setSelectedProductId(event.target.value)}
            disabled={isSubmitting}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
          >
            <option value="">
              Cotización general (sin producto específico)
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      )}

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
          htmlFor="quantity"
          className="text-sm font-medium text-slate-700"
        >
          Cantidad estimada
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          step={1}
          value={values.quantity}
          onChange={handleChange("quantity")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.quantity)}
          className="rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 sm:max-w-[160px]"
        />
        {errors.quantity && (
          <p className="text-sm text-red-600">{errors.quantity}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="details"
          className="text-sm font-medium text-slate-700"
        >
          Detalles
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          value={values.details}
          onChange={handleChange("details")}
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
          ¡Gracias! Recibimos tu solicitud de cotización. Te vamos a
          contactar a la brevedad.
        </p>
      )}

      {status === "error" && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          No pudimos enviar tu solicitud. Por favor, intentá nuevamente en
          unos minutos.
        </p>
      )}
    </form>
  );
}
