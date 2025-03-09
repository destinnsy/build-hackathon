import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Draft() {
  const [problemStatement, setProblemStatement] = useState("");
  const [assessment, setAssessment] = useState<{
    analysis: string;
    evaluation: "good" | "bad";
    redFlags: string[];
  } | null>(null);

  const handleAssessment = async () => {
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
    console.log("Problem Statement:", problemStatement);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/query/product-principles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: problemStatement }),
        }
      );

      const data = await response.json();
      setAssessment(data);
      console.log("Assessment result:", data);
    } catch (error) {
      console.error("Error assessing problem statement:", error);
    }
  };

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">
        Pager, your AI-powered funding proposal editor
      </h1>

      {/* Update warning banner styling */}
      {assessment?.evaluation === "bad" && (
        <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative mb-4 flex items-center">
          <strong className="font-bold">Warning!</strong>
          <span className="block sm:inline ml-2">The evaluation is bad</span>
        </div>
      )}

      <div className="grid gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-blue-500 font-semibold">
              Problem Statement
            </h2>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="bg-purple-500 text-white hover:bg-purple-600"
              >
                Load Example
              </Button>
              <Button variant="destructive">Clear All</Button>
              <Button
                variant="default"
                className="bg-green-500 hover:bg-green-600"
              >
                Copy All
              </Button>
            </div>
          </div>

          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-blue-500">
                    1. What is the problem statement?
                    <br />
                    2. What is the size of the problem statement?
                    <br />
                    3. What is the target audience?
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleAssessment}
                    >
                      Assess Problem Statement
                    </Button>
                    <Button variant="ghost" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
                <Textarea
                  className="min-h-[500px]"
                  placeholder="Placeholder text"
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Add assessment results display */}
        {assessment && (
          <section className="mt-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">Assessment Results</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Analysis:</h4>
                  <p className="mt-1">{assessment.analysis}</p>
                </div>
                <div>
                  <h4 className="font-medium">Evaluation:</h4>
                  <p
                    className={`mt-1 ${
                      assessment.evaluation === "bad"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {assessment.evaluation}
                  </p>
                </div>
                {assessment.redFlags.length > 0 && (
                  <div>
                    <h4 className="font-medium">Red Flags:</h4>
                    <ul className="list-disc list-inside mt-1">
                      {assessment.redFlags.map((flag, index) => (
                        <li key={index} className="text-red-600">
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
