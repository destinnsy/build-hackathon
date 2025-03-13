import { useState } from "react";
import { backend } from "../services/api";

interface ExistingProduct {
  title: string;
  contact_point: string[];
  summary: string;
}

export function useEvaluateExistingProducts(problemStatement: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [existingProducts, setExistingProducts] = useState<
    ExistingProduct[] | null
  >([]);

  const evaluate = async () => {
    setExistingProducts(null);
    setIsLoading(true);
    try {
      const { data, error } = await backend.post<ExistingProduct[]>(
        "/query/existing-products",
        { text: problemStatement }
      );

      if (error) {
        throw new Error(error);
      }

      setExistingProducts(data);
    } catch (error) {
      console.error("Error finding existing products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    evaluate,
    isLoading,
    isEvaluated: existingProducts !== null && existingProducts.length === 0,
    existingProducts: existingProducts ?? [],
    hasExistingProducts:
      existingProducts !== null && existingProducts.length > 0,
  };
}
