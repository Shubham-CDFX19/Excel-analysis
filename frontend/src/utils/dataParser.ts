export interface CompanyData {
  name: string;
  ticker: string;
  metrics: { year: string; revenue?: number; ebitda?: number; pat?: number }[];
}

export const METRICS = [
  { key: "revenue", label: "Revenue" },
  { key: "ebitda", label: "EBITDA" },
  { key: "pat", label: "PAT" },
];

// Example mock data for development
export const COMPANIES: CompanyData[] = [
  {
    name: "TCS",
    ticker: "TCS",
    metrics: [
      { year: "2021", revenue: 100, ebitda: 30, pat: 20 },
      { year: "2022", revenue: 120, ebitda: 35, pat: 25 },
      { year: "2023", revenue: 140, ebitda: 40, pat: 30 },
    ],
  },
  {
    name: "Infosys",
    ticker: "INFY",
    metrics: [
      { year: "2021", revenue: 90, ebitda: 28, pat: 18 },
      { year: "2022", revenue: 110, ebitda: 32, pat: 22 },
      { year: "2023", revenue: 130, ebitda: 38, pat: 28 },
    ],
  },
  {
    name: "Wipro",
    ticker: "WIPRO",
    metrics: [
      { year: "2021", revenue: 80, ebitda: 25, pat: 15 },
      { year: "2022", revenue: 95, ebitda: 28, pat: 18 },
      { year: "2023", revenue: 110, ebitda: 32, pat: 22 },
    ],
  },
  {
    name: "HCL Tech",
    ticker: "HCLT",
    metrics: [
      { year: "2021", revenue: 85, ebitda: 27, pat: 17 },
      { year: "2022", revenue: 100, ebitda: 30, pat: 20 },
      { year: "2023", revenue: 120, ebitda: 36, pat: 26 },
    ],
  },
  {
    name: "Tech Mahindra",
    ticker: "TECHM",
    metrics: [
      { year: "2021", revenue: 70, ebitda: 20, pat: 12 },
      { year: "2022", revenue: 85, ebitda: 24, pat: 16 },
      { year: "2023", revenue: 100, ebitda: 29, pat: 20 },
    ],
  },
];

// Dummy parseExcel function for compatibility
export async function parseExcel(file: File): Promise<CompanyData[]> {
  // In production, fetch from backend API
  return COMPANIES;
}
