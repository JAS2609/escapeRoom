'use client';
import React, { useState } from 'react';

interface FinalLockScreenProps {
  expectedCode: string[];
  hints: string[];
  onComplete: () => void;
}

function FinalLockScreen({
  expectedCode,
  hints,
  onComplete,
}: FinalLockScreenProps) {
  const [input, setInput] = useState<string[]>(
    Array(expectedCode.length).fill('')
  );
  const [error, setError] = useState(false);

  const updateChar = (index: number, value: string) => {
    const updated = [...input];
    updated[index] = value.toUpperCase().slice(0, 1);
    setInput(updated);
  };

  const submit = () => {
    const correct = input.every(
      (char, i) => char === expectedCode[i]
    );

    if (correct) {
      setTimeout(onComplete, 800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <h2 className="text-4xl font-black text-white mb-6">
        FINAL LOCK
      </h2>

      <div className="w-full max-w-xl mb-8 space-y-3">
        {hints.map((hint, i) => (
          <div
            key={i}
            className="bg-gray-800 border-2 border-yellow-500 rounded-lg p-3 text-white text-sm"
          >
            <span className="font-bold text-yellow-400 mr-2">
              Hint {i + 1}:
            </span>
            {hint}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mb-10">
        {expectedCode.map((_, i) => (
          <input
            key={i}
            value={input[i]}
            maxLength={1}
            onChange={e => updateChar(i, e.target.value)}
            className={`
              w-20 h-20 text-4xl text-center font-black uppercase
              bg-black text-white border-4 rounded-lg
              ${error ? 'border-red-500 animate-shake' : 'border-yellow-500'}
            `}
          />
        ))}
      </div>

      <button
        onClick={submit}
        disabled={!input.every(c => c.length === 1)}
        className="
          px-10 py-4
          bg-green-600 hover:bg-green-700
          disabled:bg-gray-600
          text-white text-2xl font-black
          rounded-lg transition-all
        "
      >
        UNLOCK
      </button>
    </div>
  );
}

export default FinalLockScreen;
