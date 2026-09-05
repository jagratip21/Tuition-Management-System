import { useEffect, useState } from 'react';
import LawyerCard from '../components/LawyerCard';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';
function Lawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/lawyers`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          console.log('Fetched lawyers:', result.data);
          setLawyers(result.data);
        } else {
          setLawyers([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load lawyers.');
        setLoading(false);
      });
  }, []);

  const getImageUrl = (url) => {
    if (!url) return '/default-lawyer.png';
    if (url.startsWith('http')) return url;
    return `${API_BASE}${url}`;
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] font-serif w-screen p-0 m-0 max-w-none">
      <div className="w-screen px-0 py-8 max-w-none">
        <h1 className="text-3xl font-bold text-[#23293a] mb-8 px-8">Our Lawyers</h1>

        {loading && <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfac33] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>}
        {error && <div className="text-red-600 px-8">{error}</div>}

        <div className="flex flex-wrap gap-8 w-screen px-8">
          {lawyers.map((lawyer) => {
            const imageSrc = getImageUrl(lawyer.imageUrl);
            //console.log('Rendering lawyer:', lawyer.name, imageSrc);
            return (
              <div key={lawyer.id || lawyer._id} className="flex-grow min-w-[320px]">
                <LawyerCard lawyer={lawyer} image={imageSrc} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Lawyers;
