import { FileText, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Check, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Document, DocStatus, RiskLevel } from '@/data/mockDocuments';
import { cn } from '@/lib/utils';

interface Props {
  document: Document | null;
  onStatusChange: (id: string, status: DocStatus) => void;
}

const riskColors: Record<RiskLevel, string> = {
  low: 'text-risk-low',
  medium: 'text-risk-medium',
  high: 'text-risk-high',
  critical: 'text-risk-critical',
};

const statusConfig: Record<DocStatus, { label: string; class: string }> = {
  approved: { label: 'Approved', class: 'bg-success/10 text-success border-success/20' },
  rejected: { label: 'Rejected', class: 'bg-destructive/10 text-destructive border-destructive/20' },
  pending: { label: 'Pending', class: 'bg-warning/10 text-warning border-warning/20' },
};

const DocumentPreview = ({ document, onStatusChange }: Props) => {
  if (!document) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">No document selected</p>
            <p className="text-xs text-muted-foreground mt-1">Select a document from the list to preview</p>
          </div>
        </div>
      </div>
    );
  }

  const status = statusConfig[document.status];

  return (
    <div className="flex-1 flex flex-col bg-background min-w-0">
      {/* Toolbar */}
      <div className="px-5 py-3 border-b bg-card flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div>
            <h3 className="text-sm font-semibold text-foreground truncate">{document.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={cn('px-2 py-0.5 text-[10px] font-medium rounded border', status.class)}>
                {status.label}
              </span>
              <span className={cn('text-xs font-semibold', riskColors[document.riskLevel])}>
                Risk: {document.riskScore}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-xs gap-1.5 text-success hover:text-success hover:bg-success/10"
            onClick={() => onStatusChange(document.id, 'approved')}
          >
            <Check className="h-3.5 w-3.5" /> Approve
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-xs gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onStatusChange(document.id, 'rejected')}
          >
            <X className="h-3.5 w-3.5" /> Reject
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-xs gap-1.5 text-warning hover:text-warning hover:bg-warning/10"
            onClick={() => onStatusChange(document.id, 'pending')}
          >
            <AlertTriangle className="h-3.5 w-3.5" /> Review
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-auto">
        {/* Mock document preview */}
        <div className="w-full max-w-lg bg-card rounded-xl shadow-card border p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 bg-primary/20 rounded" />
            <div className="h-3 w-16 bg-muted rounded" />
          </div>
          <div className="border-t pt-4 space-y-3">
            {document.validations.map((v, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{v.field}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">{v.ocr}</span>
                  {v.status === 'mismatch' && (
                    <span className="relative group">
                      <span className="w-4 h-4 rounded-full bg-destructive/10 flex items-center justify-center">
                        <X className="h-2.5 w-2.5 text-destructive" />
                      </span>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-[10px] bg-foreground text-background rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Declared: {v.declared}
                      </span>
                    </span>
                  )}
                  {v.status === 'warning' && (
                    <span className="w-4 h-4 rounded-full bg-warning/10 flex items-center justify-center">
                      <AlertTriangle className="h-2.5 w-2.5 text-warning" />
                    </span>
                  )}
                  {v.status === 'match' && (
                    <span className="w-4 h-4 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-success" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* More mock lines */}
          <div className="space-y-2 pt-4 border-t">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-2.5 rounded bg-muted" style={{ width: `${70 + Math.random() * 30}%` }} />
            ))}
          </div>
          <div className="space-y-2 pt-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-2.5 rounded bg-muted" style={{ width: `${50 + Math.random() * 40}%` }} />
            ))}
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-card border rounded-lg p-1 shadow-card">
          <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-secondary transition-colors">
            <ZoomOut className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          <span className="text-[10px] text-muted-foreground px-1">100%</span>
          <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-secondary transition-colors">
            <ZoomIn className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>

        {/* Page navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card border rounded-lg px-3 py-1.5 shadow-card">
          <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-secondary transition-colors">
            <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          <span className="text-[10px] text-muted-foreground">1 / 1</span>
          <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-secondary transition-colors">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
