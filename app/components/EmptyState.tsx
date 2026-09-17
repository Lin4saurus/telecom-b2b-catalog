import Link from "next/link";

export type EmptyStateAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type EmptyStateProps = {
  title: string;
  description: string;
  actions?: EmptyStateAction[];
};

function SearchOffIcon() {
  return (
    <svg
      className="mx-auto h-10 w-10 text-slate-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6.5" strokeLinecap="round" />
      <path strokeLinecap="round" d="m20 20-4.3-4.3" />
      <path strokeLinecap="round" d="M8 8l5 5m0-5-5 5" />
    </svg>
  );
}

export function EmptyState({ title, description, actions }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-6 py-14 text-center">
      <SearchOffIcon />
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
        {description}
      </p>

      {actions && actions.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actions.map((action) =>
            action.href ? (
              <Link
                key={action.label}
                href={action.href}
                className="inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                {action.label}
              </Link>
            ) : (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                {action.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
