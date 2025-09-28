import { Header } from "./components/Header";
import { BarChart3 } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-md">
          <BarChart3 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Excel Viz Hero</h1>
          <p className="text-sm text-gray-500">Interactive Excel-driven charts</p>
        </div>
      </div>
    </header>
  );
}
