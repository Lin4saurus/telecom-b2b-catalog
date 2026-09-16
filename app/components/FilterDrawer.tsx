"use client";

import { SelectField } from "./SelectField";
import { SORT_OPTIONS, type FilterControlsProps, type SortOption } from "./FilterBar";

type FilterDrawerProps = FilterControlsProps & {
  isOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
  activeCount: number;
};

export function FilterDrawer({
  categoryOptions,
  category,
  onCategoryChange,
  brandOptions,
  brand,
  onBrandChange,
  technologyOptions,
  technology,
  onTechnologyChange,
  statusOptions,
  status,
  onStatusChange,
  sort,
  onSortChange,
  isOpen,
  onClose,
  onClearAll,
  activeCount,
}: FilterDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Cerrar filtros"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50"
      />

      <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Filtros{activeCount > 0 ? ` (${activeCount})` : ""}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-4">
          <SelectField
            label="Categoría"
            options={categoryOptions}
            value={category}
            onChange={onCategoryChange}
          />
          <SelectField
            label="Marca"
            options={brandOptions}
            value={brand}
            onChange={onBrandChange}
          />
          <SelectField
            label="Tecnología"
            options={technologyOptions}
            value={technology}
            onChange={onTechnologyChange}
          />
          <SelectField
            label="Disponibilidad"
            options={statusOptions}
            value={status}
            onChange={onStatusChange}
          />
          <SelectField
            label="Ordenar por"
            options={SORT_OPTIONS}
            value={sort}
            onChange={(value) => onSortChange(value as SortOption)}
          />
        </div>

        <div className="flex gap-3 border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={onClearAll}
            className="flex-1 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Limpiar filtros
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}
