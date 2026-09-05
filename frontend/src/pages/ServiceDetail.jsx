import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LawyerCard from '../components/LawyerCard';
import testImage from '../assets/HeroSection/slider-item-1.jpg';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE}/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setService(data.data);
        } else {
          setError('Service not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch service details');
        setLoading(false);
      });
  }, [id]);

  const getImageUrl = (url) => {
    if (!url) return testImage;
    if (url.startsWith('http')) return url;
    return `${API_BASE}${url}`;
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-[#23293a] mb-2">{service.name}</h1>
      <h2 className="text-lg font-semibold text-[#cfac33] mb-4">{service.slug}</h2>
      <p className="text-gray-700 mb-8">{service.description}</p>

      <h3 className="text-xl font-bold text-[#cfac33] mb-4">Our Lawyers</h3>
      {service.lawyers && service.lawyers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.lawyers.map((lawyer, idx) => (
            <LawyerCard
              key={lawyer._id || idx}
              lawyer={lawyer}
              image={getImageUrl(lawyer.imageUrl)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No lawyers available for this service.</p>
      )}
    </div>
  );
}

export default ServiceDetails;
