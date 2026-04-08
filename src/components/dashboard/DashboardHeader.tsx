import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardHeader = () => {
  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">RF</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground leading-tight">Reliance Foundation</h1>
            <p className="text-[10px] text-muted-foreground leading-tight">Scholarships</p>
          </div>
        </div>
        <div className="h-6 w-px bg-border mx-2" />
        <h2 className="text-sm font-medium text-foreground">Document Verification</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
