"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Shield,
  BookOpen,
  Brain,
  Menu,
  X,
  Users,
  Target,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isInView };
};

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Define interfaces
interface FeatureContent {
  title: string;
  icon: React.ReactNode;
  tagline: string;
  bullets: {
    title: string;
    description: string;
  }[];
  cta: {
    label: string;
    destination: string;
  };
}

// Sidebar component
const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  return (
    <>
      {/* Toggle Button - Always visible */}
      <motion.button
        className="fixed top-20 left-4 z-[100] bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Brain className="w-6 h-6 text-purple-600" />
        </motion.div>
      </motion.button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className="fixed top-0 left-0 h-full w-[280px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 border-r border-gray-200 dark:border-gray-700"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400 text-center">
              AI Awareness
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
              Navigate AI safely
            </p>
          </div>

          <nav className="flex-1 space-y-8">
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">
                Main
              </h2>
              <div className="space-y-1">
                <Link
                  href="#how-it-works"
                  className="flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>How It Works</span>
                </Link>
                <Link
                  href="#resources"
                  className="flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <Target className="w-5 h-5 mr-2" />
                  <span>Resources</span>
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">
                Others
              </h2>
              <div className="space-y-1">
                <Link
                  href="#features"
                  className="flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  <span>Features</span>
                </Link>
                <Link
                  href="/chatbot"
                  className="flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>Chat with Zoe</span>
                </Link>
              </div>
            </div>
          </nav>

          <div className="mt-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Start Learning
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default function AIAwarenessPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const progressBarWidth = useTransform(scrollY, [0, 2000], ["0%", "100%"]);

  const features: FeatureContent[] = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Ethics Explained",
      tagline:
        "Understand AI ethics through clear, practical examples and real-world scenarios.",
      bullets: [
        {
          title: "Bias & Fairness",
          description:
            "How data and algorithms can skew decisions, and simple steps to detect & correct it.",
        },
        {
          title: "Accountability",
          description:
            "Who's responsible when AI makes a mistake? Best practices for logging and audit trails.",
        },
        {
          title: "Transparency",
          description:
            "Techniques for explainable AI: model cards, feature importance, and user‐friendly reports.",
        },
        {
          title: "Case Studies",
          description:
            "Short stories showing ethics done right—and done wrong.",
        },
      ],
      cta: {
        label: "Learn More → Ethics Module",
        destination: "/awareness/ethics",
      },
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Regulatory Checklists",
      tagline:
        "Stay compliant with comprehensive guides for AI regulations and best practices.",
      bullets: [
        {
          title: "GDPR Essentials",
          description:
            "Data subject rights, consent flows, and breach notification templates.",
        },
        {
          title: "CCPA Overview",
          description:
            "Consumer privacy rights in California: opt-out flows and data deletion.",
        },
        {
          title: "EU AI Act Primer",
          description:
            "Risk levels, documentation requirements, and conformity assessment steps.",
        },
        {
          title: "Downloadable Checklists",
          description:
            "Printable PDFs to track your compliance tasks as you build or audit.",
        },
      ],
      cta: {
        label: "View Checklists → Compliance Hub",
        destination: "/awareness/compliance",
      },
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Interactive Quizzes",
      tagline:
        "Test your knowledge with engaging quizzes and practical exercises.",
      bullets: [
        {
          title: "Scenario-Based Questions",
          description:
            "Spot the bias in a hiring example, pick the right GDPR response.",
        },
        {
          title: "Instant Feedback",
          description:
            "Explanations on why each answer is right (or wrong), with links to deeper reading.",
        },
        {
          title: "Progress Tracker",
          description:
            "See your quiz history, average score, and earn 'Ethics Champion' badges.",
        },
        {
          title: "Adaptive Difficulty",
          description:
            "Questions get harder as you master the basics, so you keep learning.",
        },
      ],
      cta: {
        label: "Start Quiz → Knowledge Check",
        destination: "/awareness/quiz/basic-ai",
      },
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Learn the Basics",
      description: "Start with fundamental AI concepts and ethical principles",
    },
    {
      number: "02",
      title: "Explore Use Cases",
      description: "Discover real-world applications and potential risks",
    },
    {
      number: "03",
      title: "Practice with Quizzes",
      description: "Test your knowledge with interactive scenarios",
    },
    {
      number: "04",
      title: "Stay Compliant",
      description: "Use our checklists to ensure regulatory compliance",
    },
  ];

  const resources = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "AI Ethics Guide",
      description: "Comprehensive guide to ethical AI development",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Compliance Toolkit",
      description: "Templates and checklists for regulatory compliance",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Forum",
      description: "Connect with other AI practitioners and experts",
    },
  ];

  const testimonials = [
    {
      quote:
        "This platform helped us implement ethical AI practices across our organization.",
      author: "Tech Innovation Lab",
    },
    {
      quote:
        "The compliance checklists saved us months of research and preparation.",
      author: "AI Startup Collective",
    },
  ];

  return (
    <div
      className={cn(
        "min-h-screen",
        isDarkMode ? "dark bg-gray-900" : "bg-white",
      )}
    >
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main content with proper positioning */}
      <main
        className={`transition-all duration-300 ${
          isOpen ? "md:ml-[280px]" : ""
        } min-h-screen relative`}
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 right-0 h-1 bg-purple-600 z-50"
          style={{ width: progressBarWidth }}
        />

        {/* Hero Section with enhanced animations */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900"
          />

          {/* Content */}
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Understand AI{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Safely and Ethically
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                Navigate the future of AI with confidence through our
                comprehensive guides and interactive resources.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(147, 51, 234, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300"
                >
                  Start Your Journey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300"
                >
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section with enhanced cards */}
        <section id="features" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Comprehensive AI Education
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                Everything you need to understand and implement AI responsibly
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 },
                  }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-purple-600 dark:text-purple-400 mb-6 inline-block p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {feature.tagline}
                  </p>
                  <div className="space-y-3 mb-6">
                    {feature.bullets.map((bullet, bulletIndex) => (
                      <div
                        key={bulletIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {bullet.title}
                          </span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {" "}
                            — {bullet.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href={feature.cta.destination}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg"
                    >
                      {feature.cta.label}
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-20 bg-gray-50 dark:bg-gray-800"
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                How It Works
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                Your journey to AI literacy in four simple steps
              </motion.p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center mb-12 ${
                    index % 2 === 1 ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1">
                    <div
                      className={`${
                        index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-6xl font-bold text-purple-200 dark:text-purple-800 mb-2"
                      >
                        {step.number}
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-8 flex-shrink-0"
                  >
                    {index + 1}
                  </motion.div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Preview Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Interactive Learning Experience
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                Try our AI-powered assistant to get personalized guidance
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      AI
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 flex-1">
                      <p className="text-gray-900 dark:text-white">
                        Hi! I'm here to help you understand AI ethics. What
                        would you like to learn about?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-purple-600 rounded-lg p-3 max-w-xs">
                      <p className="text-white">
                        How can I detect bias in my AI model?
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      U
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Start Conversation
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Resource Spotlight
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                Downloadable materials and expert resources
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-purple-600 dark:text-purple-400 mb-4 inline-block"
                  >
                    {resource.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {resource.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Download →
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Trusted by Organizations
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg"
                >
                  <p className="text-gray-900 dark:text-white text-lg mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold">
                    — {testimonial.author}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
