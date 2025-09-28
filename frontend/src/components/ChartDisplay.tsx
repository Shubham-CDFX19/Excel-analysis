import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { CompanyData } from "@/utils/dataParser";
import * as XLSX from "xlsx";

interface ChartDisplayProps {
  companies: CompanyData[];
  metric: string;
}

export function ChartDisplay({ companies, metric }: ChartDisplayProps) {

  if (!companies.length) return <p>Select at least one company to view chart.</p>;

  // Prepare data for chart based on selected metric
  // Assume all companies have the same years in metrics
  const allData = companies[0].metrics.map((m, idx) => {
    const entry: any = { year: m.year };
    companies.forEach(c => {
  entry[c.ticker] = c.metrics[idx][metric as keyof CompanyData['metrics'][number]];
    });
    return entry;
  });

    // Assign a color for each company (stable across renders)
    const companyColors: Record<string, string> = {};
    companies.forEach((c, i) => {
      // Use a fixed palette or generate color
      const palette = ["#2563eb", "#eab308", "#10b981", "#ef4444", "#a21caf", "#f59e42", "#14b8a6", "#f43f5e"];
      companyColors[c.ticker] = palette[i % palette.length];
    });
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(allData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "companies_data.xlsx");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-blue-700">Comparison Chart</h2>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow transition-all duration-150"
        >
          Export to Excel
        </button>
      </div>
        {/* Color indication box for each company */}
        <div className="flex flex-wrap gap-4 mb-4">
          {companies.map(c => (
            <div key={c.ticker} className="flex items-center gap-2">
              <span style={{background: companyColors[c.ticker], width: 20, height: 20, borderRadius: 4, display: 'inline-block', border: '2px solid #e5e7eb'}}></span>
              <span className="font-semibold text-gray-700">{c.name} ({c.ticker})</span>
            </div>
          ))}
        </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={allData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{fontSize: 16, fill: '#2563eb'}} />
            <YAxis tick={{fontSize: 16, fill: '#2563eb'}} />
            <Tooltip wrapperStyle={{fontSize: 16}} />
            {companies.map(c => (
              <Line
                key={c.ticker}
                type="monotone"
                dataKey={c.ticker}
                  stroke={companyColors[c.ticker]}
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
