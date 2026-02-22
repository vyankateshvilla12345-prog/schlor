import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Subject, Standard, ChatMessage } from '../types';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { generateStudyHelp } from '../services/gemini';

interface GeminiChatProps {
  subject: Subject;
  standard: Standard;
}

export interface GeminiChatRef {
  addMessage: (text: string, role: 'user' | 'model') => void;
}

const GeminiChat = forwardRef<GeminiChatRef, GeminiChatProps>(({ subject, standard }, ref) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello! I'm your AI Tutor for ${subject}, ${standard}. Upload a file or ask me anything to get started!`,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    addMessage: (text: string, role: 'user' | 'model') => {
      setMessages(prev => [...prev, {
        id: Date.now().toString() + Math.random(),
        role,
        text,
        timestamp: Date.now()
      }]);
    }
  }));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await generateStudyHelp(subject, standard, userMsg.text, history);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I encountered an error. Please check your connection.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-scholar-50 to-white flex items-center gap-3">
        <div className="p-2 bg-scholar-100 rounded-lg">
           <Sparkles className="w-5 h-5 text-scholar-600" />
        </div>
        <div>
           <h3 className="font-bold text-gray-800">Scholar AI Tutor</h3>
           <p className="text-xs text-scholar-600 font-medium">Powered by Gemini 2.5</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-gray-800' : 'bg-scholar-600'
            }`}>
              {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
            </div>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-gray-100 text-gray-800 rounded-tr-none' 
                : 'bg-scholar-50 text-gray-800 rounded-tl-none border border-scholar-100'
            }`}>
              {/* Simple Markdown Rendering Replacement */}
               {msg.text.split('\n').map((line, i) => (
                 <p key={i} className={`min-h-[1em] ${line.startsWith('**') ? 'font-bold mt-2' : ''} ${line.startsWith('* ') ? 'ml-4 list-disc display-list-item' : ''}`}>
                   {line.replace(/\*\*/g, '').replace(/^\* /, '')}
                 </p>
               ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-scholar-600 flex items-center justify-center flex-shrink-0">
               <Bot size={14} className="text-white" />
             </div>
             <div className="bg-scholar-50 p-3 rounded-2xl rounded-tl-none border border-scholar-100 flex items-center gap-2">
               <Loader2 className="w-4 h-4 text-scholar-500 animate-spin" />
               <span className="text-xs text-gray-500">Thinking...</span>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question about your files..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-scholar-500 focus:ring-2 focus:ring-scholar-100 transition-all text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-scholar-600 hover:bg-scholar-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors shadow-lg shadow-scholar-200"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});

GeminiChat.displayName = 'GeminiChat';

export default GeminiChat;