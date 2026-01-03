import Friend  from './friend';
interface GameState {
  friends: Friend[];
  currentPuzzle: number | null;
  completedPuzzles: number[];
  finalCode: string[];
  gameStarted: boolean;
  gameCompleted: boolean;
}
export default  GameState ;