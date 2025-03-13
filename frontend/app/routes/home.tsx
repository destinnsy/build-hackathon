import type { Route } from "./+types/home";
import { useState } from 'react';
import { ChevronRight, ArrowRight, ChevronDown, Edit3 } from 'lucide-react';
import pagerLogo from '~/welcome/Pager.avif';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Pager - Home" },
    { name: "description", content: "Welcome to Pager!" },
  ];
}

// Custom Accordion Component
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ title, children, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b py-2">
      <button 
        className="w-full flex justify-between items-center py-3 text-left font-semibold"
        onClick={onClick}
      >
        {title}
        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="py-3 text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems = [
    {
      title: "How does this tool help me secure funding?",
      content: "Our Smart Composer enhances your proposal by providing content suggestions, improving clarity, and ensuring your messaging aligns with investor and funding committee expectations."
    },
    {
      title: "What funding options are available for my project?",
      content: "If your project is at the Proof-of-Concept (POC) stage, you may be eligible for IB funding, which is available monthly. Once your product achieves its Proof of Value (POV), you can apply for CDB funding, which is happens bi-monthly. More details can be found via https://go.gov.sg/product-funding"
    }, 
    {
      title: "Can I book a product clinic session for additional support?",
      content: "Yes! You can schedule a Product Clinic Session via https://go.gov.sg/book-clinic to refine your proposal or get general assistance in improving your funding application."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-bold flex items-center">
            <img src={pagerLogo} alt="Pager Logo" className="h-6 w-6 mr-2" />
            Pager
          </div>
        </div> 
        <div>
          <a href="/draft" className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md flex items-center">
            Get started 
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center max-w-4xl">
        <div className="absolute top-32 left-1/4 text-orange-500 opacity-20">
          <div className="w-8 h-8 bg-orange-500 rounded-full" />
        </div>
        <h1 className="text-5xl font-bold mb-6">Create pitch-ready proposals in minutes with AI</h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Effortlessly craft, refine, and perfect your one-pager proposals with AI-
          powered writing assistance, get instant feedback on your proposals, and 
          product resources — all in one platform.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/draft" className="bg-gray-800 text-white px-5 py-2.5 rounded-md flex items-center">
            Evaluate proposal 
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
          <a href="/tools" className="bg-white border border-gray-300 text-gray-800 px-5 py-2.5 rounded-md flex items-center">
            View resources
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        <div className="absolute top-64 right-1/4 text-orange-500 opacity-20">
          <div className="w-6 h-6 bg-orange-500 rounded-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Elevate Your Proposals</h2>
        <p className="text-gray-600 text-center mb-14 max-w-3xl mx-auto">
          Leverage AI-driven assistant designed to help you with funding proposal creation 
          and maximize your chances of success of getting funded
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold">Evaluate Proposal</h3>
              <span className="text-orange-500">🔍</span>
            </div>
            <p className="text-gray-600">Get feedback on your funding proposals to maximize success</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold">Product Resources</h3>
              <span className="text-orange-500">🛠️</span>
            </div>
            <p className="text-gray-600">Find curated tools and resources to help you in your product journey</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        
        <div className="w-full border-t">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index}
              title={item.title}
              isOpen={openItem === index}
              onClick={() => toggleAccordion(index)}
            >
              {item.content}
            </AccordionItem>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 mb-4 md:mb-0">© 2025 Pager</div> 
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="https://docs.google.com/document/d/11KaFeszsX9UXaciYlCPtl9vA_pGUNk7b/edit?tab=t.0" className="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</a>
            <span className="text-gray-300">|</span>
            <a href="https://docs.google.com/document/d/1y-1eeFDoU1_YlemmFOmnZJOUC-WdDIrj/edit?tab=t.0" className="text-gray-500 hover:text-gray-700 text-sm">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;