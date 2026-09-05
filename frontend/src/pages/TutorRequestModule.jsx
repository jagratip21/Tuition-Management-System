import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { API_ORIGIN } from '../lib/api';

const API_BASE = API_ORIGIN;

// Status options (for dropdown)
const STATUS_MAP = {
  'New': 'new',
  'Pending': 'pending',
  'Not Interested': 'not_interested',
  'Out of Area': 'out_of_area',
  'Complete': 'complete',
};

// ---------- Enquiry Actions ----------
function EnquiryActions({ enquiry, handleDelete, handleStatusUpdate }) {
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
      {/* Status dropdown */}
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

      {/* Delete button */}
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

// ---------- Main Join Tutor Enquiry Module ----------
function JoinTutorEnquiriesModule() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  // Fetch all enquiries
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/enquiries/join-as-tutor`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setEnquiries(data.data);
      else setEnquiries([]);
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
      setEnquiries([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchEnquiries(); }, []);

  // Delete enquiry
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/api/enquiries/join/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchEnquiries();
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
    }
  };

  // Update status
  const handleStatusUpdate = async (id, statusLabel) => {
    try {
      const status = STATUS_MAP[statusLabel];
      const res = await fetch(`${API_BASE}/api/enquiries/join/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status }),
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
        Join Tutor Enquiries Management
      </h2>

      {loading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfac33] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading enquiries...</p>
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
                <th className="p-3 font-semibold text-left">Expertise</th>
                <th className="p-3 font-semibold text-left">class</th>
                <th className="p-3 font-semibold text-center">Status / Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...enquiries].reverse().map((enquiry, index) => (
                <tr
                  key={enquiry.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f3f1eb]'} hover:bg-[#ede9dd] transition`}
                >
                  <td className="p-3 border-t">{enquiry.fullName}</td>
                  <td className="p-3 border-t">{enquiry.email}</td>
                  <td className="p-3 border-t">{enquiry.phone}</td>
                  <td className="p-3 border-t">{enquiry.location}</td>
                  <td className="p-3 border-t">{enquiry.expertise}</td>
                  <td className="p-3 border-t">{enquiry.message}</td>
                  <td className="p-3 border-t text-center">
                    <EnquiryActions
                      enquiry={enquiry}
                      handleDelete={handleDelete}
                      handleStatusUpdate={handleStatusUpdate}
                    />
                  </td>
                </tr>
              ))}
              {enquiries.length === 0 && !loading && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-[#bfa77a] font-medium">
                    No Join Tutor enquiries found.
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

export default JoinTutorEnquiriesModule;
