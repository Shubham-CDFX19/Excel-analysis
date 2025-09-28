import React from "react";

type Props = {
  companies: string[];
  metrics: string[];
  selectedCompanies: string[];
  selectedMetric: string | null;
  onToggleCompany: (c: string) => void;
  onSelectMetric: (m: string) => void;
};

export default function SelectorPanel({
  companies,
  metrics,
  selectedCompanies,
  selectedMetric,
  onToggleCompany,
  onSelectMetric,
}: Props) {
  return (
    <aside className="p-4 bg-white shadow-md rounded-lg w-64">
      <h3 className="text-lg font-semibold mb-2">Companies</h3>
      <div className="flex flex-col gap-2 mb-6">
        {companies.map((c) => (
          <button
            key={c}
            onClick={() => onToggleCompany(c)}
            className={`px-3 py-2 rounded-md border transition ${
              selectedCompanies.includes(c)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-2">Metric</h3>
      <div className="flex flex-col gap-2">
        {metrics.map((m) => (
          <button
            key={m}
            onClick={() => onSelectMetric(m)}
            className={`px-3 py-2 rounded-md border transition ${
              m === selectedMetric
                ? "bg-green-600 text-white border-green-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>
    </aside>
  );
}
