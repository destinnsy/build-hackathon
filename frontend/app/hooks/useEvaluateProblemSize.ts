import { useState } from "react";
import { backend } from "../services/api";

interface ProblemSizeAssessment {
  evaluation: "good" | "bad";
  marketSizeIssue:
    | "overly_broad"
    | "excessively_narrow"
    | "misaligned"
    | "undefined"
    | null;
  analysis: string;
}

export function useEvaluateProblemSize(problemStatement: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [assessment, setAssessment] = useState<ProblemSizeAssessment | null>(
    null
  );

  const evaluate = async () => {
    // Reset the state first
    setAssessment(null);
    setIsLoading(true);
    try {
      const { data, error } = await backend.post<ProblemSizeAssessment>(
        "/query/problem-size",
        { text: problemStatement }
      );

      if (error) {
        throw new Error(error);
      }

      setAssessment(data);
    } catch (error) {
      console.error("Error assessing problem size:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    evaluate,
    isLoading,
    isEvaluated: assessment !== null && assessment.evaluation === "good",
    showWarning: assessment?.evaluation === "bad",
    marketSizeIssue: assessment?.marketSizeIssue,
    analysis: assessment?.analysis,
  };
}
