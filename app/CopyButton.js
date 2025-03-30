'use client';
import { useState } from 'react';

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-3 px-2 py-1 text-sm rounded bg-purple-600 text-white hover:bg-purple-700"
    >
      {copied ? '✅ Copied!' : 'Copy'}
    </button>
  );
}
