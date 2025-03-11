export const MARKET_SIZE_MESSAGES = {
  overly_broad: "The problem scope is too broad and needs to be more focused",
  excessively_narrow: "The problem scope is too narrow and may limit impact",
  misaligned: "The market size is misaligned with the proposed solution",
  undefined: "The market size is not clearly defined",
  default: "There are issues with the problem size definition",
} as const;

export const PRODUCT_PRINCIPLES_MESSAGES = {
  solution_focus:
    "The problem statement is too focused on the solution rather than the underlying problem",
  insufficient_depth: "The problem analysis lacks sufficient depth or detail",
  multiple_distinct_problems:
    "The statement contains multiple unrelated problems that should be addressed separately",
  default: "There is an issue with the problem statement",
} as const;

export const SUCCESS_METRICS_MESSAGES = {
  relevance:
    "The metrics are not directly relevant to measuring the problem's solution",
  objectivity: "The metrics lack objective measurement criteria",
  specificity: "The metrics need to be more specific and quantifiable",
  "high-frequency":
    "The metrics should be measurable at a higher frequency for better tracking",
  default: "There is an issue with the success metrics",
} as const;
