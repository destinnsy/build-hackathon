import { useState, useEffect } from "react";
import { ProblemStatement } from "@/components/ProblemStatement";
import { SuccessMetrics } from "@/components/SuccessMetrics";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useEvaluateProductPrinciples } from "@/hooks/useEvaluateProductPrinciples";
import { useEvaluateTargetAudience } from "@/hooks/useEvaluateTargetAudience";
import { useEvaluateProblemSize } from "@/hooks/useEvaluateProblemSize";
import { useEvaluateExistingProducts } from "@/hooks/useEvaluateExistingProducts";
import { useEvaluateSuccessMetrics } from "@/hooks/useEvaluateSuccessMetrics";
import ProductPrinciplesMessage from "@/components/ProductPrinciplesMessage";
import TargetAudienceMessage from "@/components/TargetAudienceMessage";
import ProblemSizeMessage from "@/components/ProblemSizeMessage";
import ExistingProductsMessage from "@/components/ExistingProductsMessage";
import SuccessMetricsMessage from "@/components/SuccessMetricsMessage";
import pagerLogo from "~/welcome/Pager.avif";

export default function Draft() {
  const [content, setContent] = useState("");
  const [metricsContent, setMetricsContent] = useState("");
  const [activeTab, setActiveTab] = useState("problem");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  // Problem Statement Hooks
  const {
    evaluate: evaluateProductPrinciples,
    showWarning: showProductWarning,
    redFlags: productRedFlags,
    analysis: productAnalysis,
    isLoading: isLoadingPrinciples,
    isEvaluated: isEvaluatedProductPrinciples,
  } = useEvaluateProductPrinciples(content);

  const {
    evaluate: evaluateTargetAudience,
    showWarning: showTargetWarning,
    targetAudiences,
    analysis: targetAnalysis,
    isLoading: isLoadingTarget,
    isEvaluated: isEvaluatedTargetAudience,
  } = useEvaluateTargetAudience(content);

  const {
    evaluate: evaluateProblemSize,
    showWarning: showSizeWarning,
    marketSizeIssue,
    analysis: sizeAnalysis,
    isLoading: isLoadingSize,
    isEvaluated: isEvaluatedProblemSize,
  } = useEvaluateProblemSize(content);

  const {
    evaluate: evaluateExistingProducts,
    existingProducts,
    hasExistingProducts,
    isLoading: isLoadingExisting,
    isEvaluated: isEvaluatedExistingProducts,
  } = useEvaluateExistingProducts(content);

  // Success Metrics Hooks
  const {
    evaluate: evaluateMetrics,
    showWarning: showMetricsWarning,
    redFlags: metricsRedFlags,
    analysis: metricsAnalysis,
    isLoading: isLoadingMetrics,
    isEvaluated: isEvaluatedMetrics,
  } = useEvaluateSuccessMetrics(metricsContent, content);

  const isLoading =
    isLoadingPrinciples ||
    isLoadingTarget ||
    isLoadingSize ||
    isLoadingExisting ||
    isLoadingMetrics;

  const isEvaluatedProblem =
    isEvaluatedProductPrinciples &&
    isEvaluatedTargetAudience &&
    isEvaluatedProblemSize &&
    isEvaluatedExistingProducts;

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    if (activeTab === "problem") {
      evaluateProductPrinciples();
      evaluateTargetAudience();
      evaluateProblemSize();
      evaluateExistingProducts();
    } else {
      evaluateMetrics();
    }
  };

  // Calculate overall score based on warnings
  useEffect(() => {
    if (isAnalyzing) {
      let score = 100;

      if (activeTab === "problem") {
        if (showProductWarning) score -= 20;
        if (showTargetWarning) score -= 20;
        if (showSizeWarning) score -= 20;
        if (hasExistingProducts) score -= 10;
      } else {
        if (showMetricsWarning) score -= 30;
      }

      setOverallScore(Math.max(score, 0));
    }
  }, [
    isAnalyzing,
    activeTab,
    showProductWarning,
    showTargetWarning,
    showSizeWarning,
    hasExistingProducts,
    showMetricsWarning,
  ]);

  // Get the color based on score
  const getScoreColor = () => {
    if (overallScore === null) return "bg-gray-200";
    if (overallScore >= 80) return "bg-orange-500";
    if (overallScore >= 60) return "bg-orange-400";
    return "bg-orange-300";
  };

  // Count issues
  const getIssueCount = () => {
    if (activeTab === "problem") {
      return (
        (showProductWarning ? 1 : 0) +
        (showTargetWarning ? 1 : 0) +
        (showSizeWarning ? 1 : 0) +
        (hasExistingProducts ? 1 : 0)
      );
    } else {
      return showMetricsWarning ? 1 : 0;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Header - Fixed at the top below the masthead */}
      <div className="fixed left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4 z-10">
        <a href="/" className="text-xl font-bold flex items-center">
          <img src={pagerLogo} alt="Pager Logo" className="h-6 w-6 mr-2" />
          Pager
        </a>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Hide Analysis" : "Show Analysis"}
          </Button>

          <Button
            variant={isLoading ? "outline" : "default"}
            size="sm"
            onClick={handleAnalyze}
            disabled={
              isLoading ||
              (!content && activeTab === "problem") ||
              (!metricsContent && activeTab === "metrics")
            }
          >
            {isLoading ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </div>

      {/* Main Content - Positioned below the fixed header with proper spacing */}
      <div className="w-full h-full pt-14">
        {/* Editor Area */}
        <div
          className={`w-full h-full p-6 ${
            showSidebar ? "pr-[350px]" : ""
          } transition-all duration-300`}
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "problem"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("problem")}
            >
              Problem Statement
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "metrics"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("metrics")}
            >
              Success Metrics
            </button>
          </div>

          {/* Editor */}
          <Card className="p-6 shadow-sm bg-white w-full">
            {activeTab === "problem" ? (
              <div className="space-y-4 w-full">
                <h2 className="text-lg font-medium text-gray-700">
                  Problem Statement
                </h2>
                <p className="text-sm text-gray-500">
                  Describe the problem, its size, and the target audience.
                </p>
                <Textarea
                  className="min-h-[70vh] text-base p-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500 w-full"
                  placeholder="Describe the problem you're trying to solve..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            ) : (
              <div className="space-y-4 w-full">
                <h2 className="text-lg font-medium text-gray-700">
                  Success Metrics
                </h2>
                <p className="text-sm text-gray-500">
                  Define your success metrics and north star metric.
                </p>
                <Textarea
                  className="min-h-[70vh] text-base p-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500 w-full"
                  placeholder="Describe your success metrics and north star metric..."
                  value={metricsContent}
                  onChange={(e) => setMetricsContent(e.target.value)}
                />
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className="fixed  mt-24 right-0 top-0 bottom-0 w-[350px] bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Analysis
                </h2>
{/*                 {overallScore !== null && (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full ${getScoreColor()} flex items-center justify-center text-white font-bold`}
                    >
                      {overallScore} */}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getIssueCount()}{" "}
                      {getIssueCount() === 1 ? "issue" : "issues"}
                    </div>
                  </div>
                )}
              </div>

              {isAnalyzing ? (
                <div className="space-y-4">
                  {activeTab === "problem" ? (
                    <>
                      {hasExistingProducts && (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                          <h3 className="font-medium text-amber-800 mb-2">
                            Similar Products Exist
                          </h3>
                          <ExistingProductsMessage
                            products={existingProducts}
                          />
                        </div>
                      )}

                      {showProductWarning && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                          <h3 className="font-medium text-red-800 mb-2">
                            Problem Statement Issues
                          </h3>
                          <ProductPrinciplesMessage
                            redFlags={productRedFlags}
                          />
                          <p className="text-sm text-gray-600 mt-2">
                            {productAnalysis}
                          </p>
                        </div>
                      )}

                      {showTargetWarning && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                          <h3 className="font-medium text-red-800 mb-2">
                            Target Audience Issues
                          </h3>
                          <TargetAudienceMessage
                            targetAudiences={targetAudiences}
                          />
                          <p className="text-sm text-gray-600 mt-2">
                            {targetAnalysis}
                          </p>
                        </div>
                      )}

                      {showSizeWarning && marketSizeIssue && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                          <h3 className="font-medium text-red-800 mb-2">
                            Problem Size Issues
                          </h3>
                          <ProblemSizeMessage
                            marketSizeIssue={marketSizeIssue}
                          />
                          <p className="text-sm text-gray-600 mt-2">
                            {sizeAnalysis}
                          </p>
                        </div>
                      )}

                      {isEvaluatedProblem && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h3 className="font-medium text-green-800 mb-2">
                            Excellent Work!
                          </h3>
                          <p className="text-sm text-gray-600">
                            Your problem statement looks great. No issues
                            detected.
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {showMetricsWarning && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h3 className="font-medium text-red-800 mb-2">
                            Success Metrics Issues
                          </h3>
                          <SuccessMetricsMessage redFlags={metricsRedFlags} />
                          <p className="text-sm text-gray-600 mt-2">
                            {metricsAnalysis}
                          </p>
                        </div>
                      )}

                      {isEvaluatedMetrics && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h3 className="font-medium text-green-800 mb-2">
                            Excellent Work!
                          </h3>
                          <p className="text-sm text-gray-600">
                            Your success metrics look great. No issues detected.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Ready to analyze
                  </h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Click the "Analyze" button to get feedback on your{" "}
                    {activeTab === "problem"
                      ? "problem statement"
                      : "success metrics"}
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
