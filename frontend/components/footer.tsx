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

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 text-slate-700 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-200/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4">
        {/* Main Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          {/* Brand Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">
                Think<span className="text-purple-600">x</span>Life
                <sub className="text-xs font-normal text-gray-400 ml-2 tracking-normal">by Think Round, Inc</sub>
              </span>
            </Link>
          </div>

          {/* Contact Info - Horizontal Layout */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center group">
              <MapPin className="w-3 h-3 text-purple-600 mr-1 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-300" />
              <span className="group-hover:text-slate-700 transition-colors duration-300">
                2140 Bush Street, 1, San Francisco, CA 94115
              </span>
            </div>
            <div className="flex items-center group">
              <Phone className="w-3 h-3 text-purple-600 mr-1 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-300" />
              <span className="group-hover:text-slate-700 transition-colors duration-300">
                (415) 602-9599
              </span>
            </div>
            <div className="flex items-center group">
              <Mail className="w-3 h-3 text-purple-600 mr-1 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-300" />
              <span className="group-hover:text-slate-700 transition-colors duration-300">
                info@thinkround.org
              </span>
            </div>
          </div>

          {/* Social Links & Donate */}
          <div className="flex items-center gap-3">
            {/* Social Links */}
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`p-1.5 bg-white/60 backdrop-blur-sm border border-purple-200/30 rounded-md text-slate-500 ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-md`}
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <social.icon size={12} />
                </Link>
              ))}
            </div>

            {/* Donate Button */}
            <Link href="https://www.thinkround.org/donate">
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium shadow-md hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <Heart className="w-2.5 h-2.5" />
                Support
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-purple-200/30 pt-2 pb-2">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span>&copy; {new Date().getFullYear()} Think Round, Inc.</span>
              <span className="text-purple-400">•</span>
              <span>All rights reserved</span>
              <span className="text-purple-400">•</span>
              <span className="flex items-center">
                Made with <Heart className="w-2.5 h-2.5 text-red-500 mx-1 animate-pulse" /> for humanity
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
      </div>
    </footer>
  );
}
