"use client";

import { useEffect, useState } from "react";

function Services() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Dummy Subjects (always visible first)
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
        "Learn Physics, Chemistry, and Biology with interactive visuals, experiments, and concept-based learning.",
    },
    {
      id: 3,
      name: "English Language",
      classes: "Class 1st – 12th",
      description:
        "Enhance grammar, writing, and speaking skills through personalized language improvement sessions.",
    },
    {
      id: 4,
      name: "Computer Science",
      classes: "Class 9th – 12th",
      description:
        "Learn programming, web development, and logical thinking skills essential for modern careers.",
    },
    {
      id: 5,
      name: "Social Studies",
      classes: "Class 6th – 10th",
      description:
        "Understand history, geography, civics, and economics through storytelling and visual learning methods.",
    },
    {
      id: 6,
      name: "Economics",
      classes: "Class 11th – 12th",
      description:
        "Build strong analytical skills and master micro & macroeconomic concepts with real-world examples.",
    },
    {
      id: 7,
      name: "Accountancy",
      classes: "Class 11th – 12th",
      description:
        "Understand accounting principles, journal entries, and financial statements with practical clarity.",
    },
    {
      id: 8,
      name: "Business Studies",
      classes: "Class 11th – 12th",
      description:
        "Gain a clear understanding of business environments, management, and entrepreneurial concepts.",
    },
  ];

  useEffect(() => {
    setSubjects(dummySubjects);

    async function fetchSubjects() {
      try {
        const response = await fetch(
          "https://uphometuition-backend.onrender.com/api/subjects"
        );
        const result = await response.json();

        if (result.success && result.data.length > 0) {
          const apiSubjects = result.data.slice(0, 7).map((subj) => ({
            id: subj.id,
            name: subj.name,
            description:
              subj.description || "Learn more with our expert tutors.",
          }));

          setSubjects([...dummySubjects, ...apiSubjects].slice(0, 15));
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubjects();
  }, []);

  return (
    <section className="bg-[#faf4e4]">
      <section className="bg-white shape-wavy-br-services">
        <section className="mx-auto max-w-7xl px-6 md:px-10 py-16">
          {/* Header */}
          <header className="mx-auto max-w-3xl text-center mb-14">
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
              , we cover a diverse range of academic subjects — empowering
              students with the skills and confidence they need to excel.
            </p>
          </header>

          {/* Loader */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-40 mb-10">
              <div className="w-10 h-10 border-4 border-[#B88A2F]/30 border-t-[#B88A2F] rounded-full animate-spin"></div>
              <p className="mt-3 text-gray-600 text-sm font-medium">
                Fetching latest subjects...
              </p>
            </div>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="group bg-white rounded-2xl border border-[#ecd9b7] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-[#3b2f14] mb-2 group-hover:text-[#B88A2F] transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {subject.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-12 flex justify-center">
            <a
              href="/hireTutor"
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
