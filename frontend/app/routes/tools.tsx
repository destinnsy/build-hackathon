import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  url: string;
}

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState(true);

  const tools: Tool[] = [
    {
      id: "product-guide",
      name: "Product Guide",
      description: "Comprehensive guide by SNDG to help you build effective and efficient digital products",
      icon: "⛩️",
      category: "strategy",
      url: "https://gccprod.sharepoint.com/sites/MDDI-products/SitePages/Product-Guide-Introduction.aspx"
    },
    {
      id: "product-strategy",
      name: "Product Strategy One-Pager template",
      description: "This template provides a framework for presenting your product's core value proposition, risk mitigation strategy, and resource ask required for IB / CDB funding application",
      icon: "📝",
      category: "template",
      url: "https://go.gov.sg/onepagertemplate"
    }, 
    {
      id: "ai-assistant",
      name: "One-Pager AI Writing Assistant",
      description: "AI writing Assistant provides real-time guidance as you craft your funding proposal, offering suggestions to enhance clarity, structure, and alignment with IB/CDB requirements",
      icon: "🔍",
      category: "assistance",
      url: "https://www.notion.so/Competitor-Analysis-Template-e7bd7c5e9b8f4f8a9e8f9f9f9f9f9f9f"
    },
    {
      id: "product-clinic",
      name: "Product Clinic Office Hours",
      description: "Join our product clinics for IB funding guidance and get early proposal feedback to increase your funding approval chances.",
      icon: "💊",
      category: "assistance",
      url: "https://cal.gov.sg/pfjkrmd777epf6on4gpz0gbe"
    },
  ];

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "strategy", name: "Product Strategy" },
    { id: "template", name: "Template & Resources" },
    { id: "assistance", name: "Help & Assistance" },
  ];

  const filteredTools = tools.filter(tool => 
    (activeCategory === "all" || tool.category === activeCategory) &&
    (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Function to handle external links
  const handleToolClick = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4 z-10">
        <h1 className="text-xl font-semibold text-blue-600">
          Pager  
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">{tool.icon}</div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{tool.name}</h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    {tool.url.startsWith('http') ? (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleToolClick(tool.url)}
                        className="flex items-center gap-1"
                      >
                        Learn more
                        <svg 
                          className="h-4 w-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                          />
                        </svg>
                      </Button>
                    ) : (
                      <Link to={tool.url}>
                        <Button variant="default" size="sm">
                          Learn more
                        </Button>
                      </Link>
                    )}
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
                <h3 className="text-lg font-medium text-gray-700 mb-2">No resources found</h3>
                <p className="text-gray-500 max-w-md">
                  We couldn't find any resources matching your search. Try adjusting your search terms or category.
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
