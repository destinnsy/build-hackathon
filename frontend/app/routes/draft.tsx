import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { WarningAlert } from "@/components/WarningAlert";
import { useEvaluateProductPrinciples } from "@/hooks/useEvaluateProductPrinciples";
import ProductPrinciplesMessage from "@/components/ProductPrinciplesMessage";

export default function Draft() {
  const [problemStatement, setProblemStatement] = useState("");
  const { evaluate, showWarning, redFlags, analysis } =
    useEvaluateProductPrinciples(problemStatement);

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">
        Pager, your AI-powered funding proposal editor
      </h1>

      {showWarning && (
        <WarningAlert analysis={analysis!}>
          <ProductPrinciplesMessage redFlags={redFlags} />
        </WarningAlert>
      )}

      <div className="grid gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-blue-500 font-semibold">
              Problem Statement
            </h2>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="bg-purple-500 text-white hover:bg-purple-600"
              >
                Load Example
              </Button>
              <Button variant="destructive">Clear All</Button>
              <Button
                variant="default"
                className="bg-green-500 hover:bg-green-600"
              >
                Copy All
              </Button>
            </div>
          </div>

          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-blue-500">
                    1. What is the problem statement?
                    <br />
                    2. What is the size of the problem statement?
                    <br />
                    3. What is the target audience?
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={evaluate}>
                      Assess Problem Statement
                    </Button>
                    <Button variant="ghost" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
                <Textarea
                  className="min-h-[500px]"
                  placeholder="Placeholder text"
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Remove the old assessment results section since it's now in the warning banner */}
        {analysis && (
          <section className="mt-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">Assessment Results</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Analysis:</h4>
                  <p className="mt-1">{analysis}</p>
                </div>
              </div>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
