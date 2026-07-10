"use client";

import React, { useState, useEffect } from "react";
import fallbackImg from "../assets/lawyer-deafult.jpg";

function TeacherCard({ teacher, image }) {
  return (
    <div className="bg-[#f8f6f2] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#e5e2dc] h-full w-full max-w-xs mx-auto">
      <img
        src={image || fallbackImg}
        alt={teacher.fullName}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImg;
        }}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="px-5 py-4 w-full">
        <h3 className="text-sm font-bold text-[#23293a] mb-1 uppercase tracking-wide">
          {teacher.fullName}
        </h3>
        <p className="text-xs text-[#69665f] mb-1 font-semibold">
          {teacher.expertise}
        </p>
        <p className="text-xs text-[#8b857d]">
          {teacher.experience
            ? `${teacher.experience} experience`
            : "Experienced Educator"}
        </p>
      </div>
    </div>
  );
}

function HomeTeacherTeam() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTutors() {
      try {
        const response = await fetch(
          "https://uphometuition-backend.onrender.com/api/tutors"
        );
        const result = await response.json();

        if (result.success && result.data.length > 0) {
          const apiTeachers = result.data.map((tutor) => ({
            id: tutor._id,
            fullName: tutor.fullName,
            expertise: tutor.expertise,
            experience: tutor.experience,
            image:
              tutor.imageUrl &&
              `https://uphometuition-backend.onrender.com${tutor.imageUrl}`,
          }));
          setTeachers(apiTeachers);
        }
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTutors();
  }, []);

  const duplicatedTeachers = [...teachers, ...teachers];

  return (
    <section className="relative py-20 px-6 md:px-10 bg-[#faf4e4] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-[#b88a2f] uppercase tracking-wide mb-2">
          Expert Mentors
        </p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#23293a]">
          Our Teaching Faculty
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#b88a2f] to-[#d1b469] rounded mt-4 mb-10"></div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-40 mb-10">
            <div className="w-10 h-10 border-4 border-[#B88A2F]/30 border-t-[#B88A2F] rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-600 text-sm font-medium">
              Fetching top tutors...
            </p>
          </div>
        ) : teachers.length === 0 ? (
          <p className="text-center text-gray-600 font-medium">
            No tutors available at the moment.
          </p>
        ) : (
          <div className="relative w-full overflow-hidden">
            <div
              className="flex gap-6 animate-scroll-infinite"
              style={{ width: `${duplicatedTeachers.length * 260}px` }}
            >
              {duplicatedTeachers.map((teacher, idx) => (
                <div
                  className="min-w-[240px] flex-shrink-0"
                  key={`${teacher.fullName}-${idx}`}
                >
                  <TeacherCard teacher={teacher} image={teacher.image} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scrollInfinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll-infinite {
          animation: scrollInfinite 35s linear infinite;
          will-change: transform;
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default HomeTeacherTeam;
