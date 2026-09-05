import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  fetch(`https://law-firm-backend-e082.onrender.com/api/news/${id}`)
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load news.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif text-[#bfa77a]">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center font-serif text-red-600">{error}</div>;
  if (!news) return null;

  return (
    <section className="min-h-screen bg-[#f8f6f2] py-12 px-4 font-serif">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-[#e5e2dc]">
        <Link to="/news" className="text-[#bfa77a] font-semibold mb-4 inline-block">← Back to News</Link>
        {news.image && <img src={news.image} alt={news.title} className="w-full h-60 object-cover rounded mb-6" />}
        <h1 className="text-3xl font-bold text-[#7c6a4c] mb-4">{news.title}</h1>
        <span className="text-xs text-[#bfa77a] mb-2 block">{new Date(news.date).toLocaleDateString()}</span>
        <div className="text-[#23293a] text-lg leading-relaxed mb-4">{news.content}</div>
      </div>
    </section>
  );
}

export default NewsDetail;
