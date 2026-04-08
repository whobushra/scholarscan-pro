import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import rfsLogo from '@/assets/rfs-logo.png';
import banner01 from '@/assets/banner01.png';
import banner02 from '@/assets/banner02.png';
import banner03 from '@/assets/banner03.png';

const banners = [banner01, banner02, banner03];

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    navigate('/verify-otp', { state: { username } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f4]">
      <div className="flex-1 flex">
        {/* Left: Banner Carousel */}
        <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#0d3320]">
          {banners.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Scholarship banner ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: currentBanner === i ? 1 : 0,
                transition: 'opacity 1.2s ease-in-out',
              }}
            />
          ))}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d3320]/70 via-[#0d3320]/30 to-transparent" />
          {/* Text overlay */}
          <div className="absolute bottom-12 left-12 right-12 z-10">
            <h2 className="text-3xl font-bold text-[#f8f7f4] leading-tight">
              Empowering the next generation<br />through education
            </h2>
            <p className="mt-3 text-sm text-[#f8f7f4]/80 max-w-md">
              Reliance Foundation Scholarships — building a brighter future for deserving students across India.
            </p>
            {/* Dots */}
            <div className="flex gap-2 mt-6">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBanner(i)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: currentBanner === i ? 28 : 8,
                    backgroundColor: currentBanner === i ? '#D1AD6E' : 'rgba(255,255,255,0.4)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="w-full lg:w-[480px] xl:w-[520px] flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-12 bg-[#f8f7f4]">
          <div className="mb-10">
            <img src={rfsLogo} alt="Reliance Foundation Scholarships" className="h-14 object-contain" />
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-[#0d3320]">Welcome back</h1>
              <p className="text-sm text-[#6b7c8e] mt-1">Sign in to access your scholarship dashboard</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-[#fee2e2] text-[#b91c1c] text-xs font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0d3320] uppercase tracking-wider">
                Username / Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username or email"
                  className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-[#d1d5db] bg-white text-[#0d3320] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#18AE59]/30 focus:border-[#18AE59] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0d3320] uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-11 pl-10 pr-11 text-sm rounded-xl border border-[#d1d5db] bg-white text-[#0d3320] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#18AE59]/30 focus:border-[#18AE59] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7c8e] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs font-medium text-[#D1AD6E] hover:text-[#b8943d] transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #0d6b3a 0%, #18AE59 100%)',
              }}
            >
              Sign In
            </button>

            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-[#d1d5db]" />
              <span className="text-[10px] text-[#9ca3af] uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-[#d1d5db]" />
            </div>

            <button
              type="button"
              className="w-full h-11 rounded-xl text-sm font-medium border border-[#d1d5db] text-[#0d3320] bg-white hover:bg-[#f1f0ed] transition-colors"
            >
              Sign in with OTP
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-[#9ca3af]">
            Need help?{' '}
            <a href="mailto:rf.scholarships@reliancefoundation.org" className="text-[#D1AD6E] hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>

      <footer className="py-4 px-8 border-t border-[#e5e7eb] bg-[#f8f7f4]">
        <p className="text-center text-[11px] text-[#9ca3af] leading-relaxed">
          All rights reserved. Terms &amp; Conditions. Contact us:{' '}
          <a href="mailto:rf.scholarships@reliancefoundation.org" className="text-[#D1AD6E] hover:underline">
            rf.scholarships@reliancefoundation.org
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Login;
