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
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
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
