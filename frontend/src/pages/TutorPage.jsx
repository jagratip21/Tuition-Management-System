"use client";

import React, { useState, useEffect } from "react";
import fallbackImg from "../assets/lawyer-deafult.jpg";
import { api, assetUrl } from "../lib/api";

function TeacherCard({ teacher }) {
  return (
    <div className="bg-[#f8f6f2] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#e5e2dc]">
      <img
        src={teacher.image || fallbackImg}
        alt={teacher.fullName || "Tutor"}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImg;
        }}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="px-5 py-4">
        <h3 className="text-base font-bold text-[#23293a] mb-1 uppercase tracking-wide">
          {teacher.fullName || "Unknown Tutor"}
        </h3>
        <p className="text-sm text-[#69665f] mb-1 font-semibold">
          {teacher.expertise || "Subject Expert"}
        </p>
        <p className="text-sm text-[#8b857d]">
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
        const result = await api.get("/tutors");

        if (result.success && result.data.length > 0) {
          const apiTeachers = result.data.map((tutor) => ({
            id: tutor.id,
            fullName: tutor.fullName,
            expertise: tutor.expertise,
            experience: tutor.experience,
            image:
              tutor.imageUrl &&
              assetUrl(tutor.imageUrl),
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

  return (
    <section className="py-20 px-6 md:px-10 bg-[#faf4e4] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <p className="text-sm font-semibold text-[#b88a2f] uppercase tracking-wide mb-2 text-center">
          Expert Mentors
        </p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#23293a] text-center">
          Our Teaching Faculty
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#b88a2f] to-[#d1b469] rounded mx-auto mt-4 mb-10"></div>

        {/* Loader / Error / Grid */}
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teachers.map((teacher, idx) => (
              <TeacherCard key={teacher.id || idx} teacher={teacher} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeTeacherTeam;
