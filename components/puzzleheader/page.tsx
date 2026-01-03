'use client'; 
import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
function PuzzleHeader({ title, found, total, hintUnlocked, hint }: { 
  title: string; 
  found?: number; 
  total?: number; 
  hintUnlocked: boolean; 
  hint: string;
}) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-bold text-white">{title}</h2>
      {found !== undefined && total !== undefined && (
        <p className="text-2xl text-green-400">Found: {found} / {total}</p>
      )}
      <button
        onClick={() => setShowHint(!showHint)}
        disabled={!hintUnlocked}
        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
          hintUnlocked 
            ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' 
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Lightbulb className="inline w-5 h-5 mr-2" />
        {hintUnlocked ? 'Show Hint' : 'Hint unlocks in 1 min'}
      </button>
      {showHint && hintUnlocked && (
        <div className="bg-yellow-100 text-gray-900 p-4 rounded-lg max-w-md mx-auto">
          {hint}
        </div>
      )}
    </div>
  );
}
export default PuzzleHeader;