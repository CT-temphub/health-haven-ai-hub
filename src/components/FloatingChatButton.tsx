
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Chat, X } from 'lucide-react';

const FloatingChatButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link to="/chat">
        <Button
          size="lg"
          className={`rounded-full w-14 h-14 bg-gradient-to-r from-medical-500 to-health-500 hover:from-medical-600 hover:to-health-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-slow ${
            isHovered ? 'scale-110' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Chat className="h-6 w-6 text-white" />
        </Button>
      </Link>
      
      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 whitespace-nowrap animate-fade-in">
          Chat with AI Doctor
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatButton;
