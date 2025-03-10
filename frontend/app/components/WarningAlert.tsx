import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface WarningAlertProps {
  children: React.ReactNode;
  analysis?: string;
}

export function WarningAlert({ children, analysis = "" }: WarningAlertProps) {
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

  return (
    <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative mb-4">
      <div className="font-bold mb-2">Warning!</div>
      {children}
      {analysis && (
        <Collapsible open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen}>
          <CollapsibleTrigger className="flex items-center font-medium hover:text-orange-800">
            Click here to view or hide the analysis
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 pl-4">
            {analysis}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
