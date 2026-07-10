import React from 'react';
import logo from '../assets/logo.png';
import {
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Play,
} from "lucide-react";
function Footer() {
  return (
    <footer className="bg-[#111111] text-[#cbb26a] pt-16 pb-8 px-4 font-serif">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2b2a27]">
        
        {/* Logo and Name */}
        <div className="flex flex-col items-start gap-3">
          <img src={logo} alt="UpHomeTuition Logo" className="h-12 rounded-lg shadow-md" />
          <span className="font-bold text-lg tracking-wide text-white">
            UpHomeTuition
          </span>
          <p className="text-sm text-[#b8b8b8] leading-relaxed">
            Connecting passionate tutors with students for quality home education.  
            Learn. Teach. Grow.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg mb-4 font-semibold">Contact Info</h3>
          <ul className="space-y-2 text-[#e5e5e5] text-sm">
            <li className="flex items-start gap-2">
              📞 <span className="hover:text-[#cbb26a] cursor-pointer">+91 9118706214</span>
            </li>
            <li className="flex items-start gap-2">
              ✉️ <span>contact@uphometuition.in</span>
            </li>
            <li className="flex items-start gap-2">
              ⏰ <span>Mon — Sat 9:00 AM - 8:00 PM</span>
            </li>
            <li className="flex items-start gap-2">
              📍 <span>Gomti Nagar, Lucknow, Uttar Pradesh</span>
            </li>
            <li className="flex items-start gap-2">
              📍 <span>Sector 52, Noida, Uttar Pradesh</span>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white text-lg mb-4 font-semibold">Useful Links</h3>
          <ul className="space-y-2 text-sm text-[#e5e5e5]">
            <li><a href="#" className="hover:text-[#cbb26a] transition">Become a Tutor</a></li>
            <li><a href="#" className="hover:text-[#cbb26a] transition">Find Home Tutors</a></li>
            <li><a href="#" className="hover:text-[#cbb26a] transition">FAQ</a></li>
            <li><a href="#" className="hover:text-[#cbb26a] transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Map Section */}
        <div>
          <h3 className="text-white text-lg mb-4 font-semibold">Our Locations</h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-[#cbb26a]/30">
            <iframe
              title="UpHomeTuition Lucknow"
              src="https://www.google.com/maps?q=gomti+nagar+lucknow&output=embed"
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-6">
        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <Facebook className="w-4 h-4 hover:text-[#ffffff] cursor-pointer transition-colors" />
          <Instagram className="w-4 h-4 hover:text-[#B88A2F] cursor-pointer transition-colors" />
          <Twitter className="w-4 h-4 hover:text-[#B88A2F] cursor-pointer transition-colors" />
          <Linkedin className="w-4 h-4 hover:text-[#B88A2F] cursor-pointer transition-colors" />
        </div>

        {/* Copyright + Scroll Button */}
        <div className="flex items-center gap-4">
          <p className="text-[#d6d6d6] text-sm">
            © 2025 UpHomeTuition | All Rights Reserved
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-[#cbb26a] text-black rounded-full p-2 shadow-md hover:bg-[#d8c178] transition-all"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
