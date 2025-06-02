import React, { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
console.log('boom')
const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(`# Hello Markdown!

- Type here
- And preview below`);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const getMarkdownText = () => {
    const rawMarkup = marked(markdown, { breaks: true });
    return { __html: DOMPurify.sanitize(rawMarkup) };
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <textarea
        value={markdown}
        onChange={handleChange}
        className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
        rows={20}
      />
      <div
        className="w-full md:w-1/2 p-2 border border-gray-300 rounded bg-white prose max-w-none"
        dangerouslySetInnerHTML={getMarkdownText()}
      />
    </div>
  );
};

export default MarkdownPreviewer;
