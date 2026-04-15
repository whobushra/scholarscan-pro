import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Building, Briefcase, User, KeyRound, ChevronRight } from 'lucide-react';
import { HeaderBrand } from '@/components/layout/HeaderBrand';
import heroBanner from '@/assets/banner.png';

const profileData = {
  name: 'Demo AVR1',
  email: 'DemoUser_AVR1@test.com',
  mobile: '7897689768',
  position: 'Manager',
  institution: 'Royal College of Pharmacy',
  initials: 'DA',
};

const fields = [
  { label: 'Name', value: profileData.name, icon: User },
  { label: 'Email', value: profileData.email, icon: Mail },
  { label: 'Mobile Number', value: profileData.mobile, icon: Phone },
  { label: 'Position', value: profileData.position, icon: Briefcase },
  { label: 'Institution Name', value: profileData.institution, icon: Building },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <HeaderBrand />
              <div className="hidden sm:block h-8 w-px bg-gray-200" />
              <div className="hidden sm:block">
                <h1 className="text-sm font-semibold text-gray-900 leading-tight">Reliance Foundation</h1>
                <p className="text-[10px] text-gray-500 leading-tight">Scholarship Portal</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#18AE59] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner — aligned with Dashboard (centered copy clears -mt-8 overlap below) */}
      <div className="relative h-36 sm:h-44 overflow-hidden text-white">
        <img src={heroBanner} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3320]/90 to-[#18AE59]/70" />
        <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-xs text-white/70 font-medium tracking-wide uppercase drop-shadow-sm">
              Reliance Foundation Scholarships
            </p>
            <h2 className="text-xl sm:text-2xl font-bold drop-shadow-sm mt-1">My Profile</h2>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 relative z-10 flex-1 pb-8">
        {/* Avatar Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 flex items-center gap-4 mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#18AE59] to-[#0d3320] flex items-center justify-center text-white text-lg sm:text-xl font-bold shrink-0">
            {profileData.initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{profileData.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{profileData.email}</p>
            <p className="text-[11px] text-[#D1AD6E] font-medium mt-0.5">{profileData.position} · {profileData.institution}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-4">
          <div className="px-5 sm:px-6 py-4 border-b border-gray-100">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D1AD6E]">Profile Details</h4>
          </div>
          <div className="divide-y divide-gray-50">
            {fields.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-center gap-3 px-5 sm:px-6 py-4">
                  <div className="w-9 h-9 rounded-lg bg-[#18AE59]/8 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-[#18AE59]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-gray-400 font-medium">{f.label}</p>
                    <p className="text-sm text-gray-900 font-medium truncate">{f.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Change Password Button */}
        <button
          onClick={() => navigate('/change-password')}
          className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 flex items-center justify-between hover:border-[#18AE59]/30 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18AE59]/10 flex items-center justify-center">
              <KeyRound className="h-5 w-5 text-[#18AE59]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">Change Password</p>
              <p className="text-[11px] text-gray-400">Update your account password</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#18AE59] transition-colors" />
        </button>
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

export default Profile;
