"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TutorPopupModal({ onClose }) {
  const navigate = useNavigate();

  // Disable background scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Internal navigation (using React Router)
  const handleJoinTutor = () => {
    onClose();
    navigate("/becomeaTutor");
  };

  const handleHireTutor = () => {
    onClose();
    navigate("/hireTutor");
  };

  const phoneNumber = "+91 9118706214";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden"
        >
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-[#002b6b] to-[#B88A2F] text-white text-center py-4 font-semibold text-lg tracking-wide">
            Welcome to Bright Minds Tutors
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-8">
            {/* Hire a Tutor Section */}
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2829/2829782.png"
                alt="Hire a tutor"
                className="w-24 h-24 object-contain drop-shadow-md"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  Searching for the best tutor for your child?
                </h3>
                <p className="text-gray-600 text-sm mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <Phone className="w-4 h-4 text-[#B88A2F]" />
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-[#002b6b] font-medium hover:underline"
                  >
                    {phoneNumber}
                  </a>
                </p>
                <button
                  onClick={handleHireTutor}
                  className="mt-3 bg-[#002b6b] hover:bg-[#013d91] text-white text-sm font-semibold py-2 px-5 rounded-lg shadow-md transition-all"
                >
                  Hire a Tutor
                </button>
              </div>
            </div>

            <div className="border-t border-gray-300" />

            {/* Join as Tutor Section */}
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Join as tutor"
                className="w-24 h-24 object-contain drop-shadow-md"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  Looking for teaching jobs?
                </h3>
                <p className="text-gray-600 text-sm mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <Phone className="w-4 h-4 text-[#B88A2F]" />
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-[#002b6b] font-medium hover:underline"
                  >
                    {phoneNumber}
                  </a>
                </p>
                <button
                  onClick={handleJoinTutor}
                  className="mt-3 bg-[#B88A2F] hover:bg-[#d8a844] text-white text-sm font-semibold py-2 px-5 rounded-lg shadow-md transition-all"
                >
                  Join as a Tutor
                </button>
              </div>
            </div>
          </div>

          {/* Skip Button */}
          <div className="text-center py-3 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-[#002b6b] font-medium transition-all"
            >
              Skip
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TutorPopupModal;
