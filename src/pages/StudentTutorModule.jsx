import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const API_BASE = 'https://uphometuition-backend.onrender.com';

const STATUS_MAP = {
  'New': 'pending',
  'Complete': 'complete',
  'Not Interested': 'not_interested',
  'Irrelevant': 'irrelevant'
};

// ---------- Hire Enquiry Form ----------
function HireEnquiryForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || {
    fullName: '',
    phone: '',
    email: '',
    location: '',
    subject: '',
    message: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" required />
      <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="w-full border p-2 rounded" required />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="w-full border p-2 rounded" required />
      <div className="flex gap-2 justify-center">
        <button type="submit" className="bg-[#cfac33] text-white px-5 py-2 rounded font-medium hover:bg-[#b8932b] transition">
          {initialData ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button type="button" className="bg-gray-200 px-5 py-2 rounded font-medium hover:bg-gray-300 transition" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// ---------- Hire Enquiry Actions ----------
function HireEnquiryActions({ enquiry, handleDelete, handleStatusUpdate }) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    Object.keys(STATUS_MAP).find(key => STATUS_MAP[key] === enquiry.status) || 'New'
  );
  const [loading, setLoading] = useState(false);

  const statuses = Object.keys(STATUS_MAP);

  const handleStatusClick = async (statusLabel) => {
    setLoading(true);
    setSelectedStatus(statusLabel);
    setOpen(false);
    try {
      await handleStatusUpdate(enquiry.id, statusLabel);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    setLoading(true);
    try {
      await handleDelete(enquiry.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-center relative">
      {/* Status Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          disabled={loading}
          className={`min-w-[120px] px-3 py-1.5 rounded text-white text-sm flex items-center justify-between transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
          ) : (
            <>
              {selectedStatus} <ChevronDown size={14} />
            </>
          )}
        </button>

        {open && !loading && (
          <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => handleStatusClick(status)}
                className="block w-full text-left px-3 py-1.5 text-gray-700 hover:bg-gray-100 text-sm transition"
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDeleteClick}
        disabled={loading}
        className={`px-3 py-1.5 rounded text-white text-sm transition ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {loading ? (
          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
        ) : (
          'Delete'
        )}
      </button>
    </div>
  );
}

// ---------- Main Hire Enquiries Module ----------
function HireEnquiriesModule() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem('token');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/enquiries/hire-tutor`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setEnquiries(data.data);
      else setEnquiries([]);
    } catch (err) {
      console.error(err);
      setEnquiries([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const handleCreate = async (enquiry) => {
    try {
      await fetch(`${API_BASE}/api/enquiry/hire-tutor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry)
      });
      setShowForm(false);
      fetchEnquiries();
    } catch (err) {
      console.error('Failed to create enquiry:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/api/enquiry/hire/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchEnquiries();
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
    }
  };

  const handleStatusUpdate = async (id, statusLabel) => {
    try {
      const status = STATUS_MAP[statusLabel];
      const res = await fetch(`${API_BASE}/api/enquiry/hire/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Failed to update status');
      fetchEnquiries();
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status: ' + err.message);
    }
  };

  return (
    <div className="p-8 bg-[#ffffff] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#23293a] mb-6 border-b-2 border-[#cfac33] pb-2">
        Hire Tutor Enquiries
      </h2>

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-[#23293a] mb-4 text-center">
            {editing ? 'Edit Hire Enquiry' : 'Add New Hire Enquiry'}
          </h3>
          <HireEnquiryForm
            onSubmit={handleCreate}
            initialData={editing}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </div>
      )}

      {loading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfac33] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-[#23293a] text-white">
                <th className="p-3 font-semibold text-left">Full Name</th>
                <th className="p-3 font-semibold text-left">Email</th>
                <th className="p-3 font-semibold text-left">Phone</th>
                <th className="p-3 font-semibold text-left">Location</th>
                <th className="p-3 font-semibold text-left">Subject</th>
                <th className="p-3 font-semibold text-left">Message</th>
                <th className="p-3 font-semibold text-center">Status / Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length > 0 ? (
                [...enquiries].map((enquiry, index) => (
                  <tr key={enquiry.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f3f1eb]'} hover:bg-[#ede9dd] transition`}>
                    <td className="p-3 border-t">{enquiry.fullName}</td>
                    <td className="p-3 border-t">{enquiry.email}</td>
                    <td className="p-3 border-t">{enquiry.phone}</td>
                    <td className="p-3 border-t">{enquiry.location}</td>
                    <td className="p-3 border-t">{enquiry.subject}</td>
                    <td className="p-3 border-t">{enquiry.message}</td>
                    <td className="p-3 border-t text-center">
                      <HireEnquiryActions
                        enquiry={enquiry}
                        handleDelete={handleDelete}
                        handleStatusUpdate={handleStatusUpdate}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-[#bfa77a] font-medium">
                    No hire enquiries found.
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

export default HireEnquiriesModule;
