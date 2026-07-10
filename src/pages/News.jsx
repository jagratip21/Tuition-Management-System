import { useEffect, useState } from 'react';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/news/`)
      .then(res => res.json())
      .then(result => {
        if (result.success && Array.isArray(result.data)) {
          setNews(result.data);
        } else {
          setNews([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load news.');
        setLoading(false);
      });
  }, []);

  return (
    <section className="min-h-screen bg-[#f8f6f2] py-12 px-4 font-serif">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#23293a] mb-8 text-center">Latest News</h1>

        {loading && <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfac33] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>}
        {error && <div className="text-center text-red-600">{error}</div>}

        <div className="grid md:grid-cols-2 gap-8">
          {news.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-[#e5e2dc] flex flex-col"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl.startsWith('http') ? item.imageUrl : `${API_BASE}${item.imageUrl}`}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-[#cfac33] mb-2">{item.title}</h2>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 underline mb-2"
                >
                  Source Link
                </a>
              )}
              <p className="text-[#23293a] mb-2 line-clamp-4">{item.description}</p>
            </div>
          ))}
          {news.length === 0 && !loading && (
            <div className="col-span-2 text-center text-[#bfa77a]">No news found.</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default News;
