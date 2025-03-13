import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
    { path: "draft", file: "routes/draft.tsx" },
    { path: "tools", file: "routes/tools.tsx" },
] satisfies RouteConfig;
