import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import rfsLogo from '@/assets/rfs-logo.png';

const DashboardHeader = () => {
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4 sm:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <img src={rfsLogo} alt="Reliance Foundation" className="h-8 sm:h-9 object-contain" />
        <div className="h-6 w-px bg-gray-200 mx-1" />
        <h2 className="text-xs sm:text-sm font-medium text-gray-700">Document Verification</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-[#18AE59]/10 flex items-center justify-center">
          <User className="h-4 w-4 text-[#18AE59]" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
