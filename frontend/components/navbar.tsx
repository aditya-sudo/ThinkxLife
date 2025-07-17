"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Brain, Heart, User, LogOut, Activity, Building2, Home, ShoppingBag, Palette, DollarSign } from "lucide-react";
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
      {/* First Navigation Bar - About, Shop, Art, Donate, Auth */}
      <nav className={`py-2 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-50/90 backdrop-blur-lg border-b border-slate-200/50'
          : 'bg-slate-50/70 backdrop-blur-sm border-b border-slate-100/30'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo - Completely Left */}
          <Link href="/" className="flex items-center group pl-4">
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">
              Think<span className="text-purple-600">x</span>Life
              <sub className="text-xs font-normal text-gray-400 ml-2 tracking-normal">by Think Round, Inc</sub>
            </span>
          </Link>

          {/* Desktop Navigation - First Bar Center */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="https://www.thinkround.org/aboutus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-slate-600 hover:text-purple-700 font-medium transition-colors duration-300 text-sm"
            >
              <User className="w-4 h-4 mr-1.5" />
              About
            </Link>
            <Link
              href="https://thinkround.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-slate-600 hover:text-purple-700 font-medium transition-colors duration-300 text-sm"
            >
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              Shop Art
            </Link>
            <Link
              href="https://www.thinkround.org/art"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-slate-600 hover:text-purple-700 font-medium transition-colors duration-300 text-sm"
            >
              <Palette className="w-4 h-4 mr-1.5" />
              Art
            </Link>
            <Link
              href="https://www.thinkround.org/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-slate-600 hover:text-purple-700 font-medium transition-colors duration-300 text-sm"
            >
              <DollarSign className="w-4 h-4 mr-1.5" />
              Donate
            </Link>
          </div>

          {/* Mobile Logo */}
          <Link href="/" className="flex items-center group md:hidden">
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">
              Think<span className="text-purple-600">x</span>Life
              <sub className="text-xs font-normal text-gray-400 ml-2 tracking-normal">by Think Round, Inc</sub>
            </span>
          </Link>

          {/* Authentication Section */}
          <div className="hidden md:flex items-center space-x-3 pr-4">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm">
                        {getInitials(session.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    {(isUsingAIAwareness || isUsingHealingRooms) && (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session.user?.name && (
                        <p className="font-medium text-sm">{session.user.name}</p>
                      )}
                      {session.user?.email && (
                        <p className="w-[200px] truncate text-xs text-muted-foreground">
                          {session.user.email}
                        </p>
                      )}
                      {(isUsingAIAwareness || isUsingHealingRooms) && (
                        <div className="flex items-center gap-1 mt-1">
                          <Activity className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-600 font-medium">
                            {isUsingAIAwareness ? 'Using AI Awareness' : 'In Healing Rooms'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 px-3 py-1 text-sm h-8">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-3 py-1 text-sm h-8">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-200/30 text-slate-700 hover:text-purple-700 transition-all duration-300 mr-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Second Navigation Bar - Home, AI Awareness, Healing Rooms, Exterior Spaces */}
      <nav className={`py-2 px-6 md:px-12 lg:px-24 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-slate-200/30'
          : 'bg-white/70 backdrop-blur-sm border-b border-slate-100/20'
      }`}>
        <div className="flex items-center justify-center">
          {/* Desktop Navigation - Second Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <Button className={`${
                isHome 
                  ? 'bg-slate-200 text-slate-800 shadow-sm hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 hover:text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-gradient-to-r hover:from-slate-400 hover:to-slate-500 hover:text-white'
              } rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300 transform hover:scale-105`}>
                <Home className="w-3.5 h-3.5 mr-1.5" />
                Home
              </Button>
            </Link>

            <Link href="/ai-awareness">
              <Button className="bg-slate-100 text-slate-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:text-white rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300 transform hover:scale-105 relative">
                <Brain className="w-3.5 h-3.5 mr-1.5" />
                AI Awareness
                {isUsingAIAwareness && (
                  <div className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-bold rounded-full text-white bg-green-500">
                    USING
                  </div>
                )}
              </Button>
            </Link>

            <Link href="/healing-rooms">
              <Button className="bg-slate-100 text-slate-600 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-600 hover:text-white rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300 transform hover:scale-105 relative">
                <Heart className="w-3.5 h-3.5 mr-1.5" />
                Healing Rooms
                {isUsingHealingRooms && (
                  <div className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-bold rounded-full text-white bg-rose-500">
                    USING
                  </div>
                )}
              </Button>
            </Link>

            <Link href="/exterior-spaces">
              <Button className="bg-slate-100 text-slate-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300 transform hover:scale-105">
                <Building2 className="w-3.5 h-3.5 mr-1.5" />
                Exterior Spaces
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/90 backdrop-blur-lg border-b border-purple-200/30 p-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            {/* First Bar Links */}
            <div className="pb-3 border-b border-slate-200">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Organization</h3>
              <Link
                href="https://www.thinkround.org/aboutus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-700 hover:text-purple-700 font-medium py-2 px-3 rounded-lg hover:bg-purple-50/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4 mr-3" />
                About
              </Link>
              <Link
                href="https://thinkround.shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-700 hover:text-purple-700 font-medium py-2 px-3 rounded-lg hover:bg-purple-50/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="w-4 h-4 mr-3" />
                Shop Art
              </Link>
              <Link
                href="https://www.thinkround.org/art"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-700 hover:text-purple-700 font-medium py-2 px-3 rounded-lg hover:bg-purple-50/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Palette className="w-4 h-4 mr-3" />
                Art
              </Link>
              <Link
                href="https://www.thinkround.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-700 hover:text-purple-700 font-medium py-2 px-3 rounded-lg hover:bg-purple-50/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <DollarSign className="w-4 h-4 mr-3" />
                Donate
              </Link>
            </div>

            {/* Second Bar Links */}
            <div className="pb-3">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">ThinkxLife Platform</h3>
              
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Button className={`w-full ${
                  isHome 
                    ? 'bg-slate-200 text-slate-800 hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 hover:text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-gradient-to-r hover:from-slate-400 hover:to-slate-500 hover:text-white'
                } rounded-lg py-2 text-sm font-medium shadow-sm mb-2 transition-all duration-300`}>
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>

              {/* Always show direct links to all sections */}
              <Link href="/ai-awareness" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-slate-100 text-slate-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:text-white rounded-lg py-2 text-sm font-medium shadow-sm mb-2 relative transition-all duration-300">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Awareness
                  {isUsingAIAwareness && (
                    <div className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-bold rounded-full text-white bg-green-500">
                      USING
                    </div>
                  )}
                </Button>
              </Link>
              <Link href="/healing-rooms" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-slate-100 text-slate-600 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-600 hover:text-white rounded-lg py-2 text-sm font-medium shadow-sm mb-2 relative transition-all duration-300">
                  <Heart className="w-4 h-4 mr-2" />
                  Healing Rooms
                  {isUsingHealingRooms && (
                    <div className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-bold rounded-full text-white bg-rose-500">
                      USING
                    </div>
                  )}
                </Button>
              </Link>
              <Link href="/exterior-spaces" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-slate-100 text-slate-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white rounded-lg py-2 text-sm font-medium shadow-sm mb-2 transition-all duration-300">
                  <Building2 className="w-4 h-4 mr-2" />
                  Exterior Spaces
                </Button>
              </Link>
            </div>

            {/* Mobile Authentication */}
            <div className="pt-3 border-t border-slate-200">
              {session ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm">
                        {getInitials(session.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{session.user?.name}</p>
                      <p className="text-xs text-slate-500">{session.user?.email}</p>
                    </div>
                  </div>
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 py-2 text-sm">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 py-2 text-sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 py-2 text-sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 text-sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
