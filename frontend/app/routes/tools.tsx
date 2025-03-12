import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState(true);

  const tools: Tool[] = [
    {
      id: "problem-analyzer",
      name: "Problem Statement Analyzer",
      description: "Analyze your problem statement for clarity, focus, and completeness.",
      icon: "📝",
      category: "analysis"
    },
    {
      id: "audience-finder",
      name: "Target Audience Finder",
      description: "Identify and validate your target audience from your problem statement.",
      icon: "👥",
      category: "analysis"
    },
    {
      id: "metrics-validator",
      name: "Success Metrics Validator",
      description: "Ensure your success metrics are measurable, relevant, and achievable.",
      icon: "📊",
      category: "validation"
    },
    {
      id: "competitor-analysis",
      name: "Competitor Analysis",
      description: "Discover existing products that might address similar problems.",
      icon: "🔍",
      category: "discovery"
    },
    {
      id: "problem-size-estimator",
      name: "Problem Size Estimator",
      description: "Estimate the size and impact of the problem you're addressing.",
      icon: "📏",
      category: "analysis"
    },
  ];

  const categories = [
    { id: "all", name: "All Tools" },
    { id: "analysis", name: "Analysis" },
    { id: "validation", name: "Validation" },
    { id: "discovery", name: "Discovery" },
  ];

  const filteredTools = tools.filter(tool => 
    (activeCategory === "all" || tool.category === activeCategory) &&
    (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4 z-10">
        <h1 className="text-xl font-semibold text-blue-600">
          Pager <span className="text-gray-500 text-sm font-normal">| Tools</span>
        </h1>
        
        <div className="ml-auto flex items-center gap-2">
          <div className="relative mr-2">
            <input
              type="text"
              placeholder="Search tools..."
              className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Hide Categories" : "Show Categories"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full mt-14">
        {/* Tools Grid */}
        <div className={`flex-1 p-6 ${showSidebar ? 'mr-[350px]' : ''} transition-all duration-300`}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">{tool.icon}</div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{tool.name}</h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <Button variant="default" size="sm">
                      Open Tool
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {filteredTools.length === 0 && (
              <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No tools found</h3>
                <p className="text-gray-500 max-w-md">
                  We couldn't find any tools matching your search. Try adjusting your search terms or category.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className="fixed right-0 top-14 bottom-0 w-[350px] bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-500"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                    {activeCategory === category.id && (
                      <span className="float-right">
                        <svg 
                          className="h-5 w-5 text-blue-500" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Tool Categories</h3>
                <p className="text-sm text-gray-600">
                  Select a category to filter the available tools. Each category contains tools designed for specific aspects of your proposal development process.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
