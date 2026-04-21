import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, FileCheck, Wallet, Search, ChevronRight, AlertTriangle, CheckCircle2, XCircle, Clock, Bell, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeaderBrand } from '@/components/layout/HeaderBrand';
import heroBanner from '@/assets/banner.png';
import { applicants, Applicant } from '@/data/mockApplicants';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';

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

const AppSidebar = ({
  activeStep,
  setActiveStep,
  pendingCount,
}: {
  activeStep: Step;
  setActiveStep: (s: Step) => void;
  pendingCount: number;
}) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-100 bg-white">
        <div className={cn('flex items-center gap-2 px-2 py-2', collapsed && 'justify-center px-0')}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#18AE59] to-[#0d3320] flex items-center justify-center text-white shrink-0 shadow-sm">
            <FileCheck className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 leading-tight truncate">Verifications</p>
              <p className="text-[10px] text-gray-500 leading-tight truncate">Workflow Steps</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Workflow
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = activeStep === step.key;
                const showBadge = step.key === 'application' && pendingCount > 0;
                return (
                  <SidebarMenuItem key={step.key}>
                    <SidebarMenuButton
                      onClick={() => setActiveStep(step.key)}
                      isActive={isActive}
                      tooltip={step.label}
                      className={cn(
                        'h-auto py-2.5 rounded-lg transition-all group',
                        isActive
                          ? 'bg-gradient-to-r from-[#18AE59]/10 to-transparent text-[#0d3320] hover:bg-[#18AE59]/15 ring-1 ring-[#18AE59]/20'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                    >
                      <div
                        className={cn(
                          'h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                          isActive
                            ? 'bg-[#18AE59] text-white shadow-sm shadow-[#18AE59]/30'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      {!collapsed && (
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className={cn('text-[9px] font-bold uppercase tracking-wider', isActive ? 'text-[#18AE59]' : 'text-gray-400')}>
                              Step {i + 1}
                            </span>
                            {showBadge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#D1AD6E]/15 text-[#a8823f]">
                                {pendingCount}
                              </span>
                            )}
                          </div>
                          <p className={cn('text-xs font-semibold leading-tight truncate', isActive ? 'text-gray-900' : 'text-gray-700')}>
                            {step.label}
                          </p>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-100 bg-white">
        {!collapsed ? (
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#18AE59]/5 to-[#D1AD6E]/5 border border-gray-100">
            <p className="text-[10px] font-semibold text-gray-700">Need help?</p>
            <a
              href="mailto:rf.scholarships@reliancefoundation.org"
              className="text-[10px] text-[#18AE59] hover:underline break-all"
            >
              rf.scholarships@reliancefoundation.org
            </a>
          </div>
        ) : (
          <div className="h-2" />
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<Step>('application');
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('all');

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
    <SidebarProvider defaultOpen>
      <div className="min-h-screen w-full bg-[#f5f5f0] flex">
        <AppSidebar activeStep={activeStep} setActiveStep={setActiveStep} pendingCount={pendingCount} />
        <SidebarInset className="bg-[#f5f5f0] flex flex-col min-w-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-gray-600 hover:bg-gray-100" />
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

      {/* Hero Banner */}
      <div className="relative h-36 sm:h-44 overflow-hidden text-white">
        <img src={heroBanner} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0d3320]/90 to-[#18AE59]/70" /> */}
        <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h2 className="text-lg sm:text-xl font-bold drop-shadow-sm">My Tasks</h2>
            <p className="text-sm text-white/80 mt-1 drop-shadow-sm max-w-xl">
              Manage verifications and review scholarship applications
            </p>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === step.key;
            return (
              <button
                key={step.key}
                onClick={() => setActiveStep(step.key)}
                className={cn(
                  'relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border transition-all duration-200 text-left',
                  isActive
                    ? 'bg-white border-[#18AE59] shadow-lg shadow-[#18AE59]/10 ring-1 ring-[#18AE59]/20'
                    : 'bg-white border-gray-200 hover:border-[#D1AD6E]/50 hover:shadow-md'
                )}
              >
                <div className={cn(
                  'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                  isActive ? 'bg-[#18AE59] text-white' : 'bg-gray-100 text-gray-500'
                )}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'text-[10px] font-bold uppercase tracking-wider',
                      isActive ? 'text-[#18AE59]' : 'text-gray-400'
                    )}>
                      Step {i + 1}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#18AE59] animate-pulse" />
                    )}
                  </div>
                  <p className={cn(
                    'text-sm font-semibold mt-0.5 truncate',
                    isActive ? 'text-gray-900' : 'text-gray-600'
                  )}>
                    {step.label}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5 hidden sm:block">{step.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
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
