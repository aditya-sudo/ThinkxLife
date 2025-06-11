"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: "ethics" | "threats" | "compliance";
}

const questions: Question[] = [
  // AI Ethics Questions
  {
    text: "What is algorithmic bias in AI systems?",
    options: [
      "A programming error that causes system crashes",
      "Unfair treatment of individuals or groups based on protected characteristics",
      "A method to improve AI performance",
      "A type of machine learning algorithm",
    ],
    correctAnswer:
      "Unfair treatment of individuals or groups based on protected characteristics",
    explanation:
      "Algorithmic bias occurs when AI systems systematically discriminate against " +
      "certain groups, often reflecting biases present in training data or design decisions.",
    category: "ethics",
  },
  {
    text: "Which principle is NOT typically part of ethical AI frameworks?",
    options: [
      "Transparency and explainability",
      "Fairness and non-discrimination",
      "Profit maximization",
      "Privacy and data protection",
    ],
    correctAnswer: "Profit maximization",
    explanation:
      "While profitability may be a business goal, ethical AI frameworks focus on " +
      "principles like transparency, fairness, privacy, and accountability rather than profit maximization.",
    category: "ethics",
  },
  {
    text: "What does 'AI explainability' mean?",
    options: [
      "Making AI systems run faster",
      "The ability to understand and interpret AI decision-making processes",
      "Teaching AI to explain jokes",
      "Making AI systems cheaper to develop",
    ],
    correctAnswer:
      "The ability to understand and interpret AI decision-making processes",
    explanation:
      "AI explainability refers to making AI systems transparent so humans can " +
      "understand how and why specific decisions or predictions are made.",
    category: "ethics",
  },

  // AI Threats Questions
  {
    text: "What is a 'deepfake' and why is it considered a threat?",
    options: [
      "A type of advanced AI processor",
      "Synthetic media that can convincingly replace a person's likeness with someone else's",
      "A method for training AI models faster",
      "A security protocol for AI systems",
    ],
    correctAnswer:
      "Synthetic media that can convincingly replace a person's likeness with someone else's",
    explanation:
      "Deepfakes use AI to create realistic but fake audio, video, or images of people, " +
      "posing threats to privacy, security, and information integrity.",
    category: "threats",
  },
  {
    text: "What is an 'adversarial attack' in AI?",
    options: [
      "When hackers steal AI training data",
      "Deliberately crafted inputs designed to fool AI systems into making wrong decisions",
      "Competition between different AI companies",
      "A type of AI training method",
    ],
    correctAnswer:
      "Deliberately crafted inputs designed to fool AI systems into making wrong decisions",
    explanation:
      "Adversarial attacks involve subtly modifying inputs to trick AI systems into " +
      "misclassification or incorrect outputs, often imperceptible to humans.",
    category: "threats",
  },
  {
    text: "Which of the following represents a privacy threat from AI systems?",
    options: [
      "AI systems consuming too much electricity",
      "Inference attacks that can reveal sensitive information about training data",
      "AI systems being too slow",
      "AI systems being too expensive",
    ],
    correctAnswer:
      "Inference attacks that can reveal sensitive information about training data",
    explanation:
      "AI systems can inadvertently leak information about their training data through " +
      "inference attacks, potentially exposing sensitive personal information.",
    category: "threats",
  },

  // AI Compliance Questions
  {
    text: "Under GDPR, what right do individuals have regarding automated decision-making?",
    options: [
      "The right to faster processing",
      "The right not to be subject to decisions based solely on automated processing",
      "The right to free AI services",
      "The right to develop their own AI",
    ],
    correctAnswer:
      "The right not to be subject to decisions based solely on automated processing",
    explanation:
      "GDPR Article 22 gives individuals the right not to be subject to decisions based " +
      "solely on automated processing, including profiling, that produces legal or significant effects.",
    category: "compliance",
  },
  {
    text: "What is the EU AI Act's approach to AI regulation?",
    options: [
      "Banning all AI systems",
      "Risk-based regulation with different requirements for different risk levels",
      "Only regulating AI in healthcare",
      "Requiring all AI to be open source",
    ],
    correctAnswer:
      "Risk-based regulation with different requirements for different risk levels",
    explanation:
      "The EU AI Act uses a risk-based approach, categorizing AI systems into different " +
      "risk levels (minimal, limited, high, unacceptable) with corresponding regulatory requirements.",
    category: "compliance",
  },
  {
    text: "What is required for 'high-risk' AI systems under the EU AI Act?",
    options: [
      "Only registration with authorities",
      "Comprehensive documentation, risk management, and human oversight",
      "Payment of special taxes",
      "Use of only European-made components",
    ],
    correctAnswer:
      "Comprehensive documentation, risk management, and human oversight",
    explanation:
      "High-risk AI systems must meet strict requirements including risk management systems, " +
      "data governance, documentation, human oversight, and accuracy standards.",
    category: "compliance",
  },
  {
    text: "Under CCPA, what rights do consumers have regarding their personal information used in AI?",
    options: [
      "Only the right to complain",
      "The right to know, delete, and opt-out of the sale of their personal information",
      "The right to free AI services",
      "No specific rights regarding AI",
    ],
    correctAnswer:
      "The right to know, delete, and opt-out of the sale of their personal information",
    explanation:
      "CCPA grants consumers rights to know what personal information is collected, delete " +
      "their information, and opt-out of the sale of their personal information, which applies to AI systems processing this data.",
    category: "compliance",
  },

  // Mixed Advanced Questions
  {
    text: "What is 'model poisoning' in AI security?",
    options: [
      "When AI models become corrupted due to hardware failure",
      "Deliberately introducing malicious data during training to compromise the model",
      "When AI models consume too much memory",
      "A method to improve AI performance",
    ],
    correctAnswer:
      "Deliberately introducing malicious data during training to compromise the model",
    explanation:
      "Model poisoning involves injecting malicious data into training datasets to compromise " +
      "the AI model's behavior, potentially causing it to make incorrect or harmful decisions.",
    category: "threats",
  },
  {
    text: "What is the principle of 'data minimization' in AI ethics and compliance?",
    options: [
      "Using the smallest possible dataset",
      "Collecting and processing only the personal data necessary for the specified purpose",
      "Minimizing the cost of data storage",
      "Reducing the time spent on data analysis",
    ],
    correctAnswer:
      "Collecting and processing only the personal data necessary for the specified purpose",
    explanation:
      "Data minimization is a key privacy principle requiring that personal data collection " +
      "and processing be limited to what is necessary, relevant, and proportionate to the purposes for which it is processed.",
    category: "compliance",
  },
];

export default function BasicAIQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getCategoryStats = () => {
    const stats = { ethics: 0, threats: 0, compliance: 0 };
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        stats[questions[index].category]++;
      }
    });
    return stats;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ethics":
        return "text-blue-600";
      case "threats":
        return "text-red-600";
      case "compliance":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "ethics":
        return "bg-blue-100 text-blue-800";
      case "threats":
        return "bg-red-100 text-red-800";
      case "compliance":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Chapter Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">
          AI Ethics, Threats & Compliance Quiz
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Test your understanding of AI ethics principles, security threats, and
          regulatory compliance requirements
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Ethics
          </span>
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            Threats
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Compliance
          </span>
        </div>
      </motion.div>

      {!showResults ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="max-w-3xl mx-auto p-8">
            {/* Progress Indicator */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadge(
                  questions[currentQuestion].category,
                )}`}
              >
                {questions[currentQuestion].category.toUpperCase()}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <motion.h2
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold mb-8 leading-relaxed"
            >
              {questions[currentQuestion].text}
            </motion.h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion] === option
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 hover:border-green-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        answers[currentQuestion] === option
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {answers[currentQuestion] === option && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                {currentQuestion === questions.length - 1
                  ? "Submit Quiz"
                  : "Next Question"}
              </Button>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-5xl mx-auto p-8">
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-4"
              >
                Quiz Complete! 🎉
              </motion.h2>
              <div className="text-2xl mb-4">
                You scored{" "}
                <span className="text-green-600 font-bold">
                  {calculateScore()}
                </span>{" "}
                out of {questions.length}
              </div>

              {/* Category Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {Object.entries(getCategoryStats()).map(([category, score]) => {
                  const total = questions.filter(
                    (q) => q.category === category,
                  ).length;
                  return (
                    <div
                      key={category}
                      className={`p-4 rounded-lg border-2 ${
                        category === "ethics"
                          ? "border-blue-200 bg-blue-50"
                          : category === "threats"
                          ? "border-red-200 bg-red-50"
                          : "border-green-200 bg-green-50"
                      }`}
                    >
                      <h3
                        className={`font-semibold capitalize ${getCategoryColor(
                          category,
                        )}`}
                      >
                        {category}
                      </h3>
                      <p className="text-2xl font-bold">
                        {score}/{total}
                      </p>
                      <p className="text-sm text-gray-600">
                        {Math.round((score / total) * 100)}% correct
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="text-gray-600 dark:text-gray-300">
                {calculateScore() === questions.length
                  ? "Perfect score! You're an AI ethics expert! 🌟"
                  : calculateScore() >= questions.length * 0.8
                  ? "Excellent work! You have a strong understanding of AI ethics! 👏"
                  : calculateScore() >= questions.length * 0.6
                  ? "Good job! Consider reviewing the areas you missed. 📚"
                  : "Keep learning! AI ethics is crucial for responsible AI development. 💪"}
              </div>
            </div>

            {/* Detailed Results */}
            <div className="mb-8 overflow-x-auto">
              <h3 className="text-xl font-semibold mb-4">Detailed Results</h3>
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-lg border ${
                      answers[index] === question.correctAnswer
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium">Q{index + 1}:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadge(
                          question.category,
                        )}`}
                      >
                        {question.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-medium mb-2">{question.text}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Your answer: </span>
                        <span
                          className={
                            answers[index] === question.correctAnswer
                              ? "text-green-600 font-medium"
                              : "text-red-600"
                          }
                        >
                          {answers[index] || "Not answered"}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Correct answer: </span>
                        <span className="text-green-600 font-medium">
                          {question.correctAnswer}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                      <span className="font-medium">Explanation: </span>
                      {question.explanation}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Link href="/ai-awareness">
                <Button variant="outline" className="w-full sm:w-auto">
                  ← Return to Home
                </Button>
              </Link>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setShowResults(false);
                  }}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Retake Quiz
                </Button>
                <Link href="/awareness/compliance">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                    Explore Compliance →
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
