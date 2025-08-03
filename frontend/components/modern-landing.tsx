'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ExperienceForm from './experience-form';
import ExperienceDisplay from './experience-display';
import { 
  Heart, 
  Brain, 
  Users, 
  Shield, 
  Sparkles, 
  ArrowRight,
  MessageCircle,
  Globe,
  Star,
  BookOpen,
  Award,
  HandHeart,
  CheckCircle,
  Quote,
  Zap,
  Target
} from 'lucide-react';

export default function ModernLanding() {
  const [mounted, setMounted] = useState(false);

  const benefits = [
    {
      icon: Shield,
      title: "Trauma-Informed Care",
      description: "Every interaction is designed with safety, trust, and emotional well-being at the core."
    },
    {
      icon: Brain,
      title: "Ethical AI",
      description: "We prioritize human dignity and responsible AI development in everything we create."
    },
    {
      icon: Users,
      title: "Community Connection",
      description: "Building bridges between diverse communities through shared values and understanding."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Creating positive change that reaches communities worldwide."
    }
  ];

  const services = [
    {
      icon: Brain,
      title: "AI Awareness",
      description: "Comprehensive learning about AI ethics, safety, and responsible usage with trauma-informed approaches."
    },
    {
      icon: Heart,
      title: "Healing Rooms",
      description: "Specialized spaces designed for trauma recovery and emotional wellbeing with AI-assisted support."
    },
    {
      icon: HandHeart,
      title: "Community Support",
      description: "Connect with others who understand your journey in a safe, moderated environment."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Discover"
    },
    {
      number: "2", 
      title: "Access"
    },
    {
      number: "3",
      title: "Experience"
    },
    {
      number: "4",
      title: "Thrive"
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
                <span className="text-[#5B2655] font-medium text-sm tracking-wide uppercase">
                  AI FOR HUMANITY
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#2C2C2C]">
                Finally Find Peace Of Mind
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-[#6B6B6B] mb-8 leading-relaxed">
                Helping you navigate life's challenges with wisdom, compassion, and inner peace through ethical AI and human-centered care.
              </p>

              {/* CTA Button */}
              <Button className="bg-[#5B2655] hover:bg-[#5A3A7A] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-[#5B2655]/20 hover:ring-[#5B2655]/40">
                Start Your Journey
              </Button>
            </div>

            {/* Right Image - Meditation Group */}
            <div className="hidden lg:flex justify-end">
              <div className="relative p-4 bg-white rounded-2xl border-2 border-[#C4A47C] shadow-lg">
                {/* Main Image Container */}
                <div className="w-80 h-96 overflow-hidden rounded-xl">
                  <img 
                    src="/meditation-group.jpg" 
                    alt="Mindfulness and meditation community session"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
              Why Choose ThinkxLife?
            </h2>
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
              Everything we do is guided by fundamental principles that put human wellbeing first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm mb-6">
                  <benefit.icon className="w-8 h-8 text-[#5B2655]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C2C2C] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6">
                About ThinkRound
              </h2>
              <p className="text-lg text-[#6B6B6B] mb-6 leading-relaxed">
                We are a San Francisco-based nonprofit organization dedicated to creating ethical AI solutions 
                that prioritize human dignity and wellbeing.
              </p>
              <p className="text-lg text-[#6B6B6B] mb-8 leading-relaxed">
                Through our Center for the Human Family, we're building bridges between diverse communities 
                and ensuring that AI development serves humanity's highest values.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#5B2655]" />
                  <span className="text-[#2C2C2C]">Nonprofit organization since 2004</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#5B2655]" />
                  <span className="text-[#2C2C2C]">Trauma-informed AI development</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#5B2655]" />
                  <span className="text-[#2C2C2C]">Community-centered approach</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#5B2655]" />
                  <span className="text-[#2C2C2C]">Global impact through local action</span>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8">
              <Quote className="w-12 h-12 text-[#5B2655] mb-6" />
              <blockquote className="text-xl text-[#2C2C2C] italic mb-6">
                "Earth is home. Humans are family. AI for humanity."
              </blockquote>
              <p className="text-[#6B6B6B]">
                This core belief guides everything we do at ThinkRound. We believe that technology should 
                serve humanity, not the other way around.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
              Comprehensive support for your AI awareness and personal growth journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300">
                <div className="w-16 h-16 bg-[#5B2655]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-[#5B2655]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C2C2C] mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-[#6B6B6B] text-center leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#5B2655]">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Getting started with ThinkxLife is simple and personalized to your journey.
            </p>
          </div>

          <div className="relative">
            {/* Steps Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 lg:space-x-16">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col lg:flex-row items-center">
                  {/* Step Card */}
                  <div className="text-center">
                    <div className="relative group mb-6">
                      {/* Animated Circle Background */}
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#5B2655] to-[#8B5A8F] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#5B2655] to-[#8B5A8F] animate-pulse opacity-75"></div>
                        <span className="text-2xl font-bold text-white relative z-10">
                          {step.number}
                        </span>
                      </div>
                      
                      {/* Floating Animation Effect */}
                      <div className="absolute inset-0 rounded-full border-2 border-[#5B2655]/20 animate-[ping_2s_ease-in-out_infinite]"></div>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-[#5B2655] tracking-wide uppercase">
                      {step.title}
                    </h3>
                  </div>

                  {/* Modern Animated Flow Arrow - Only show between steps */}
                  {index < steps.length - 1 && (
                    <>
                      {/* Desktop Flow Arrow */}
                      <div className="hidden lg:flex mx-12 items-center">
                        <div className="relative flex items-center">
                          {/* Flowing Dots Animation */}
                          <div className="flex space-x-2">
                            {[0, 1, 2, 3, 4].map((dotIndex) => (
                              <div
                                key={dotIndex}
                                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5B2655] to-[#8B5A8F]"
                                style={{
                                  animation: `flowDots 2s ease-in-out infinite ${dotIndex * 0.2}s`
                                }}
                              ></div>
                            ))}
                          </div>
                          
                          {/* Arrow Head */}
                          <div className="ml-2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="transform animate-bounce"
                            >
                              <path
                                d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
                                fill="url(#gradient)"
                              />
                              <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#5B2655" />
                                  <stop offset="100%" stopColor="#8B5A8F" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Flow Arrow */}
                      <div className="lg:hidden my-8 flex flex-col items-center">
                        <div className="relative flex flex-col items-center">
                          {/* Vertical Flowing Dots */}
                          <div className="flex flex-col space-y-2">
                            {[0, 1, 2, 3].map((dotIndex) => (
                              <div
                                key={dotIndex}
                                className="w-2 h-2 rounded-full bg-gradient-to-b from-[#5B2655] to-[#8B5A8F]"
                                style={{
                                  animation: `flowDotsVertical 2s ease-in-out infinite ${dotIndex * 0.2}s`
                                }}
                              ></div>
                            ))}
                          </div>
                          
                          {/* Downward Arrow */}
                          <div className="mt-2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="transform animate-bounce"
                            >
                              <path
                                d="M1 13.025l2.828-2.847 6.176 6.176v-16.354h3.992v16.354l6.176-6.176 2.828 2.847-11 10.975z"
                                fill="url(#gradientVertical)"
                              />
                              <defs>
                                <linearGradient id="gradientVertical" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#5B2655" />
                                  <stop offset="100%" stopColor="#8B5A8F" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes flowDots {
            0% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
            100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
          }
          
          @keyframes flowDotsVertical {
            0% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
            100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
          }
        `}</style>
      </section>

      {/* Community Experiences Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#F5F1EB]/50 to-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
              Real stories from people who have experienced transformation through our platform.
            </p>
          </div>

          {/* Experience Display */}
          <div className="mb-20">
            <ExperienceDisplay initialLimit={6} showPagination={true} compact={false} />
          </div>

          {/* Experience Submission Form */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-[#5B2655] mb-4">Share Your Story</h3>
              <p className="text-[#6B6B6B] max-w-xl mx-auto">
                Your experience could inspire and help others on their journey. We'd love to hear from you.
              </p>
            </div>
            
            <ExperienceForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#6B6B6B]">
              Common questions about our platform and approach to AI ethics.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#2C2C2C] mb-3">
                What makes ThinkxLife different from other AI platforms?
              </h3>
              <p className="text-[#6B6B6B]">
                We prioritize trauma-informed care and human-centered design in everything we do. Our AI systems 
                are built with safety, empathy, and cultural sensitivity at their core.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#2C2C2C] mb-3">
                Is the platform suitable for people with trauma histories?
              </h3>
              <p className="text-[#6B6B6B]">
                Yes, our entire platform is designed with trauma-informed principles. We provide safe spaces, 
                clear consent processes, and resources for when difficult emotions arise.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#2C2C2C] mb-3">
                How does Zoe, your AI companion, work?
              </h3>
              <p className="text-[#6B6B6B]">
                Zoe is trained in trauma-informed communication and provides empathetic support 24/7. She's designed 
                to be a supportive presence while always encouraging connection with human support when needed.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#2C2C2C] mb-3">
                Is ThinkxLife free to use?
              </h3>
              <p className="text-[#6B6B6B]">
                Yes, our core services are free to use. We're a nonprofit organization committed to making 
                ethical AI education and support accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
} 