import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // تأكدي المسار صح

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.backgroundLocation;

  const { login, user } = useAuth(); // إضافة user للمراقبة
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // مراقبة تغيير حالة المستخدم
  useEffect(() => {
    if (user && (user.name || user.email)) {
      console.log("User logged in, navigating to home");
      // التأكد من الذهاب للـ home بدلاً من الرجوع للصفحة السابقة
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleClose = () => {
    // إذا كان المستخدم مسجل دخول، نروح للـ home
    if (user && (user.name || user.email)) {
      navigate('/', { replace: true });
    } else if (background) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
  
    console.log("Submitting login with:", formData); // البيانات قبل الإرسال
  
    try {
      const res = await login(formData); 
      console.log("Login success:", res.data); // لما تسجيل الدخول ينجح
      
      // لا نحتاج لإغلاق المودال هنا لأن useEffect سيتولى ذلك
      // عند تحديث user state
      
    } catch (err) {
      console.log("Login failed:", err.response?.data || err);
      setError(
        err.response?.data?.message || 'Login failed, please check your credentials'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md mx-4 rounded-none shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          {/* SVG X icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-8 pb-6 border-b border-gray-100">
          <h2 className="text-3xl font-light tracking-wider text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-sm font-light text-gray-600">
            Sign in to access your account
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              required
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full pl-11 pr-4 py-3 border border-gray-300 text-sm font-light"
            />

            <input
              required
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-11 pr-4 py-3 border border-gray-300 text-sm font-light"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white py-3 text-sm font-light tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up */}
          <div className="mt-6 text-center">
            <p className="text-sm font-light text-gray-600">
              Don't have an account?
              <button
                type="button"
                onClick={() =>
                  navigate('/signup', {
                    state: { backgroundLocation: background || location },
                  })
                }
                className="ml-2 text-gray-900 hover:underline font-normal"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
