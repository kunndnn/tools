import { useState } from 'react';
import DOMPurify from 'dompurify';
import { Eye, Code2, Layout, Maximize2 } from 'lucide-react';

const HTMLViewer = () => {
  const [html, setHtml] = useState('<h1>Hello Hub!</h1><p>Start writing HTML to see it rendered live here...</p>');

  const handleChange = (e) => {
    setHtml(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 h-[calc(100vh-120px)] min-h-[600px]">
      <div className="glass h-full rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-500">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <Code2 size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Live HTML Viewer</h2>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Real-time preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Layout size={18} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Split View</span>
          </div>
        </div>

        <div className="flex-grow flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
          {/* Input Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-2 bg-white/5 flex items-center gap-2 border-b border-white/5">
              <Code2 size={14} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Source Code</span>
            </div>
            <textarea
              value={html}
              onChange={handleChange}
              placeholder="Paste your HTML here..."
              className="flex-grow w-full p-6 bg-transparent font-mono text-sm leading-relaxed outline-none resize-none scrollbar-thin scrollbar-thumb-white/10 text-foreground/80 focus:text-foreground transition-colors"
            />
          </div>

          {/* Output Area */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <div className="px-4 py-2 bg-white/5 flex items-center gap-2 border-b border-white/5">
              <Eye size={14} className="text-secondary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Live Preview</span>
            </div>
            <div className="absolute top-12 right-4 z-10">
              <Maximize2 size={16} className="text-muted-foreground opacity-50 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
            <div
              className="flex-grow p-6 overflow-auto bg-white/95 text-slate-900 HTML_PREVIEW_CANVAS"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HTMLViewer;
