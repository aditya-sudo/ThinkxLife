"use client";

import React, { useState, useRef } from "react";
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
  Users,
  Target,
  Heart,
  Palette,
  GraduationCap,
  Globe,
  MessageCircle,
  Sparkles,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    transition: { duration: 0.6 },
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
          transition={{ duration: 0.3 }}
        >
          <Brain className="w-6 h-6 text-green-600" />
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
          transition: { duration: 0.3 },
        }}
        className="fixed top-0 left-0 h-full w-[280px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 border-r border-gray-200 dark:border-gray-700"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-green-600 dark:text-green-400 text-center">
              AI at ThinkRound
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
              AI for humanity
            </p>
          </div>

          <nav className="flex-1 space-y-8">
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">
                Our Approach
              </h2>
              <div className="space-y-1">
                <Link
                  href="#philosophy"
                  className="flex items-center justify-center text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors py-1"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  <span>Philosophy</span>
                </Link>
                <Link
                  href="#applications"
                  className="flex items-center justify-center text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors py-1"
                  onClick={() => setIsOpen(false)}
                >
                  <Code className="w-5 h-5 mr-2" />
                  <span>Applications</span>
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">
                Programs
              </h2>
              <div className="space-y-1">
                <Link
                  href="#programs"
                  className="flex items-center justify-center text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors py-1"
                  onClick={() => setIsOpen(false)}
                >
                  <Users className="w-5 h-5 mr-2" />
                  <span>AI Programs</span>
                </Link>
                <Link
                  href="/healing-rooms"
                  className="flex items-center justify-center text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors py-1"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  <span>Healing Rooms</span>
                </Link>
              </div>
            </div>
          </nav>

          <div className="mt-auto">
            <Link href="/chatbot">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              >
                Chat with Zoe
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default function AIAwarenessPage() {
  const [isDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const progressBarWidth = useTransform(scrollY, [0, 2000], ["0%", "100%"]);
  const philosophySectionRef = useRef<HTMLElement>(null);

  const scrollToPhilosophy = () => {
    philosophySectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const features: FeatureContent[] = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Trauma-Informed AI",
      tagline:
        "Our AI systems are designed with trauma-informed care principles, ensuring safe and supportive interactions for all users.",
      bullets: [
        {
          title: "Zoe AI Companion",
          description:
            "Our empathetic AI companion Zoe provides 24/7 support with trauma-informed responses and emotional intelligence.",
        },
        {
          title: "ACEs Integration",
          description:
            "Adverse Childhood Experiences (ACEs) assessment integration helps personalize interactions for healing journeys.",
        },
        {
          title: "Crisis Detection",
          description:
            "Advanced algorithms detect crisis situations and provide appropriate resources and professional referrals.",
        },
        {
          title: "Safety First",
          description:
            "Every AI interaction is filtered through our trauma-safety protocols to prevent re-traumatization.",
        },
      ],
      cta: {
        label: "Experience Zoe →",
        destination: "/chatbot",
      },
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "AI in Arts & Education",
      tagline:
        "Integrating AI into our arts and education programs while preserving human creativity and cultural authenticity.",
      bullets: [
        {
          title: "Creative Collaboration",
          description:
            "AI tools that enhance human creativity rather than replace artists, supporting our community art programs.",
        },
        {
          title: "Cultural Preservation",
          description:
            "Using AI to document and preserve cultural narratives from diverse communities in San Francisco's Bayview-Hunters Point.",
        },
        {
          title: "Educational Equity",
          description:
            "AI-powered personalized learning that adapts to different learning styles and cultural backgrounds.",
        },
        {
          title: "Youth Empowerment",
          description:
            "Teaching young people to understand and responsibly use AI tools in their creative and educational pursuits.",
        },
      ],
      cta: {
        label: "Explore Programs →",
        destination: "https://www.thinkround.org/art",
      },
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Community & Global Impact",
      tagline:
        "Leveraging AI to strengthen communities and create positive global change through our Center for the Human Family vision.",
      bullets: [
        {
          title: "Community Building",
          description:
            "AI-powered tools that connect community members, facilitate cultural exchange, and strengthen social bonds.",
        },
        {
          title: "Social Justice",
          description:
            "Using AI to identify and address systemic inequalities while ensuring algorithmic fairness in our programs.",
        },
        {
          title: "Global Connection",
          description:
            "Creating AI-mediated connections between communities worldwide, fostering understanding and collaboration.",
        },
        {
          title: "Environmental Awareness",
          description:
            "AI systems that promote environmental consciousness and sustainable practices in our community work.",
        },
      ],
      cta: {
        label: "Join Our Community →",
        destination: "https://www.thinkround.org/aboutus",
      },
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Human-Centered Design",
      description: "We start with human needs and values, ensuring AI serves humanity rather than replacing it",
    },
    {
      number: "02",
      title: "Trauma-Informed Development",
      description: "Every AI system is built with trauma-informed care principles at its core",
    },
    {
      number: "03",
      title: "Community Integration",
      description: "AI tools are designed to strengthen communities and preserve cultural authenticity",
    },
    {
      number: "04",
      title: "Ethical Governance",
      description: "Continuous monitoring and improvement ensure our AI remains ethical and beneficial",
    },
  ];

  const programs = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "ThinkxLife Platform",
      description: "Our comprehensive AI awareness and ethics platform with Zoe AI companion",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "AI Education Workshops",
      description: "Community workshops teaching responsible AI use and digital literacy",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI for Healing",
      description: "Trauma-informed AI tools supporting mental health and healing journeys",
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
          className="fixed top-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600 z-50"
          style={{ width: progressBarWidth }}
        />

        {/* Hero Section with enhanced animations */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900"
          />

          {/* Content */}
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg"
              >
                <Brain className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Think Round Inc • AI for Humanity
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
              >
                AI that serves{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  humanity
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed"
              >
                Discover how Think Round Inc integrates artificial intelligence into our arts, education, and 
                community programs while maintaining our core values of human dignity, cultural authenticity, 
                and trauma-informed care.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToPhilosophy}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                >
                  Learn Our Approach
                </motion.button>
                <Link href="/chatbot">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white hover:bg-gray-50 text-green-600 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg border border-green-200 hover:border-green-300"
                  >
                    Chat with Zoe
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" ref={philosophySectionRef} className="py-20 bg-white dark:bg-gray-900">
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
                Our AI Philosophy
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              >
                At Think Round Inc, we believe "Earth is home. Humans are family. AI for humanity." 
                Our approach to artificial intelligence is rooted in human dignity, cultural respect, and healing.
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
                  }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-green-600 dark:text-green-400 mb-6 inline-block p-3 bg-green-100 dark:bg-green-900/20 rounded-xl"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 transition-colors">
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
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
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
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg shadow-lg hover:shadow-green-500/25"
                    >
                      {feature.cta.label}
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How We Work Section */}
        <section
          id="applications"
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
                How We Integrate AI
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                Our four-step approach ensures AI enhances rather than replaces human connection and creativity
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
                        className="text-6xl font-bold text-green-200 dark:text-green-800 mb-2"
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
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-8 flex-shrink-0 shadow-lg"
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
                AI Awareness Agent
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                Our specialized AI agent will help you understand AI ethics, safety, and responsible usage
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
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      A
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 flex-1">
                      <p className="text-gray-900 dark:text-white">
                        Hello! I'm your AI Awareness Agent. I'm here to help you understand AI ethics, 
                        safety principles, and responsible AI usage. I can guide you through AI awareness 
                        topics and best practices.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 max-w-xs">
                      <p className="text-white">
                        I'd like to learn about AI ethics and how to use AI responsibly in my daily life.
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      U
                    </div>
                  </div>
                </div>
                <div className="mt-6 relative">
                  <motion.button
                    className="w-full bg-gray-400 text-gray-600 font-semibold py-3 px-6 rounded-lg cursor-not-allowed shadow-lg relative"
                    disabled
                  >
                    Start AI Awareness Session
                    <span className="absolute -top-2 -right-2 text-xs bg-gray-600 text-white px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" className="py-20 bg-gray-50 dark:bg-gray-800">
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
                Our AI Programs
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                Explore our initiatives that integrate AI with community building, arts education, and healing
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {programs.map((program, index) => (
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
                    className="text-green-600 dark:text-green-400 mb-4 inline-block"
                  >
                    {program.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {program.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
                  >
                    Learn More →
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Join Our AI for Humanity Mission
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
              >
                Be part of a community that's pioneering ethical AI development and ensuring 
                technology serves humanity's highest values.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/chatbot">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-green-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
                  >
                    Try ThinkxLife Platform
                  </motion.button>
                </Link>
                <Link href="https://www.thinkround.org/donate">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300"
                  >
                    Support Our Mission
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
