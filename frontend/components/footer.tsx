'use client';

import { useState } from 'react';
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

export default function Footer() {
  const [_hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const socialLinks = [
    { icon: Facebook, name: 'facebook', href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, name: 'twitter', href: '#', color: 'hover:text-sky-500' },
    { icon: Instagram, name: 'instagram', href: '#', color: 'hover:text-pink-600' },
  ];

  return (
    <footer className="bg-white text-[#2C2C2C] border-t border-[#D4C4B8]/30">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Brand & Contact Info - Left */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Brand - Match Header Logo */}
            <div className="text-center md:text-left">
              <Link href="/" className="inline-block">
                <span className="text-lg font-bold tracking-wider bg-gradient-to-r from-[#5B2655] to-[#5A3A7A] bg-clip-text text-transparent">
                  Think<span className="text-[#5B2655]">x</span>Life
                  <sup className="text-xs font-normal text-[#5B2655] ml-2 tracking-normal flex items-center">
                    from <img src="/tr_logo.png" alt="Think Round" className="w-3 h-3 ml-1" /> Think Round, Inc
                  </sup>
                </span>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B6B6B]">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#5B2655]" />
                <span>2140 Bush Street, 1, San Francisco, CA 94115</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#5B2655]" />
                <span>(415) 602-9599</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#5B2655]" />
                <span>info@thinkround.org</span>
              </div>
            </div>
          </div>

          {/* Social Links & Support - Right */}
          <div className="flex items-center gap-3">
            {/* Social Links */}
            <div className="flex gap-1">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`p-1.5 rounded-md bg-white/60 backdrop-blur-sm ${social.color} hover:bg-white/80 transition-all duration-300 hover:scale-110`}
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <social.icon className="w-3 h-3" />
                </Link>
              ))}
            </div>

            {/* Support Button */}
            <Link 
              href="https://www.thinkround.org/donate" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#5B2655] to-[#8B5A8F] hover:from-[#8B5A8F] hover:to-[#5B2655] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md hover:shadow-[#5B2655]/25 transition-all duration-300 transform hover:scale-105">
                <Heart className="w-3 h-3" />
                Support
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#D4C4B8]/30 py-2">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-[#6B6B6B]">
            <div className="flex items-center gap-2">
              <span>&copy; {new Date().getFullYear()} Think Round, Inc.</span>
              <span>•</span>
              <span>All rights reserved</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-2.5 h-2.5 text-red-500" /> for humanity
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Link href="/privacy" className="hover:text-[#5B2655] transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-[#5B2655] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
