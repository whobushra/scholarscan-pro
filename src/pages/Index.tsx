import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { documents as initialDocs, Document, DocStatus } from '@/data/mockDocuments';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DocumentList from '@/components/dashboard/DocumentList';
import DocumentPreview from '@/components/dashboard/DocumentPreview';
import AIAnalysisPanel from '@/components/dashboard/AIAnalysisPanel';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowLeft, PanelRightOpen, PanelLeftOpen } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const applicant = (location.state as any)?.applicant;

  const [docs, setDocs] = useState<Document[]>(initialDocs);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showList, setShowList] = useState(true);
  const [showAI, setShowAI] = useState(true);

  const handleSelect = useCallback((doc: Document) => {
    setSelectedDoc(doc);
    // On mobile, auto-hide list when selecting
    if (window.innerWidth < 768) setShowList(false);
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
    <div className="h-screen flex flex-col overflow-hidden bg-[#f5f5f0]">
      {/* Header with back button */}
      <header className="h-12 sm:h-14 border-b bg-white flex items-center justify-between px-3 sm:px-6 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#18AE59] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <div>
            <h1 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
              Document Verification
              {applicant && <span className="text-[#D1AD6E] ml-1.5 font-normal hidden sm:inline">— {applicant.name}</span>}
            </h1>
            {applicant && (
              <p className="text-[10px] text-gray-400 leading-tight hidden sm:block">{applicant.applicationNo}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowList(!showList)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors md:hidden"
            title="Toggle document list"
          >
            {showList ? <PanelLeftOpen className="h-4 w-4 text-gray-500" /> : <PanelRightOpen className="h-4 w-4 text-gray-500" />}
          </button>
        </div>
      </header>

      {/* Bulk actions bar */}
      {selectedIds.length > 0 && (
        <div className="h-10 bg-[#18AE59]/5 border-b flex items-center justify-between px-4 sm:px-6 shrink-0">
          <span className="text-xs font-medium text-gray-700">
            {selectedIds.length} document{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-emerald-600 hover:bg-emerald-50" onClick={() => handleBulkAction('approved')}>
              <Check className="h-3 w-3" /> Approve
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-red-600 hover:bg-red-50" onClick={() => handleBulkAction('rejected')}>
              <X className="h-3 w-3" /> Reject
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs text-gray-400" onClick={() => setSelectedIds([])}>
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* 3-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Document List */}
        <div className={`${showList ? 'flex' : 'hidden'} md:flex w-full md:w-80 shrink-0 absolute md:relative z-10 h-[calc(100vh-3rem)] md:h-auto bg-white`}>
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
        <div className="hidden lg:flex">
          <AIAnalysisPanel
            document={selectedDoc ? docs.find(d => d.id === selectedDoc.id) || selectedDoc : null}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
