import React, { useState, useEffect } from 'react';
import PuzzleHeader from '../../../components/puzzleheader/page';
import { useGame } from '../../page';
function HeartsPuzzle({ puzzleId }: { puzzleId: number }) {
  const { completePuzzle } = useGame();
  const [found, setFound] = useState<number[]>([]);
  const [hintUnlocked, setHintUnlocked] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        if (prev >= 60) setHintUnlocked(true);
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hearts = [1, 2, 3, 4, 5];
  const items = ['⭐', '🌙', '☀️', '❤️', '🔷', '🔶', '❤️', '🌸', '🌺', '❤️', '⚡', '🌈', '❤️', '🎨', '🎭', '❤️'];

  const handleClick = (index: number) => {
    if (items[index] === '❤️' && !found.includes(index)) {
      const newFound = [...found, index];
      setFound(newFound);
      if (newFound.length === 5) {
        setTimeout(() => completePuzzle(puzzleId), 500);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <PuzzleHeader 
        title="Find 5 Hearts" 
        found={found.length} 
        total={5} 
        hintUnlocked={hintUnlocked}
        hint="Hearts are scattered throughout the grid!"
      />
      
      <div className="mt-8 bg-white rounded-lg p-8 shadow-2xl">
        <div className="grid grid-cols-4 gap-4">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`w-20 h-20 text-4xl rounded-lg transition-all transform hover:scale-110 ${
                found.includes(index) ? 'bg-green-200 scale-110' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HeartsPuzzle;