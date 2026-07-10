import React, { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const API_BASE = 'https://uphometuition-backend.onrender.com';

// ---------- Tutor Form ----------
function TutorForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || {
    fullName: '',
    phone: '',
    email: '',
    location: '',
    expertise: '',
    image: null,
    imagePreview: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        imagePreview: initialData.imageUrl ? `${API_BASE}${initialData.imageUrl}` : ''
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

    if (!form.fullName || !form.phone || !form.email || !form.location || !form.expertise) {
      setError('All fields are required.');
      return;
    }

    setError('');

    const formData = new FormData();
    formData.append('fullName', form.fullName);
    formData.append('phone', form.phone);
    formData.append('email', form.email);
    formData.append('location', form.location);
    formData.append('expertise', form.expertise);
    if (form.image instanceof File) formData.append('image', form.image);

    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <input
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border p-2 rounded"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded"
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full border p-2 rounded"
      />
      <input
        name="expertise"
        value={form.expertise}
        onChange={handleChange}
        placeholder="Expertise"
        className="w-full border p-2 rounded"
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
        <button
          type="submit"
          className="bg-[#cfac33] text-white px-5 py-2 rounded font-medium hover:bg-[#b8932b] transition"
        >
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

// ---------- Tutor Module ----------
function TutorModule() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');

  const fetchTutors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/tutors`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setTutors(data.data);
      else setTutors([]);
    } catch (err) {
      console.error(err);
      setTutors([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchTutors(); }, []);

  const handleCreate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/tutors`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchTutors();
      } else alert(data.message || 'Failed to create tutor');
    } catch (err) {
      console.error('Create tutor error:', err);
    }
  };

  const handleUpdate = async (formData) => {
    if (!editing || !editing.id) return;
    try {
      const res = await fetch(`${API_BASE}/api/tutors/${editing.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setEditing(null);
        setShowModal(false);
        fetchTutors();
      } else alert(data.message || 'Failed to update tutor');
    } catch (err) {
      console.error('Update tutor error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this tutor?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/tutors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchTutors();
      else alert(data.message || 'Failed to delete tutor');
    } catch (err) {
      console.error('Delete tutor error:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#23293a] border-b-2 border-[#cfac33] pb-2">
          Tutors Management
        </h2>
        <button
          className="bg-[#cfac33] text-white px-4 py-2 rounded"
          onClick={() => { setShowModal(true); setEditing(null); }}
        >
          Add Tutor
        </button>
      </div>

      {/* Popup Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">
              {editing ? 'Edit Tutor' : 'Add New Tutor'}
            </h3>
            <TutorForm
              onSubmit={editing ? handleUpdate : handleCreate}
              initialData={editing}
              onCancel={() => { setShowModal(false); setEditing(null); }}
            />
          </div>
        </div>
      )}

      {/* Loading Spinner */}
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
                <th className="p-3 font-semibold text-left">Name</th>
                <th className="p-3 font-semibold text-left">Phone</th>
                <th className="p-3 font-semibold text-left">Email</th>
                <th className="p-3 font-semibold text-left">Location</th>
                <th className="p-3 font-semibold text-left">Expertise</th>
                <th className="p-3 font-semibold text-center">Image</th>
                <th className="p-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...tutors].reverse().map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f3f1eb]'} hover:bg-[#ede9dd] transition`}
                >
                  <td className="p-3 border-t text-left">{item.fullName}</td>
                  <td className="p-3 border-t text-left">{item.phone}</td>
                  <td className="p-3 border-t text-left">{item.email}</td>
                  <td className="p-3 border-t text-left">{item.location}</td>
                  <td className="p-3 border-t text-left">{item.expertise}</td>
                  <td className="p-3 border-t text-center">
                    {item.imageUrl
                      ? <img src={`${API_BASE}${item.imageUrl}`} alt="" className="w-12 h-12 object-cover rounded-full mx-auto" />
                      : 'N/A'}
                  </td>
                  <td className="p-3 border-t flex justify-center items-center gap-2">
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
              {tutors.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-[#cfac33]">
                    No tutors found.
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

export default TutorModule;
