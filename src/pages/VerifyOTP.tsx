import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import rfsLogo from '@/assets/rfs-logo.png';

const OTP_LENGTH = 6;

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = (location.state as any)?.username || 'user';

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
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
    navigate('/');
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setOtp(Array(OTP_LENGTH).fill(''));
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f4]">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={rfsLogo} alt="Reliance Foundation Scholarships" className="h-14 object-contain" />
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#e5e7eb] p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1a3c5e 0%, #2a5a8a 100%)' }}>
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#1a3c5e]">Verify OTP</h2>
              <p className="text-sm text-[#6b7c8e] mt-1.5">
                We've sent a verification code to<br />
                <span className="font-medium text-[#1a3c5e]">{username}</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-[#fee2e2] text-[#b91c1c] text-xs font-medium text-center">
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
                    className="w-11 h-12 text-center text-lg font-semibold rounded-xl border border-[#d1d5db] bg-[#f8f7f4] text-[#1a3c5e] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="w-full h-11 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #1a3c5e 0%, #2a5a8a 100%)' }}
              >
                Verify & Continue
              </button>
            </form>

            {/* Resend */}
            <div className="text-center mt-5">
              {resendTimer > 0 ? (
                <p className="text-xs text-[#9ca3af]">
                  Resend code in <span className="font-semibold text-[#1a3c5e]">{resendTimer}s</span>
                </p>
              ) : (
                <button onClick={handleResend} className="text-xs font-medium text-[#c9a84c] hover:text-[#b08d3a] transition-colors">
                  Resend OTP
                </button>
              )}
            </div>

            {/* Back */}
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 mx-auto mt-6 text-xs text-[#6b7c8e] hover:text-[#1a3c5e] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-8 border-t border-[#e5e7eb] bg-[#f8f7f4]">
        <p className="text-center text-[11px] text-[#9ca3af] leading-relaxed">
          All rights reserved. Terms &amp; Conditions. Contact us:{' '}
          <a href="mailto:rf.scholarships@reliancefoundation.org" className="text-[#c9a84c] hover:underline">
            rf.scholarships@reliancefoundation.org
          </a>
        </p>
      </footer>
    </div>
  );
};

export default VerifyOTP;
