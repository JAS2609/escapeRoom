import React from "react";
import { useGame } from "../page";
import Image from "next/image";

const friendImages: Record<number, string> = {
  1: "/savedfriend1.png",
  2: "/savedfriend2.png",
  3: "/savedfriend3.png",
};


const CORRECT_FINAL_CODE = ["P", "L", "R"]; 

function FinalLockScreen() {
  const { gameState, setGameState } = useGame();

  const updateFinalCode = (index: number, value: string) => {
    setGameState((prev) => {
      const newCode = [...prev.finalCode];
      newCode[index] = value.toUpperCase().slice(0, 1);
      return { ...prev, finalCode: newCode };
    });
  };
  const handleSubmit = () => {
    const enteredCode = gameState.finalCode.map((c) => c.toUpperCase());
    const isCorrect = enteredCode.every(
      (c, index) => c === CORRECT_FINAL_CODE[index]
    );

    if (isCorrect) {
      setGameState((prev) => ({ ...prev, gameCompleted: true }));
    } else {
      alert("❌ Incorrect code. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <h2 className="text-4xl font-bold text-white mb-8">Final Lock</h2>
      <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl">
        Use the hints from your freed friends to unlock the final lock!
      </p>
      <div className="space-y-8 mb-12">
        {gameState.friends
          .filter((f) => f.freed)
          .map((friend) => (
            <div
              key={friend.id}
              className="bg-gray-800 p-6 rounded-lg text-white text-center max-w-md"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={friendImages[friend.id]}
                  alt={friend.name}
                  width={160}
                  height={220}
                  className="rounded-md"
                />
              </div>
              <p className="text-lg italic">"{friend.hint}"</p>
            </div>
          ))}
      </div>

      {/* Code inputs */}
      <div className="flex gap-4 mb-8">
        {[0, 1, 2].map((index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={gameState.finalCode[index]}
            onChange={(e) => updateFinalCode(index, e.target.value)}
            className={`w-20 h-20 text-4xl text-center bg-black border-4 rounded-lg font-bold uppercase focus:outline-none focus:ring-4
              ${
                gameState.finalCode[index].toUpperCase() ===
                CORRECT_FINAL_CODE[index]
                  ? "border-green-500"
                  : "border-yellow-500"
              }
            `}
          />
        ))}
      </div>

      {/* Unlock button */}
      <button
        onClick={handleSubmit}
        disabled={!gameState.finalCode.every((c) => c.length === 1)}
        className="px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xl font-bold rounded-lg transition-all transform hover:scale-105"
      >
        Unlock!
      </button>
    </div>
  );
}

export default FinalLockScreen;
