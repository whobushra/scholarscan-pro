import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, FileCheck, Wallet, Search, ChevronRight, ChevronLeft, AlertTriangle, CheckCircle2, XCircle, Clock, Bell, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeaderBrand } from '@/components/layout/HeaderBrand';
import heroBanner from '@/assets/banner.png';
import { applicants, Applicant } from '@/data/mockApplicants';

type Step = 'bank' | 'application' | 'disbursement';

const steps: { key: Step; label: string; icon: typeof Building2; description: string }[] = [
  { key: 'bank', label: 'Bank Verification', icon: Building2, description: 'Verify bank account details' },
  { key: 'application', label: 'Application Verification', icon: FileCheck, description: 'Review scholarship applications' },
  { key: 'disbursement', label: 'Disbursement Verification', icon: Wallet, description: 'Verify fund disbursement' },
];

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, class: 'bg-amber-50 text-amber-600 border-amber-200' },
  approved: { label: 'Approved', icon: CheckCircle2, class: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  rejected: { label: 'Rejected', icon: XCircle, class: 'bg-red-50 text-red-600 border-red-200' },
  'in-review': { label: 'In Review', icon: AlertTriangle, class: 'bg-blue-50 text-blue-600 border-blue-200' },
};

const riskDot: Record<string, string> = {
  low: 'bg-emerald-500',
  medium: 'bg-amber-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
};

type RiskFilter = 'all' | Applicant['riskLevel'];

const riskFilterOptions: { key: RiskFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'low', label: 'Low' },
  { key: 'medium', label: 'Medium' },
  { key: 'high', label: 'High' },
  { key: 'critical', label: 'Critical' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<Step>('application');
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const filtered = applicants
    .filter((a) => {
      if (riskFilter !== 'all' && a.riskLevel !== riskFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return a.name.toLowerCase().includes(q) || a.applicationNo.toLowerCase().includes(q);
    })
    .sort((a, b) => b.riskScore - a.riskScore);

  const pendingCount = applicants.filter((a) => a.status === 'pending').length;

  const handleRowClick = (applicant: Applicant) => {
    navigate(`/verification/${applicant.id}`, { state: { applicant } });
  };

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
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-4 w-4 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="h-8 w-8 rounded-full bg-gradient-to-br from-[#18AE59] to-[#0d3320] flex items-center justify-center text-white text-xs font-bold hover:shadow-lg hover:shadow-[#18AE59]/20 transition-all"
                title="My Profile"
              >
                DA
              </button>
              <button
                onClick={() => navigate('/login')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile: horizontal step indicator */}
      <div className="md:hidden border-b border-gray-200 bg-white sticky top-14 z-20">
        <div className="flex overflow-x-auto no-scrollbar">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === step.key;
            return (
              <button
                key={step.key}
                onClick={() => setActiveStep(step.key)}
                className={cn(
                  'flex-1 min-w-max flex items-center justify-center gap-1.5 px-3 py-2.5 text-[11px] font-medium border-b-2 transition-colors',
                  isActive
                    ? 'border-[#18AE59] text-[#0d3320] bg-[#18AE59]/[0.04]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Sidebar (desktop/tablet) */}
        <aside
          className={cn(
            'hidden md:flex flex-col shrink-0 border-r border-gray-200 bg-white transition-[width] duration-200 ease-out',
            sidebarCollapsed ? 'w-14' : 'w-[220px]'
          )}
        >
          <div className={cn(
            'flex items-center h-11 px-2 border-b border-gray-100',
            sidebarCollapsed ? 'justify-center' : 'justify-between px-3'
          )}>
            {!sidebarCollapsed && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Workflow
              </span>
            )}
            <button
              onClick={() => setSidebarCollapsed((v) => !v)}
              className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              title={sidebarCollapsed ? 'Expand' : 'Collapse'}
            >
              {sidebarCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </button>
          </div>
          <nav className="flex-1 py-2 space-y-0.5">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.key;
              return (
                <button
                  key={step.key}
                  onClick={() => setActiveStep(step.key)}
                  title={sidebarCollapsed ? step.label : undefined}
                  className={cn(
                    'group relative w-full flex items-center gap-2.5 h-9 text-[13px] font-medium transition-colors',
                    sidebarCollapsed ? 'justify-center px-0' : 'px-3',
                    isActive
                      ? 'text-[#0d3320] bg-[#18AE59]/[0.06]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <span
                    className={cn(
                      'absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r-full transition-colors',
                      isActive ? 'bg-[#18AE59]' : 'bg-transparent'
                    )}
                  />
                  <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#18AE59]' : 'text-gray-400 group-hover:text-gray-600')} />
                  {!sidebarCollapsed && <span className="truncate">{step.label}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Hero Banner */}
          <div className="relative h-32 sm:h-36 overflow-hidden text-white">
            <img src={heroBanner} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
              <div className="px-4 sm:px-6 lg:px-8 w-full">
                <h2 className="text-lg sm:text-xl font-bold drop-shadow-sm">My Tasks</h2>
                <p className="text-xs sm:text-sm text-white/80 mt-1 drop-shadow-sm max-w-xl">
                  Manage verifications and review scholarship applications
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 w-full">
        {activeStep === 'application' ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Application Verification</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    <span className="font-medium text-[#D1AD6E]">{pendingCount} pending</span> · {applicants.length} total applications
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none sm:min-w-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or ID..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full sm:w-56 h-9 pl-9 pr-3 text-xs rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#18AE59]/20 focus:border-[#18AE59] transition-all"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-1 bg-gray-50 rounded-lg border border-gray-200 p-0.5">
                    {riskFilterOptions.map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setRiskFilter(key)}
                        className={cn(
                          'px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] font-medium rounded-md transition-colors flex items-center gap-1.5',
                          riskFilter === key
                            ? 'bg-white text-[#0d3320] shadow-sm ring-1 ring-gray-200/80'
                            : 'text-gray-500 hover:text-gray-700',
                          key !== 'all' && riskFilter === key && 'ring-0',
                          key === 'low' && riskFilter === key && '!text-emerald-700 !ring-emerald-200',
                          key === 'medium' && riskFilter === key && '!text-amber-700 !ring-amber-200',
                          key === 'high' && riskFilter === key && '!text-orange-700 !ring-orange-200',
                          key === 'critical' && riskFilter === key && '!text-red-700 !ring-red-200',
                          key === 'all' && riskFilter === key && '!text-[#18AE59] !ring-[#18AE59]/25'
                        )}
                      >
                        {key !== 'all' && (
                          <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', riskDot[key])} />
                        )}
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Table - Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Level</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Application No</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Applicant Name</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Institution</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Risk</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Rework</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((a) => {
                    const st = statusConfig[a.status];
                    const StIcon = st.icon;
                    return (
                      <tr
                        key={a.id}
                        onClick={() => handleRowClick(a)}
                        className="hover:bg-[#18AE59]/[0.02] cursor-pointer transition-colors group"
                      >
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                            {a.level}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-mono text-gray-600">{a.applicationNo}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-sm font-medium text-gray-900">{a.name}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs text-gray-500">{a.institution}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className={cn('w-2 h-2 rounded-full', riskDot[a.riskLevel])} />
                            <span className="text-xs font-medium text-gray-700">{a.riskScore}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full border', st.class)}>
                            <StIcon className="h-3 w-3" />
                            {st.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={cn(
                            'text-xs font-medium',
                            a.isRework ? 'text-amber-600' : 'text-gray-400'
                          )}>
                            {a.isRework ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#18AE59] transition-colors" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Cards - Mobile */}
            <div className="md:hidden divide-y divide-gray-100">
              {filtered.map((a) => {
                const st = statusConfig[a.status];
                const StIcon = st.icon;
                return (
                  <div
                    key={a.id}
                    onClick={() => handleRowClick(a)}
                    className="p-4 hover:bg-[#18AE59]/[0.02] cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">{a.level}</span>
                          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full border', st.class)}>
                            <StIcon className="h-2.5 w-2.5" />
                            {st.label}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mt-1.5">{a.name}</p>
                        <p className="text-[11px] font-mono text-gray-400 mt-0.5">{a.applicationNo}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{a.institution}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className={cn('w-2 h-2 rounded-full', riskDot[a.riskLevel])} />
                          <span className="text-xs font-medium text-gray-600">{a.riskScore}%</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-300" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="p-12 text-center text-sm text-gray-400">No applications found</div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              {activeStep === 'bank' ? <Building2 className="h-8 w-8 text-gray-400" /> : <Wallet className="h-8 w-8 text-gray-400" />}
            </div>
            <h3 className="text-base font-semibold text-gray-900 capitalize">{activeStep} Verification</h3>
            <p className="text-sm text-gray-400 mt-1.5 max-w-sm mx-auto">
              This section is coming soon. Please use Application Verification to review scholarship applications.
            </p>
          </div>
        )}
          </div>
        </main>
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

export default Dashboard;
