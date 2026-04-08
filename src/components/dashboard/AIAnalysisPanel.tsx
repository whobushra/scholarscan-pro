import { Brain, ShieldAlert, Check, X, AlertTriangle, TrendingUp } from 'lucide-react';
import { Document, RiskLevel } from '@/data/mockDocuments';
import { cn } from '@/lib/utils';

interface Props {
  document: Document | null;
}

const riskConfig: Record<RiskLevel, { label: string; color: string; bg: string; gradient: string }> = {
  low: { label: 'Low Risk', color: 'text-risk-low', bg: 'bg-risk-low', gradient: 'from-risk-low to-risk-low/60' },
  medium: { label: 'Medium Risk', color: 'text-risk-medium', bg: 'bg-risk-medium', gradient: 'from-risk-medium to-risk-medium/60' },
  high: { label: 'High Risk', color: 'text-risk-high', bg: 'bg-risk-high', gradient: 'from-risk-high to-risk-high/60' },
  critical: { label: 'Critical Risk', color: 'text-risk-critical', bg: 'bg-risk-critical', gradient: 'from-risk-critical to-risk-critical/60' },
};

const severityColors = {
  HIGH: 'bg-destructive/10 text-destructive border-destructive/20',
  MEDIUM: 'bg-warning/10 text-warning border-warning/20',
  LOW: 'bg-success/10 text-success border-success/20',
};

const AIAnalysisPanel = ({ document }: Props) => {
  if (!document) {
    return (
      <div className="w-80 border-l bg-card flex items-center justify-center shrink-0">
        <div className="text-center space-y-2 px-6">
          <Brain className="h-8 w-8 text-muted-foreground mx-auto" />
          <p className="text-xs text-muted-foreground">Select a document to view AI analysis</p>
        </div>
      </div>
    );
  }

  const risk = riskConfig[document.riskLevel];

  return (
    <div className="w-80 border-l bg-card flex flex-col shrink-0 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">AI Analysis</h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Risk Score Card */}
        <div className="rounded-xl border bg-background p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Risk Score</p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className={cn('text-3xl font-bold', risk.color)}>{document.riskScore}</span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
              <span className={cn('inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold rounded-md', risk.bg, 'text-white')}>
                {risk.label}
              </span>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-secondary flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-secondary" />
                <circle
                  cx="32" cy="32" r="28" fill="none" strokeWidth="4"
                  className={risk.color}
                  stroke="currentColor"
                  strokeDasharray={`${(document.riskScore / 100) * 175.9} 175.9`}
                  strokeLinecap="round"
                />
              </svg>
              <span className={cn('text-sm font-bold z-10', risk.color)}>{document.riskScore}%</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="flex items-center gap-3 mt-4 pt-3 border-t">
            <div className="flex items-center gap-1">
              <Check className="h-3 w-3 text-success" />
              <span className="text-[11px] text-muted-foreground">{document.aiSummary.passed} Passed</span>
            </div>
            <div className="flex items-center gap-1">
              <X className="h-3 w-3 text-destructive" />
              <span className="text-[11px] text-muted-foreground">{document.aiSummary.failed} Failed</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-warning" />
              <span className="text-[11px] text-muted-foreground">{document.aiSummary.warnings} Warnings</span>
            </div>
          </div>
        </div>

        {/* Reconciliation */}
        <div className="rounded-xl border bg-background p-4">
          <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            Validation Results
          </h4>
          <div className="space-y-2">
            {document.validations.map((v, i) => (
              <div key={i} className={cn(
                'rounded-lg p-2.5 border text-[11px]',
                v.status === 'match' && 'bg-success/5 border-success/15',
                v.status === 'mismatch' && 'bg-destructive/5 border-destructive/15',
                v.status === 'warning' && 'bg-warning/5 border-warning/15',
              )}>
                <p className="font-medium text-foreground">{v.field}</p>
                <div className="flex justify-between mt-1 gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground">Declared</p>
                    <p className="truncate">{v.declared}</p>
                  </div>
                  <div className="min-w-0 text-right">
                    <p className="text-[10px] text-muted-foreground">OCR</p>
                    <p className={cn(
                      'truncate font-medium',
                      v.status === 'mismatch' && 'text-destructive',
                      v.status === 'warning' && 'text-warning',
                      v.status === 'match' && 'text-success',
                    )}>{v.ocr}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issues */}
        {document.issues.length > 0 && (
          <div className="rounded-xl border bg-background p-4">
            <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-destructive" />
              Issues ({document.issues.length})
            </h4>
            <div className="space-y-2">
              {document.issues.map((issue) => (
                <div key={issue.id} className="rounded-lg border p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={cn('px-1.5 py-0.5 text-[9px] font-semibold rounded border', severityColors[issue.severity])}>
                      {issue.severity}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{issue.field}</span>
                  </div>
                  <p className="text-[11px] text-foreground">{issue.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fraud Meter */}
        <div className="rounded-xl border bg-background p-4">
          <h4 className="text-xs font-semibold text-foreground mb-3">Fraud Risk Meter</h4>
          <div className="h-2.5 w-full rounded-full overflow-hidden bg-gradient-to-r from-success via-warning to-destructive opacity-25">
          </div>
          <div className="relative h-2.5 -mt-2.5 w-full">
            <div className="h-full rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full bg-gradient-to-r', risk.gradient)}
                style={{ width: `${document.riskScore}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[9px] text-muted-foreground">Safe</span>
            <span className="text-[9px] text-muted-foreground">Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisPanel;
