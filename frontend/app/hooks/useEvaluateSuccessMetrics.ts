import { useState } from "react";
import { backend } from "../services/api";

interface Assessment {
  analysis: string;
  evaluation: boolean;
  issues: string[];
}

export function useEvaluateSuccessMetrics(
  metricsStatement: string,
  problemStatement: string
) {
  const [isLoading, setIsLoading] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  const evaluate = async () => {
    setAssessment(null);
    setIsLoading(true);
    try {
      const { data, error } = await backend.post<Assessment>(
        "/query/success-metrics",
        {
          metricsText: metricsStatement,
          problemText: problemStatement,
        }
      );

      if (error) {
        throw new Error(error);
      }

      setAssessment(data);
    } catch (error) {
      console.error("Error assessing success metrics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    evaluate,
    isLoading,
    showWarning: assessment?.evaluation === false,
    redFlags: assessment?.issues ?? [],
    analysis: assessment?.analysis,
  };
}
