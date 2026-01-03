import React, { useState } from 'react';
import PuzzleHeader from '../../../components/puzzleheader/page';

interface PhotoDifferencePuzzleProps {
  puzzleId: number;
  onComplete: () => void;
}

function PhotoDifferencePuzzle({
  puzzleId,
  onComplete,
}: PhotoDifferencePuzzleProps) {
  const [found, setFound] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [flashError, setFlashError] = useState(false);

  const DEBUG_ZONES = false;

  const differences = [
    { id: 1, label: 'Wine color', top: '63%', left: '32%', size: '6%' },
    { id: 2, label: 'Flower near knee', top: '85%', left: '85%', size: '8%' },
    { id: 3, label: 'Light bulb', top: '14%', left: '43%', size: '4%' },
    { id: 4, label: 'Candle on table', top: '31%', left: '14%', size: '6%' },
  ];

  const handleCorrect = (id: number) => {
    if (found.includes(id)) return;

    const updated = [...found, id];
    setFound(updated);

    if (updated.length === differences.length) {
      setTimeout(() => {
        onComplete(); 
      }, 700);
    }
  };

  const handleMiss = () => {
    setMistakes(m => m + 1);
    setFlashError(true);
    setTimeout(() => setFlashError(false), 200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <PuzzleHeader
        title="Find 4 Differences"
        found={found.length}
        total={differences.length}
        hintUnlocked={mistakes >= 3}
        hint="Look closely at the drinks, background lights, and table."
      />

      <p className="text-sm text-gray-500 mt-1">
        Mistakes: {mistakes}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-6xl">
        <div className="relative">
          <img
            src="/diffimg2.png"
            alt="Original"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div
          className={`relative rounded-lg overflow-hidden
            ${flashError ? 'ring-4 ring-red-500' : ''}
          `}
          onClick={handleMiss}
        >
          <img
            src="/diffimg1.png"
            alt="Modified"
            className="rounded-lg shadow-lg w-full"
          />

          {differences.map(diff => {
            const isFound = found.includes(diff.id);

            return (
              <button
                key={diff.id}
                aria-label={diff.label}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCorrect(diff.id);
                }}
                className={`absolute rounded-full transition-all
                  ${
                    isFound
                      ? 'bg-yellow-400/40 ring-4 ring-yellow-400'
                      : DEBUG_ZONES
                      ? 'bg-red-500/30 border border-red-600'
                      : 'bg-transparent'
                  }
                `}
                style={{
                  top: diff.top,
                  left: diff.left,
                  width: diff.size,
                  height: diff.size,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PhotoDifferencePuzzle;
