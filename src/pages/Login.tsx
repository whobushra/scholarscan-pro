import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  const [showCaution, setShowCaution] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
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
    <div className="min-h-dvh flex flex-col bg-[#f8f7f4] relative">
      <Link
        to="/"
        className="absolute top-4 left-4 sm:top-5 sm:left-6 lg:top-6 lg:left-10 z-20"
        aria-label="Reliance Foundation Scholarships home"
      >
        <img src={rfsLogo} alt="" className="h-9 sm:h-10 lg:h-11 object-contain drop-shadow-sm" />
      </Link>

      <div className="flex-1 flex flex-row-reverse min-h-0">
        {/* Left: Login Form */}
        <div className="w-full lg:w-[420px] xl:w-[460px] shrink-0 flex flex-col justify-center px-6 sm:px-10 lg:px-12 pt-14 pb-4 lg:py-6 bg-[#f8f7f4] min-h-0">
          <div className="mb-5 shrink-0">
            <h1 className="text-xl font-bold text-[#0d3320] tracking-tight">Welcome back</h1>
            <p className="text-xs text-[#6b7c8e] mt-0.5 leading-snug">
              Sign in to your scholarship dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 shrink-0">
            {error && (
              <div className="p-2 rounded-lg bg-[#fee2e2] text-[#b91c1c] text-[11px] font-medium leading-snug">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#0d3320] uppercase tracking-wider">
                Username / Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9ca3af]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username or email"
                  className="w-full h-9 pl-9 pr-3 text-sm rounded-lg border border-[#d1d5db] bg-white text-[#0d3320] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#18AE59]/30 focus:border-[#18AE59] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#0d3320] uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9ca3af]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-9 pl-9 pr-10 text-sm rounded-lg border border-[#d1d5db] bg-white text-[#0d3320] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#18AE59]/30 focus:border-[#18AE59] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7c8e] transition-colors p-0.5"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between -mt-0.5">
              <button
                type="button"
                onClick={() => setShowCaution(true)}
                className="text-[11px] font-medium text-[#b91c1c] hover:text-[#991b1b] transition-colors flex items-center gap-1"
              >
                <AlertTriangle className="h-3 w-3" />
                Caution Notice
              </button>
              <button
                type="button"
                className="text-[11px] font-medium text-[#D1AD6E] hover:text-[#b8943d] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-9 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:shadow-md active:scale-[0.99]"
              style={{
                background: 'linear-gradient(135deg, #0d6b3a 0%, #18AE59 100%)',
              }}
            >
              Sign In
            </button>

            <div className="flex items-center gap-2 py-0">
              <div className="flex-1 h-px bg-[#d1d5db]" />
              <span className="text-[9px] text-[#9ca3af] uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-[#d1d5db]" />
            </div>

            <button
              type="button"
              className="w-full h-9 rounded-lg text-sm font-medium border border-[#d1d5db] text-[#0d3320] bg-white hover:bg-[#f1f0ed] transition-colors"
            >
              Sign in with OTP
            </button>
          </form>

          <p className="mt-3 text-center text-[11px] text-[#9ca3af] shrink-0">
            <a href="mailto:rf.scholarships@reliancefoundation.org" className="text-[#b8955c] hover:underline">
              Contact support
            </a>
          </p>
        </div>

        {/* Right: Banner Carousel */}
        <div className="hidden lg:flex flex-1 relative overflow-hidden min-h-0" style={{ backgroundColor: '#e8e4dd' }}>
          {banners.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Scholarship banner ${i + 1}`}
              className="absolute inset-0 w-full h-full object-contain object-center"
              style={{
                opacity: currentBanner === i ? 1 : 0,
                transition: 'opacity 1.2s ease-in-out',
              }}
            />
          ))}
          {/* <div className="absolute inset-0 bg-gradient-to-l from-[#0d3320]/70 via-[#0d3320]/30 to-transparent" /> */}
          <div className="absolute bottom-12 left-12 right-12 z-10">
            <h2 className="text-3xl font-bold text-[#f8f7f4] leading-tight">
              Empowering the next generation<br />through education
            </h2>
            <p className="mt-3 text-sm text-[#f8f7f4]/80 max-w-md">
              Reliance Foundation Scholarships — building a brighter future for deserving students across India.
            </p>
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
      </div>

      <p className="pointer-events-none absolute bottom-4 left-4 sm:bottom-5 sm:left-5 lg:bottom-6 lg:left-10 z-20 max-w-[calc(100vw-2rem)] text-left text-[10px] sm:text-[11px] leading-snug text-[#0d3320]/60 lg:text-[#f8f7f4]/75">
        <span className="pointer-events-auto inline-block text-left">
          All rights reserved.{' '}
          <button
            onClick={() => setShowTerms(true)}
            className="font-medium text-[#0d3320] hover:text-[#18AE59] lg:text-[#D1AD6E] lg:hover:text-[#e4c989] underline-offset-2 hover:underline transition-colors"
          >
            Terms &amp; Conditions
          </button>
          . Contact us:{' '}
          <a
            href="mailto:rf.scholarships@reliancefoundation.org"
            className="font-medium text-[#0d3320] hover:text-[#18AE59] lg:text-[#D1AD6E] lg:hover:text-[#e4c989] underline-offset-2 hover:underline transition-colors"
          >
            rf.scholarships@reliancefoundation.org
          </a>
        </span>
      </p>

      {/* Caution Notice Dialog */}
      <Dialog open={showCaution} onOpenChange={setShowCaution}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-0 gap-0">
          <DialogHeader className="p-0">
            <div className="bg-[#D1AD6E] text-white text-center py-3 px-6 rounded-t-lg">
              <DialogTitle className="text-base font-semibold tracking-wide">Caution Notice</DialogTitle>
            </div>
          </DialogHeader>
          <div className="px-6 py-5 space-y-4 text-[13px] leading-relaxed text-[#1e3a5f]">
            <p>It has come to our notice that certain individuals / persons claiming to be representatives of Reliance Foundation are deceiving / misleading the public by fraudulently collecting / soliciting monies in the form of deposits or otherwise, for purported scholarships and other educational benefits by Reliance Foundation.</p>
            <p>We hereby caution and notify the public that Reliance Foundation and its associated entities have neither appointed nor authorised any person or agency to offer such scholarships, or to issue any letters or to act on our behalf. Any such persons or agencies misleading the public are in no way connected to and do not represent Reliance Foundation or any of its associated entities.</p>
            <p>Reliance Foundation follows a formal selection process to offer scholarships, the details of which can be found on its official website. Reliance Foundation and its associated entities never solicit or accept monies by way of deposits or otherwise to offer any scholarship or other benefits. Members of the public are advised not to deal with such unscrupulous persons or fall prey to such fraudulent activities.</p>
            <p>Anyone dealing with fraudulent scholarship calls or communications would be doing so at their own risk. Reliance Foundation and its associated entities will not be responsible or liable in any manner whatsoever for any loss suffered directly or indirectly as a result of dealing with or depositing money with any such persons.</p>
            <p>We request you to promptly notify the local law enforcement authorities and simultaneously write to us at{' '}
              <a href="mailto:rf.scholarships@reliancefoundation.org" className="text-[#D1AD6E] font-medium hover:underline">
                rf.scholarships@reliancefoundation.org
              </a>{' '}
              in case you come across any such fraudulent incident or have any information regarding solicitation for purported offer of scholarships or benefits in the name of Reliance Foundation or its associated entities.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms & Conditions Dialog */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-0 gap-0">
          <DialogHeader className="p-0">
            <div className="bg-[#18AE59] text-white text-center py-3 px-6 rounded-t-lg">
              <DialogTitle className="text-base font-semibold tracking-wide">Terms &amp; Conditions</DialogTitle>
            </div>
          </DialogHeader>
          <div className="px-6 py-5 space-y-4 text-[13px] leading-relaxed text-[#374151]">
            <p className="font-semibold text-[#0d3320]">1. Acceptance of Terms</p>
            <p>By accessing and using the Reliance Foundation Scholarships portal, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use this platform.</p>
            <p className="font-semibold text-[#0d3320]">2. Eligibility</p>
            <p>The scholarship programs are open to eligible students as defined by Reliance Foundation. All applicants must provide accurate and truthful information during the application process.</p>
            <p className="font-semibold text-[#0d3320]">3. Use of Information</p>
            <p>All personal information collected through this portal will be used solely for scholarship evaluation, verification, and communication purposes. Reliance Foundation is committed to protecting your privacy.</p>
            <p className="font-semibold text-[#0d3320]">4. Intellectual Property</p>
            <p>All content, trademarks, and materials on this platform are the property of Reliance Foundation and are protected by applicable intellectual property laws.</p>
            <p className="font-semibold text-[#0d3320]">5. Disclaimer</p>
            <p>Reliance Foundation reserves the right to modify, suspend, or discontinue any aspect of the scholarship program at any time without prior notice.</p>
            <p className="font-semibold text-[#0d3320]">6. Contact</p>
            <p>For any queries, please contact us at{' '}
              <a href="mailto:rf.scholarships@reliancefoundation.org" className="text-[#D1AD6E] font-medium hover:underline">
                rf.scholarships@reliancefoundation.org
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
