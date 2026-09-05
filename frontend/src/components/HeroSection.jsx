import { useEffect, useState } from 'react';
import slider1 from '../assets/HeroSection/hero1.jpg';
import slider2 from '../assets/HeroSection/tutor2.avif';
import slider3 from '../assets/HeroSection/hero3.jpg';

function HeroSection() {
  const images = [slider1, slider2, slider3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  const bgImage = '';

  return (
    <section
      className="w-full bg-[#faf4e4]"
      // style={{
      //   backgroundImage: `linear-gradient(rgba(255,255,255,0.85),rgba(255,255,255,0.85)), url(${bgImage})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      // }}
    >
      <section className='flex flex-col md:flex-row items-center justify-center gap-0 px-6 py-8 md:px-10 md:py-8 relative min-h-[500px] mt-0 md:mt-0 bg-white  overflow-hidden shape-wavy-br-hero'>
      <div className="flex-1 flex items-center justify-center h-[400px] md:h-[500px]">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full h-full max-w-[650px] max-h-[400px] flex items-center justify-center">
          <img
            src={images[current]}
            alt={`Hero Slide ${current + 1}`}
            className="object-cover w-full h-full transition-all duration-700 ease-in-out animate-fade"
            style={{ aspectRatio: '16/7' }}
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center h-[400px] md:h-[500px]">
        <div className="relative z-10 w-full max-w-[500px] text-left flex flex-col items-start justify-center h-full bg-transparent rounded-lg p-">
          <h1 className="text-5xl md:text-5xl font-serif text-[#000000] mb-6 font-bold">Up Home Tuitions</h1>
          <p className="text-lg md:text-lg text-[#1a1a19] mb-6">
            UpHomeTuition connects students with trusted, verified home tutors for every subject and grade.
Whether you’re looking to boost your grades or share your knowledge, we make learning personal, simple, and effective.
          </p>
          <button
            onClick={() =>
              document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-[#B88A2F] text-white px-7 py-3 rounded font-semibold mb-10 shadow hover:bg-[#f0c62e] transition-all"
          >
            CONTACT NOW &rarr;
          </button>
          <div className="mt-8">
            <span
              className="block text-3xl font-signature text-[#000000] mb-2"
              style={{ fontFamily: 'Dancing Script, cursive' }}
            >
              Saurabh Yadav
            </span>
            <span className="block text-xs tracking-widest text-[#000000]">
              Up Home Tuitions
            </span>
          </div>
        </div>
      </div>
      </section>
    </section>
  );
}

export default HeroSection;