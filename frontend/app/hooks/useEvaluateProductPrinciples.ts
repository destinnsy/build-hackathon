import { useState } from "react";
import { backend } from "../services/api";

interface Assessment {
  analysis: string;
  evaluation: "good" | "bad";
  redFlags: string[];
}

export function useEvaluateProductPrinciples(problemStatement: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  const evaluate = async () => {
    setAssessment(null);
    setIsLoading(true);
    try {
      const { data, error } = await backend.post<Assessment>(
        "/query/product-principles",
        { text: problemStatement }
      );

      if (error) {
        throw new Error(error);
      }

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
    isEvaluated: assessment !== null && assessment.evaluation === "good",
    showWarning: assessment?.evaluation === "bad",
    redFlags: assessment?.redFlags ?? [],
    analysis: assessment?.analysis,
  };
}
