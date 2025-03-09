import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { WarningAlert } from "@/components/WarningAlert";
import { useEvaluateSuccessMetrics } from "@/hooks/useEvaluateSuccessMetrics";
import SuccessMetricsMessage from "@/components/SuccessMetricsMessage";

interface SuccessMetricsProps {
  problemStatement: string;
}

export function SuccessMetrics({ problemStatement }: SuccessMetricsProps) {
  const [metricsStatement, setMetricsStatement] = useState("");

  const {
    evaluate: evaluateMetrics,
    showWarning,
    redFlags,
    analysis,
    isLoading,
  } = useEvaluateSuccessMetrics(metricsStatement, problemStatement);

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="flex-1">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-blue-500 font-semibold">
              Success Metrics
            </h2>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="bg-purple-500 text-white hover:bg-purple-600"
              >
                Load Example
              </Button>
            </div>
          </div>

          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-blue-500">
                    1. What is your success metrics?
                    <br />
                    2. What is your north star?
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
                <Textarea
                  className="min-h-[500px]"
                  placeholder="Describe your success metrics and north star metric..."
                  value={metricsStatement}
                  onChange={(e) => setMetricsStatement(e.target.value)}
                />
              </div>
            </div>
          </Card>
        </section>
      </div>

      <div className="w-[400px]">
        <Card className="p-4 sticky top-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-blue-500 font-semibold">Analysis</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={evaluateMetrics}
              disabled={isLoading}
            >
              {isLoading ? "Assessing..." : "Assess Metrics"}
            </Button>
          </div>
          <div className="space-y-4">
            {analysis && showWarning && (
              <WarningAlert analysis={analysis}>
                <SuccessMetricsMessage redFlags={redFlags} />
              </WarningAlert>
            )}

            {!showWarning && (
              <p className="text-gray-500 text-center">
                Click "Assess Metrics" to analyze your input
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
