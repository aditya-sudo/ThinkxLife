import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
<<<<<<< Updated upstream
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="flex items-center">
                <Image
                  src="/tr_logo.png"
                  alt="Think Round, Inc Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-xl font-bold tracking-wider">
                  Think Round
                </span>
=======
    <footer className="relative bg-gradient-to-br from-[#F5F1EB] via-[#F5F1EB] to-[#D4C4B8] text-[#2C2C2C] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-amber-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4">
        {/* Main Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          {/* Brand Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-[#5B2655] to-[#5A3A7A] bg-clip-text text-transparent">
                Think<span className="text-[#5B2655]">x</span>Life
                <sup className="text-xs font-normal text-[#5B2655] ml-2 tracking-normal flex items-center">
                  from <img src="/tr_logo.png" alt="Think Round" className="w-4 h-4 ml-1" /> Think Round, Inc
                </sup>
              </span>
            </Link>
          </div>

          {/* Contact Info - Horizontal Layout */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#5B2655]">
            <div className="flex items-center group">
              <MapPin className="w-3 h-3 text-[#5B2655] mr-1 flex-shrink-0 group-hover:text-[#5B2655] transition-colors duration-300" />
              <span className="group-hover:text-slate-700 transition-colors duration-300">
                2140 Bush Street, 1, San Francisco, CA 94115
              </span>
            </div>
            <div className="flex items-center group">
              <Phone className="w-3 h-3 text-[#5B2655] mr-1 flex-shrink-0 group-hover:text-[#5B2655] transition-colors duration-300" />
              <span className="group-hover:text-slate-700 transition-colors duration-300">
                (415) 602-9599
              </span>
            </div>
            <div className="flex items-center group">
              <Mail className="w-3 h-3 text-[#5B2655] mr-1 flex-shrink-0 group-hover:text-[#5B2655] transition-colors duration-300" />
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
                  className={`p-1.5 bg-white/60 backdrop-blur-sm border border-[#5B2655]/30 rounded-md text-[#5B2655] ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-md`}
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <social.icon size={12} />
                </Link>
              ))}
            </div>

            {/* Donate Button */}
            <Link href="https://www.thinkround.org/donate">
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#5B2655] to-[#5A3A7A] hover:from-[#5A3A7A] hover:to-[#4A2959] text-white px-3 py-1.5 rounded-md text-xs font-medium shadow-md hover:shadow-[#5B2655]/25 transition-all duration-300 transform hover:scale-105">
                <Heart className="w-2.5 h-2.5" />
                Support
>>>>>>> Stashed changes
              </div>
            </Link>
            <p className="text-gray-600 mb-4">
              Think Round, Inc is dedicated to creating connections through art,
              education, and community engagement.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-purple-700 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-purple-700 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-purple-700 transition-colors"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.thinkround.org/aboutus"
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="https://thinkround.shop/"
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Shop Art
                </Link>
              </li>
              <li>
                <Link
                  href="/chatbot"
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Meet Zoe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.thinkround.org/donate"
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="mr-2 text-purple-700 flex-shrink-0 mt-1"
                />
                <span>
                  2140 Bush Street, 1<br />
                  San Francisco, CA 94115
                  <br />
                  United States
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={20}
                  className="mr-2 text-purple-700 flex-shrink-0"
                />
                <span>(415) 602-9599</span>
              </li>
              <li className="flex items-center">
                <Mail
                  size={20}
                  className="mr-2 text-purple-700 flex-shrink-0"
                />
                <span>info@thinkround.org</span>
              </li>
            </ul>
          </div>
        </div>

<<<<<<< Updated upstream
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Think Round, Inc. All rights
            reserved.
          </p>
=======
      {/* Bottom Section */}
      <div className="border-t border-[#5B2655]/30 pt-2 pb-2">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
            <div className="flex items-center space-x-2 text-xs text-[#5B2655]">
              <span>&copy; {new Date().getFullYear()} Think Round, Inc.</span>
              <span className="text-[#5B2655]">•</span>
              <span>All rights reserved</span>
              <span className="text-[#5B2655]">•</span>
              <span className="flex items-center">
                Made with <Heart className="w-2.5 h-2.5 text-red-500 mx-1 animate-pulse" /> for humanity
              </span>
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#5B2655]">
              <Link href="#" className="hover:text-[#5B2655] transition-colors duration-300">
                Privacy Policy
              </Link>
              <span className="text-[#5B2655]">•</span>
              <Link href="#" className="hover:text-[#5B2655] transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </footer>
  );
}
