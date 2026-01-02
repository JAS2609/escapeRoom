import DifferencePuzzle from '../puzzle/difference/page';
import MazePuzzle from '../puzzle/maze/page';
import HeartsPuzzle from '../puzzle/hearts/page';
function PuzzleScreen({ puzzleId }: { puzzleId: number }) {
  const puzzleComponents = {
    1: DifferencePuzzle,
    2: MazePuzzle,
    3: HeartsPuzzle,
  };
  
  const PuzzleComponent = puzzleComponents[puzzleId as keyof typeof puzzleComponents];
  
  return (
    <div className="min-h-screen">
      <PuzzleComponent puzzleId={puzzleId} />
    </div>
  );
}
export default PuzzleScreen;