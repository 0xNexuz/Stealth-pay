
import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <div className="bg-[#1a202c] rounded-xl p-4 font-mono text-sm overflow-x-auto card-border shadow-inner">
      <pre className="text-blue-300">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};
