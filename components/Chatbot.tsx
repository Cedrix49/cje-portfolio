"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// TypeScript interfaces
interface Message {
  sender: "user" | "bot";
  text: string;
}

interface FaqData {
  [key: string]: string;
}

interface SuggestionSets {
  [key: string]: string[];
}

// FAQ data
const FAQ_DATA: FaqData = {
  "what services do you offer": "I specialize in creating custom websites and applications that are tailored to your business needs. Whether you need a simple landing page or a complex web application, I can help you achieve your goals.",
  "how much do your services cost": "My services are priced based on the complexity of the project and the time required to complete it. You can message me at my Facebook account for more information.",
  "what is your development process": "I follow a structured development process to ensure the highest quality of work. We start with a discovery phase to understand your requirements, then move to design, development, testing, and deployment phases.",
  "how long does it take to complete a project": "Project timelines vary based on complexity. Simple websites can take 2-4 weeks, while complex applications might take 3-6 months.",
  "do you offer support after launch": "Yes, I offer post-launch support and maintenance packages to ensure your application continues running smoothly.",
  "what technologies do you work with": "We work with modern web technologies including React, Next.js, Node.js, TypeScript, Tailwind CSS, and various database solutions.",
  "how do i contact support": "You can reach out to me using my social media accounts. They are located in the footer of this website.",
  "what are your hours": "My business hours are Monday through Friday, 9:00 AM to 6:00 PM Eastern Time.",
};

// Suggestions that appear at different points in the conversation
const SUGGESTION_SETS: SuggestionSets = {
  initial: [
    "What services do you offer?",
    "How much do your services cost?",
    "What is your development process?"
  ],
  afterServices: [
    "How long does it take?",
    "Do you offer support after launch?",
    "What technologies do you work with?"
  ],
  afterProcess: [
    "How do I contact support?",
    "What are your hours?"
  ]
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: "bot", 
      text: "👋 Hi there! I'm your FAQ assistant. How can I help you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>(SUGGESTION_SETS.initial);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to find the best matching question in our FAQ data
  const findBestMatch = (question: string): string => {
    const userQuestion = question.toLowerCase().trim();
    
    // Direct match
    if (FAQ_DATA[userQuestion]) {
      return FAQ_DATA[userQuestion];
    }
    
    // Simple keyword matching (could be improved with more advanced NLP)
    let bestMatch: string | null = null;
    let highestScore = 0;
    
    Object.entries(FAQ_DATA).forEach(([key, value]) => {
      const keyWords = key.toLowerCase().split(' ');
      const questionWords = userQuestion.split(' ');
      
      let matchScore = 0;
      questionWords.forEach(word => {
        if (word.length > 2 && keyWords.includes(word)) {
          matchScore++;
        }
      });
      
      if (matchScore > highestScore) {
        highestScore = matchScore;
        bestMatch = value;
      }
    });
    
    // If we have a reasonable match (adjust threshold as needed)
    if (highestScore > 0 && bestMatch) {
      return bestMatch;
    }
    
    // Default response
    return "I'm not sure I understand that question. Could you rephrase it or choose from one of the suggested questions below?";
  };

  // Function to handle sending a message
  const handleSendMessage = (): void => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = { sender: "user", text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Update suggestions based on the question
    const lowerQuestion = inputValue.toLowerCase();
    if (lowerQuestion.includes("service")) {
      setSuggestions(SUGGESTION_SETS.afterServices);
    } else if (lowerQuestion.includes("process") || lowerQuestion.includes("work")) {
      setSuggestions(SUGGESTION_SETS.afterProcess);
    }
    
    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = { sender: "bot", text: findBestMatch(inputValue) };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string): void => {
    setInputValue(suggestion);
    // Use setTimeout to ensure state updates before sending
    setTimeout(() => {
      handleSendMessage();
    }, 0);
  };

  // Toggle chat window
  const toggleChat = (): void => {
    setIsOpen(!isOpen);
  };

  // Handle key press for Enter key
  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className="fixed bottom-6 right-6 z-30">
      {/* Chat Button */}
      <button 
        onClick={toggleChat}
        className="cursor-pointer bg-white hover:bg-white/80 rounded-full p-4 shadow-lg flex items-center justify-center transition-all relative"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
            <Image 
            src="/assets/logo.png" 
            alt="Chat icon" 
            width={40} 
            height={40} 
            className="h-6 w-6"
          />
        ) : (
          <>
            <Image 
            src="/assets/logo.png" 
            alt="Close icon" 
            width={40} 
            height={40} 
            className="h-6 w-6"
            />
            
            <div 
              className="absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 bg-green-600 border-green-600"
              aria-label="Active status"
            ></div>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="bg-indigo-600 text-white py-3 px-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">CJE Chatbot</h2>
            <button 
              onClick={toggleChat}
              className="cursor-pointer text-white hover:text-indigo-200 transition-colors"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`max-w-[80%] mb-4 ${
                  message.sender === "user" ? "ml-auto" : "mr-auto"
                }`}
              >
                <div 
                  className={`p-3 rounded-2xl ${
                    message.sender === "user" 
                      ? "bg-indigo-600 text-white rounded-br-none" 
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="max-w-[80%] mb-4 mr-auto">
                <div className="p-3 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-none flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
            
            {/* Suggestion chips */}
            {!isTyping && (
              <div className="flex flex-wrap gap-2 mt-4 mb-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm py-1 px-3 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 text-black p-3 flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`ml-2 rounded-full p-2 ${
                inputValue.trim() 
                  ? "bg-indigo-600 hover:bg-indigo-700" 
                  : "bg-gray-300"
              } text-white focus:outline-none transition-colors`}
              aria-label="Send message"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;