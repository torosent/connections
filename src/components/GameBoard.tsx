import React, { useState, useEffect } from 'react';
import WordTile from './WordTile';
import GroupDisplay from './GroupDisplay';
import ColorKey from './ColorKey';
import { ConnectionPuzzle, GameState } from '@/types';
import { shuffleArray } from '@/utils/connectionUtils';

interface GameBoardProps {
  puzzle: ConnectionPuzzle | null;
  onNewGame: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ puzzle, onNewGame }) => {
  const [words, setWords] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    selectedWords: [],
    solvedGroups: [],
    mistakes: 0,
    gameStatus: 'playing',
  });
  const [showError, setShowError] = useState(false);

  // Reset the game when a new puzzle is loaded
  useEffect(() => {
    if (puzzle) {
      const allWords: string[] = [];
      puzzle.answers.forEach(group => {
        allWords.push(...group.members);
      });
      setWords(shuffleArray(allWords));
      setGameState({
        selectedWords: [],
        solvedGroups: [],
        mistakes: 0,
        gameStatus: 'playing',
      });
      setShowError(false);
    }
  }, [puzzle]);

  const handleWordClick = (word: string) => {
    if (gameState.gameStatus !== 'playing') return;
    
    // Check if word is already selected
    if (gameState.selectedWords.includes(word)) {
      setGameState({
        ...gameState,
        selectedWords: gameState.selectedWords.filter(w => w !== word),
      });
      return;
    }
    
    // Check if we already have 4 words selected
    if (gameState.selectedWords.length >= 4) return;
    
    const newSelectedWords = [...gameState.selectedWords, word];
    setGameState({
      ...gameState,
      selectedWords: newSelectedWords,
    });
  };

  const handleSubmit = () => {
    if (gameState.selectedWords.length !== 4) return;
    checkSelectedGroup(gameState.selectedWords);
  };

  const checkSelectedGroup = (selectedWords: string[]) => {
    if (!puzzle) return;
    
    // Check if selected words match any unsolved group
    const matchingGroup = puzzle.answers.find(group => {
      const groupMembers = new Set(group.members);
      return selectedWords.every(word => groupMembers.has(word)) && selectedWords.length === group.members.length;
    });
    
    if (matchingGroup) {
      // Group solved
      const newSolvedGroups = [...gameState.solvedGroups, matchingGroup];
      const newGameStatus = newSolvedGroups.length === 4 ? 'won' : 'playing';
      
      setGameState({
        selectedWords: [],
        solvedGroups: newSolvedGroups,
        mistakes: gameState.mistakes,
        gameStatus: newGameStatus,
      });
      setShowError(false);
    } else {
      // Incorrect attempt
      const newMistakes = gameState.mistakes + 1;
      const newGameStatus = newMistakes >= 4 ? 'lost' : 'playing';
      
      setShowError(true);
      
      // Clear the error state after 1.5 seconds
      setTimeout(() => {
        setShowError(false);
        setGameState({
          selectedWords: [],
          solvedGroups: gameState.solvedGroups,
          mistakes: newMistakes,
          gameStatus: newGameStatus,
        });
      }, 1500);
    }
  };

  const isWordInSolvedGroup = (word: string) => {
    return gameState.solvedGroups.some(group => 
      group.members.includes(word)
    );
  };

  const getSolvedGroupForWord = (word: string) => {
    return gameState.solvedGroups.find(group => 
      group.members.includes(word)
    );
  };

  const renderGameStatus = () => {
    if (gameState.gameStatus === 'won') {
      return (
        <div className="w-full bg-green-100 p-4 rounded-md mb-4 text-center">
          <h2 className="text-2xl font-bold text-green-800">Victory!</h2>
          <p className="text-green-700 mb-3">You solved all the connections!</p>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={onNewGame}
          >
            Play Another Puzzle
          </button>
        </div>
      );
    }
    
    if (gameState.gameStatus === 'lost') {
      return (
        <div className="w-full bg-red-100 p-4 rounded-md mb-4 text-center">
          <h2 className="text-2xl font-bold text-red-800">Game Over</h2>
          <p className="text-red-700 mb-3">You made too many mistakes</p>
          {puzzle && (
            <div className="mb-4">
              <h3 className="font-bold mb-2">Here are all the connections:</h3>
              <div className="space-y-2">
                {puzzle.answers.map((group, index) => (
                  <GroupDisplay key={index} group={group} />
                ))}
              </div>
            </div>
          )}
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={onNewGame}
          >
            Try Again
          </button>
        </div>
      );
    }
    
    return null;
  };

  if (!puzzle) {
    return <div className="text-center">Loading puzzle...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-2 md:p-4">
      {renderGameStatus()}
      
      {/* Color key for difficulty levels */}
      {gameState.gameStatus === 'playing' && (
        <div className="mb-4">
          <h4 className="text-sm text-center mb-2">Difficulty Levels:</h4>
          <ColorKey />
        </div>
      )}
      
      {/* Game board */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {words.map((word, index) => {
          const isWordSolved = isWordInSolvedGroup(word);
          const solvedGroup = getSolvedGroupForWord(word);
          
          return (
            <WordTile
              key={index}
              word={word}
              isSelected={gameState.selectedWords.includes(word)}
              isDisabled={isWordSolved || gameState.gameStatus !== 'playing'}
              solvedGroup={solvedGroup}
              onClick={() => handleWordClick(word)}
            />
          );
        })}
      </div>
      
      {/* Submit button and feedback */}
      <div className="flex flex-col items-center justify-center space-y-4 mb-4">
        {showError && (
          <div className="w-full bg-red-100 p-3 rounded-md text-center text-red-700 animate-pulse">
            Not a valid connection. Try again!
          </div>
        )}
        
        <button
          style={{
            backgroundColor: gameState.selectedWords.length === 4 ? 'var(--submit-bg)' : 'var(--submit-disabled-bg)',
            color: gameState.selectedWords.length === 4 ? 'var(--submit-text)' : 'var(--submit-disabled-text)'
          }}
          className="w-full md:w-48 py-2 px-4 rounded-md font-medium transition-colors"
          onClick={handleSubmit}
          disabled={gameState.selectedWords.length !== 4 || gameState.gameStatus !== 'playing'}
        >
          Submit ({gameState.selectedWords.length}/4)
        </button>
        
        <p className="text-center">
          <span className={gameState.mistakes > 0 ? 'text-red-600 font-semibold' : ''}>
            Mistakes: {gameState.mistakes}/4
          </span>
        </p>
      </div>
      
      {/* Solved groups */}
      {gameState.solvedGroups.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Solved Groups:</h3>
          {gameState.solvedGroups.map((group, index) => (
            <GroupDisplay key={index} group={group} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameBoard;