"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Brain, Heart, User, LogOut, Lock, Activity, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Check if user is actively using AI features
  const isUsingAIAwareness = pathname?.startsWith('/ai-awareness') || pathname?.startsWith('/awareness');
  const isUsingHealingRooms = pathname?.startsWith('/healing-rooms');

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

  const AuthRequiredButton = ({
    href,
    children,
    className,
    featureName,
    isActive = false,
    activeColor = "green"
  }: {
    href: string;
    children: React.ReactNode;
    className: string;
    featureName: string;
    isActive?: boolean;
    activeColor?: "green" | "blue" | "rose";
  }) => {
    const getActiveIndicator = () => {
      if (!isActive) return null;

      return (
        <div className="absolute -top-1 -right-1 flex items-center">
          <div className={`px-1.5 py-0.5 text-xs font-bold rounded-full text-white ${
            activeColor === "green" ? "bg-green-500" :
            activeColor === "blue" ? "bg-blue-500" : "bg-rose-500"
          }`}>
            USING
          </div>
        </div>
      );
    };

    if (session) {
      return (
        <Link href={href}>
          <Button className={`${className} relative`}>
            {children}
            {getActiveIndicator()}
          </Button>
        </Link>
      );
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className={`${className} relative`}>
            <Lock className="w-4 h-4 mr-2" />
            {children}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-600" />
              Sign In Required
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              To access <strong>{featureName}</strong>, you need to be signed in to your ThinkxLife account.
              Join our community to explore AI tools and awareness resources.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Link href="/auth/signin">
              <AlertDialogAction className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Sign In
              </AlertDialogAction>
            </Link>
            <Link href="/auth/signup">
              <AlertDialogAction className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Sign Up
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav className={`py-4 px-6 md:px-12 lg:px-24 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg border-b border-purple-200/30 shadow-lg'
          : 'bg-white/60 backdrop-blur-sm border-b border-purple-100/20'
      }`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">
              Think<span className="text-purple-600">x</span>Life
              <sub className="text-xs font-normal text-gray-400 ml-2 tracking-normal">by Think Round, Inc</sub>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="https://www.thinkround.org/aboutus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-purple-700 font-medium transition-colors duration-300"
            >
              About Us
            </Link>
            <Link
              href="https://thinkround.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-purple-700 font-medium transition-colors duration-300"
            >
              Shop Art
            </Link>
            <Link
              href="https://www.thinkround.org/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-purple-700 font-medium transition-colors duration-300"
            >
              Donate
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <AuthRequiredButton
              href="/ai-awareness"
              featureName="AI Awareness"
              isActive={isUsingAIAwareness}
              activeColor="green"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl px-6 py-2 font-medium shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Awareness
            </AuthRequiredButton>

            <AuthRequiredButton
              href="/healing-rooms"
              featureName="Healing Rooms"
              isActive={isUsingHealingRooms}
              activeColor="rose"
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl px-6 py-2 font-medium shadow-lg hover:shadow-rose-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Heart className="w-4 h-4 mr-2" />
              Healing Rooms
            </AuthRequiredButton>

            <Link href="/exterior-spaces">
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl px-6 py-2 font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <Building2 className="w-4 h-4 mr-2" />
                Exterior Spaces
              </Button>
            </Link>

            {/* Authentication Section */}
            {status === "loading" ? (
              <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        {getInitials(session.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    {(isUsingAIAwareness || isUsingHealingRooms) && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session.user?.name && (
                        <p className="font-medium">{session.user.name}</p>
                      )}
                      {session.user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
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
                  <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-200/30 text-slate-700 hover:text-purple-700 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-purple-200/30 p-4 shadow-lg">
            <div className="flex flex-col space-y-3">
              <Link
                href="https://www.thinkround.org/aboutus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-purple-700 font-medium py-3 px-4 rounded-xl hover:bg-purple-50/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="https://www.thinkround.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-purple-700 font-medium py-3 px-4 rounded-xl hover:bg-purple-50/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Donate
              </Link>
              <Link
                href="https://thinkround.shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-purple-700 font-medium py-3 px-4 rounded-xl hover:bg-purple-50/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop Art
              </Link>
              <div className="border-t border-purple-200/30 pt-3 mt-3">
                {session ? (
                  <>
                    <Link href="/ai-awareness" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-3 font-medium shadow-lg mb-3 relative">
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
                      <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl py-3 font-medium shadow-lg mb-3 relative">
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
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl py-3 font-medium shadow-lg mb-3">
                        <Building2 className="w-4 h-4 mr-2" />
                        Exterior Spaces
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-3 font-medium shadow-lg mb-3">
                          <Lock className="w-4 h-4 mr-2" />
                          AI Awareness
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="sm:max-w-md">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-purple-600" />
                            Sign In Required
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-left">
                            To access <strong>AI Awareness</strong>, you need to be signed in to your ThinkxLife account.
                            Join our community to explore AI awareness resources.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-col gap-2">
                          <AlertDialogCancel onClick={() => setIsMenuOpen(false)}>Cancel</AlertDialogCancel>
                          <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                            <AlertDialogAction className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                              Sign In
                            </AlertDialogAction>
                          </Link>
                          <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                            <AlertDialogAction className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                              Sign Up
                            </AlertDialogAction>
                          </Link>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl py-3 font-medium shadow-lg mb-3">
                          <Lock className="w-4 h-4 mr-2" />
                          Healing Rooms
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="sm:max-w-md">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-purple-600" />
                            Sign In Required
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-left">
                            To access <strong>Healing Rooms</strong>, you need to be signed in to your ThinkxLife account.
                            Join our community to explore healing and trauma recovery resources.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-col gap-2">
                          <AlertDialogCancel onClick={() => setIsMenuOpen(false)}>Cancel</AlertDialogCancel>
                          <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                            <AlertDialogAction className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                              Sign In
                            </AlertDialogAction>
                          </Link>
                          <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                            <AlertDialogAction className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                              Sign Up
                            </AlertDialogAction>
                          </Link>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Link href="/exterior-spaces" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl py-3 font-medium shadow-lg mb-3">
                        <Building2 className="w-4 h-4 mr-2" />
                        Exterior Spaces
                      </Button>
                    </Link>
                  </>
                )}

                {/* Mobile Authentication */}
                {session ? (
                  <div className="space-y-2">
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50"
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
                      <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
