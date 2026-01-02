import React, { useState, useEffect } from 'react';
import PuzzleHeader from '../../../components/puzzleheader/page';
import { useGame } from '../../page';
function MazePuzzle({ puzzleId }: { puzzleId: number }) {
  const { completePuzzle } = useGame();
  const [position, setPosition] = useState({ x: 0, y: 0 });
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

  const maze = [
    [1, 1, 1, 1, 1, 1, 1],
    [2, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 3],
    [1, 1, 1, 1, 1, 1, 1],
  ];

  const handleMove = (dx: number, dy: number) => {
    const newX = position.x + dx;
    const newY = position.y + dy;
    
    if (newX >= 0 && newX < 7 && newY >= 0 && newY < 7 && maze[newY][newX] !== 1) {
      setPosition({ x: newX, y: newY });
      if (maze[newY][newX] === 3) {
        setTimeout(() => completePuzzle(puzzleId), 500);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') handleMove(0, -1);
      if (e.key === 'ArrowDown') handleMove(0, 1);
      if (e.key === 'ArrowLeft') handleMove(-1, 0);
      if (e.key === 'ArrowRight') handleMove(1, 0);
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [position]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <PuzzleHeader 
        title="Navigate the Maze" 
        hintUnlocked={hintUnlocked}
        hint="Try going right first, then down!"
      />
      
      <div className="mt-8 bg-white rounded-lg p-8 shadow-2xl">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {maze.map((row, y) => 
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`w-12 h-12 rounded ${
                  cell === 1 ? 'bg-gray-800' : 
                  cell === 2 ? 'bg-green-500' : 
                  cell === 3 ? 'bg-red-500' : 
                  'bg-gray-200'
                } ${x === position.x && y === position.y ? 'bg-blue-500 animate-pulse' : ''}`}
              >
                {x === position.x && y === position.y && (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    🏃
                  </div>
                )}
                {cell === 2 && !(x === position.x && y === position.y) && (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    🚪
                  </div>
                )}
                {cell === 3 && (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    🎯
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <button onClick={() => handleMove(0, -1)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">↑</button>
          <div className="flex gap-2">
            <button onClick={() => handleMove(-1, 0)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">←</button>
            <button onClick={() => handleMove(1, 0)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">→</button>
          </div>
          <button onClick={() => handleMove(0, 1)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">↓</button>
        </div>
      </div>
    </div>
  );
}
export default MazePuzzle;