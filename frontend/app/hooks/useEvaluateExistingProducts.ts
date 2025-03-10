import { useState } from "react";
import { backend } from "../services/api";

interface ExistingProduct {
  title: string;
  contact_point: string[];
}

export function useEvaluateExistingProducts(problemStatement: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [existingProducts, setExistingProducts] = useState<ExistingProduct[]>(
    []
  );

  const evaluate = async () => {
    setExistingProducts([]);
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
    existingProducts,
    hasExistingProducts: existingProducts.length > 0,
  };
}
