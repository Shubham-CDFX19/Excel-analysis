import express from "express";
import cors from "cors";
import * as XLSX from "xlsx";

const app = express();
app.use(cors());


const workbook = XLSX.readFile("./src/data/Intern test - IN funda data ann.xls");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet);

console.log("Parsed Excel data (first 3 rows):", jsonData.slice(0, 3));

// Try to find the correct company column name
function getCompanyColumn(row: any): string | undefined {
  const possibleNames = ["Company", "company", "COMPANY", "Name", "Firm"];
  for (const key of Object.keys(row)) {
    if (possibleNames.includes(key)) return key;
  }
  return undefined;
}

const companies = Array.from(new Set(jsonData.map((row: any) => row["Company name"]))).filter(Boolean);
// Extract unique metric types from the 'Field' column (e.g., SALES, PAT, EBITDA)
const metrics = Array.from(new Set(jsonData.map((row: any) => row.Field))).filter(Boolean);

// API to get companies
app.get("/api/companies", (_, res) => {
  res.json(companies);
});

// API to get metrics
app.get("/api/metrics", (_, res) => {
  res.json(metrics);
});

// API to get chart data

app.get("/api/data", (req, res) => {
  const { company, metric } = req.query;

  if (!company || !metric) {
    return res.status(400).json({ error: "Missing params" });
  }

  // Find all rows for the selected company and metric type
  const rows = jsonData.filter((row: any) => row["Company name"] === company && row.Field === metric);

  // For each row, extract year/value pairs (years are keys except for known columns)
  const knownKeys = ["Company name", "Ticker", "ISIN", "Field"];
  let data: { year: string, value: number }[] = [];
  if (rows.length > 0) {
    const row: any = rows[0];
    Object.keys(row).forEach(key => {
      if (!knownKeys.includes(key)) {
        data.push({ year: key, value: Number(row[key]) });
      }
    });
    // Sort by year ascending
    data.sort((a, b) => a.year.localeCompare(b.year));
  }
  res.json(data);
});

app.listen(4000, () => {
  console.log("✅ Server running at http://localhost:4000");
});
