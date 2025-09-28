import React from "react";

export interface DataTableProps {
  data: any[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="p-4">No data available.</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-xl overflow-hidden shadow border border-blue-200">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-6 py-3 bg-blue-100 text-blue-800 text-left text-base font-semibold border-b">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-blue-50 hover:bg-blue-100 transition-all duration-100"}>
              {columns.map((col) => (
                <td key={col} className="px-6 py-3 border-b text-base text-blue-900">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
