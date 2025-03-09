import { ProblemStatement } from "@/components/ProblemStatement";
import { SuccessMetrics } from "@/components/SuccessMetrics";
import { useState } from "react";

export default function Draft() {
  const [problemStatement, setProblemStatement] = useState("");

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">
        Pager, your AI-powered funding proposal editor
      </h1>
      <div className="space-y-8">
        <ProblemStatement
          value={problemStatement}
          onChange={setProblemStatement}
        />
        <SuccessMetrics problemStatement={problemStatement} />
      </div>
    </div>
  );
}
