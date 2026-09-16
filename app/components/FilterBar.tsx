import { SelectField, type SelectOption } from "./SelectField";

export type SortOption = "name-asc" | "name-desc" | "availability";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name-asc", label: "Nombre (A-Z)" },
  { value: "name-desc", label: "Nombre (Z-A)" },
  { value: "availability", label: "Disponibilidad primero" },
];

export type FilterControlsProps = {
  categoryOptions: SelectOption[];
  category: string;
  onCategoryChange: (value: string) => void;
  brandOptions: SelectOption[];
  brand: string;
  onBrandChange: (value: string) => void;
  technologyOptions: SelectOption[];
  technology: string;
  onTechnologyChange: (value: string) => void;
  statusOptions: SelectOption[];
  status: string;
  onStatusChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
};

type FilterBarProps = FilterControlsProps & {
  activeCount: number;
  onOpenDrawer: () => void;
};

export function FilterBar({
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
  activeCount,
  onOpenDrawer,
}: FilterBarProps) {
  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={onOpenDrawer}
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 md:hidden"
      >
        Filtros{activeCount > 0 ? ` (${activeCount})` : ""}
      </button>

      <div className="hidden flex-wrap items-end gap-4 md:flex">
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
          className="ml-auto"
        />
      </div>
    </div>
  );
}
