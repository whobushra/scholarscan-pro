import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, KeyRound, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import rfsLogo from '@/assets/rfs-logo.png';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isValid = current.length >= 6 && newPass.length >= 6 && newPass === confirm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    toast.success('Password changed successfully');
    navigate('/profile');
  };

  const inputClass =
    'w-full h-11 pl-4 pr-11 text-sm rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#18AE59]/20 focus:border-[#18AE59] transition-all';

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <img src={rfsLogo} alt="Reliance Foundation" className="h-9 sm:h-10 object-contain" />
              <div className="hidden sm:block h-8 w-px bg-gray-200" />
              <div className="hidden sm:block">
                <h1 className="text-sm font-semibold text-gray-900 leading-tight">Reliance Foundation</h1>
                <p className="text-[10px] text-gray-500 leading-tight">Scholarship Portal</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#18AE59] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Profile</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0d3320] to-[#18AE59] p-5 sm:p-6">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                <KeyRound className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">Change Password</h2>
              <p className="text-xs text-white/60 mt-1">Enter your current password and choose a new one</p>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    placeholder="Enter current password"
                    className={inputClass}
                  />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Enter new password"
                    className={inputClass}
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {newPass.length > 0 && newPass.length < 6 && (
                  <p className="text-[11px] text-red-500 mt-1">Minimum 6 characters</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm new password"
                    className={inputClass}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirm.length > 0 && newPass !== confirm && (
                  <p className="text-[11px] text-red-500 mt-1">Passwords do not match</p>
                )}
                {confirm.length > 0 && newPass === confirm && newPass.length >= 6 && (
                  <p className="text-[11px] text-emerald-500 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Passwords match
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className="w-full h-11 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#18AE59] to-[#15964d] hover:from-[#15964d] hover:to-[#0d7a3a] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-[#18AE59]/20"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-4 sm:px-8 border-t border-gray-200 bg-white mt-auto">
        <p className="text-center text-[11px] text-gray-400 leading-relaxed">
          All rights reserved. Terms &amp; Conditions. Contact us:{' '}
          <a href="mailto:rf.scholarships@reliancefoundation.org" className="text-[#D1AD6E] hover:underline">
            rf.scholarships@reliancefoundation.org
          </a>
        </p>
      </footer>
    </div>
  );
};

export default ChangePassword;
