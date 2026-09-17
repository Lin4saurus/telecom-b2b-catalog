"use client";

import { useState, type ReactNode } from "react";

export type ProductTab = {
  id: string;
  label: string;
  content: ReactNode;
};

export function ProductTabs({ tabs }: { tabs: ProductTab[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id}
            className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-blue-700 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-6">{activeContent}</div>
    </div>
  );
}
