import React, { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { API_ORIGIN } from '../lib/api';

const API_BASE = API_ORIGIN;

// ---------- Blog Form ----------
function BlogForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(
    initialData || {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      author: '',
      published: false,
      coverImage: null,
      imagePreview: initialData?.coverImage
        ? `${API_BASE}${initialData.coverImage}`
        : '',
    }
  );

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        imagePreview: initialData.coverImage
          ? `${API_BASE}${initialData.coverImage}`
          : '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = (file) => {
    if (file) {
      setForm({
        ...form,
        coverImage: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.content) {
      setError('All required fields must be filled.');
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('slug', form.slug);
    formData.append('content', form.content);
    formData.append('excerpt', form.excerpt);
    formData.append('author', form.author);
    formData.append('published', form.published);
    if (form.coverImage instanceof File)
      formData.append('coverImage', form.coverImage);

    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
        className="w-full border p-2 rounded"
      />
      <textarea
        name="excerpt"
        value={form.excerpt}
        onChange={handleChange}
        placeholder="Short excerpt"
        className="w-full border p-2 rounded h-20 resize-none"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Full content"
        className="w-full border p-2 rounded h-32 resize-none overflow-y-auto"
        required
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="published"
          checked={form.published}
          onChange={handleChange}
        />
        <label>Published</label>
      </div>

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

// ---------- Blog Module ----------
function PostsModule() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/blogs`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setBlogs(data.data);
      else setBlogs([]);
    } catch (err) {
      console.error(err);
      setBlogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/blogs`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchBlogs();
      } else alert(data.message || 'Failed to create blog');
    } catch (err) {
      console.error('Create blog error:', err);
    }
  };

  const handleUpdate = async (formData) => {
    if (!editing?.id) return;
    try {
      const res = await fetch(`${API_BASE}/api/blogs/${editing.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setEditing(null);
        setShowModal(false);
        fetchBlogs();
      } else alert(data.message || 'Failed to update blog');
    } catch (err) {
      console.error('Update blog error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm('Are you sure you want to delete this blog?'))
      return;
    try {
      const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) fetchBlogs();
      else alert(data.message || 'Failed to delete blog');
    } catch (err) {
      console.error('Delete blog error:', err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#23293a] border-b-2 border-[#cfac33] pb-2">
          Blog Management
        </h2>
        <button
          className="bg-[#cfac33] text-white px-4 py-2 rounded"
          onClick={() => {
            setShowModal(true);
            setEditing(null);
          }}
        >
          Add Blog
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <h3 className="text-2xl font-semibold text-[#23293a] mb-5 text-center border-b pb-3">
              {editing ? 'Edit Blog' : 'Add New Blog'}
            </h3>

            {/* Close button (optional) */}
            <button
              onClick={() => {
                setShowModal(false);
                setEditing(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>

            <BlogForm
              onSubmit={editing ? handleUpdate : handleCreate}
              initialData={editing}
              onCancel={() => {
                setShowModal(false);
                setEditing(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfac33] mx-auto"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-[#23293a] text-white">
                <th className="p-3 font-semibold text-left">Title / Author</th>
                <th className="p-3 font-semibold text-left">Slug</th>
                <th className="p-3 font-semibold text-left">Excerpt</th>
                <th className="p-3 font-semibold text-left">Image</th>
                <th className="p-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...blogs].reverse().map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#f3f1eb]'
                  } hover:bg-[#ede9dd] transition`}
                >
                  <td className="p-3 border text-left">
                    <div className="font-semibold text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500 italic">
                      By: {item.author || 'Unknown'}
                    </div>
                  </td>
                  <td className="p-3 border text-gray-800">{item.slug}</td>
                  <td className="p-3 border text-left">
                    <div className="text-sm text-gray-700 max-h-[3em] overflow-y-auto">
                      {item.excerpt || item.content?.substring(0, 100) + '...'}
                    </div>
                  </td>
                  <td className="p-3 border text-center">
                    {item.coverImage ? (
                      <img
                        src={`${API_BASE}${item.coverImage}`}
                        alt="cover"
                        className="w-14 h-14 object-cover rounded-full mx-auto border"
                      />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="p-3 border flex justify-center items-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600 transition"
                      onClick={() => {
                        setEditing(item);
                        setShowModal(true);
                      }}
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
              {blogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-[#cfac33]">
                    No blogs found.
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

export default PostsModule;
