import { useState } from "react";
import { backend } from "../services/api";

interface TargetAudienceAssessment {
  targetAudiences: string[];
  analysis: string;
}

export function useEvaluateTargetAudience(problemStatement: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [assessment, setAssessment] = useState<TargetAudienceAssessment | null>(
    null
  );

  const evaluate = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await backend.post<TargetAudienceAssessment>(
        "/query/target-audience",
        { text: problemStatement }
      );

      if (error) {
        throw new Error(error);
      }

      setAssessment(data);
    } catch (error) {
      console.error("Error assessing target audience:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    evaluate,
    isLoading,
    showWarning: (assessment?.targetAudiences ?? []).length > 1,
    targetAudiences: assessment?.targetAudiences ?? [],
    analysis: assessment?.analysis,
  };
}
