"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { brands, technologies, type Product } from "@/data/products";
import { createProduct, updateProduct, type ProductInput } from "@/lib/products";

type ProductFormProps = {
  mode: "create" | "edit";
  initialProduct?: Product;
};

type FormValues = {
  id: string;
  name: string;
  brand: string;
  technology: string;
  shortDescription: string;
  technicalDescription: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getInitialValues(initialProduct?: Product): FormValues {
  if (initialProduct) {
    return {
      id: initialProduct.id,
      name: initialProduct.name,
      brand: initialProduct.brand,
      technology: initialProduct.technology,
      shortDescription: initialProduct.shortDescription,
      technicalDescription: initialProduct.technicalDescription,
    };
  }

  return {
    id: "",
    name: "",
    brand: brands[0],
    technology: technologies[0],
    shortDescription: "",
    technicalDescription: "",
  };
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.id.trim()) {
    errors.id = "El identificador es obligatorio.";
  } else if (!/^[a-z0-9-]+$/.test(values.id.trim())) {
    errors.id =
      "Usá solo minúsculas, números y guiones (ej: mi-producto-100).";
  }

  if (!values.name.trim()) {
    errors.name = "Ingresá el nombre del producto.";
  }

  if (!values.shortDescription.trim()) {
    errors.shortDescription = "Ingresá una descripción corta.";
  }

  if (!values.technicalDescription.trim()) {
    errors.technicalDescription = "Ingresá una descripción técnica.";
  }

  return errors;
}

export function ProductForm({ mode, initialProduct }: ProductFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(
    getInitialValues(initialProduct)
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [idTouched, setIdTouched] = useState(mode === "edit");

  function handleChange(field: keyof FormValues) {
    return (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setValues((prev) => ({
      ...prev,
      name,
      id: idTouched ? prev.id : slugify(name),
    }));
  }

  function handleIdChange(event: ChangeEvent<HTMLInputElement>) {
    setIdTouched(true);
    setValues((prev) => ({ ...prev, id: event.target.value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const input: ProductInput = {
      id: values.id.trim(),
      name: values.name.trim(),
      brand: values.brand,
      technology: values.technology,
      shortDescription: values.shortDescription.trim(),
      technicalDescription: values.technicalDescription.trim(),
    };

    // mode === "edit" siempre viene acompañado de initialProduct (así se
    // invoca este componente en EditProductView), por eso el "!" es seguro.
    const { error } =
      mode === "create"
        ? await createProduct(input)
        : await updateProduct(initialProduct!.id, input);

    if (error) {
      setIsSubmitting(false);
      setFormError(error);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

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
          onChange={handleNameChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.name)}
          className="rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="id" className="text-sm font-medium text-slate-700">
          Identificador (usado en la URL){" "}
          <span className="text-blue-700">*</span>
        </label>
        <input
          id="id"
          name="id"
          type="text"
          value={values.id}
          onChange={handleIdChange}
          disabled={isSubmitting || mode === "edit"}
          aria-invalid={Boolean(errors.id)}
          className="rounded-md border border-slate-300 px-4 py-2 font-mono text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
        />
        {mode === "edit" ? (
          <p className="text-xs text-slate-500">
            El identificador no se puede cambiar una vez creado el producto.
          </p>
        ) : (
          <p className="text-xs text-slate-500">
            Se genera solo a partir del nombre; podés ajustarlo antes de
            guardar.
          </p>
        )}
        {errors.id && <p className="text-sm text-red-600">{errors.id}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="brand"
            className="text-sm font-medium text-slate-700"
          >
            Marca
          </label>
          <select
            id="brand"
            name="brand"
            value={values.brand}
            onChange={handleChange("brand")}
            disabled={isSubmitting}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="technology"
            className="text-sm font-medium text-slate-700"
          >
            Tecnología
          </label>
          <select
            id="technology"
            name="technology"
            value={values.technology}
            onChange={handleChange("technology")}
            disabled={isSubmitting}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
          >
            {technologies.map((technology) => (
              <option key={technology} value={technology}>
                {technology}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="shortDescription"
          className="text-sm font-medium text-slate-700"
        >
          Descripción corta <span className="text-blue-700">*</span>
        </label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          rows={2}
          value={values.shortDescription}
          onChange={handleChange("shortDescription")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.shortDescription)}
          className="resize-none rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
        />
        {errors.shortDescription && (
          <p className="text-sm text-red-600">{errors.shortDescription}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="technicalDescription"
          className="text-sm font-medium text-slate-700"
        >
          Descripción técnica <span className="text-blue-700">*</span>
        </label>
        <textarea
          id="technicalDescription"
          name="technicalDescription"
          rows={5}
          value={values.technicalDescription}
          onChange={handleChange("technicalDescription")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.technicalDescription)}
          className="resize-none rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
        />
        {errors.technicalDescription && (
          <p className="text-sm text-red-600">
            {errors.technicalDescription}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isSubmitting
          ? "Guardando..."
          : mode === "create"
            ? "Crear producto"
            : "Guardar cambios"}
      </button>

      {formError && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {formError}
        </p>
      )}
    </form>
  );
}
