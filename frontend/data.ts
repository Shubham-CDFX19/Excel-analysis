// src/utils/dataParser.ts
import * as XLSX from "xlsx";

export interface CompanyData {
  name: string;
  ticker: string;
  metrics: {
    year: number;
    revenue: number;
    ebitda: number;
    pat: number;
  }[];
}

export const METRICS = [
  { key: "revenue", label: "Revenue" },
  { key: "ebitda", label: "EBITDA" },
  { key: "pat", label: "PAT" },
];

// Function to parse Excel file into CompanyData[]
export async function parseExcel(file: File): Promise<CompanyData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        // Assume first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

        // Parse headers (first row = Year)
        const headers = jsonData[0]; // ["Year", "Company", "Revenue", "EBITDA", "PAT"]
        const rows = jsonData.slice(1);

        // Group by company
        const companyMap: { [name: string]: CompanyData } = {};

        rows.forEach((row) => {
          const [year, company, revenue, ebitda, pat] = row;

          if (!companyMap[company]) {
            companyMap[company] = {
              name: company,
              ticker: company.toUpperCase().slice(0, 4),
              metrics: [],
            };
          }

          companyMap[company].metrics.push({
            year: Number(year),
            revenue: Number(revenue),
            ebitda: Number(ebitda),
            pat: Number(pat),
          });
        });

        resolve(Object.values(companyMap));
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
