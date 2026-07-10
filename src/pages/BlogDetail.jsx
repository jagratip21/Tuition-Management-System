import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE = 'https://law-firm-backend-e082.onrender.com/api/posts';

function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPost(data.data);
        else setError('Post not found');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch post');
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  // Helper function to get full image URL
  const getImageUrl = (url) => {
    if (!url) return '/default-image.png'; // fallback image
    if (url.startsWith('http')) return url;
    return `https://law-firm-backend-e082.onrender.com${url}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-[#23293a] mb-4">{post.title}</h1>
      <h2 className="text-lg font-semibold text-[#cfac33] mb-3">{post.slug}</h2>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        })}
      </p>

      <img
        src={getImageUrl(post.imageUrl)}
        alt={post.title}
        className="w-full rounded-lg shadow-md mb-6"
      />

      <p className="text-gray-700 leading-relaxed">{post.content}</p>
    </div>
  );
}

export default BlogDetail;
