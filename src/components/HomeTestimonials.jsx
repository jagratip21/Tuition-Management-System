import React, { useState } from 'react';

const testimonials = [
  {
    name: 'Ananya Verma',
    location: 'Raj Nagar, Ghaziabad',
    text: 'UpHomeTuitions helped me improve my grades in Maths within just two months! The tutor explained every concept patiently and made learning fun.',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Rohit Mehta',
    location: 'Indirapuram, Ghaziabad',
    text: 'As a parent, I am very satisfied. My son’s confidence has grown a lot since joining UpHomeTuitions. The tutors are punctual and very professional.',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Simran Kaur',
    location: 'Vasundhara, Delhi NCR',
    text: 'I was struggling in Science, but after joining UpHomeTuitions, I started scoring above 90%. The personal attention and test practice really helped me!',
    stars: 4.5,
    image: 'https://randomuser.me/api/portraits/women/70.jpg',
  },
  {
    name: 'Aditya Singh',
    location: 'Noida Sector 62',
    text: 'Very dedicated teachers! They make sure students actually understand the topic instead of just memorizing it. Highly recommend for school students.',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    name: 'Neha Kapoor',
    location: 'Saket, New Delhi',
    text: 'The best part about UpHomeTuitions is the flexibility and personal care. My daughter loves her English sessions now. Totally worth it!',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/women/52.jpg',
  },
  {
    name: 'Arjun Malhotra',
    location: 'Kaushambi, Ghaziabad',
    text: 'Very professional tutors who genuinely care about students’ growth. My child improved from 75% to 92% in just one term!',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
];


function StarRating({ stars }) {
  const fullStars = Math.floor(stars);
  const halfStar = stars % 1 >= 0.5;
  return (
    <span className="flex gap-1 text-[#bfa77a] text-xl">
      {[...Array(fullStars)].map((_, i) => <span key={i}>★</span>)}
      {halfStar && <span>☆</span>}
    </span>
  );
}

function HomeTestimonials() {
  const [active, setActive] = useState(0);
  const visibleCount = 4;
  const total = testimonials.length;

  const next = () => setActive((prev) => (prev + 1) % total);
  const prev = () => setActive((prev) => (prev - 1 + total) % total);

  return (
    <section className="relative py-16 px-2 md:px-10 bg-white">
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center pointer-events-none select-none">
        <span className="text-[7vw] font-bold uppercase text-[#e5e2dc] opacity-10 md:opacity-15" style={{letterSpacing: '0.1em'}}>TESTIMONIALS</span>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#23293a] text-center mb-10">Feedback of parents</h2>
  <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full ">
          {Array.from({ length: visibleCount }).map((_, idx) => {
            const i = (active + idx) % total;
            const t = testimonials[i];
            return (
              <div key={i} className="bg-white min-h-[18rem] overflow-scroll no-scrollbar rounded-xl shadow-lg p-4 md:p-6 flex flex-col items-center transition-all duration-300 scale-100 border-2 border-[#e5e2dc]" style={{width: '100%', maxWidth: '220px', minWidth: '160px', height: '220px', maxHeight: '220px'}}>
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#e5e2dc] mb-2" />
                <div className="font-bold text-base text-[#23293a] text-center">{t.name}</div>
                <div className="text-xs text-[#B88A2F] text-center mb-1">{t.location}</div>
                <div className="flex justify-center mb-1"><StarRating stars={t.stars}/></div>
                <div className="text-[#23293a] text-sm leading-relaxed italic text-center line-clamp-3 overflow-scroll no-scrollbar">{t.text}</div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full bg-white border-2 border-[#B88A2F] flex items-center justify-center text-[#B88A2F] text-xl font-bold shadow hover:bg-[#e5e2dc] transition-all">&#60;</button>
          <button onClick={next} className="w-10 h-10 rounded-full bg-white border-2 border-[#B88A2F] flex items-center justify-center text-[#B88A2F] text-xl font-bold shadow hover:bg-[#e5e2dc] transition-all">&#62;</button>
        </div>
      </div>
    </section>
  );
}

export default HomeTestimonials;
