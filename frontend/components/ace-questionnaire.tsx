"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Sparkles, CheckCircle, XCircle, SkipForward } from "lucide-react";

const ACE_QUESTIONS = [
  "Before 18 years old, Did a parent or other adult in the household often swear at you, insult you, put you down, or humiliate you?",
  "Before 18 years old, Did a parent or other adult in the household often push, grab, slap, or throw something at you?",
  "Before 18 years old, Did an adult or person at least 5 years older ever touch, fondle, or have you touch them in a sexual way?",
  "Before 18 years old, Did you often feel that no one in your family loved you or thought you were important or special?",
  "Before 18 years old, Did you often feel that you didn't have enough to eat, had to wear dirty clothes, or had no one to protect you?",
  "Before 18 years old, Were your parents ever separated, divorced, or did a biological parent leave you for another reason?",
  "Before 18 years old, Was your mother or stepmother often pushed, grabbed, slapped, or had something thrown at her?",
  "Before 18 years old, Did you live with anyone who was a problem drinker, alcoholic, or who used street drugs?",
  "Before 18 years old, Was a household member depressed, mentally ill, or did they ever attempt suicide?",
  "Before 18 years old, Did a household member go to jail or prison?",
];

type Answer = "yes" | "no" | "skip" | null;

type AceQuestionnaireProps = {
  onComplete: (score: number, answers: Answer[]) => void;
  userName: string;
};

export default function AceQuestionnaire({
  onComplete,
  userName,
}: AceQuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(
    Array(ACE_QUESTIONS.length).fill(null),
  );
  const [currentAnswer, setCurrentAnswer] = useState<Answer>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance to next question after selection
  useEffect(() => {
    if (currentAnswer !== null && !isTransitioning) {
      setIsTransitioning(true);

      // Small delay for visual feedback
      setTimeout(() => {
        handleNext();
        setIsTransitioning(false);
      }, 800);
    }
  }, [currentAnswer]);

  const handleNext = () => {
    if (currentAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = currentAnswer;

    setAnswers(newAnswers);

    if (currentQuestion < ACE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer(null);
    } else {
      // Calculate score
      const score = calculateAceScore(newAnswers);
      onComplete(score, newAnswers);
    }
  };

  const calculateAceScore = (answers: Answer[]): number => {
    return answers.reduce((score, answer) => {
      if (answer === "yes") return score + 1;
      if (answer === "skip") return score + 0.25;
      return score;
    }, 0);
  };

  const progress = ((currentQuestion + 1) / ACE_QUESTIONS.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setCurrentAnswer(value as Answer);
  };

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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-3">
          Hi {userName}, let's complete this questionnaire
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          These questions help me understand your experiences better so I can provide more personalized support.
          Your answers are completely confidential and will only be used to tailor our conversations.
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm text-slate-600 font-medium">
          <span>
            Question {currentQuestion + 1} of {ACE_QUESTIONS.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress
          value={progress}
          className="h-3 bg-slate-200"
        />
      </div>

      {/* Question Card */}
      <Card className="bg-gradient-to-r from-slate-50 to-purple-50 border border-purple-200 shadow-lg mb-8">
        <CardContent className="pt-8 pb-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 leading-relaxed">
            {ACE_QUESTIONS[currentQuestion]}
          </h3>

          <RadioGroup
            value={currentAnswer || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-4"
            disabled={isTransitioning}
          >
            <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:bg-green-50 ${
              currentAnswer === "yes" ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-green-300"
            }`}>
              <RadioGroupItem value="yes" id="yes" className="text-green-600" />
              <Label htmlFor="yes" className="flex items-center gap-3 cursor-pointer flex-1 text-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Yes
              </Label>
            </div>

            <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:bg-blue-50 ${
              currentAnswer === "no" ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
            }`}>
              <RadioGroupItem value="no" id="no" className="text-blue-600" />
              <Label htmlFor="no" className="flex items-center gap-3 cursor-pointer flex-1 text-lg">
                <XCircle className="w-5 h-5 text-blue-600" />
                No
              </Label>
            </div>

            <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:bg-amber-50 ${
              currentAnswer === "skip" ? "border-amber-500 bg-amber-50" : "border-slate-200 hover:border-amber-300"
            }`}>
              <RadioGroupItem value="skip" id="skip" className="text-amber-600" />
              <Label htmlFor="skip" className="flex items-center gap-3 cursor-pointer flex-1 text-lg">
                <SkipForward className="w-5 h-5 text-amber-600" />
                Prefer not to answer
              </Label>
            </div>
          </RadioGroup>

          {/* Auto-advance indicator */}
          {currentAnswer && (
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-blue-700 font-medium">
                  {currentQuestion < ACE_QUESTIONS.length - 1
                    ? "Moving to next question..."
                    : "Completing questionnaire..."
                  }
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Next Button (backup) */}
      {!isTransitioning && (
        <Button
          onClick={handleNext}
          disabled={currentAnswer === null}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {currentQuestion < ACE_QUESTIONS.length - 1
            ? "Next Question"
            : "Complete Questionnaire"}
        </Button>
      )}

      {/* Support Message */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Brain className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">You're doing great, {userName}</h3>
            <p className="text-blue-700">
              Remember, there are no right or wrong answers. I'm here to provide support regardless of your responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
