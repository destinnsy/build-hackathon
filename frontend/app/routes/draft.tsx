import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { WarningAlert } from "@/components/WarningAlert";
import { useEvaluateProductPrinciples } from "@/hooks/useEvaluateProductPrinciples";
import ProductPrinciplesMessage from "@/components/ProductPrinciplesMessage";
import { useEvaluateTargetAudience } from "@/hooks/useEvaluateTargetAudience";
import TargetAudienceMessage from "@/components/TargetAudienceMessage";

export default function Draft() {
  const [problemStatement, setProblemStatement] = useState("");

  const {
    evaluate: evaluateProductPrinciples,
    showWarning: showProductWarning,
    redFlags,
    analysis: productAnalysis,
  } = useEvaluateProductPrinciples(problemStatement);

  const {
    evaluate: evaluateTargetAudience,
    showWarning: showTargetWarning,
    targetAudiences,
    analysis: targetAnalysis,
  } = useEvaluateTargetAudience(problemStatement);

  const handleAssessment = () => {
    evaluateProductPrinciples();
    evaluateTargetAudience();
  };

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">
        Pager, your AI-powered funding proposal editor
      </h1>

      {showProductWarning && (
        <WarningAlert analysis={productAnalysis!}>
          <ProductPrinciplesMessage redFlags={redFlags} />
        </WarningAlert>
      )}

      {showTargetWarning && (
        <WarningAlert analysis={targetAnalysis!}>
          <TargetAudienceMessage targetAudiences={targetAudiences} />
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleAssessment}
                    >
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

        {/* Show combined analysis results */}
        {(productAnalysis || targetAnalysis) && (
          <section className="mt-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">Assessment Results</h3>
              <div className="space-y-4">
                {productAnalysis && (
                  <div>
                    <h4 className="font-medium">Product Analysis:</h4>
                    <p className="mt-1">{productAnalysis}</p>
                  </div>
                )}
                {targetAnalysis && (
                  <div>
                    <h4 className="font-medium">Target Audience Analysis:</h4>
                    <p className="mt-1">{targetAnalysis}</p>
                  </div>
                )}
              </div>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
