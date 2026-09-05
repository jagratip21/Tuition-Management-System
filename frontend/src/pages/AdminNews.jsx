import { useEffect, useState } from 'react';

const API = 'http://localhost:3000/api';

function AdminNews() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({ title: '', summary: '', content: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('admin_token');

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/news/`);
      const data = await res.json();
      setNews(data);
    } catch {
      setError('Failed to fetch news');
    }
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API}/admin/news/${editingId}` : `${API}/admin/news/`;
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to save');
      setForm({ title: '', summary: '', content: '', image: '' });
      setEditingId(null);
      fetchNews();
    } catch {
      setError('Failed to save news');
    }
    setLoading(false);
  };

  const handleEdit = item => {
    setForm({ title: item.title, summary: item.summary, content: item.content, image: item.image || '' });
    setEditingId(item._id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this news item?')) return;
    setLoading(true);
    try {
      await fetch(`${API}/admin/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNews();
    } catch {
      setError('Failed to delete');
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-[#f8f6f2] py-12 px-4 font-serif">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#7c6a4c] mb-8 text-center">Admin News Management</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-[#e5e2dc] flex flex-col gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="px-4 py-2 border border-[#e5e2dc] rounded focus:ring-[#bfa77a]" required />
          <input name="summary" value={form.summary} onChange={handleChange} placeholder="Summary" className="px-4 py-2 border border-[#e5e2dc] rounded focus:ring-[#bfa77a]" required />
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" className="px-4 py-2 border border-[#e5e2dc] rounded focus:ring-[#bfa77a]" rows={4} required />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (optional)" className="px-4 py-2 border border-[#e5e2dc] rounded focus:ring-[#bfa77a]" />
          <button type="submit" className="bg-[#bfa77a] text-white py-2 rounded font-semibold shadow hover:bg-[#a08a5c] transition-all disabled:opacity-50" disabled={loading}>{editingId ? 'Update' : 'Create'} News</button>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        </form>
        <div className="grid gap-6">
          {loading ? <div className="text-[#bfa77a]">Loading...</div> : null}
          {news.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow p-4 border border-[#e5e2dc] flex flex-col md:flex-row gap-4 items-center">
              {item.image && <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded mb-2" />}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#7c6a4c]">{item.title}</h2>
                <p className="text-[#23293a] mb-1 line-clamp-2">{item.summary}</p>
                <span className="text-xs text-[#bfa77a]">{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => handleEdit(item)} className="bg-[#bfa77a] text-white px-3 py-1 rounded font-semibold hover:bg-[#a08a5c]">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded font-semibold hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminNews;
