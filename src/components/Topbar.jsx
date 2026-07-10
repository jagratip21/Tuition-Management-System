"use client";

import {
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="w-full flex flex-col md:flex-row text-sm font-medium shadow-sm overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-[47%] bg-white text-[#002b6b] hidden md:flex flex-row items-center justify-center md:justify-end py-2 px-24 gap-6">
        {/* Phone */}
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-red-500" />
          <span className="hover:text-[#B88A2F] transition-colors cursor-pointer text-sm">
            +91 9118706214
          </span>
        </div>

        <span className="text-gray-400">|</span>

        {/* WhatsApp */}
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-green-500" />
          <span className="hover:text-[#B88A2F] transition-colors cursor-pointer text-sm">
            +91 9118706214
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[53%] bg-[#fafafa] text-[#B88A2F] flex flex-col sm:flex-row items-center justify-center md:justify-between py-2 px-6 sm:px-10 gap-2 sm:gap-4">
        
        {/* Social Icons */}
        <div className="hidden md:flex items-center justify-center gap-5">
          <Facebook className="w-4 h-4 hover:text-[#B88A2F] cursor-pointer transition-colors" />
          <Instagram className="w-4 h-4 hover:text-[#B88A2F] cursor-pointer transition-colors" />
          <Twitter className="w-4 h-4 hover:text-[#B88A2F] cursor-pointer transition-colors" />
          <Linkedin className="w-4 h-4 hover:text-[#B88A2F] cursor-pointer transition-colors" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
          <Link
            to="/hireTutor"
            className="flex items-center gap-1 bg-[#B88A2F] text-white px-3 py-1.5 rounded-md hover:bg-[#a17c27] transition-all text-xs sm:text-sm shadow-md"
          >
            <Play className="w-3 h-3" /> Hire Tutor
          </Link>
          <Link
            to="/becomeaTutor"
            className="flex items-center gap-1 bg-[#B88A2F] text-white px-3 py-1.5 rounded-md hover:bg-[#a17c27] transition-all text-xs sm:text-sm shadow-md"
          >
            <Play className="w-3 h-3" /> Become a Tutor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
