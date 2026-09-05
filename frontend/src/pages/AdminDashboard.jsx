import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  LogOut,
  UserPlus,
  ClipboardList,
} from "lucide-react";

// 📦 Importing real modules
import TutorModule from "./TutorModule";
import StudentsTutorModule from "./StudentTutorModule";
import TutorRequestModule from "./TutorRequestModule";
import SubjectsModule from "./SubjectsModule";
import ArticleModule from "./ArticleModule";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  const [counts, setCounts] = useState({
    tutors: 5,
    subjects: 12,
    articles: 8,
    studentEnquiries: 10,
    tutorRequests: 17,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
    // ⚡ You can later fetch live counts from API here
  }, [navigate]);

  // 🧭 Sidebar menu items
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "tutors", label: "Tutors", icon: <Users size={20} /> },
    { id: "subjects", label: "Subjects", icon: <BookOpen size={20} /> },
    { id: "articles", label: "Articles", icon: <FileText size={20} /> },
    { id: "studentEnquiries", label: "Student Hire Enquiries", icon: <ClipboardList size={20} /> },
    { id: "tutorRequests", label: "Tutor Join Requests", icon: <ClipboardList size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f2] font-serif flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#23293a] text-white flex flex-col py-8 px-4 shadow-lg">
        <div className="flex items-center gap-2 mb-8">
          <span className="bg-[#cfac33] rounded-full p-2">
            <LayoutDashboard className="h-6 w-6" />
          </span>
          <span className="font-bold text-lg">Tutor Admin Panel</span>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`flex items-center gap-3 px-4 py-2 rounded transition text-left ${
                activeSection === id
                  ? "bg-[#cfac33] text-white shadow-md"
                  : "hover:bg-[#cfac33]/80 hover:text-white"
              }`}
              onClick={() => setActiveSection(id)}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>

        <button
          className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded bg-[#cfac33] text-white font-semibold hover:bg-[#b8982b] transition"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/admin/login");
          }}
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white shadow-inner rounded-tl-3xl transition-all">
        <h1 className="text-3xl font-bold text-[#23293a] mb-8 border-b pb-2">
          {activeSection === "studentEnquiries"
            ? "Student Hire Enquiries"
            : activeSection === "tutorRequests"
            ? "Tutor Join Requests"
            : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </h1>

        {/* Dashboard Overview */}
        {activeSection === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { label: "Tutors", value: counts.tutors },
              { label: "Subjects", value: counts.subjects },
              { label: "Articles", value: counts.articles },
              { label: "Hire Enquiries", value: counts.studentEnquiries },
              { label: "Join Requests", value: counts.tutorRequests },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-gradient-to-br from-[#fff8e6] to-[#fff] cursor-pointer p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
                onClick={() =>
                  setActiveSection(
                    label === "Hire Enquiries"
                      ? "studentEnquiries"
                      : label === "Join Requests"
                      ? "tutorRequests"
                      : label.toLowerCase()
                  )
                }
              >
                <h3 className="text-lg font-semibold text-[#23293a] mb-1">
                  {label}
                </h3>
                <p className="text-3xl font-bold text-[#cfac33]">{value}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Manage {label.toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Section Render */}
        {activeSection === "tutors" && <TutorModule />}
        {activeSection === "students" && <StudentsTutorModule />}
        {activeSection === "tutorRequests" && <TutorRequestModule />}
        {activeSection === "subjects" && <SubjectsModule />}
        {activeSection === "articles" && <ArticleModule />}
        {activeSection === "studentEnquiries" && <StudentsTutorModule />}
      </main>
    </div>
  );
}

export default AdminDashboard;
