import React from "react";
import slider2 from '../assets/HeroSection/hero3.jpg';

function HomeAboutUs() {
  return (
    <section className="bg-white">
      <section
        id="about-us"
        className="relative py-20 px-4 md:px-0 bg-[#faf4e4] flex justify-center items-center shape-wavy-br-about"
      >
        <div className="max-w-5xl w-full mx-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          {/* Left Content */}
          <div className="flex-1 p-10 flex flex-col justify-center">
            <h3 className="uppercase text-[#23293a] font-bold tracking-widest text-lg mb-2">
              About UpHomeTuition
            </h3>
            <div className="w-12 h-1 bg-[#B88A2F] mb-6" />

            <p className="text-[#000000] text-lg leading-relaxed mb-8">
              <strong>Find the Perfect Home Tutor Near You – Anytime, Anywhere.</strong>
              <br />
              At <strong>UpHomeTuition</strong>, we believe that every student deserves
              the right guidance to unlock their true potential. Founded by{" "}
              <strong>Saurabh Yadav</strong>, UpHomeTuition is a trusted online
              platform that connects students with verified and passionate home tutors —
              both online and offline — across India.
              <br />
            </p>

            <div className="mt-8 mb-2">
              <span
                className="block text-3xl font-signature text-[#000000] mb-2"
                style={{ fontFamily: "Dancing Script, cursive" }}
              >
                Saurabh Yadav
              </span>
              <span className="block text-xs tracking-widest text-[#000000]">
                CEO &amp; Founder of UpHomeTuition
              </span>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex-1 flex items-center justify-center bg-[#232220]">
            <img
              src={slider2}
              alt="About UpHomeTuition"
              className="w-full h-full object-cover"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default HomeAboutUs;
