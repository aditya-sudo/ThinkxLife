"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Settings,
  RotateCcw,
  Heart,
  Play,
  Pause,
  UserCircle,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import UserInfoForm from "@/components/user-info-form";
import AceQuestionnaire from "@/components/ace-questionnaire";
import AceResults from "@/components/ace-results";
import AgeRestriction from "@/components/age-restriction";
import Disclaimer from "@/components/disclaimer";

// Full-Screen Avatar Component (replaces chat area)
const FullScreenAvatar = ({ expression, isSpeaking, isListening, onStopSpeaking }: { 
  expression: string, 
  isSpeaking: boolean,
  isListening: boolean,
  onStopSpeaking: () => void
}) => {
  const [blinkState, setBlinkState] = useState(false);
  const [mouthState, setMouthState] = useState(0);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth animation during speech
  useEffect(() => {
    let mouthInterval: NodeJS.Timeout;
    if (isSpeaking) {
      mouthInterval = setInterval(() => {
        setMouthState(prev => (prev + 1) % 4);
      }, 200);
    }
    return () => clearInterval(mouthInterval);
  }, [isSpeaking]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 relative">
      {/* Fixed Stop Button - Outside animated container */}
      {isSpeaking && (
        <div className="absolute top-6 right-6 z-10">
          <Button
            variant="outline"
            size="lg"
            onClick={onStopSpeaking}
            className="bg-white/95 backdrop-blur-sm border-red-200 text-red-600 hover:bg-red-50 shadow-lg rounded-2xl"
          >
            <Pause className="w-4 h-4 mr-2" />
            Stop Speaking
          </Button>
        </div>
      )}

      {/* Status */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Zoe</h3>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`w-4 h-4 rounded-full shadow-sm ${isSpeaking ? 'bg-red-500 animate-pulse' : isListening ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`} />
          <p className="text-xl text-gray-700 font-medium">
            {isSpeaking ? "Speaking..." : isListening ? "Thinking..." : "Ready to help"}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          AI-Generated Voice • High Quality Female Voice
        </p>
      </div>

      {/* Avatar with Voice Bars Side by Side */}
      <div className="flex items-center gap-8 mb-6">
        {/* Large Avatar */}
        <motion.div
          className="relative w-48 h-64"
          animate={isSpeaking ? {
            y: [0, -4, 0, -2, 0],
            scale: [1, 1.02, 1, 1.01, 1]
          } : isListening ? {
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0]
          } : {}}
          transition={{
            duration: isSpeaking ? 0.5 : 2,
            repeat: (isSpeaking || isListening) ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {/* Avatar head */}
          <div 
            className="relative w-48 h-64 rounded-3xl bg-gradient-to-br from-pink-100 to-rose-100 border-4 border-pink-200 shadow-2xl"
          >
            {/* Hair */}
            <div 
              className="absolute -top-4 left-4 right-4 h-20 rounded-t-3xl bg-gradient-to-b from-amber-700 to-amber-600"
            />
            <div className="absolute -top-2 -left-2 w-12 h-16 bg-amber-600 rounded-full opacity-90 transform -rotate-12" />
            <div className="absolute -top-2 -right-2 w-12 h-16 bg-amber-600 rounded-full opacity-90 transform rotate-12" />

            {/* Face */}
            <div className="absolute top-12 left-6 right-6 bottom-12">
              {/* Eyes */}
              <div className="absolute top-6 left-2 w-10 h-6 flex items-center justify-center">
                <div className={`w-8 h-5 bg-white rounded-full shadow-inner transition-all duration-100 ${blinkState ? 'h-1' : ''}`}>
                  {!blinkState && (
                    <div 
                      className={`absolute top-1 left-2 w-5 h-3 rounded-full transition-all duration-300 ${
                        expression === "happy" ? "bg-green-600" : 
                        expression === "caring" ? "bg-pink-600" : "bg-blue-600"
                      }`} 
                    />
                  )}
                </div>
              </div>
              <div className="absolute top-6 right-2 w-10 h-6 flex items-center justify-center">
                <div className={`w-8 h-5 bg-white rounded-full shadow-inner transition-all duration-100 ${blinkState ? 'h-1' : ''}`}>
                  {!blinkState && (
                    <div 
                      className={`absolute top-1 right-2 w-5 h-3 rounded-full transition-all duration-300 ${
                        expression === "happy" ? "bg-green-600" : 
                        expression === "caring" ? "bg-pink-600" : "bg-blue-600"
                      }`} 
                    />
                  )}
                </div>
              </div>

              {/* Eyebrows */}
              <div className="absolute top-2 left-4 w-6 h-2 rounded bg-gray-600" />
              <div className="absolute top-2 right-4 w-6 h-2 rounded bg-gray-600" />

              {/* Nose */}
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black bg-opacity-10 rounded-full" />

              {/* Mouth - animated during speech */}
              <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-200 ${
                isSpeaking ? 
                  (mouthState % 2 === 0 ? "w-10 h-5 border-4 border-red-400 rounded-full" : "w-6 h-3 border-4 border-red-400 rounded-full") :
                expression === "happy" ? "w-10 h-5 border-b-4 border-red-400 rounded-b-full" :
                expression === "caring" ? "w-8 h-3 border-b-4 border-pink-400 rounded-b-full" :
                "w-5 h-2 bg-red-400 rounded"
              }`} />

              {/* Cheeks for happy/caring */}
              {(expression === "happy" || expression === "caring") && (
                <>
                  <div className="absolute bottom-10 left-1 w-5 h-5 bg-pink-300 rounded-full opacity-60" />
                  <div className="absolute bottom-10 right-1 w-5 h-5 bg-pink-300 rounded-full opacity-60" />
                </>
              )}
            </div>

            {/* Clothing */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 rounded-t-2xl bg-gradient-to-b from-pink-300 to-pink-400" />
          </div>
        </motion.div>

        {/* Audio visualization next to avatar */}
        {isSpeaking && (
          <div className="flex flex-col gap-1 h-64 justify-center">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 bg-pink-400 rounded-full"
                animate={{
                  height: [4, 16, 8, 24, 6, 20, 12, 18, 4],
                  opacity: [0.4, 1, 0.6, 1, 0.5, 0.8, 0.7, 0.9, 0.4]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.05
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

type UserInfo = {
  name: string;
  age: number | null;
};

type Answer = "yes" | "no" | "skip" | null;

interface Message {
  id: string;
  content: string;
  sender: "user" | "zoe";
  timestamp: Date;
  expression?: string;
}

export default function ChatbotPage() {
  const [step, setStep] = useState<
    | "disclaimer"
    | "userInfo"
    | "questionnaire"
    | "results"
    | "chat"
    | "ageRestriction"
  >("disclaimer");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [aceScore, setAceScore] = useState<number>(0);
  const [aceAnswers, setAceAnswers] = useState<Answer[]>([]);

  // Chat states
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatarMode, setAvatarMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAcceptDisclaimer = () => {
    setStep("userInfo");
  };

  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
    setStep("questionnaire");
  };

  const handleAgeRestriction = () => {
    setStep("ageRestriction");
  };

  const handleQuestionnaireComplete = (score: number, answers: Answer[]) => {
    setAceScore(score);
    setAceAnswers(answers);
    setStep("results");
  };

  const handleStartChat = () => {
    setStep("chat");
    // Initialize chat with personalized message
    const initialMessage = getInitialMessage();
    setMessages([{
      id: "1",
      content: initialMessage,
      sender: "zoe",
      timestamp: new Date(),
      expression: "caring"
    }]);
  };

  const getInitialMessage = () => {
    if (aceScore <= 3) {
      return `Hey ${userInfo?.name || 'there'}! What can we explore together today?`;
    } else if (aceScore <= 6) {
      return `Hello ${userInfo?.name || 'strong spirit'}. What would you like to talk about today?`;
    } else {
      return `Hello ${userInfo?.name || 'brave soul'}. I'm here for you — what's on your mind today?`;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (step === "chat" && !avatarMode) {
      scrollToBottom();
    }
  }, [messages, step, avatarMode]);

  // Backend TTS Integration
  const speakMessage = async (audioData: string) => {
    if (!avatarMode || !audioData) {
      console.log("Avatar mode not enabled or no audio data");
      return;
    }
    
    // Stop any ongoing speech
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsSpeaking(false);
    
    try {
      setIsSpeaking(true);
      
      // Convert base64 audio data to blob
      const audioBlob = base64ToBlob(audioData, 'audio/mpeg');
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Play audio
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        
        audioRef.current.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl); // Clean up
          console.log("Zoe finished speaking");
        };
        
        audioRef.current.onerror = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
          console.error("Audio playback error");
        };
      }
      
    } catch (error) {
      console.error("TTS error:", error);
      setIsSpeaking(false);
    }
  };

  // Helper function to convert base64 to blob
  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };



  // Stop TTS function
  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Test TTS function
  const testTTS = async () => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Please say hello for voice testing",
          user_context: {
            ace_score: aceScore,
            age: userInfo?.age || 25,
            name: userInfo?.name || "User",
            application: "healing-rooms",
            test_tts: true
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.audio_data) {
          speakMessage(data.audio_data);
        }
      }
    } catch (error) {
      console.error("Test TTS error:", error);
    }
  };

  // Analyze message tone for avatar expression
  const analyzeExpression = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("happy") || lowerMessage.includes("joy") || lowerMessage.includes("great") || lowerMessage.includes("wonderful")) {
      return "happy";
    } else if (lowerMessage.includes("support") || lowerMessage.includes("care") || lowerMessage.includes("here for you") || lowerMessage.includes("help")) {
      return "caring";
    }
    
    return "neutral";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      console.log("Sending message to backend...");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          user_context: {
            ace_score: aceScore,
            age: userInfo?.age || 25,
            name: userInfo?.name || "User",
            application: "healing-rooms",
            avatar_mode: avatarMode
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);

      if (data.success && data.response) {
        const expression = analyzeExpression(data.response);
        
        const zoeMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          sender: "zoe",
          timestamp: new Date(),
          expression: expression
        };

        setMessages(prev => [...prev, zoeMessage]);
        
        // Play audio if avatar mode is enabled and audio data is provided
        if (avatarMode && data.audio_data) {
          setTimeout(() => speakMessage(data.audio_data), 800);
        }
      } else {
        throw new Error(data.error || "No response from AI");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Please know that I'm here for you, and you can try again in a moment. Make sure the backend server is running on http://localhost:8000",
        sender: "zoe",
        timestamp: new Date(),
        expression: "caring"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearMessages = () => {
    stopSpeaking(); // Stop any ongoing speech
    const initialMessage = getInitialMessage();
    setMessages([
      {
        id: "1",
        content: initialMessage,
        sender: "zoe",
        timestamp: new Date(),
        expression: "caring"
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hidden audio element for TTS playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
      
      {/* Main Content Container - Accounts for fixed navbar */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {step === "disclaimer" && (
            <Disclaimer onAccept={handleAcceptDisclaimer} />
          )}

          {step === "userInfo" && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-white/50">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  Meet Zoe
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Hi, I'm Zoe, your AI companion. I'm here to provide a safe space
                  for you to share and receive support. Let's start with some basic
                  information.
                </p>
              </div>
              <UserInfoForm
                onSubmit={handleUserInfoSubmit}
                onAgeRestriction={handleAgeRestriction}
              />
            </div>
          )}

          {step === "ageRestriction" && <AgeRestriction />}

          {step === "questionnaire" && userInfo && (
            <AceQuestionnaire 
              onComplete={handleQuestionnaireComplete} 
              userName={userInfo?.name || "User"} 
            />
          )}

          {step === "results" && userInfo && (
            <AceResults
              score={aceScore}
              userName={userInfo.name}
              onStartChat={handleStartChat}
            />
          )}

        {step === "chat" && userInfo && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden min-h-[700px] max-h-[85vh] flex flex-col border border-white/50">
            {/* Modern Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Chat with Zoe</h1>
                  <p className="text-indigo-100 text-sm md:text-base">Your personalized healing companion</p>
                </div>
              </div>
            </div>

            {/* Compact Settings Panel */}
            <div className="bg-gradient-to-r from-slate-50 to-indigo-50 p-4 border-b border-indigo-100 flex-shrink-0">
              <div className="flex items-center gap-3 md:gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-700 text-xs md:text-sm">Settings:</span>
                </div>

                <div className="flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-gray-600" />
                  <span className="text-xs md:text-sm text-gray-600">Avatar Mode:</span>
                  <Switch
                    checked={avatarMode}
                    onCheckedChange={setAvatarMode}
                  />
                </div>

                {avatarMode && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testTTS}
                    className="flex items-center gap-2"
                    disabled={isSpeaking}
                  >
                    <Play className="w-3 h-3" />
                    Test Voice
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearMessages}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </Button>

                {!avatarMode && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAvatarMode(!avatarMode)}
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-3 h-3" />
                    {avatarMode ? "Show Chat" : "Show Messages"}
                  </Button>
                )}
              </div>
            </div>

            {/* Main Content Area - Either Avatar or Chat Messages */}
            {avatarMode ? (
              <FullScreenAvatar 
                expression={messages[messages.length - 1]?.expression || "neutral"}
                isSpeaking={isSpeaking}
                isListening={isLoading}
                onStopSpeaking={stopSpeaking}
              />
            ) : (
              /* Messages Area */
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                        {/* User Icon */}
                        <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-sm ${
                          message.sender === "user" 
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600" 
                            : "bg-gradient-to-r from-pink-500 to-rose-500"
                        }`}>
                          {message.sender === "user" ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Heart className="w-4 h-4" />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                            : "bg-white border border-indigo-100 text-gray-800"
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <span className={`text-xs mt-1 block ${
                            message.sender === "user" ? "text-indigo-100" : "text-gray-500"
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Modern Input Area */}
            <div className="border-t border-indigo-100 bg-gradient-to-r from-slate-50 to-indigo-50 p-6 flex-shrink-0">
              <div className="flex gap-4">
                <Textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={avatarMode ? "Type your message... Zoe will speak her response" : "Share what's on your mind... I'm here to listen."}
                  className="flex-1 min-h-[50px] max-h-[120px] resize-none border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-2xl bg-white/80 backdrop-blur-sm"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 self-end"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Modern Footer */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 text-center text-xs text-gray-600 flex-shrink-0 border-t border-indigo-100">
              <p>
                Zoe is an AI companion designed to provide supportive conversations. 
                For crisis situations, please contact emergency services or a mental health professional.
              </p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

