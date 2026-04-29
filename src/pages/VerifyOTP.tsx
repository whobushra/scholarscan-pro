import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
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
const OTP_LENGTH = 6;

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = (location.state as { username?: string } | null)?.username ?? 'user';

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
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
    navigate('/my-application');
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setOtp(Array(OTP_LENGTH).fill(''));
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="flex min-h-dvh flex-col relative overflow-hidden bg-[#1a1f1c]">
      <Link
        to="/"
        className="absolute top-[max(0.75rem,env(safe-area-inset-top))] left-[max(0.75rem,env(safe-area-inset-left))] sm:top-4 sm:left-5 lg:top-5 lg:left-8 z-30"
        aria-label="Reliance Foundation Scholarships home"
      >
        <img src={rfsLogo} alt="" className="h-7 sm:h-8 lg:h-9 object-contain drop-shadow-md" />
      </Link>

      <div className="absolute inset-0 z-0 overflow-hidden">
        {banners.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full scale-x-[-1] object-cover object-[center_top] sm:object-[72%_center] lg:object-[75%_center]"
            style={{
              opacity: currentBanner === i ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/30 sm:from-black/35 sm:via-black/15 sm:to-black/25 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 z-[1] flex justify-start pointer-events-none pb-[max(5rem,env(safe-area-inset-bottom)+4.25rem)] sm:pb-[max(5.5rem,env(safe-area-inset-bottom)+4.5rem)] lg:pb-[max(3.25rem,env(safe-area-inset-bottom)+2.25rem)]">
          <div className="w-full max-w-[min(100%,24rem)] px-4 pb-0 pt-6 sm:max-w-md sm:px-6 sm:pt-8 lg:max-w-lg lg:px-10 lg:pt-10">
            <div className="flex flex-col items-start gap-3 sm:gap-3.5 text-left">
              <div className="space-y-1.5 sm:space-y-2">
                <h2 className="text-lg font-bold leading-snug text-[#f8f7f4] drop-shadow-md sm:text-xl md:text-2xl sm:leading-tight">
                  Empowering the next generation
                  <br className="hidden sm:block" />
                  through education
                </h2>
                <p className="text-[11px] leading-relaxed text-[#f8f7f4]/90 drop-shadow sm:text-xs sm:leading-relaxed lg:max-w-md">
                  Reliance Foundation Scholarships — building a brighter future for deserving students across India.
                </p>
              </div>
              <div className="pointer-events-auto flex items-center gap-2 pt-0.5">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentBanner(i)}
                    className="h-1.5 shrink-0 rounded-full transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D1AD6E]"
                    style={{
                      width: currentBanner === i ? 24 : 7,
                      backgroundColor: currentBanner === i ? '#D1AD6E' : 'rgba(255,255,255,0.45)',
                    }}
                    aria-label={`Show banner ${i + 1}`}
                    aria-current={currentBanner === i ? 'true' : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-row-reverse">
        <div className="flex w-full shrink-0 flex-col justify-center px-4 pb-[max(7rem,env(safe-area-inset-bottom)+5.5rem)] pt-[max(3.5rem,env(safe-area-inset-top)+2.75rem)] sm:mx-auto sm:max-w-md sm:px-6 sm:pb-24 lg:mx-0 lg:max-w-none lg:w-[340px] lg:shrink-0 lg:px-5 lg:pb-10 lg:pt-16 xl:w-[370px] xl:px-6">
          <div className="rounded-2xl border border-[#e5e2dc] bg-[#f8f7f4] px-5 py-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] sm:px-6">
            <div className="mb-4 shrink-0">
              <div
                className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12"
                style={{ background: 'linear-gradient(135deg, #0d6b3a 0%, #18AE59 100%)' }}
              >
                <ShieldCheck className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
              <h1 className="text-base font-bold tracking-tight text-[#0d3320] sm:text-lg">
                Verify OTP
              </h1>
              <p className="mt-0.5 text-[10px] leading-snug text-[#6b7c8e] sm:text-xs">
                We&apos;ve sent a verification code to{' '}
                <span className="font-medium text-[#0d3320]">{username}</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="shrink-0 space-y-3.5 sm:space-y-4">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-1.5 text-[10px] font-medium leading-snug text-[#b91c1c] sm:text-xs">
                  {error}
                </div>
              )}

              <div className="flex justify-center gap-1.5 sm:gap-2" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="h-9 w-9 rounded-md border border-[#d1d5db] bg-white text-center text-sm font-semibold text-[#0d3320] shadow-sm focus:border-[#18AE59] focus:outline-none focus:ring-2 focus:ring-[#18AE59]/30 sm:h-10 sm:w-10 sm:text-base"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="h-9 w-full rounded-md text-xs font-semibold text-white transition-all duration-200 hover:shadow-md active:scale-[0.99] sm:h-10 sm:text-sm"
                style={{ background: 'linear-gradient(135deg, #0d6b3a 0%, #18AE59 100%)' }}
              >
                Verify &amp; Continue
              </button>
            </form>

            <div className="mt-4 text-center">
              {resendTimer > 0 ? (
                <p className="text-[10px] text-[#6b7c8e] sm:text-xs">
                  Resend code in{' '}
                  <span className="font-semibold text-[#0d3320]">{resendTimer}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[10px] font-medium text-[#18AE59] transition-colors hover:text-[#0d6b3a] sm:text-xs"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <Link
              to="/login"
              className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-[#6b7c8e] transition-colors hover:text-[#0d3320] sm:text-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              Back to Sign In
            </Link>

            <p className="mt-3 shrink-0 text-center text-[10px] text-[#6b7c8e]">
              <a href="mailto:rf.scholarships@reliancefoundation.org" className="font-medium text-[#b8943d] hover:text-[#9a7a30] hover:underline">
                Contact support
              </a>
            </p>
          </div>
        </div>
        <div className="min-h-0 flex-1 min-w-0" aria-hidden="true" />
      </div>

      <p className="pointer-events-none absolute bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-4 right-4 sm:bottom-4 sm:left-6 sm:right-auto lg:bottom-5 lg:left-10 z-30 max-w-[min(100%,42rem)] text-left text-[9px] sm:text-[10px] leading-snug text-[#f8f7f4]/70">
        <span className="pointer-events-auto inline-block text-left">
          All rights reserved.{' '}
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="font-medium text-[#D1AD6E] hover:text-[#e4c989] underline-offset-2 hover:underline transition-colors"
          >
            Terms &amp; Conditions
          </button>
          . Contact us:{' '}
          <a
            href="mailto:rf.scholarships@reliancefoundation.org"
            className="font-medium text-[#D1AD6E] hover:text-[#e4c989] underline-offset-2 hover:underline transition-colors"
          >
            rf.scholarships@reliancefoundation.org
          </a>
        </span>
      </p>

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
            <p>
              For any queries, please contact us at{' '}
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

export default VerifyOTP;
