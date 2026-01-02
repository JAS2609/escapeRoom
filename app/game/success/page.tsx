import React from 'react';
import Image from 'next/image';
import { useGame } from '../page';
function SuccessScreen() {
  const { gameState } = useGame();
const friendImages: Record<number, string> = {
  1: "/savedfriend1.png",
  2: "/savedfriend2.png",
  3: "/savedfriend3.png",
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 animate-bounce">
        <div className="text-8xl">🎉</div>
        <h1 className="text-6xl font-bold text-white">Great Job!</h1>
        <p className="text-2xl text-green-400">You freed all your friends!</p>
      </div>
      
      <div className="mt-12 flex gap-8">
        {gameState.friends.map(friend => (
          <div key={friend.id} className="text-center">
             <div className="flex justify-center mb-4">
                            <Image
                              src={friendImages[friend.id]}
                              alt={friend.name}
                              width={160}
                              height={220}
                              className="rounded-md"
                            />
                          </div>
            <p className="text-white font-semibold">{friend.name}</p>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => window.location.reload()}
        className="mt-12 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold rounded-lg transition-all transform hover:scale-105"
      >
        Play Again
      </button>
    </div>
  );
}
export default SuccessScreen;