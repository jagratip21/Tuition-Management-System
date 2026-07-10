import React, { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const API_BASE = 'https://uphometuition-backend.onrender.com';

// ---------- Subject Form ----------
function SubjectForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || {
    name: '',
    description: '',
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

    if (!form.name || !form.description) {
      setError('All fields are required.');
      return;
    }

    setError('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    if (form.image instanceof File) formData.append('image', form.image);

    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Subject Name"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded h-32 resize-none overflow-y-auto"
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

// ---------- Subjects Module ----------
function SubjectsModule() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/subjects`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setSubjects(data.data);
      else setSubjects([]);
    } catch (err) {
      console.error(err);
      setSubjects([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchSubjects(); }, []);

  const handleCreate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/subjects`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchSubjects();
      } else alert(data.message || 'Failed to create subject');
    } catch (err) {
      console.error('Create subject error:', err);
    }
  };

  const handleUpdate = async (formData) => {
    if (!editing || !editing.id) return;
    try {
      const res = await fetch(`${API_BASE}/api/subjects/${editing.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setEditing(null);
        setShowModal(false);
        fetchSubjects();
      } else alert(data.message || 'Failed to update subject');
    } catch (err) {
      console.error('Update subject error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this subject?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/subjects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchSubjects();
      else alert(data.message || 'Failed to delete subject');
    } catch (err) {
      console.error('Delete subject error:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#23293a] border-b-2 border-[#cfac33] pb-2">
          Subjects Management
        </h2>
        <button
          className="bg-[#cfac33] text-white px-4 py-2 rounded"
          onClick={() => { setShowModal(true); setEditing(null); }}
        >
          Add Subject
        </button>
      </div>

      {/* Popup Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">
              {editing ? 'Edit Subject' : 'Add New Subject'}
            </h3>
            <SubjectForm
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
                <th className="p-3 font-semibold text-left">Subject Name</th>
                <th className="p-3 font-semibold text-left">class & Board, competitive Exam</th>
                <th className="p-3 font-semibold text-center">Image</th>
                <th className="p-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...subjects].reverse().map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f3f1eb]'} hover:bg-[#ede9dd] transition`}
                >
                  <td className="p-3 border-t text-left">{item.name}</td>
                  <td className="p-3 border-t text-left">
                    <div
                      className="text-sm text-gray-700 px-2 overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.5',
                      }}
                    >
                      {item.description}
                    </div>
                  </td>
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
              {subjects.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-[#cfac33]">
                    No subjects found.
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

export default SubjectsModule;
