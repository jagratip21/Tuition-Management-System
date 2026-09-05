import React, { useState } from "react";
import hireTutorImg from "../assets/HeroSection/hero3.jpg"; // Background image
import { api } from "../lib/api";

function HireTutorForm() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/enquiries/hire-tutor", form);
      {
        setSubmitted(true);
        setForm({
          fullName: "",
          phone: "",
          email: "",
          location: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#002a5c] py-16 px-4 md:px-8 flex justify-center items-center">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={hireTutorImg || "/placeholder.svg"}
            alt="Hire Tutor"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center items-center">
          {!submitted ? (
            <>
              <h2 className="text-3xl font-semibold text-[#B88A2F] mb-6 text-center">
                Hire a Tutor
              </h2>

              <form onSubmit={handleSubmit} className="w-full space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#B88A2F] focus:outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#B88A2F] focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#B88A2F] focus:outline-none"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    placeholder="Enter your location"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#B88A2F] focus:outline-none"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subjects you want a tutor for (e.g., Math, Science)"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#B88A2F] focus:outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    class & Board,  competitive Exam
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Enter class & Board,  competitive Exam details.."
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#B88A2F] focus:outline-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#B88A2F] hover:bg-[#9c7529] text-white font-semibold py-2 rounded-lg transition duration-300 disabled:opacity-70"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-[#B88A2F] mb-4">
                🎉 Thank You!
              </h2>
              <p className="text-gray-700 text-lg mb-2">
                Your enquiry has been submitted successfully.
              </p>
              <p className="text-gray-600">
                Our team will reach out to you shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HireTutorForm;
