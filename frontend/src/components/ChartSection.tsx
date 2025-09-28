import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { CompanyData } from "@/utils/dataParser";

interface ChartSectionProps {
  company: CompanyData | null;
  metric: string | null;
}

export function ChartSection({ company, metric }: ChartSectionProps) {
  if (!company || !metric) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        Select company & metric to see the chart
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">
        {company.name} — {metric.toUpperCase()}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={company.metrics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={metric}
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
