import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import "./App.css";

// ✅ Lazy-loaded components
const Navbar = lazy(() => import("./components/Navbar"));
const Topbar = lazy(() => import("./components/Topbar"));
const Footer = lazy(() => import("./components/Footer"));
const HeroSection = lazy(() => import("./components/HeroSection"));
const HomeAboutUs = lazy(() => import("./components/HomeAboutUs"));
const HomeServices = lazy(() => import("./components/HomeServices"));
const HomeLawyerTeam = lazy(() => import("./components/HomeLawyerTeam"));
const HomeStats = lazy(() => import("./components/HomeStats"));
const HomeTestimonials = lazy(() => import("./components/HomeTestimonials"));
const HomeCaseStudies = lazy(() => import("./components/HomeCaseStudies"));
const ConsultationForm = lazy(() => import("./components/ConsultationForm"));
const TutorPopupModal = lazy(() => import("./components/TutorPopupModal"));

// ✅ Lazy-loaded pages
const Tutors = lazy(() => import("./pages/TutorPage"));
const Subjects = lazy(() => import("./pages/SubjectPage"));
const Articles = lazy(() => import("./pages/Articles"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetail"));
const Lawyers = lazy(() => import("./pages/Lawyers"));
const BecomeTutor = lazy(() => import("./pages/BecomeTutorForm.jsx"));
const HireTutor = lazy(() => import("./pages/HireTutor"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const AdminNews = lazy(() => import("./pages/AdminNews"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// ✅ Layout (Navbar, Topbar, Footer visibility logic)
const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout =
    location.pathname.startsWith("/admin") && location.pathname !== "/admin/login";

  return (
    <>
      {!hideLayout && (
        <>
          <Topbar />
          <hr className="border-t border-[#cbb26a] opacity-70" />
          <Navbar />
        </>
      )}

      {children}

      {!hideLayout && <Footer />}
    </>
  );
};

// ✅ Main App
export default function App() {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    setShowDisclaimer(true);
  }, []);

  const handleAgree = () => {
    setHasAgreed(true);
    setShowDisclaimer(false);
  };

  return (
    <Router>
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#cbb26a]"></div>
          </div>
        }
      >
        <Layout>
          {/* ✅ Main content container */}
          <div
            className={`min-h-screen bg-white font-serif flex flex-col relative transition-all duration-500 ${
              showDisclaimer ? "blur-sm scale-[0.99]" : ""
            }`}
          >
            <Routes>
              {/* 🏠 Home Page */}
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <HomeAboutUs />
                    <HomeServices />
                    <HomeLawyerTeam />
                    <HomeStats />
                    <HomeTestimonials />
                    <HomeCaseStudies />
                    
                  </>
                }
              />

              {/* 🔹 Public Pages */}
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/tutors" element={<Tutors />} />
              <Route path="/becomeaTutor" element={<BecomeTutor />} />
              <Route path="/hireTutor" element={<HireTutor />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/lawyers" element={<Lawyers />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/contact" element={<Contact />} />

              {/* 🔒 Admin Pages (no protection) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/news" element={<AdminNews />} />
            </Routes>
          </div>
        </Layout>

        {/* ✅ Tutor Popup Modal (on top of everything) */}
        {showDisclaimer && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <TutorPopupModal onClose={handleAgree} />
          </div>
        )}

        {/* ✅ Floating Buttons */}
        <FloatingButtons />
      </Suspense>
    </Router>
  );
}

// ✅ Floating Buttons (WhatsApp + Call)
const FloatingButtons = () => (
  <>
    <a
      href="https://wa.me/9118706214"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[9998] flex items-center justify-center w-14 h-14 rounded-full 
      bg-gradient-to-br from-green-500 to-green-600 text-white shadow-[0_0_20px_rgba(37,211,102,0.5)] 
      hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] backdrop-blur-md 
      border border-white/20 hover:scale-110 transition-all duration-300 ease-out"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" strokeWidth={2.2} />
    </a>

    <a
      href="tel:+91 9118706214"
      className="fixed bottom-6 right-6 z-[9998] flex items-center justify-center w-14 h-14 rounded-full 
      bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-[0_0_20px_rgba(10,102,194,0.5)] 
      hover:shadow-[0_0_30px_rgba(10,102,194,0.8)] backdrop-blur-md 
      border border-white/20 hover:scale-110 transition-all duration-300 ease-out"
      title="Call Now"
    >
      <Phone className="w-6 h-6" strokeWidth={2.2} />
    </a>
  </>
);
