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
    <div className="flex min-h-dvh flex-col relative overflow-hidden bg-[#1a1f1c]">
      <Link
        to="/"
        className="absolute top-[max(0.75rem,env(safe-area-inset-top))] left-[max(0.75rem,env(safe-area-inset-left))] sm:top-4 sm:left-5 lg:top-5 lg:left-8 z-30"
        aria-label="Reliance Foundation Scholarships home"
      >
        <img src={rfsLogo} alt="" className="h-7 sm:h-8 lg:h-9 object-contain drop-shadow-md" />
      </Link>

      {/* Full-viewport banner — behind the form column */}
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
        {/* Bottom-left: headline + carousel — single aligned column */}
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
              <h1 className="text-base font-bold tracking-tight text-[#0d3320]">
                Welcome back
              </h1>
              <p className="mt-0.5 text-[10px] leading-snug text-[#6b7c8e]">
                Sign in to your scholarship dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="shrink-0 space-y-2.5">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-1.5 text-[10px] font-medium leading-snug text-[#b91c1c]">
                  {error}
                </div>
              )}

              <div className="space-y-0.5">
                <label className="text-[9px] font-semibold uppercase tracking-wider text-[#5a6b7c]">
                  Username / Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#6b7c8e]" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username or email"
                    className="h-7 w-full rounded-md border border-[#d1d5db] bg-white pl-7 pr-2.5 text-xs text-[#0d3320] placeholder:text-[#9ca3af] shadow-sm focus:border-[#18AE59] focus:outline-none focus:ring-2 focus:ring-[#18AE59]/30"
                  />
                </div>
              </div>

              <div className="space-y-0.5">
                <label className="text-[9px] font-semibold uppercase tracking-wider text-[#5a6b7c]">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#6b7c8e]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="h-7 w-full rounded-md border border-[#d1d5db] bg-white pl-7 pr-8 text-xs text-[#0d3320] placeholder:text-[#9ca3af] shadow-sm focus:border-[#18AE59] focus:outline-none focus:ring-2 focus:ring-[#18AE59]/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-[#6b7c8e] transition-colors hover:text-[#0d3320]"
                  >
                    {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </button>
                </div>
              </div>

              <div className="-mt-0.5 flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowCaution(true)}
                  className="flex items-center gap-0.5 text-[10px] font-medium text-[#b91c1c] transition-colors hover:text-[#991b1b]"
                >
                  <AlertTriangle className="h-2.5 w-2.5" />
                  Caution Notice
                </button>
                <button
                  type="button"
                  className="text-[10px] font-medium text-[#18AE59] transition-colors hover:text-[#0d6b3a]"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="h-7 w-full rounded-md text-xs font-semibold text-white transition-all duration-200 hover:shadow-md active:scale-[0.99]"
                style={{
                  background: 'linear-gradient(135deg, #0d6b3a 0%, #18AE59 100%)',
                }}
              >
                Sign In
              </button>

              <div className="flex items-center gap-1.5 py-0">
                <div className="h-px flex-1 bg-[#d1d5db]" />
                <span className="text-[8px] uppercase tracking-wider text-[#9ca3af]">or</span>
                <div className="h-px flex-1 bg-[#d1d5db]" />
              </div>

              <button
                type="button"
                className="h-7 w-full rounded-md border border-[#d1d5db] bg-white text-xs font-medium text-[#0d3320] shadow-sm transition-colors hover:bg-[#f3f4f6]"
              >
                Sign in with OTP
              </button>
            </form>

            <p className="mt-2.5 shrink-0 text-center text-[10px] text-[#6b7c8e]">
              <a href="mailto:rf.scholarships@reliancefoundation.org" className="font-medium text-[#b8943d] hover:text-[#9a7a30] hover:underline">
                Contact support
              </a>
            </p>
          </div>
        </div>
        <div className="min-h-0 flex-1 min-w-0" aria-hidden="true" />
      </div>

      <p
        className="pointer-events-none absolute bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-4 right-4 sm:bottom-4 sm:left-6 sm:right-auto lg:bottom-5 lg:left-10 z-30 max-w-[min(100%,42rem)] text-left text-[9px] sm:text-[10px] leading-snug text-[#f8f7f4]/70"
      >
        <span className="pointer-events-auto inline-block text-left">
          All rights reserved.{' '}
          <button
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
