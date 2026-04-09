import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import rfsLogo from '@/assets/rfs-logo.png';
import banner01 from '@/assets/banner01.png';
import banner02 from '@/assets/banner02.png';
import banner03 from '@/assets/banner03.png';

const banners = [banner01, banner02, banner03];
const OTP_LENGTH = 6;

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = (location.state as any)?.username || 'user';

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [currentBanner, setCurrentBanner] = useState(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setError('');
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (pasted) {
      const next = [...otp];
      for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
      setOtp(next);
      inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
      e.preventDefault();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      setError('Please enter the complete OTP.');
      return;
    }
    navigate('/dashboard');
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setOtp(Array(OTP_LENGTH).fill(''));
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="min-h-dvh flex flex-col bg-[#f8f7f4] relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 sm:top-5 sm:right-6 lg:top-6 lg:right-10 z-20"
      >
        <img src={rfsLogo} alt="" className="h-9 sm:h-10 lg:h-11 object-contain drop-shadow-sm" />
      </button>

      <div className="flex-1 flex flex-row min-h-0">
        {/* Left: OTP Form */}
        <div className="w-full lg:w-[420px] xl:w-[460px] shrink-0 flex flex-col justify-center px-6 sm:px-10 lg:px-12 pt-14 pb-4 lg:py-6 bg-[#f8f7f4] min-h-0">
          <div className="mb-5 shrink-0">
            <div className="w-12 h-12 rounded-xl mx-auto lg:mx-0 mb-4 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0d6b3a 0%, #18AE59 100%)' }}>
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#0d3320] tracking-tight text-center lg:text-left">Verify OTP</h1>
            <p className="text-xs text-[#6b7c8e] mt-0.5 leading-snug text-center lg:text-left">
              We've sent a verification code to{' '}
              <span className="font-medium text-[#0d3320]">{username}</span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-5 shrink-0">
            {error && (
              <div className="p-2 rounded-lg bg-[#fee2e2] text-[#b91c1c] text-[11px] font-medium leading-snug text-center">
                {error}
              </div>
            )}

            {/* OTP Inputs */}
            <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputsRef.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-11 h-12 text-center text-lg font-semibold rounded-xl border border-[#d1d5db] bg-white text-[#0d3320] focus:outline-none focus:ring-2 focus:ring-[#18AE59]/30 focus:border-[#18AE59] transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full h-9 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:shadow-md active:scale-[0.99]"
              style={{ background: 'linear-gradient(135deg, #0d6b3a 0%, #18AE59 100%)' }}
            >
              Verify & Continue
            </button>
          </form>

          {/* Resend */}
          <div className="text-center mt-4">
            {resendTimer > 0 ? (
              <p className="text-xs text-[#9ca3af]">
                Resend code in <span className="font-semibold text-[#0d3320]">{resendTimer}s</span>
              </p>
            ) : (
              <button onClick={handleResend} className="text-xs font-medium text-[#D1AD6E] hover:text-[#b8943d] transition-colors">
                Resend OTP
              </button>
            )}
          </div>

          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 mx-auto mt-4 text-xs text-[#6b7c8e] hover:text-[#0d3320] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
          </button>

          <p className="mt-4 text-center text-[11px] text-[#9ca3af] shrink-0">
            <a href="mailto:rf.scholarships@reliancefoundation.org" className="text-[#D1AD6E] hover:underline">
              Contact support
            </a>
          </p>
        </div>

        {/* Right: Banner Carousel (same as login) */}
        <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#0d3320] min-h-0">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d3320]/70 via-[#0d3320]/30 to-transparent" />
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

      <p className="pointer-events-none absolute bottom-4 right-4 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-10 z-20 max-w-[calc(100vw-2rem)] text-right text-[10px] sm:text-[11px] leading-snug text-[#0d3320]/60 lg:text-[#f8f7f4]/75">
        <span className="pointer-events-auto inline-block text-right">
          All rights reserved. Terms & Conditions. Contact us:{' '}
          <a
            href="mailto:rf.scholarships@reliancefoundation.org"
            className="font-medium text-[#0d3320] hover:text-[#18AE59] lg:text-[#D1AD6E] lg:hover:text-[#e4c989] underline-offset-2 hover:underline transition-colors"
          >
            rf.scholarships@reliancefoundation.org
          </a>
        </span>
      </p>
    </div>
  );
};

export default VerifyOTP;
