import  { useState } from 'react';
import DOMPurify from 'dompurify';

const HTMLViewer = () => {
  const [html, setHtml] = useState('<h1>Hello</h1><p>Edit me!</p>');

  const handleChange = (e) => {
    console.log('boom',e.target.value)
    setHtml(e.target.value);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left: Input Area */}
      <div style={{ flex: 1, padding: '10px', borderRight: '1px solid #ccc' }}>
        <h3>HTML Input</h3>
        <textarea
          value={html}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '90%',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        />
      </div>

      {/* Right: Output Area */}
      <div style={{ flex: 1, padding: '10px' }}>
        <h3>HTML Output</h3>
        <div
          style={{
            border: '1px solid #eee',
            padding: '10px',
            minHeight: '90%',
            backgroundColor: '#c0c0c0',
          }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        />
      </div>
    </div>
  );
};

export default HTMLViewer;
