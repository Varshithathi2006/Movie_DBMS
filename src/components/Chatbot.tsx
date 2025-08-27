import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Bingibo AI assistant. Ask me about movies, actors, or directors using natural language!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('spielberg') || lowerQuery.includes('steven spielberg')) {
      return "Here are movies directed by Steven Spielberg:\n• Jaws (1975) - 8.1/10\n• E.T. (1982) - 7.9/10\n• Jurassic Park (1993) - 8.1/10\n• Schindler's List (1993) - 9.0/10\n• Saving Private Ryan (1998) - 8.6/10";
    }
    
    if (lowerQuery.includes('highest grossing') || lowerQuery.includes('box office')) {
      return "Top 5 highest-grossing movies:\n1. Avatar (2009) - $2.9B\n2. Avengers: Endgame (2019) - $2.8B\n3. Avatar: The Way of Water (2022) - $2.3B\n4. Titanic (1997) - $2.2B\n5. Star Wars: The Force Awakens (2015) - $2.1B";
    }
    
    if (lowerQuery.includes('top rated') || lowerQuery.includes('best movies')) {
      return "Top 5 rated movies on Bingibo:\n1. The Shawshank Redemption (1994) - 9.3/10\n2. The Godfather (1972) - 9.2/10\n3. The Dark Knight (2008) - 9.0/10\n4. Pulp Fiction (1994) - 8.9/10\n5. Schindler's List (1993) - 8.9/10";
    }
    
    if (lowerQuery.includes('action movies') || lowerQuery.includes('action films')) {
      return "Popular action movies:\n• The Dark Knight (2008) - 9.0/10\n• Mad Max: Fury Road (2015) - 8.1/10\n• John Wick (2014) - 7.4/10\n• Mission: Impossible (1996) - 7.2/10\n• Die Hard (1988) - 8.2/10";
    }
    
    if (lowerQuery.includes('recent') || lowerQuery.includes('2023') || lowerQuery.includes('2024')) {
      return "Recent popular movies:\n• Oppenheimer (2023) - 8.4/10\n• Barbie (2023) - 6.9/10\n• Spider-Man: Across the Spider-Verse (2023) - 8.7/10\n• Guardians of the Galaxy Vol. 3 (2023) - 7.9/10\n• Top Gun: Maverick (2022) - 8.3/10";
    }
    
    return `I understand you're asking about "${query}". While I'd love to provide real-time database queries, I can help you with information about popular movies, directors, actors, genres, and box office data. Try asking about specific directors like Spielberg, top-rated films, or movie genres!`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: processQuery(inputMessage),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-black/90 backdrop-blur-md rounded-2xl border border-cyan-500/30 shadow-2xl z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-14' : 'w-80 h-96'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cyan-500/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Bingibo AI</h3>
            <p className="text-gray-400 text-xs">Ask me anything about movies!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 max-h-64 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-line ${
                    message.isUser
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-white/10 text-gray-200 border border-white/20'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/20 p-3 rounded-xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-cyan-500/30">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about movies, actors, or directors..."
                className="flex-1 px-3 py-2 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;