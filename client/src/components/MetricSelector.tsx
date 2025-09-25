import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, TrendingUp } from "lucide-react";
import { METRICS } from "@/utils/dataParser";

interface MetricSelectorProps {
  selectedMetric: string | null;
  onMetricChange: (metric: string) => void;
}

export function MetricSelector({ selectedMetric, onMetricChange }: MetricSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedMetricData = METRICS.find(m => m.key === selectedMetric);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Metric</label>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-card hover:bg-muted/50 border-border"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              {selectedMetricData ? selectedMetricData.label : "Select Metric"}
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]" align="start">
          {METRICS.map((metric) => (
            <DropdownMenuItem
              key={metric.key}
              onClick={() => {
                onMetricChange(metric.key);
                setIsOpen(false);
              }}
              className="flex items-center justify-between py-3"
            >
              <div className="font-medium">{metric.label}</div>
              {selectedMetric === metric.key && (
                <div className="h-2 w-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
