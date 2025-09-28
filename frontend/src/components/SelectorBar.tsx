import { CompanySelector } from "./CompanySelector";
import { MetricSelector } from "./MetricSelector";
import { CompanyData } from "@/utils/dataParser";

interface SelectorBarProps {
  companies: CompanyData[];
  selectedCompany: CompanyData | null;
  onCompanyChange: (c: CompanyData) => void;
  selectedMetric: string | null;
  onMetricChange: (m: string) => void;
}

export function SelectorBar({
  companies,
  selectedCompany,
  onCompanyChange,
  selectedMetric,
  onMetricChange,
}: SelectorBarProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <CompanySelector
          companies={companies}
          selectedCompany={selectedCompany}
          onCompanyChange={onCompanyChange}
        />
      </div>
      <div className="flex-1">
        <MetricSelector
          selectedMetric={selectedMetric}
          onMetricChange={onMetricChange}
        />
      </div>
    </div>
  );
}
