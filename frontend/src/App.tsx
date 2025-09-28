
import React, { useState } from "react";
import { CompanySelector } from "@/components/CompanySelector";
import { ChartDisplay } from "@/components/ChartDisplay";
import MetricChart from "./components/MetricChart";

import { DataTable } from "@/components/DataTable";
import { CompanyData } from "@/utils/dataParser";


export default function App() {
  const [selectedCompanies, setSelectedCompanies] = useState<CompanyData[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>("revenue");
  const [viewMode, setViewMode] = useState<"chart" | "table" | "both">("both");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg rounded-xl m-6 p-6 flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Company Metrics Dashboard</h1>
        <CompanySelector
          selectedCompanies={selectedCompanies}
          onCompanyChange={setSelectedCompanies}
        />
        {/* Metric Selector */}
        <div>
          <label className="block text-sm font-semibold text-blue-600 mb-1">Metric</label>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="revenue">Revenue</option>
            <option value="ebitda">EBITDA</option>
            <option value="pat">PAT</option>
          </select>
        </div>
        {/* View Mode Toggle */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setViewMode("chart")}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold transition-all duration-150 ${viewMode === "chart" ? "bg-blue-600 text-white shadow" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
          >
            Chart
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold transition-all duration-150 ${viewMode === "table" ? "bg-blue-600 text-white shadow" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode("both")}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold transition-all duration-150 ${viewMode === "both" ? "bg-blue-600 text-white shadow" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
          >
            Both
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-8 p-8">
        {(viewMode === "chart" || viewMode === "both") && (
            <section className="bg-white rounded-xl shadow-lg p-6">
              <ChartDisplay companies={selectedCompanies} metric={selectedMetric} />
            </section>
        )}
        {(viewMode === "table" || viewMode === "both") && (
          <section className="bg-white rounded-xl shadow-lg p-6">
            <DataTable
              data={(() => {
                // Flatten metrics for all selected companies
                const rows: any[] = [];
                selectedCompanies.forEach(company => {
                  company.metrics.forEach(metric => {
                    rows.push({
                      Company: company.name,
                      Ticker: company.ticker,
                      Year: metric.year,
                      Revenue: metric.revenue ?? "-",
                      EBITDA: metric.ebitda ?? "-",
                      PAT: metric.pat ?? "-",
                    });
                  });
                });
                return rows;
              })()}
            />
          </section>
        )}
      </main>
    </div>
  );
}


