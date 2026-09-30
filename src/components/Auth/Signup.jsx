import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { register } from "../../api/auth";


function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.backgroundLocation;

  const closeModal = () => {
    // الذهاب للـ home مباشرة بدلاً من الرجوع
    navigate('/', { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const res = await register(formData);
      console.log("REGISTER SUCCESS", res.data);
  
      // ✅ لو التسجيل ناجح، نروح للـ login بدون background ونمسح الـ history
      navigate("/login", { replace: true });
  
    } catch (err) {
      // ✅ لو في خطأ، نظهره وما نغيّرش الصفحة
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md mx-4 rounded-none shadow-2xl relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-gray-600"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="p-8 pb-6 border-b border-gray-100">
          <h2 className="text-3xl font-light tracking-wider text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-sm font-light text-gray-600">
            Join Mezna Store for exclusive access
          </p>
        </div>

        <div className="p-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
              <label className="block text-xs font-light tracking-wider uppercase text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
  required
  name="name"
  value={formData.name}
  onChange={(e) =>
    setFormData({ ...formData, name: e.target.value })
  }
  className="w-full pl-11 pr-4 py-3 border border-gray-300 ..."
  placeholder="John Doe"
/>

              </div>
            </div>

            <div>
              <label className="block text-xs font-light tracking-wider uppercase text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <input
  required
  type="email"
  name="email"
  value={formData.email}
  onChange={(e) =>
    setFormData({ ...formData, email: e.target.value })
  }
  className="w-full pl-11 pr-4 py-3 border border-gray-300 ..."

  placeholder="your@email.com"
/>

              </div>
            </div>


            <div>
              <label className="block text-xs font-light tracking-wider uppercase text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-lock absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
  required
  type="password"
  value={formData.password}
  onChange={(e) =>
    setFormData({ ...formData, password: e.target.value })
  }
  className="w-full pl-11 pr-4 py-3 border border-gray-300 ..."
placeholder='Create a password'
/>

              </div>
            </div>

            <div>
              <label className="block text-xs font-light tracking-wider uppercase text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-lock absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
  required
  type="password"
  value={formData.password_confirmation}
  onChange={(e) =>
    setFormData({ ...formData, password_confirmation: e.target.value })
  }
  className="w-full pl-11 pr-4 py-3 border border-gray-300 ..."

/>

              </div>
            </div>
            <button
  type="submit"
  disabled={loading}
  className="w-full bg-gray-900 text-white py-3 text-sm font-light tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
>
  {loading ? "Creating..." : "Create Account"}
</button>

            
            {error && (
  <p className="text-sm text-red-500 text-center">
    {error}
  </p>
)}

          </form>

          <div className="mt-6 text-center">
            <p className="text-sm font-light text-gray-600">
              Already have an account?
              <button
                type="button"
                onClick={() => navigate('/login', { state: { backgroundLocation: background || location } })}
                className="ml-2 text-gray-900 hover:underline font-normal"
              >
                Sign In
              </button>


            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
