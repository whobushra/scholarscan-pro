import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  BookOpen,
  HelpCircle,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
  ClipboardList,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeaderBrand } from '@/components/layout/HeaderBrand';

type NavKey = 'application' | 'guidance' | 'faqs';

const navItems: { key: NavKey; label: string; icon: typeof FileText }[] = [
  { key: 'application', label: 'My Application', icon: FileText },
  { key: 'guidance', label: 'Guidance', icon: BookOpen },
  { key: 'faqs', label: "FAQ's", icon: HelpCircle },
];

const MyApplication = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<NavKey>('application');
  const [collapsed, setCollapsed] = useState(false);

  // Existing data (unchanged)
  const applicationNo = 'RFSCH250700011646';
  const status = 'IN PROCESS';
  const aptitudeTest = 'PENDING';
  const userName = 'Test User';
  const userInitials = 'TU';

  return (
    <div className="min-h-screen flex bg-[#f7f8f5]">
      {/* Sidebar */}
      <aside
        className={cn(
          'relative hidden md:flex flex-col shrink-0 bg-white border-r border-gray-200 transition-[width] duration-200 ease-out',
          collapsed ? 'w-16' : 'w-[240px]'
        )}
      >
        {/* Brand */}
        <div className={cn('h-16 flex items-center border-b border-gray-100', collapsed ? 'justify-center px-0' : 'px-5')}>
          <HeaderBrand imgClassName={cn(collapsed ? 'h-8' : 'h-9')} />
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-[#0d3320] hover:border-[#18AE59]/40 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>

        {/* Nav */}
        <nav className="flex-1 py-3 space-y-0.5">
          {navItems.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                title={collapsed ? label : undefined}
                className={cn(
                  'group relative w-full flex items-center gap-3 h-10 text-[13px] font-medium transition-colors',
                  collapsed ? 'justify-center px-0' : 'px-5',
                  isActive
                    ? 'text-[#0d3320] bg-[#18AE59]/[0.08]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <span
                  className={cn(
                    'absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r-full',
                    isActive ? 'bg-[#18AE59]' : 'bg-transparent'
                  )}
                />
                <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#18AE59]' : 'text-gray-400 group-hover:text-gray-600')} />
                {!collapsed && <span className="truncate">{label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer nav */}
        <div className="border-t border-gray-100 py-3 space-y-0.5">
          <button
            onClick={() => navigate('/profile')}
            title={collapsed ? 'Profile' : undefined}
            className={cn(
              'w-full flex items-center gap-3 h-10 text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors',
              collapsed ? 'justify-center px-0' : 'px-5'
            )}
          >
            <User className="h-4 w-4 shrink-0 text-gray-400" />
            {!collapsed && <span>Profile</span>}
          </button>
          <button
            onClick={() => navigate('/login')}
            title={collapsed ? 'Logout' : undefined}
            className={cn(
              'w-full flex items-center gap-3 h-10 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors',
              collapsed ? 'justify-center px-0' : 'px-5'
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile brand */}
            <div className="md:hidden">
              <HeaderBrand imgClassName="h-8" />
            </div>
            <h1 className="text-base sm:text-lg font-semibold text-[#0d3320] truncate">
              {active === 'application' && 'My Application'}
              {active === 'guidance' && 'Guidance'}
              {active === 'faqs' && "FAQ's"}
            </h1>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2.5 group"
          >
            <div className="h-9 w-9 rounded-full bg-[#D1AD6E]/20 text-[#9a7a3d] flex items-center justify-center text-xs font-semibold ring-1 ring-[#D1AD6E]/30">
              {userInitials}
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-700 group-hover:text-[#0d3320]">
              {userName}
            </span>
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {active === 'application' && (
            <div className="max-w-6xl mx-auto">
              {/* Application Status Card */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header row */}
                <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[#18AE59]/10 text-[#18AE59] flex items-center justify-center shrink-0">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-gray-900">Application Status</h2>
                      <p className="text-sm font-mono text-gray-500 mt-0.5">{applicationNo}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[#18AE59] hover:bg-[#149a4d] text-white text-sm font-semibold shadow-sm shadow-[#18AE59]/20 transition-colors"
                  >
                    Continue Application
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-[#f9faf7]">
                  {/* Status */}
                  <div className="p-5 sm:p-6 flex flex-col items-center text-center">
                    <div className="h-11 w-11 rounded-full bg-[#18AE59]/10 text-[#18AE59] flex items-center justify-center mb-3">
                      <Clock className="h-5 w-5" />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Status</p>
                    <span className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[#18AE59]/10 text-[#0d6b3a] ring-1 ring-[#18AE59]/20">
                      {status}
                    </span>
                  </div>

                  {/* Aptitude Test */}
                  <div className="p-5 sm:p-6 flex flex-col items-center text-center">
                    <div className="h-11 w-11 rounded-full bg-[#D1AD6E]/15 text-[#9a7a3d] flex items-center justify-center mb-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Aptitude Test</p>
                    <span className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[#D1AD6E]/15 text-[#9a7a3d] ring-1 ring-[#D1AD6E]/30">
                      {aptitudeTest}
                    </span>
                  </div>

                  {/* Remarks */}
                  <div className="p-5 sm:p-6 flex flex-col items-center text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Remarks</p>
                    <button
                      type="button"
                      onClick={() => setActive('guidance')}
                      className="text-sm text-[#0d6b3a] underline underline-offset-4 decoration-[#18AE59]/40 hover:decoration-[#18AE59] leading-snug"
                    >
                      Please read the "Guidance to Applicants" before opening the Application page
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {active === 'guidance' && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Guidance to Applicants</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Please review the guidance carefully before continuing your application. This section will contain
                detailed instructions for applicants.
              </p>
            </div>
          )}

          {active === 'faqs' && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Frequently Asked Questions</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Common questions and answers about the scholarship application process.
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-4 sm:px-8 py-3 text-center text-xs text-gray-500">
          All rights reserved. <span className="text-[#0d3320] font-medium">Terms &amp; Conditions</span>. Contact us:{' '}
          <a href="mailto:rf.scholarships@reliancefoundation.org" className="text-[#0d6b3a] underline underline-offset-2">
            rf.scholarships@reliancefoundation.org
          </a>
        </footer>

        {/* Floating chat */}
        <button
          className="fixed bottom-5 right-5 h-12 w-12 rounded-full bg-[#18AE59] text-white shadow-lg shadow-[#18AE59]/30 flex items-center justify-center hover:bg-[#149a4d] transition-colors"
          aria-label="Chat support"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-gray-200 flex">
        {navItems.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors',
                isActive ? 'text-[#18AE59]' : 'text-gray-500'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default MyApplication;