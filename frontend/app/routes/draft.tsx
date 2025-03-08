import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Draft() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-blue-500 font-semibold">
              2.1 Status Quo
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
                <h3 className="text-blue-500 mb-2">
                  2.1.1 What problem is being solved?
                </h3>
                <div className="relative">
                  <Input
                    className="min-h-[100px]"
                    placeholder="[Organization name] currently faces challenges with [specific process/system], resulting in [negative outcomes like inefficiency, high costs, errors, etc.]."
                  />
                  <div className="absolute right-2 top-2 flex gap-2">
                    <Button variant="ghost" size="sm">
                      Improve with AI Composer
                    </Button>
                    <Button variant="ghost" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
