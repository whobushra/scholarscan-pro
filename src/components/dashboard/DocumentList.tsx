import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Document, RiskLevel, DocStatus } from '@/data/mockDocuments';
import { cn } from '@/lib/utils';

interface Props {
  documents: Document[];
  selectedId: string | null;
  onSelect: (doc: Document) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

const statusConfig: Record<DocStatus, { label: string; class: string }> = {
  approved: { label: 'Approved', class: 'bg-success/10 text-success' },
  rejected: { label: 'Rejected', class: 'bg-destructive/10 text-destructive' },
  pending: { label: 'Pending', class: 'bg-warning/10 text-warning' },
};

const riskConfig: Record<RiskLevel, { label: string; dot: string; bg: string }> = {
  low: { label: 'Low', dot: 'bg-risk-low', bg: 'bg-risk-low/10 text-risk-low' },
  medium: { label: 'Medium', dot: 'bg-risk-medium', bg: 'bg-risk-medium/10 text-risk-medium' },
  high: { label: 'High', dot: 'bg-risk-high', bg: 'bg-risk-high/10 text-risk-high' },
  critical: { label: 'Critical', dot: 'bg-risk-critical', bg: 'bg-risk-critical/10 text-risk-critical' },
};

type StatusFilter = 'all' | DocStatus;
type RiskFilter = 'all' | RiskLevel;
type SortBy = 'risk' | 'updated';

const DocumentList = ({ documents, selectedId, onSelect, selectedIds, onToggleSelect }: Props) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('risk');

  const filtered = useMemo(() => {
    let result = documents.filter((d) => {
      if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (riskFilter !== 'all' && d.riskLevel !== riskFilter) return false;
      return true;
    });
    result.sort((a, b) => {
      if (sortBy === 'risk') return b.riskScore - a.riskScore;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return result;
  }, [documents, search, statusFilter, riskFilter, sortBy]);

  const statusFilters: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
  ];

  const riskFilters: { key: RiskFilter; label: string; dot: string }[] = [
    { key: 'all', label: 'All Risk', dot: '' },
    { key: 'low', label: 'Low', dot: 'bg-risk-low' },
    { key: 'medium', label: 'Med', dot: 'bg-risk-medium' },
    { key: 'high', label: 'High', dot: 'bg-risk-high' },
    { key: 'critical', label: 'Crit', dot: 'bg-risk-critical' },
  ];

  return (
    <div className="flex flex-col h-full bg-card border-r">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Documents</h3>
          <span className="text-xs text-muted-foreground">{filtered.length} items</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8 pl-8 pr-3 text-xs rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        {/* Status Filters */}
        <div className="flex gap-1 flex-wrap">
          {statusFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={cn(
                'px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors',
                statusFilter === f.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Risk Filters */}
        <div className="flex gap-1 flex-wrap">
          {riskFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setRiskFilter(f.key)}
              className={cn(
                'px-2 py-1 text-[11px] font-medium rounded-md transition-colors flex items-center gap-1',
                riskFilter === f.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              {f.dot && <span className={cn('w-1.5 h-1.5 rounded-full', f.dot)} />}
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-1">
          <button
            onClick={() => setSortBy('risk')}
            className={cn(
              'flex items-center gap-1 px-2 py-1 text-[11px] rounded-md transition-colors',
              sortBy === 'risk' ? 'text-primary font-medium' : 'text-muted-foreground'
            )}
          >
            <ArrowUpDown className="h-3 w-3" /> Risk
          </button>
          <button
            onClick={() => setSortBy('updated')}
            className={cn(
              'flex items-center gap-1 px-2 py-1 text-[11px] rounded-md transition-colors',
              sortBy === 'updated' ? 'text-primary font-medium' : 'text-muted-foreground'
            )}
          >
            <ArrowUpDown className="h-3 w-3" /> Recent
          </button>
        </div>
      </div>

      {/* Document Cards */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.map((doc) => {
          const risk = riskConfig[doc.riskLevel];
          const status = statusConfig[doc.status];
          const isSelected = selectedId === doc.id;
          const isChecked = selectedIds.includes(doc.id);

          return (
            <div
              key={doc.id}
              onClick={() => onSelect(doc)}
              className={cn(
                'group p-3 rounded-lg cursor-pointer transition-all duration-150 border',
                isSelected
                  ? 'bg-primary/5 border-primary/20 shadow-card'
                  : 'border-transparent hover:bg-secondary/60 hover:border-border'
              )}
            >
              <div className="flex items-start gap-2.5">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    e.stopPropagation();
                    onToggleSelect(doc.id);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-border accent-primary shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-foreground truncate">{doc.name}</p>
                    <span className={cn('shrink-0 w-2 h-2 rounded-full', risk.dot)} />
                  </div>

                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className={cn('px-1.5 py-0.5 text-[10px] font-medium rounded', status.class)}>
                      {status.label}
                    </span>
                    <span className={cn('px-1.5 py-0.5 text-[10px] font-medium rounded', risk.bg)}>
                      {risk.label}
                    </span>
                    {doc.issuesCount > 0 && (
                      <span className="text-[10px] text-muted-foreground">
                        ⚠ {doc.issuesCount}
                      </span>
                    )}
                  </div>

                  {/* Risk bar */}
                  <div className="mt-2 h-1 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all', risk.dot)}
                      style={{ width: `${doc.riskScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex items-center justify-center h-32 text-xs text-muted-foreground">
            No documents found
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentList;
