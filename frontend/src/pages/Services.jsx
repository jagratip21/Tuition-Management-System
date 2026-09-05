"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";

function Services() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy Data (initial 5 subjects)
  const dummySubjects = [
    {
      id: 1,
      name: "Mathematics",
      classes: "Class 6th – 12th",
      description:
        "Master concepts of Algebra, Geometry, Trigonometry, and Calculus through structured guidance and daily practice sessions.",
    },
    {
      id: 2,
      name: "Science",
      classes: "Class 6th – 12th",
      description:
        "Learn Physics, Chemistry, and Biology with hands-on experiments, interactive visuals, and concept-based learning.",
    },
    {
      id: 3,
      name: "English Language",
      classes: "Class 1st – 12th",
      description:
        "Improve reading, writing, grammar, and communication skills with personalized teaching methods and interactive sessions.",
    },
    {
      id: 4,
      name: "Computer Science",
      classes: "Class 6th – 12th",
      description:
        "Gain foundational knowledge in programming, problem-solving, and logical thinking using beginner-friendly approaches.",
    },
    {
      id: 5,
      name: "Social Studies",
      classes: "Class 6th – 10th",
      description:
        "Understand History, Geography, Civics, and Economics in a simplified, story-based, and analytical way.",
    },
  ];

  // Fetch subjects from API
  useEffect(() => {
    async function fetchSubjects() {
      try {
        const result = await api.get("/subjects");

        if (result.success && result.data.length > 0) {
          setSubjects(result.data);
        } else {
          setSubjects(dummySubjects);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setSubjects(dummySubjects);
      } finally {
        setLoading(false);
      }
    }

    fetchSubjects();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-[#B88A2F]/30 border-t-[#B88A2F] rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-sm font-medium">
          Loading subjects...
        </p>
      </div>
    );

  return (
    <section className="bg-[#faf4e4]">
      <section className="bg-white shape-wavy-br-services">
        <section className="mx-auto max-w-7xl px-6 md:px-10 py-16">
          {/* Section Header */}
          <header className="mx-auto max-w-3xl text-center mb-12">
            <p className="text-sm font-medium text-[#B88A2F] tracking-wide uppercase">
              Our Fields
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-serif font-bold text-gray-900">
              Subjects We Teach
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              At{" "}
              <span className="font-semibold text-[#B88A2F]">
                UpHomeTuition
              </span>
              , we provide expert tutoring across all major subjects — blending
              personalized attention with modern teaching techniques to help
              students achieve academic excellence.
            </p>
          </header>

          {/* Subject Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-[#fffaf3] rounded-2xl p-6 border border-[#ecd9b7] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-[#3b2f14] mb-2">
                  {subject.name}
                </h3>
                {subject.classes && (
                  <p className="text-sm text-[#8a7b61] font-medium mb-3">
                    {subject.classes}
                  </p>
                )}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {subject.description}
                </p>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-12 flex justify-center">
            <a
              href="/becomeaTutor"
              className="inline-flex items-center rounded-full border border-[#B88A2F] bg-[#B88A2F] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#9c7629] transition-all duration-300 shadow-sm"
            >
              Find Your Tutor
            </a>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Services;
