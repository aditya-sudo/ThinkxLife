"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, User, LogOut, Activity, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Check if user is actively using AI features
  const isUsingAIAwareness = pathname?.startsWith('/ai-awareness') || pathname?.startsWith('/awareness');
  const isUsingHealingRooms = pathname?.startsWith('/healing-rooms');
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Combined Navigation Bar */}
      <nav className={`py-3 px-6 md:px-12 lg:px-24 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F1EB]/90 backdrop-blur-lg border-b border-[#D4C4B8]/50'
          : 'bg-[#F5F1EB]/70 backdrop-blur-sm border-b border-[#D4C4B8]/30'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-[#5B2655] to-[#5A3A7A] bg-clip-text text-transparent">
              Think<span className="text-[#5B2655]">x</span>Life
              <sup className="text-xs font-normal text-[#5B2655] ml-2 tracking-normal flex items-center">
                from <img src="/tr_logo.png" alt="Think Round" className="w-4 h-4 ml-1" /> Think Round, Inc
              </sup>
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="https://www.thinkround.org/aboutus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#5B2655] font-medium transition-colors duration-300 text-sm"
            >
              About
            </Link>
            <Link href="/ai-awareness" className="text-slate-600 hover:text-[#5B2655] text-sm font-medium transition-colors duration-300 relative">
              AI Awareness
              {isUsingAIAwareness && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </Link>
            <Link href="/healing-rooms" className="text-slate-600 hover:text-[#5B2655] text-sm font-medium transition-colors duration-300 relative">
              Healing Rooms
              {isUsingHealingRooms && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></div>
              )}
            </Link>
            <Link href="/exterior-spaces" className="text-slate-600 hover:text-[#5B2655] text-sm font-medium transition-colors duration-300">
              Exterior Spaces
            </Link>
            <Link
              href="https://thinkround.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#5B2655] font-medium transition-colors duration-300 text-sm"
            >
              Shop
            </Link>
            <Link
              href="https://www.thinkround.org/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#5B2655] font-medium transition-colors duration-300 text-sm"
            >
              Donate
            </Link>
          </div>

          {/* Authentication Section - Right */}
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-3 hover:bg-white/60 rounded-lg p-2 transition-all duration-300">
                    <Avatar className="w-8 h-8 border-2 border-[#5B2655]/20">
                      <AvatarImage src={session.user?.image || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-[#5B2655] to-[#8B5A8F] text-white text-sm">
                        {getInitials(session.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-slate-800">
                        {session.user?.name?.split(' ')[0] || 'User'}
                      </div>
                      <div className="text-xs text-slate-500">
                        Welcome back
                      </div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border-[#D4C4B8]">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-slate-800">
                      {session.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {session.user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-[#D4C4B8]" />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center w-full px-3 py-2 text-sm hover:bg-[#5B2655]/10">
                      <User className="w-4 h-4 mr-2" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/chatbot" className="flex items-center w-full px-3 py-2 text-sm hover:bg-[#5B2655]/10">
                      <Activity className="w-4 h-4 mr-2" />
                      AI Assistant
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#D4C4B8]" />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin">
                  <Button 
                    variant="ghost" 
                    className="text-[#5B2655] hover:bg-[#5B2655]/10 border border-[#5B2655]/20 hover:border-[#5B2655]/40 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-[#5B2655] hover:bg-[#5A3A7A] text-white shadow-lg hover:shadow-[#5B2655]/25 transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/60 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white/80 backdrop-blur-sm rounded-lg border border-[#D4C4B8]/50">
            <div className="flex flex-col space-y-3 px-4">
              <Link
                href="https://www.thinkround.org/aboutus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-[#5B2655] py-2 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/ai-awareness"
                className="text-slate-600 hover:text-[#5B2655] py-2 transition-colors duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Awareness
                {isUsingAIAwareness && (
                  <div className="ml-2 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </Link>
              <Link
                href="/healing-rooms"
                className="text-slate-600 hover:text-[#5B2655] py-2 transition-colors duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Healing Rooms
                {isUsingHealingRooms && (
                  <div className="ml-2 w-2 h-2 bg-rose-500 rounded-full"></div>
                )}
              </Link>
              <Link
                href="/exterior-spaces"
                className="text-slate-600 hover:text-[#5B2655] py-2 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Exterior Spaces
              </Link>
              <Link
                href="https://thinkround.shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-[#5B2655] py-2 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="https://www.thinkround.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-[#5B2655] py-2 transition-colors duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="w-4 h-4 mr-2" />
                Donate
              </Link>
              
              {!session && (
                <div className="pt-4 border-t border-[#D4C4B8]/50 space-y-3">
                  <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-[#5B2655] hover:bg-[#5B2655]/10">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-[#5B2655] hover:bg-[#5A3A7A] text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
