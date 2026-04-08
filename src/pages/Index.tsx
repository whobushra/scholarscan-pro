import { useState, useCallback } from 'react';
import { documents as initialDocs, Document, DocStatus } from '@/data/mockDocuments';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DocumentList from '@/components/dashboard/DocumentList';
import DocumentPreview from '@/components/dashboard/DocumentPreview';
import AIAnalysisPanel from '@/components/dashboard/AIAnalysisPanel';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const Index = () => {
  const [docs, setDocs] = useState<Document[]>(initialDocs);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = useCallback((doc: Document) => {
    setSelectedDoc(doc);
  }, []);

  const handleToggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleStatusChange = useCallback((id: string, status: DocStatus) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
    setSelectedDoc((prev) => (prev?.id === id ? { ...prev, status } : prev));
  }, []);

  const handleBulkAction = useCallback((status: DocStatus) => {
    setDocs((prev) =>
      prev.map((d) => (selectedIds.includes(d.id) ? { ...d, status } : d))
    );
    if (selectedDoc && selectedIds.includes(selectedDoc.id)) {
      setSelectedDoc((prev) => prev ? { ...prev, status } : prev);
    }
    setSelectedIds([]);
  }, [selectedIds, selectedDoc]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashboardHeader />

      {/* Bulk actions bar */}
      {selectedIds.length > 0 && (
        <div className="h-10 bg-primary/5 border-b flex items-center justify-between px-6 shrink-0">
          <span className="text-xs font-medium text-foreground">
            {selectedIds.length} document{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-success hover:bg-success/10" onClick={() => handleBulkAction('approved')}>
              <Check className="h-3 w-3" /> Approve All
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-destructive hover:bg-destructive/10" onClick={() => handleBulkAction('rejected')}>
              <X className="h-3 w-3" /> Reject All
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground" onClick={() => setSelectedIds([])}>
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* 3-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Document List */}
        <div className="w-80 shrink-0">
          <DocumentList
            documents={docs}
            selectedId={selectedDoc?.id ?? null}
            onSelect={handleSelect}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
          />
        </div>

        {/* Center: Preview */}
        <DocumentPreview
          document={selectedDoc ? docs.find(d => d.id === selectedDoc.id) || selectedDoc : null}
          onStatusChange={handleStatusChange}
        />

        {/* Right: AI Panel */}
        <AIAnalysisPanel
          document={selectedDoc ? docs.find(d => d.id === selectedDoc.id) || selectedDoc : null}
        />
      </div>
    </div>
  );
};

export default Index;
