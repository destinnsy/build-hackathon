import React, { useState } from "react";

interface Assessment {
  analysis: string;
  evaluation: "good" | "bad";
  redFlags: string[];
}

export function useEvaluateProductPrinciples(problemStatement: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  const evaluate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/query/product-principles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: problemStatement }),
        }
      );

      const data = await response.json();
      setAssessment(data);
    } catch (error) {
      console.error("Error assessing problem statement:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    evaluate,
    isLoading,
    showWarning: assessment?.evaluation === "bad",
    redFlags: assessment?.redFlags ?? [],
    analysis: assessment?.analysis,
  };
}
