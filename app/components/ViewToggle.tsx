export type ViewMode = "grid" | "list";

type ViewToggleProps = {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
};

function GridIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="6" height="6" rx="1" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1" />
      <rect x="11.5" y="11.5" width="6" height="6" rx="1" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="2.5" y="3.5" width="15" height="3.5" rx="1" />
      <rect x="2.5" y="8.5" width="15" height="3.5" rx="1" />
      <rect x="2.5" y="13.5" width="15" height="3.5" rx="1" />
    </svg>
  );
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-md border border-slate-300 bg-white p-0.5">
      <button
        type="button"
        onClick={() => onChange("grid")}
        aria-pressed={value === "grid"}
        aria-label="Vista de cuadrícula"
        title="Vista de cuadrícula"
        className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
          value === "grid"
            ? "bg-blue-700 text-white"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        }`}
      >
        <GridIcon />
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        aria-pressed={value === "list"}
        aria-label="Vista de lista"
        title="Vista de lista"
        className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
          value === "list"
            ? "bg-blue-700 text-white"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        }`}
      >
        <ListIcon />
      </button>
    </div>
  );
}
