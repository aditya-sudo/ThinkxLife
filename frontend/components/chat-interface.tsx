"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot, Brain, Sparkles, BarChart3 } from "lucide-react";
// Session sidebar removed - no session management needed
import { useChatbotBrain } from "@/hooks/use-backend-brain";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type ChatInterfaceProps = {
  initialMessage: string;
  userName: string;
  userId: string;
  age: number | null;
  aceScore: number;
};

export default function ChatInterface({
  initialMessage,
  userName,
  userId,
  age,
  aceScore
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: initialMessage,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [sessionId, setSessionId] = useState<string | null>(null);
// Session sidebar removed - no session management needed
  const containerRef = useRef<HTMLDivElement>(null);

  // Use backend Brain for chatbot functionality
  const { loading, error, sendChatMessage, clearError } = useChatbotBrain();

  // Auto-scroll messages container to bottom
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    // Display user's message immediately
    const userMsg: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Clear input and any previous errors
    const messageToSend = input;
    setInput("");
    clearError();

    try {
      // Prepare user context for Brain
      const userContext = {
        user_id: userId,
        session_id: sessionId,
        age: age,
        ace_score: aceScore,
        name: userName
      };

      // Send message through Brain
      const response = await sendChatMessage(
        messageToSend,
        userContext,
        sessionId || undefined
      );

      if (response.success && response.message) {
        // Display bot reply
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          content: response.message,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);

        // Update session ID if provided
        if (response.data?.session_id) {
          setSessionId(response.data.session_id);
        }
      } else {
        // Handle error response
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          content: response.error || "I'm sorry, I encountered an error. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      
      // Display error message
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm experiencing technical difficulties. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="relative">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-200/50 h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6
                        border-b border-blue-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 bg-white/20 rounded-full">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1
                                    -right-1 animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Chat with Zoe</h2>
                <p className="text-blue-100">
                  Your empathetic AI companion • Chatting with {userName}
                </p>
              </div>
            </div>

            {/* Session analytics removed - no session management needed */}
          </div>
        </div>

        {/* Messages container */}
        <div
          ref={containerRef}
          className="flex-grow overflow-y-auto p-6 space-y-6
                     bg-gradient-to-b from-slate-50 to-white"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white " +
                      "rounded-2xl rounded-br-md"
                    : "bg-white border border-slate-200 text-slate-800 " +
                      "rounded-2xl rounded-bl-md shadow-lg"
                } p-4 relative`}
              >
                <div className="flex items-center mb-2">
                  {msg.sender === "user" ? (
                    <>
                      <User size={16} className="mr-2 opacity-80" />
                      <span className="font-medium text-sm opacity-90">{userName}</span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full">
                          <Bot size={14} className="text-white" />
                        </div>
                        <span className="font-medium text-sm text-slate-600">Zoe</span>
                      </div>
                    </>
                  )}
                </div>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                <p className={`mt-2 text-xs ${
                  msg.sender === "user" ? "text-blue-100" : "text-slate-400"
                }`}>
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[60%] bg-white border border-slate-200
                              text-slate-800 rounded-2xl rounded-bl-md shadow-lg
                              p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-gradient-to-r from-blue-500 to-cyan-600
                                  rounded-full">
                    <Bot size={14} className="text-white" />
                  </div>
                  <span className="font-medium text-sm text-slate-600">Zoe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full
                                    animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full
                                    animate-bounce"
                         style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full
                                    animate-bounce"
                         style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-slate-500 text-sm italic">
                    Zoe is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="bg-white/90 backdrop-blur-sm border-t border-slate-200
                        p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-4"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share what's on your mind..."
              disabled={loading}
              className="flex-grow border-slate-300 focus:border-blue-400
                         focus:ring-blue-400 rounded-xl py-3 px-4 text-lg
                         bg-white/80 backdrop-blur-sm"
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-blue-500 to-cyan-600
                         hover:from-blue-600 hover:to-cyan-700 text-white
                         rounded-xl px-6 py-3 shadow-lg hover:shadow-blue-500/25
                         transition-all duration-300 transform hover:scale-105
                         disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:transform-none"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </Button>
          </form>

          {/* Helper text */}
          <p className="text-xs text-slate-500 mt-3 text-center">
            Zoe is here to listen and support you. Feel free to share whatever is on your mind.
          </p>
        </div>
      </div>

      {/* Session sidebar removed - no session management needed */}
    </div>
  );
}
