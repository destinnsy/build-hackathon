import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, Lock } from 'lucide-react';

const SingaporeGovMasthead = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-100 w-full font-sans text-sm">
      {/* Top info bar */}
      <div className="px-4 py-2 flex items-center text-gray-700">
        <Info size={16} className="mr-2" />
        <span className="text-sm">This is an exploratory prototype that was built as part of GovTech's </span>
        <a href="https://build.tech.gov.sg/projects/Pager" className="text-blue-600 hover:underline ml-1">BUILD Hackathon</a>
      </div>
    </div>
  );
};

export default SingaporeGovMasthead;