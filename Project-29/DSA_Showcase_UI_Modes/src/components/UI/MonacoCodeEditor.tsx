import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const MonacoCodeEditor = ({ code, language = 'javascript', height = '400px' }) => {
  const editorRef = useRef(null);

  // Focus editor on Ctrl + Space
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault();
        editorRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEditorDidMount = (_, editor) => {
    editorRef.current = editor;
  };

  return (
    <div className="w-full border border-gray-700 rounded-md overflow-auto">
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={code}
        onMount={handleEditorDidMount}
        theme="vs-dark"
      />
    </div>
  );
};

export default MonacoCodeEditor;
