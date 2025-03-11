import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { WarningAlert } from "@/components/WarningAlert";
import { useEvaluateProductPrinciples } from "@/hooks/useEvaluateProductPrinciples";
import ProductPrinciplesMessage from "@/components/ProductPrinciplesMessage";
import { useEvaluateTargetAudience } from "@/hooks/useEvaluateTargetAudience";
import TargetAudienceMessage from "@/components/TargetAudienceMessage";
import { useEvaluateProblemSize } from "@/hooks/useEvaluateProblemSize";
import ProblemSizeMessage from "@/components/ProblemSizeMessage";
import { useEvaluateExistingProducts } from "@/hooks/useEvaluateExistingProducts";
import ExistingProductsMessage from "@/components/ExistingProductsMessage";

interface ProblemStatementProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProblemStatement({ value, onChange }: ProblemStatementProps) {
  const {
    evaluate: evaluateProductPrinciples,
    showWarning: showProductWarning,
    redFlags,
    analysis: productAnalysis,
    isLoading: isLoadingPrinciples,
  } = useEvaluateProductPrinciples(value);

  const {
    evaluate: evaluateTargetAudience,
    showWarning: showTargetWarning,
    targetAudiences,
    analysis: targetAnalysis,
    isLoading: isLoadingTarget,
  } = useEvaluateTargetAudience(value);

  const {
    evaluate: evaluateProblemSize,
    showWarning: showSizeWarning,
    marketSizeIssue,
    analysis: sizeAnalysis,
    isLoading: isLoadingSize,
  } = useEvaluateProblemSize(value);

  const {
    evaluate: evaluateExistingProducts,
    existingProducts,
    hasExistingProducts,
    isLoading: isLoadingExisting,
  } = useEvaluateExistingProducts(value);

  const isLoading =
    isLoadingPrinciples ||
    isLoadingTarget ||
    isLoadingSize ||
    isLoadingExisting;

  const handleAssessment = () => {
    evaluateProductPrinciples();
    evaluateTargetAudience();
    evaluateProblemSize();
    evaluateExistingProducts();
  };

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="flex-1">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-blue-500 font-semibold">
              Problem Statement
            </h2>
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
                </div>
                <Textarea
                  className="min-h-[500px]"
                  placeholder="Placeholder text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
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
              onClick={handleAssessment}
              disabled={isLoading}
            >
              {isLoading ? "Assessing..." : "Assess Problem Statement"}
            </Button>
          </div>
          <div className="space-y-4">
            {hasExistingProducts && (
              <WarningAlert>
                <ExistingProductsMessage products={existingProducts} />
              </WarningAlert>
            )}

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

            {showSizeWarning && marketSizeIssue && (
              <WarningAlert analysis={sizeAnalysis!}>
                <ProblemSizeMessage marketSizeIssue={marketSizeIssue} />
              </WarningAlert>
            )}

            {!showProductWarning &&
              !showTargetWarning &&
              !showSizeWarning &&
              !hasExistingProducts && (
                <p className="text-gray-500 text-center">
                  Click "Assess Problem Statement" to analyze your input
                </p>
              )}
          </div>
        </Card>
      </div>
    </div>
  );
}
