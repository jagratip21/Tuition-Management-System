import React, { useState, useEffect } from 'react';
import ImageUploader from '../components/ImageUploader';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';

function NewsForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    link: '',
    description: '',
    image: null,
    imagePreview: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        imagePreview: initialData.imageUrl || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = (file) => {
    if (file) {
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      alert('Title and Description are required.');
      return;
    }
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('link', form.link || '');
    formData.append('description', form.description);
    if (form.image instanceof File) formData.append('image', form.image);
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="link"
        value={form.link}
        onChange={handleChange}
        placeholder="Link"
        className="w-full border p-2 rounded"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded h-32 resize-none overflow-y-auto"
        required
      />
      <div>
        <ImageUploader onUpload={handleImageUpload} />
        {form.imagePreview && (
          <div className="mt-2">
            <img
              src={form.imagePreview}
              alt="Uploaded"
              className="w-20 h-20 object-cover rounded-full border mx-auto"
            />
          </div>
        )}
      </div>
      <div className="flex gap-2 justify-center">
        <button type="submit" className="bg-[#cfac33] text-white px-5 py-2 rounded font-medium hover:bg-[#b8932b] transition">
          {initialData ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-200 px-5 py-2 rounded font-medium hover:bg-gray-300 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function NewsModule() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/news/`);
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) setNewsList(result.data);
      else setNewsList([]);
    } catch (err) {
      console.error(err);
      setNewsList([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, []);

  const handleCreate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/news/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!data.error) { setShowModal(false); fetchNews(); }
      else alert(data.error);
    } catch (err) {
      console.error('Create news error:', err);
    }
  };

  const handleUpdate = async (formData) => {
    if (!editing || !editing.id) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/news/${editing.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!data.error) { setEditing(null); setShowModal(false); fetchNews(); }
      else alert(data.error);
    } catch (err) {
      console.error('Update news error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this news?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!data.error) fetchNews();
      else alert(data.error);
    } catch (err) {
      console.error('Delete news error:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#23293a] border-b-2 border-[#cfac33] pb-2">News</h2>
        <button
          className="bg-[#cfac33] text-white px-4 py-2 rounded"
          onClick={() => { setShowModal(true); setEditing(null); }}
        >
          Add News
        </button>
      </div>

      {/* Popup Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">
              {editing ? 'Edit News' : 'Add New News'}
            </h3>
            <NewsForm
              onSubmit={editing ? handleUpdate : handleCreate}
              initialData={editing}
              onCancel={() => { setShowModal(false); setEditing(null); }}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfac33] mx-auto mb-2"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-[#23293a] text-white">
                <th className="p-3 font-semibold text-left">Title</th>
                <th className="p-3 font-semibold text-left">Link</th>
                <th className="p-3 font-semibold text-left">Description</th>
                <th className="p-3 font-semibold text-left">Image</th>
                <th className="p-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...newsList].reverse().map((item, index) => (
                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f3f1eb]'} hover:bg-[#ede9dd] transition`}>
                  <td className="p-3 border text-left">{item.title}</td>
                  <td className="p-3 border text-left">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                        {item.link}
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td className="p-3 border text-left">
                    <div className="text-sm text-gray-700 max-h-[3em] overflow-y-auto px-1" style={{ lineHeight: '1.5' }}>
                      {item.description}
                    </div>
                  </td>
                  <td className="p-3 border text-center">
                    {item.imageUrl ? (
                      <img src={`${API_BASE}${item.imageUrl}`} alt="" className="w-12 h-12 object-cover rounded-full mx-auto" />
                    ) : 'N/A'}
                  </td>
                  <td className="p-3 border flex justify-center items-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600 transition"
                      onClick={() => { setEditing(item); setShowModal(true); }}
                    >
                      <FiEdit2 /> Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600 transition"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {newsList.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-[#cfac33]">
                    No news found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NewsModule;
