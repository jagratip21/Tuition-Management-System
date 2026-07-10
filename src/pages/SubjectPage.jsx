"use client";

import React, { useState, useEffect } from "react";
import fallbackImg from "../assets/lawyer-deafult.jpg";

function SubjectCard({ subject, image }) {
  return (
    <div className="bg-[#f8f6f2] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#e5e2dc] h-full w-full max-w-xs mx-auto">
      <img
        src={image || fallbackImg}
        alt={subject.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImg;
        }}
        className="w-full h-44 object-cover rounded-t-xl"
      />
      <div className="px-5 py-4 text-center">
        <h3 className="text-base font-bold text-[#23293a] mb-1 uppercase tracking-wide">
          {subject.name}
        </h3>
        <p className="text-sm text-[#8b857d]">
          {subject.description || "Learn with expert tutors across all classes."}
        </p>
      </div>
    </div>
  );
}

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Dummy subjects
    const dummySubjects = [
      {
        name: "JEE Main & Advanced",
        description: "Engineering entrance preparation for Class 11–12 students.",
        image:
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "NEET Biology",
        description: "Comprehensive biology preparation for NEET aspirants.",
        image:
          "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "CBSE Board (Class 10)",
        description: "Board exam-focused learning for all subjects.",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Mathematics (Class 11–12)",
        description: "Advanced math concepts for board and entrance exams.",
        image:
          "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Physics (JEE/NEET)",
        description: "Concepts and problem-solving for Physics lovers.",
        image:
          "https://images.unsplash.com/photo-1614624532983-4ce03390d0d6?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Chemistry (Organic & Inorganic)",
        description: "Master chemical reactions and formulas easily.",
        image:
          "https://images.unsplash.com/photo-1616628188502-3d8a05e9b5e1?auto=format&fit=crop&w=800&q=80",
      },
    ];

    async function fetchSubjects() {
      try {
        const response = await fetch(
          "https://uphometuition-backend.onrender.com/api/subjects"
        );
        const result = await response.json();

        if (result.success && result.data.length > 0) {
          const apiSubjects = result.data.map((subj) => ({
            name: subj.name,
            description: subj.description,
            image: subj.imageUrl
              ? `https://uphometuition-backend.onrender.com${subj.imageUrl}`
              : fallbackImg,
          }));

          // ✅ Merge and remove duplicates by subject name
          const mergedSubjects = [
            ...dummySubjects,
            ...apiSubjects.filter(
              (apiSub) =>
                !dummySubjects.some(
                  (dummy) =>
                    dummy.name.toLowerCase() === apiSub.name.toLowerCase()
                )
            ),
          ];

          // ✅ Limit to 20 subjects max
          setSubjects(mergedSubjects.slice(0, 20));
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

  return (
    <section className="relative py-20 px-6 md:px-10 bg-[#faf4e4] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-[#b88a2f] uppercase tracking-wide mb-2 text-center">
          Our Courses
        </p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#23293a] text-center mb-10">
          Subjects We Teach
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#b88a2f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {subjects.map((subject, idx) => (
              <SubjectCard key={idx} subject={subject} image={subject.image} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SubjectsPage;
