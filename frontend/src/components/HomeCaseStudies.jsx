import React, { useEffect, useState } from 'react';

import sliderImg from '../assets/HeroSection/hero1.jpg';

function CaseCard({ title, category, description }) {
  return (
    <div className="flex flex-col items-center bg-[#f8f6f2] rounded-xl shadow-md p-4 transition-transform hover:-translate-y-1 hover:shadow-lg w-64 border border-[#e5e2dc]">
      <img src={sliderImg} alt={title} className="w-56 h-36 object-cover rounded-lg mb-3 border-2 border-[#e5e2dc]" />
      <h4 className="text-lg font-bold text-black mb-1 text-center font-serif">{title}</h4>
      <span className="text-sm text-[#B88A2F] mb-1 text-center font-medium">{category}</span>
      <p className="text-xs text-black text-center mt-1 leading-relaxed">{description}</p>
    </div>
  );
}

function HomeCaseStudies() {
  const [index, setIndex] = useState(0);
  const cases = [
  {
    title: "Top Scorer in Board Exams",
    category: "Class 12 CBSE",
    description:
      "Our student improved from 70% to 94% in just six months with personalized one-on-one tutoring and consistent progress tracking.",
  },
  {
    title: "Confidence Boost in Mathematics",
    category: "Class 10 ICSE",
    description:
      "Helped a struggling student overcome math anxiety through interactive learning sessions and regular concept-based tests.",
  },
  {
    title: "IELTS Success Story",
    category: "English Proficiency",
    description:
      "Guided a student to achieve an overall band score of 8.0 in IELTS with tailored speaking and writing practice.",
  },
  {
    title: "Entrance Exam Excellence",
    category: "Engineering Entrance",
    description:
      "Our focused coaching enabled a student to secure a top 5% rank in the JEE Mains, leading to admission in a reputed college.",
  },
  {
    title: "Academic Improvement in Science",
    category: "Class 9 CBSE",
    description:
      "A student improved understanding in Physics and Chemistry through visual explanations and real-life examples, boosting grades significantly.",
  },
];

  const visibleCount = 4;
  const visible = cases.slice(index, index + visibleCount);
  while (visible.length < visibleCount) visible.push(...cases.slice(0, visibleCount - visible.length));

  const next = () => setIndex((prev) => (prev + 1) % cases.length);
  const prev = () => setIndex((prev) => (prev - 1 + cases.length) % cases.length);

  return (
  <section className="relative py-10 px-2 md:px-8 bg-[#faf4e4]">
      <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center pointer-events-none select-none">
        <span className="text-[7vw] font-bold uppercase text-[#e5e2dc] opacity-20 mb-2" style={{letterSpacing: '0.1em'}}>CASE STUDIES</span>
        {/* <span className="text-lg md:text-2xl font-serif text-[#bfa77a] opacity-30 max-w-2xl text-center px-2">
          Real results for real clients. Explore our proven track record in family, corporate, real estate, criminal, and insurance law. Each case study highlights our commitment to excellence and justice.
        </span> */}
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black drop-shadow-lg">Articles</h2>
          <a href="/blog" className="text-black  font-semibold text-base flex items-center gap-1 hover:underline">VIEW ALL ARTiCLES &rarr;</a>
        </div>
        <div className="flex gap-6 justify-center mb-8 flex-wrap">
          {visible.map((c, i) => <CaseCard key={i} {...c} />)}
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={prev} className="w-12 h-12 rounded-full bg-white border-2 border-[#B88A2F] flex items-center justify-center text-[#B88A2F] text-xl font-bold shadow hover:bg-[#fff2c5] transition-all">&#60;</button>
          <button onClick={next} className="w-12 h-12 rounded-full bg-white border-2 border-[#B88A2F] flex items-center justify-center text-[#B88A2F] text-xl font-bold shadow hover:bg-[#fff2c5] transition-all">&#62;</button>
        </div>
      </div>
    </section>
  );
}

export default HomeCaseStudies;