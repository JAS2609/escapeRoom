import React, { useState } from 'react';
import { useGame } from '../../game/page.tx';
function PersonalizeModal({ onClose }: { onClose: () => void }) {
  const { gameState, setGameState } = useGame();
  const [localFriends, setLocalFriends] = useState(gameState.friends);

  const handleSave = () => {
    setGameState(prev => ({ ...prev, friends: localFriends }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-black">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Personalize Your Game</h2>
        
        <div className="space-y-6">
          {localFriends.map((friend, index) => (
            <div key={friend.id} className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Friend {index + 1}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hint Message</label>
                  <input
                    type="text"
                    value={friend.hint}
                    onChange={(e) => {
                      const updated = [...localFriends];
                      updated[index] = { ...updated[index], hint: e.target.value };
                      setLocalFriends(updated);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter hint"
                  />
                </div>
              </div>
          ))}
        </div>
        
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default PersonalizeModal;