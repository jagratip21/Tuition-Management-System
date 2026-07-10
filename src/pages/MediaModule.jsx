import React, { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';

function MediaForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || {
    title: '',
    imageUrl: '',
  });
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };
  const handleImageUpload = (imageUrl) => {
    setForm({ ...form, imageUrl });
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
      <div>
        <ImageUploader onUpload={handleImageUpload} />
        {form.imageUrl && (
          <div className="mt-2">
            <img src={form.imageUrl} alt="Uploaded" className="w-20 h-20 object-cover rounded-full border mx-auto" />
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full border p-2 rounded mt-2" readOnly />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-[#bfa77a] text-white px-4 py-2 rounded">{initialData ? 'Update' : 'Create'}</button>
        {onCancel && <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

function MediaModule() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/media`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMedia(data);
      } else if (Array.isArray(data.data)) {
        setMedia(data.data);
      } else {
        setMedia([]);
      }
    } catch (err) {
      setMedia([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCreate = async (item) => {
    await fetch(`${API_BASE}/api/admin/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    setShowForm(false);
    fetchMedia();
  };

  const handleUpdate = async (item) => {
    await fetch(`${API_BASE}/api/admin/media/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    setEditing(null);
    setShowForm(false);
    fetchMedia();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/api/admin/media/${id}`, {
      method: 'DELETE' });
    fetchMedia();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#23293a]">Media</h2>
        <button className="bg-[#bfa77a] text-white px-4 py-2 rounded" onClick={() => { setShowForm(true); setEditing(null); }}>Add Media</button>
      </div>
      {showForm && (
        <div className="mb-8 bg-[#f8f6f2] p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">Add New Media</h3>
          <MediaForm
            onSubmit={editing ? handleUpdate : handleCreate}
            initialData={editing}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </div>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-[#f8f6f2]">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...media].reverse().map(item => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border">{item.imageUrl ? <img src={item.imageUrl} alt="" className="w-12 h-12 object-cover rounded-full mx-auto" /> : 'N/A'}</td>
                <td className="p-2 border">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => { setEditing(item); setShowForm(true); }}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MediaModule;
