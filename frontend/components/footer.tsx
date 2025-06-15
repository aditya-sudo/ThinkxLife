'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Brain,
  Sparkles,
  ArrowRight,
  Heart,
  Globe,
  Users,
  Shield,
} from "lucide-react";

export default function Footer() {
  const [_hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const socialLinks = [
    { icon: Facebook, name: 'facebook', href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, name: 'twitter', href: '#', color: 'hover:text-sky-500' },
    { icon: Instagram, name: 'instagram', href: '#', color: 'hover:text-pink-600' },
  ];

  const features = [
    { icon: Brain, text: 'AI-Powered', color: 'text-purple-600' },
    { icon: Shield, text: 'Ethical', color: 'text-green-600' },
    { icon: Globe, text: 'Global', color: 'text-blue-600' },
    { icon: Users, text: 'Community', color: 'text-orange-600' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 text-slate-700 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-200/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            {/* ThinkxLife from ThinkRound Inc */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">
                  Think<span className="text-purple-600">x</span>Life
                  <sub className="text-xs font-normal text-gray-400 ml-2 tracking-normal">by Think Round, Inc</sub>
                </span>
              </Link>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Pioneering AI for humanity through ethical innovation, community engagement,
              and transformative technology that connects us all.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-3">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className={`p-2 bg-white/60 backdrop-blur-sm border border-purple-200/30 rounded-lg text-slate-500 ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <social.icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <ArrowRight className="w-4 h-4 text-purple-600 mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'About Us', href: 'https://www.thinkround.org/aboutus' },
                { name: 'Shop Art', href: 'https://thinkround.shop/' },
                { name: 'Zoe', href: '/chatbot' },
                { name: 'AI Awareness', href: '/ai-awareness' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-slate-600 hover:text-purple-700 transition-all duration-300"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                    <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <Mail className="w-4 h-4 text-purple-600 mr-2" />
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <MapPin className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-300" />
                <div className="text-xs text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                  <div>2140 Bush Street, 1</div>
                  <div>San Francisco, CA 94115</div>
                  <div>United States</div>
                </div>
              </li>
              <li className="flex items-center group">
                <Phone className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-300" />
                <span className="text-xs text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                  (415) 602-9599
                </span>
              </li>
              <li className="flex items-center group">
                <Mail className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-300" />
                <span className="text-xs text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                  info@thinkround.org
                </span>
              </li>
            </ul>

            {/* Donate Button */}
            <div className="mt-6">
              <Link href="https://www.thinkround.org/donate">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  <Heart className="w-3 h-3" />
                  Support Our Mission
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-purple-200/30 pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <span>&copy; {new Date().getFullYear()} Think Round, Inc.</span>
            <span className="text-purple-400">•</span>
            <span>All rights reserved</span>
            <span className="text-purple-400">•</span>
            <span className="flex items-center">
              Made with <Heart className="w-3 h-3 text-red-500 mx-1 animate-pulse" /> for humanity
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-500">
            <Link href="#" className="hover:text-purple-700 transition-colors duration-300">
              Privacy Policy
            </Link>
            <span className="text-purple-400">•</span>
            <Link href="#" className="hover:text-purple-700 transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
