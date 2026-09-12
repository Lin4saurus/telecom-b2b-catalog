"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type FormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
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

  if (!values.message.trim()) {
    errors.message = "Contanos brevemente tu consulta.";
  }

  return errors;
}

export function ContactForm() {
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

    const { error } = await supabase.from("contacts").insert({
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim() || null,
      message: values.message.trim(),
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setValues(initialValues);
    setErrors({});
  }

  const isSubmitting = status === "submitting";

  return (
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
          htmlFor="message"
          className="text-sm font-medium text-slate-700"
        >
          Mensaje <span className="text-blue-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange("message")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          className="resize-none rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
        />
        {errors.message && (
          <p className="text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>

      {status === "success" && (
        <p className="rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          ¡Gracias! Tu mensaje fue enviado correctamente. Te vamos a
          contactar a la brevedad.
        </p>
      )}

      {status === "error" && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          No pudimos enviar tu mensaje. Por favor, intentá nuevamente en unos
          minutos.
        </p>
      )}
    </form>
  );
}
