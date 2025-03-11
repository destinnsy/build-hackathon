interface ApiResponse<T> {
  data: T;
  error?: string;
}

export const backend = {
  post: async <T>(endpoint: string, body: any): Promise<ApiResponse<T>> => {
    console.log("VITE_BACKEND_URL", import.meta.env.VITE_BACKEND_URL);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error("API Error:", error);
      return {
        data: null as T,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },
};
