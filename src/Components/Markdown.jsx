import { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { FileText, Eye, Edit3, SplitSquareVertical } from 'lucide-react';

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(`# Hello Markdown!

Welcome to the **ToolsHub** Markdown Editor.

- Type on the left
- Preview on the right
- Uses GitHub Flavored Markdown

\`\`\`javascript
console.log("Modern styling applied!");
\`\`\``);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const getMarkdownText = () => {
    const rawMarkup = marked(markdown, { breaks: true });
    return { __html: DOMPurify.sanitize(rawMarkup) };
  };

  return (
    <div className="max-w-7xl mx-auto p-6 h-[calc(100vh-120px)] min-h-[600px]">
      <div className="glass h-full rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-500">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Markdown Editor</h2>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Live previewer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SplitSquareVertical size={18} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-tight">Side by Side</span>
          </div>
        </div>

        <div className="flex-grow flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
          {/* Editor Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-2 bg-white/5 flex items-center gap-2 border-b border-white/5">
              <Edit3 size={14} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Editor</span>
            </div>
            <textarea
              value={markdown}
              onChange={handleChange}
              placeholder="Enter markdown code here..."
              className="flex-grow w-full p-6 bg-transparent font-mono text-sm leading-relaxed outline-none resize-none scrollbar-thin scrollbar-thumb-white/10 text-foreground/80 focus:text-foreground transition-colors"
            />
          </div>

          {/* Preview Area */}
          <div className="flex-1 flex flex-col overflow-hidden relative bg-white/5">
            <div className="px-4 py-2 bg-white/5 flex items-center gap-2 border-b border-white/5">
              <Eye size={14} className="text-secondary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Preview</span>
            </div>
            <div
              className="flex-grow p-8 overflow-auto prose prose-invert prose-slate max-w-none scrollbar-thin scrollbar-thumb-white/10 selection:bg-primary/30"
              dangerouslySetInnerHTML={getMarkdownText()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreviewer;
