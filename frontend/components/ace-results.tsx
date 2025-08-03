"use client";

import { Button } from "@/components/ui/button";
import { Brain, Sparkles, MessageCircle, Heart, Shield, Lightbulb } from "lucide-react";

type AceResultsProps = {
  score: number;
  userName: string;
  onStartChat: () => void;
};

export default function AceResults({ score, userName, onStartChat }: AceResultsProps) {
  const getMessageBasedOnScore = () => {
    if (score <= 3) {
      return {
        title: "Your Journey Continues",
        message: "Your responses indicate a lower level of childhood adversity. Everyone's experiences shape them differently, and I'm here to support you in your journey of growth and self-discovery.",
        icon: "🌞",
        color: "from-green-50 to-emerald-50",
        borderColor: "border-green-200"
      };
    } else if (score <= 6) {
      return {
        title: "Strength in Your Story",
        message: "Your responses indicate a moderate level of childhood adversity. These experiences can have lasting effects, but resilience can be built with support and understanding. You've shown courage by sharing.",
        icon: "🌻",
        color: "from-amber-50 to-yellow-50",
        borderColor: "border-amber-200"
      };
    } else {
      return {
        title: "Courage in Vulnerability",
        message: "Your responses indicate a higher level of childhood adversity. It takes tremendous courage to acknowledge these experiences, and I'm here to provide a safe, judgment-free space for you.",
        icon: "🌸",
        color: "from-pink-50 to-rose-50",
        borderColor: "border-pink-200"
      };
    }
  };

  const resultData = getMessageBasedOnScore();

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-blue-200/50">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full shadow-lg">
            <Brain className="h-12 w-12 text-white" />
          </div>
          <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-3">
          Questionnaire Complete
        </h2>
        <p className="text-lg text-slate-600">
          Thank you for sharing, {userName}. Here's what this means for our conversations.
        </p>
      </div>

      {/* Results Card */}
      <div className={`bg-gradient-to-r ${resultData.color} ${resultData.borderColor} border rounded-2xl p-8 mb-8 shadow-lg`}>
        <div className="flex items-start gap-6">
          <div className="text-4xl">{resultData.icon}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">{resultData.title}</h3>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              {resultData.message}
            </p>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
              <p className="text-slate-700 font-medium">
                Thank you for trusting me with your story, {userName}. I'm here to listen and support you
                in a judgment-free space, tailored to your unique experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What This Means Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Heart className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="font-semibold text-blue-800">Personalized Support</h4>
          </div>
          <p className="text-blue-700">
            Our conversations will be tailored to your experiences, providing the most relevant and empathetic support.
          </p>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Shield className="h-5 w-5 text-cyan-600" />
            </div>
            <h4 className="font-semibold text-cyan-800">Safe Space</h4>
          </div>
          <p className="text-cyan-700">
            This information helps me create a safer, more understanding environment for our discussions.
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Lightbulb className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-semibold text-green-800">Thoughtful Responses</h4>
          </div>
          <p className="text-green-700">
            I'll be more mindful of language, topics, and approaches that work best for your situation.
          </p>
        </div>
      </div>

      {/* Start Chat Button */}
      <div className="text-center">
        <Button
          onClick={onStartChat}
          className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-4 px-8 rounded-2xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 text-xl"
        >
          <MessageCircle className="w-6 h-6 mr-3" />
          Start Chat with Zoe
        </Button>
        <p className="text-slate-500 mt-4">
          Ready to begin our conversation in a supportive, understanding environment
        </p>
      </div>
    </div>
  );
}
