"use client";

import React, { useEffect, useState } from "react";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // initial dummy articles
    const dummyArticles = [
      {
        title: "Top 10 Study Habits for Success",
        description:
          "Discover effective study habits that help students achieve top grades and develop lifelong learning skills.",
        date: "October 25, 2025",
        author: "Admin",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Balancing Academics and Mental Health",
        description:
          "Learn how to maintain a healthy balance between academic pressure and mental well-being.",
        date: "September 28, 2025",
        author: "Student Wellness",
        image:
          "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80",
      },
    ];

    // Set initial dummy data
    setArticles(dummyArticles);

    // Fetch blogs from API
    fetch("https://uphometuition-backend.onrender.com/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const apiArticles = data.data.map((blog) => ({
            title: blog.title,
            description: blog.excerpt || "No description available.",
            author: blog.author || "Admin",
            date: new Date(blog.createdAt).toLocaleDateString(),
            image: blog.coverImage
              ? `https://uphometuition-backend.onrender.com${blog.coverImage}`
              : "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
          }));

          // Merge dummy + API blogs
          setArticles((prev) => [...prev, ...apiArticles]);
        }
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <section className="py-16 px-6 md:px-20 bg-[#faf4e4] min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#002b6b] mb-12">
        Latest Educational Articles & Updates
      </h2>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 flex flex-col justify-between h-[230px]">
              <div>
                <h3 className="text-lg font-semibold text-[#002b6b] mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {article.description}
                </p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{article.author}</span>
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Articles;
