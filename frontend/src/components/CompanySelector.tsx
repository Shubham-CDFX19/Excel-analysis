import { COMPANIES, CompanyData } from "@/utils/dataParser";

interface CompanySelectorProps {
  selectedCompanies: CompanyData[];
  onCompanyChange: (companies: CompanyData[]) => void;
}

export function CompanySelector({ selectedCompanies, onCompanyChange }: CompanySelectorProps) {
  const toggleCompany = (company: CompanyData) => {
    const alreadySelected = selectedCompanies.some(c => c.ticker === company.ticker);
    if (alreadySelected) {
      onCompanyChange(selectedCompanies.filter(c => c.ticker !== company.ticker));
    } else {
      onCompanyChange([...selectedCompanies, company]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-base font-semibold text-blue-600 mb-2">Companies</label>
      <div className="grid grid-cols-1 gap-2">
        {COMPANIES.map((company) => (
          <label
            key={company.ticker}
            className={`flex items-center gap-3 p-3 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-all duration-150 shadow-sm ${selectedCompanies.some(c => c.ticker === company.ticker) ? 'ring-2 ring-blue-400' : ''}`}
          >
            <input
              type="checkbox"
              checked={selectedCompanies.some(c => c.ticker === company.ticker)}
              onChange={() => toggleCompany(company)}
              className="accent-blue-600 w-5 h-5 rounded focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-base font-medium text-blue-900">{company.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
