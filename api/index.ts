import express from "express";
import cors from "cors";
import * as XLSX from "xlsx";

const app = express();
app.use(cors());

const workbook = XLSX.readFile("./server/src/data/Intern test - IN funda data ann.xls");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet);

console.log("Parsed Excel data (first 3 rows):", jsonData.slice(0, 3));

function getCompanyColumn(row: any): string | undefined {
  const possibleNames = ["Company", "company", "COMPANY", "Name", "Firm"];
  for (const key of Object.keys(row)) {
    if (possibleNames.includes(key)) return key;
  }
  return undefined;
}

const companies = Array.from(new Set(jsonData.map((row: any) => row["Company name"]))).filter(Boolean);
const metrics = Array.from(new Set(jsonData.map((row: any) => row.Field))).filter(Boolean);

app.get("/api/companies", (_, res) => {
  res.json(companies);
});

app.get("/api/metrics", (_, res) => {
  res.json(metrics);
});

app.get("/api/data", (req, res) => {
  const { company, metric } = req.query;

  if (!company || !metric) {
    return res.status(400).json({ error: "Missing params" });
  }

  const rows = jsonData.filter((row: any) => row["Company name"] === company && row.Field === metric);

  const knownKeys = ["Company name", "Ticker", "ISIN", "Field"];
  let data: { year: string, value: number }[] = [];
  if (rows.length > 0) {
    const row: any = rows[0];
    Object.keys(row).forEach(key => {
      if (!knownKeys.includes(key)) {
        data.push({ year: key, value: Number(row[key]) });
      }
    });
  }
  res.json(data);
});

export default app;
