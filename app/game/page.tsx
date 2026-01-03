'use client';
import React, { useState, useEffect, createContext, useContext } from 'react';
import MazePuzzle from './puzzle/maze/maze';
import  GameState  from '../types/game';
import HeartsPuzzle from './puzzle/hearts/hearts';
import PhotoDifferencePuzzle from './puzzle/difference/diffrence';
import FinalLockScreen from './final_lock/finalLock';
export const GameContext = createContext<{
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  startPuzzle: (id: number) => void;
  completePuzzle: (id: number) => void;
  updateFinalCode: (index: number, char: string) => void;
} | null>(null);


export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};

 
  
interface GameContextType { 
    gameState: GameState;
    completePuzzle: (puzzleId: number) => void;
    unlockHint: (puzzleId: number) => void;
}
type SceneType = 'image' | 'game';

interface Scene {
  id: number;
  type: SceneType;
  image?: string;
  gameId?: number;
}
const SCENES: Scene[] = [
  { id: 1, type: 'image', image: '/prisonimage.png' },
  { id: 2, type: 'image', image: '/scene2.png' },
  { id: 3, type: 'game', gameId: 1 },
  { id: 4, type: 'image', image: '/scene4.png' },
  {id: 5, type: 'image', image: '/scene5.png' },
  { id: 6, type: 'game', gameId: 2 },
  { id: 7, type: 'image', image: '/scene7.png' },
  {id:8, type:'image', image:'/scene8.png'},
  { id: 9, type: 'game', gameId: 3 },
  { id: 10, type: 'image', image: '/scene10.png' },
  { id: 9, type: 'image', image: '/scene11.png' },
  { id: 10, type: 'game', gameId: 99 }, 
  { id: 11, type: 'image', image: '/scene13.png' },
];

function GameFlow() {
  const [sceneIndex, setSceneIndex] = useState(0);

  const nextScene = () => {
    setSceneIndex(prev => Math.min(prev + 1, SCENES.length - 1));
  };

  const restartGame = () => {
    setSceneIndex(0);
  };

  const scene = SCENES[sceneIndex];
  if (sceneIndex === SCENES.length - 1 && scene.type === 'image') {
    return (
      <ImageScene
        src={scene.image!}
        onNext={restartGame}   
      />
    );
  }

  if (scene.type === 'image') {
    return (
      <ImageScene
        src={scene.image!}
        onNext={nextScene}
      />
    );
  }

  return (
    <GameScene
      gameId={scene.gameId!}
      onComplete={nextScene}
    />
  );
}


function ImageScene({
  src,
  onNext,
}: {
  src: string;
  onNext: () => void;
}) {
  return (
    <div
      className="
        fixed inset-0
        w-screen h-screen
        bg-black
        flex items-center justify-center
        touch-manipulation
      "
      onClick={onNext}
    >
      <img
        src={src}
        alt="Prison Break Mission"
        className="
          w-full h-full
          object-fill
          max-w-none
          select-none
          pointer-events-none
        "
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      />
    </div>
  );
}
function GameScene({
  gameId,
  onComplete,
}: {
  gameId: number;
  onComplete: () => void;
}) {
  const handleGameWin = () => {
    setTimeout(onComplete, 800); 
  };

  if (gameId === 1) return <MiniGameOne onWin={handleGameWin} />;
  if (gameId === 2) return <MiniGameTwo onWin={handleGameWin} />;
  if (gameId === 3) return <MiniGameThree onWin={handleGameWin} />;
  if (gameId === 99) return <FinalLockGame onWin={handleGameWin} />;

  return null;
}
function MiniGameOne({ onWin }: { onWin: () => void }) {
  return (
    <PhotoDifferencePuzzle
      puzzleId={1}
      onComplete={onWin}
    />
  );
}

function MiniGameTwo({ onWin }: { onWin: () => void }) {
    return( <MazePuzzle 
    puzzleId={2} 
    onComplete={onWin} 
    />);
}

function MiniGameThree({ onWin }: { onWin: () => void }) {
  return (
    <HeartsPuzzle
      puzzleId={3}
      onComplete={onWin}
    />
  );
}
const getFinalCodeFromHints = (friends: GameState['friends']) => {
  return friends.map(friend =>
    friend.hint.trim().charAt(0).toUpperCase()
  );
};

function FinalLockGame({ onWin }: { onWin: () => void }) {
  const { gameState } = useGame();

  const finalCode = getFinalCodeFromHints(gameState.friends);
  const hints = gameState.friends.map(f => f.hint);

  return (
    <FinalLockScreen
      expectedCode={finalCode}
      hints={hints}
      onComplete={onWin}
    />
  );
}


export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>({
    friends: [
      {
        id: 1,
        name: "Alex",
        image: "/friend1.png",
        hint: "First character of city where you first met",
        freed: true,
      },
      {
        id: 2,
        name: "Sarah",
        image: "/friend2.png",
        hint: "First character of city where you first ate ice-cream",
        freed: true,
      },
      {
        id: 3,
        name: "Josh",
        image: "/friend3.png",
        hint: "First character of city where you first stayed overnight",
        freed: true,
      },
    ],
    currentPuzzle: null,
    completedPuzzles: [],
    finalCode: ['', '', ''],
    gameStarted: true,
    gameCompleted: false,
  });

  const startPuzzle = (id: number) => {
    setGameState(prev => ({ ...prev, currentPuzzle: id }));
  };

  const completePuzzle = (id: number) => {
    setGameState(prev => ({
      ...prev,
      completedPuzzles: [...prev.completedPuzzles, id],
      currentPuzzle: null,
    }));
  };

  const updateFinalCode = (index: number, char: string) => {
    setGameState(prev => {
      const newCode = [...prev.finalCode];
      newCode[index] = char;
      return { ...prev, finalCode: newCode };
    });
  };

  return (
    <GameContext.Provider value={{ gameState, setGameState, startPuzzle, completePuzzle, updateFinalCode }}>
      <GameFlow />
    </GameContext.Provider>
  );
}