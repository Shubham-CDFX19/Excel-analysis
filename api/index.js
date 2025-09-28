const express = require("express");
const cors = require("cors");
const XLSX = require("xlsx");
const path = require("path");

const app = express();
app.use(cors());

// Use path.resolve for serverless compatibility
const excelPath = path.resolve(__dirname, "data", "Intern test - IN funda data ann.xls");

let jsonData = [];
let companies = [];
let metrics = [];

try {
  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  jsonData = XLSX.utils.sheet_to_json(sheet);

  companies = Array.from(new Set(jsonData.map(row => row["Company name"]))).filter(Boolean);
  metrics = Array.from(new Set(jsonData.map(row => row.Field))).filter(Boolean);

  console.log("Parsed Excel data (first 3 rows):", jsonData.slice(0, 3));
} catch (error) {
  console.error("Error reading Excel file:", error);
}

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

  const rows = jsonData.filter(row => row["Company name"] === company && row.Field === metric);

  const knownKeys = ["Company name", "Ticker", "ISIN", "Field"];
  let data = [];
  if (rows.length > 0) {
    const row = rows[0];
    Object.keys(row).forEach(key => {
      if (!knownKeys.includes(key)) {
        data.push({ year: key, value: Number(row[key]) });
      }
    });
  }
  res.json(data);
});

module.exports = app;
