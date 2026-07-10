import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 🧠 Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://uphometuition-backend.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (result.success) {
        // ✅ Save token to localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('adminName', result.admin?.name || '');
        navigate('/admin'); // Redirect to Admin Dashboard
      } else {
        setError(result.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f6f2] to-[#e5e2dc] font-serif relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md animate-fade flex flex-col gap-6 border border-[#e5e2dc]"
      >
        <div className="flex flex-col items-center mb-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin Login"
            className="h-14 mb-2 rounded-full shadow-lg border border-[#e5e2dc] bg-white"
          />
          <h2 className="text-3xl font-bold text-[#cfac33] mb-2">Admin Login</h2>
          <span className="text-[#f5c56d] text-sm font-medium">Up Home Tuitions</span>
          <span className="text-xs text-[#7c6a4c] mt-1 italic">
            Secure access for authorized personnel only
          </span>
        </div>

        <div>
          <label className="block text-[#4c3a1a] mb-2 font-semibold">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-[#e5e2dc] rounded focus:outline-none focus:ring-2 focus:ring-[#bfa77a] bg-[#f8f6f2]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            autoComplete="username"
          />
        </div>

        <div>
          <label className="block text-[#4c3a1a] mb-2 font-semibold">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-[#e5e2dc] rounded focus:outline-none focus:ring-2 focus:ring-[#bfa77a] bg-[#f8f6f2]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div className="mb-2 text-red-600 text-sm text-center animate-fade-in">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#cfac33] text-white py-2 rounded font-semibold shadow hover:bg-[#cfac33] transition-all disabled:opacity-50 text-lg"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
