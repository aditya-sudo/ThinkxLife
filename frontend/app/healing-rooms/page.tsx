"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Heart,
  Users,
  Shield,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Eye,
  Brain,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function HealingRoomsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Healing Rooms
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sacred spaces for transformation, healing, and growth. Experience
              personalized support through our AI-enhanced healing environment.
            </p>
            <Link
              href="/chatbot"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Enter Healing Room
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Healing Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every healing room is designed to provide a safe, supportive, and
              transformative experience tailored to your unique needs.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Safe Space",
                description:
                  "A protected environment where you can explore your thoughts and feelings without judgment.",
              },
              {
                icon: Users,
                title: "Personalized Support",
                description:
                  "AI-enhanced guidance that adapts to your specific healing journey and preferences.",
              },
              {
                icon: Sparkles,
                title: "Transformative Growth",
                description:
                  "Tools and insights designed to facilitate meaningful personal transformation.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Zoe AI Companion Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Zoe, Your AI Companion
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Zoe is our compassionate AI companion, designed to provide
              supportive assistance throughout your healing journey. She&apos;s
              trained in trauma-informed care and offers a non-judgmental space
              for exploration and growth.
            </p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 mt-12"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-indigo-100"
              >
                <Eye className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Trauma-Informed Approach
                </h3>
                <p className="text-gray-600">
                  Zoe understands the complexities of trauma and provides
                  responses grounded in evidence-based therapeutic principles.
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-indigo-100"
              >
                <MessageCircle className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  24/7 Availability
                </h3>
                <p className="text-gray-600">
                  Access supportive guidance whenever you need it, providing
                  consistency and reliability in your healing process.
                </p>
              </motion.div>
            </motion.div>
            <div className="mt-8">
              <Link
                href="/chatbot"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Your Session with Zoe
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Begin Your Healing Journey
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the first step towards transformation and growth. Our healing
              rooms are ready to support you whenever you&apos;re ready to
              begin.
            </p>
            <Link
              href="/chatbot"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Enter Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
