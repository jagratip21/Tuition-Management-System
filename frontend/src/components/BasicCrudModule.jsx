import React, { useEffect, useState } from 'react';
import ImageUploader from './ImageUploader';

function BasicCrudModule({ apiBase, fields, title }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      } else if (Array.isArray(data.items)) {
        setItems(data.items);
      } else {
        setItems([]);
      }
    } catch (err) {
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (imageUrl) => {
    setForm({ ...form, image: imageUrl });
  };

  const handleCreate = async (item) => {
    await fetch(`${apiBase}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    setShowForm(false);
    setForm({});
    fetchItems();
  };

  const handleUpdate = async (item) => {
    await fetch(`${apiBase}/${editing._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    setEditing(null);
    setShowForm(false);
    setForm({});
    fetchItems();
  };

  const handleDelete = async (id) => {
    await fetch(`${apiBase}/${id}`, {
      method: 'DELETE' });
    fetchItems();
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm(item);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#23293a]">{title}</h2>
        <button className="bg-[#bfa77a] text-white px-4 py-2 rounded" onClick={() => { setShowForm(true); setEditing(null); setForm({}); }}>Add</button>
      </div>
      {showForm && (
        <div className="mb-8 bg-[#f8f6f2] p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">{editing ? `Edit ${title}` : `Add New ${title}`}</h3>
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); editing ? handleUpdate(form) : handleCreate(form); }}>
            {fields.map(field => (
              field.type === 'image' ? (
                <div key={field.name}>
                  <ImageUploader onUpload={handleImageUpload} />
                  {form.image && (
                    <div className="mt-2">
                      <img src={form.image} alt="Uploaded" className="w-20 h-20 object-cover rounded-full border mx-auto" />
                      <input name="image" value={form.image} onChange={handleChange} className="w-full border p-2 rounded mt-2" readOnly />
                    </div>
                  )}
                </div>
              ) : (
                <input key={field.name} name={field.name} value={form[field.name] || ''} onChange={handleChange} placeholder={field.label} className="w-full border p-2 rounded" required={field.required} />
              )
            ))}
            <div className="flex gap-2">
              <button type="submit" className="bg-[#bfa77a] text-white px-4 py-2 rounded">{editing ? 'Update' : 'Create'}</button>
              <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={() => { setShowForm(false); setEditing(null); setForm({}); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-[#f8f6f2]">
              {fields.map(field => (
                <th key={field.name} className="p-2 border">{field.label}</th>
              ))}
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...items].reverse().map(item => (
              <tr key={item._id} className="text-center">
                {fields.map(field => (
                  field.type === 'image' ? (
                    <td key={field.name} className="p-2 border">{item.image ? <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-full mx-auto" /> : 'N/A'}</td>
                  ) : (
                    <td key={field.name} className="p-2 border">{item[field.name]}</td>
                  )
                ))}
                <td className="p-2 border">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => startEdit(item)}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BasicCrudModule;
