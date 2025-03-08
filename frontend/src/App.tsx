import { Textarea } from "@/components/ui/textarea";

function App() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your AI-powered editor</h1>
        </div>

        {/* Main content */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-blue-600">Input</h2>
            <Textarea
              placeholder="Enter your text here..."
              className="min-h-[200px] mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
