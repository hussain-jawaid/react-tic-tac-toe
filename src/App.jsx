import { useEffect, useState } from "react";

function App() {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [flag, setFlag] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [winningLine, setWinningLine] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  const checkWinner = () => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinner(cells[a]);
        setGameOver(true);
        setWinningLine(combination);
        return;
      }
    }

    // Check for draw
    if (cells.every((cell) => cell !== "")) {
      setIsDraw(true);
      setGameOver(true);
    }
  };

  const inputValue = (idx) => {
    if (gameOver || cells[idx]) return;

    const newCells = [...cells];
    newCells[idx] = flag ? "X" : "O";
    setCells(newCells);
    setFlag(!flag);
  };

  const resetGame = () => {
    setCells(Array(9).fill(""));
    setFlag(true);
    setGameOver(false);
    setWinner("");
    setWinningLine([]);
    setIsDraw(false);
  };

  useEffect(() => {
    checkWinner();
  }, [cells]);

  const getCellStyle = (idx) => {
    const baseStyle =
      "bg-slate-800 hover:bg-slate-700 text-white text-6xl font-bold w-24 h-24 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 border-2 border-slate-600 shadow-lg";

    if (winningLine.includes(idx)) {
      return `${baseStyle} bg-emerald-500 hover:bg-emerald-400 border-emerald-400 animate-pulse`;
    }

    if (gameOver) {
      return `${baseStyle} cursor-not-allowed opacity-75`;
    }

    return `${baseStyle} cursor-pointer hover:border-blue-400`;
  };

  const getPlayerColor = (player) => {
    if (player === "X") return "text-blue-400";
    if (player === "O") return "text-red-400";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tic Tac Toe
          </h1>

          {!gameOver && (
            <p className="text-2xl text-slate-300">
              Current Player:{" "}
              <span className={`font-bold ${getPlayerColor(flag ? "X" : "O")}`}>
                {flag ? "X" : "O"}
              </span>
            </p>
          )}

          {gameOver && !isDraw && (
            <div className="space-y-2">
              <p className="text-3xl font-bold text-emerald-400">
                🎉 Game Over! 🎉
              </p>
              <p className="text-2xl text-white">
                Winner:{" "}
                <span className={`font-bold ${getPlayerColor(winner)}`}>
                  {winner}
                </span>
              </p>
            </div>
          )}

          {isDraw && (
            <div className="space-y-2">
              <p className="text-3xl font-bold text-yellow-400">
                🤝 It's a Draw! 🤝
              </p>
              <p className="text-xl text-slate-300">Great game!</p>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {cells.map((val, idx) => (
            <button
              key={idx}
              onClick={() => inputValue(idx)}
              className={getCellStyle(idx)}
            >
              <span className={getPlayerColor(val)}>{val}</span>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="text-center space-y-4">
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            New Game
          </button>

          {/* Game Stats */}
          <div className="flex justify-center space-x-8 text-slate-400 text-sm">
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg">X</div>
              <div>Player 1</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 font-bold text-lg">O</div>
              <div>Player 2</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-slate-500 text-center">
        <p>Click any cell to make your move</p>
      </div>
    </div>
  );
}

export default App;
