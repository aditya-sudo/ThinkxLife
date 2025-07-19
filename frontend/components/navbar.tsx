"use client";

import { useState } from "react";
import Link from "next/link";
<<<<<<< Updated upstream
import { Menu, X, Brain } from "lucide-react";
=======
import { Menu, X, User, LogOut, Activity, Heart } from "lucide-react";
>>>>>>> Stashed changes
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
<<<<<<< Updated upstream

  return (
    <header>
      <nav className="py-4 px-6 md:px-12 lg:px-24 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-purple-400 mr-2" />
              <span className="text-xl font-bold tracking-wider">
                Think<span className="text-purple-400">x</span>Life
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="https://www.thinkround.org/aboutus"
              className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium"
=======
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
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-[#5B2655] to-[#5A3A7A] bg-clip-text text-transparent">
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              href="https://www.thinkround.org/donate"
              className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium"
=======
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
>>>>>>> Stashed changes
            >
              Donate
            </Link>
            <Link
              href="https://thinkround.shop/"
              className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium"
            >
              Shop Art
            </Link>
          </div>

<<<<<<< Updated upstream
          <Link href="/chatbot" className="hidden md:block">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white rounded-md">
              Meet Zoe
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
=======
          {/* Authentication Section - Right */}
          <div className="hidden md:flex items-center space-x-3">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback className="bg-[#5B2655] text-white text-sm">
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
                  <Button variant="outline" className="border-[#5B2655]/30 text-[#5B2655] hover:bg-[#5B2655]/10 px-3 py-1 text-sm h-8">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-[#5B2655] hover:bg-[#5A3A7A] text-white px-3 py-1 text-sm h-8">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-200/30 text-slate-700 hover:text-[#5B2655] transition-all duration-300"
>>>>>>> Stashed changes
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

<<<<<<< Updated upstream
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="https://www.thinkround.org/aboutus"
                className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium py-1"
=======
      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-[#F5F1EB]/90 backdrop-blur-lg border-b border-[#D4C4B8]/30 p-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            {/* Navigation Links */}
            <div className="pb-3 border-b border-slate-200">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Navigation</h3>
              <Link
                href="https://www.thinkround.org/aboutus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-700 hover:text-[#5B2655] font-medium py-2 transition-colors duration-300"
>>>>>>> Stashed changes
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
<<<<<<< Updated upstream
              <Link
                href="https://www.thinkround.org/donate"
                className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Donate
              </Link>
              <Link
                href="https://thinkround.shop/"
                className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop Art
              </Link>
              <Link href="/chatbot" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white rounded-md mt-2">
                  Meet Zoe
                </Button>
              </Link>
=======
              <Link href="/ai-awareness" onClick={() => setIsMenuOpen(false)} className="flex items-center text-slate-600 hover:text-[#5B2655] text-sm font-medium py-2 transition-colors duration-300 relative">
                AI Awareness
                {isUsingAIAwareness && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </Link>
              <Link href="/healing-rooms" onClick={() => setIsMenuOpen(false)} className="flex items-center text-slate-600 hover:text-[#5B2655] text-sm font-medium py-2 transition-colors duration-300 relative">
                Healing Rooms
                {isUsingHealingRooms && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></div>
                )}
              </Link>
              <Link href="/exterior-spaces" onClick={() => setIsMenuOpen(false)} className="flex items-center text-slate-600 hover:text-[#5B2655] text-sm font-medium py-2 transition-colors duration-300">
                Exterior Spaces
              </Link>
              <Link
                href="https://thinkround.shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-700 hover:text-[#5B2655] font-medium py-2 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="https://www.thinkround.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-700 hover:text-[#5B2655] font-medium py-2 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Donate
              </Link>
            </div>

            {/* Mobile Authentication */}
            <div className="pt-3 border-t border-slate-200">
              {session ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback className="bg-[#5B2655] text-white text-sm">
                        {getInitials(session.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{session.user?.name}</p>
                      <p className="text-xs text-slate-500">{session.user?.email}</p>
                    </div>
                  </div>
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-[#5B2655]/30 text-[#5B2655] hover:bg-[#5B2655]/10 py-2 text-sm">
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
                    <Button variant="outline" className="w-full border-[#5B2655]/30 text-[#5B2655] hover:bg-[#5B2655]/10 py-2 text-sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-[#5B2655] hover:bg-[#5A3A7A] text-white py-2 text-sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
>>>>>>> Stashed changes
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
