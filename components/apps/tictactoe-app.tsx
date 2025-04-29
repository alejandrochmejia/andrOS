"use client"

import { useState, useEffect } from "react"
import { RotateCcw, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

type Player = "X" | "O"
type BoardState = (Player | null)[][]
type GameStatus = "playing" | "won" | "draw"

export default function TicTacToeApp() {
  const [board, setBoard] = useState<BoardState>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null)),
  )
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X")
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing")
  const [winner, setWinner] = useState<Player | null>(null)
  const [scores, setScores] = useState<{ X: number; O: number }>({ X: 0, O: 0 })
  const [winningLine, setWinningLine] = useState<number[][] | null>(null)

  // Verificar si hay un ganador o empate después de cada movimiento
  useEffect(() => {
    checkGameStatus()
  }, [board])

  // Verificar el estado del juego
  const checkGameStatus = () => {
    // Verificar filas
    for (let row = 0; row < 3; row++) {
      if (board[row][0] && board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
        handleWin(board[row][0], [
          [row, 0],
          [row, 1],
          [row, 2],
        ])
        return
      }
    }

    // Verificar columnas
    for (let col = 0; col < 3; col++) {
      if (board[0][col] && board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
        handleWin(board[0][col], [
          [0, col],
          [1, col],
          [2, col],
        ])
        return
      }
    }

    // Verificar diagonal principal
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      handleWin(board[0][0], [
        [0, 0],
        [1, 1],
        [2, 2],
      ])
      return
    }

    // Verificar diagonal secundaria
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      handleWin(board[0][2], [
        [0, 2],
        [1, 1],
        [2, 0],
      ])
      return
    }

    // Verificar empate
    const isBoardFull = board.every((row) => row.every((cell) => cell !== null))
    if (isBoardFull) {
      setGameStatus("draw")
      return
    }
  }

  // Manejar victoria
  const handleWin = (player: Player, line: number[][]) => {
    setGameStatus("won")
    setWinner(player)
    setWinningLine(line)
    setScores((prev) => ({ ...prev, [player]: prev[player] + 1 }))
  }

  // Manejar clic en una celda
  const handleCellClick = (row: number, col: number) => {
    // No permitir movimientos si el juego ha terminado o la celda ya está ocupada
    if (gameStatus !== "playing" || board[row][col] !== null) {
      return
    }

    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    // Cambiar al siguiente jugador
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  // Reiniciar el juego
  const resetGame = () => {
    setBoard(
      Array(3)
        .fill(null)
        .map(() => Array(3).fill(null)),
    )
    setGameStatus("playing")
    setWinner(null)
    setWinningLine(null)
  }

  // Reiniciar puntuaciones
  const resetScores = () => {
    setScores({ X: 0, O: 0 })
    resetGame()
  }

  // Verificar si una celda está en la línea ganadora
  const isWinningCell = (row: number, col: number) => {
    if (!winningLine) return false
    return winningLine.some(([r, c]) => r === row && c === col)
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-900 p-4 text-gray-200">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-2xl font-bold">Tres en Raya</h1>
        {gameStatus === "playing" ? (
          <p className="text-lg">
            Turno del jugador:{" "}
            <span className={`font-bold ${currentPlayer === "X" ? "text-blue-400" : "text-red-400"}`}>
              {currentPlayer}
            </span>
          </p>
        ) : gameStatus === "won" ? (
          <p className="text-lg">
            ¡Jugador <span className={`font-bold ${winner === "X" ? "text-blue-400" : "text-red-400"}`}>{winner}</span>{" "}
            ha ganado!
          </p>
        ) : (
          <p className="text-lg">¡Empate!</p>
        )}
      </div>

      <div className="mb-6 grid grid-cols-3 gap-2">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`flex h-20 w-20 items-center justify-center rounded-md border-2 border-gray-700 text-4xl font-bold transition-colors ${
                isWinningCell(rowIndex, colIndex)
                  ? "border-green-500 bg-green-500/20"
                  : "hover:bg-gray-800 active:bg-gray-700"
              } ${cell === "X" ? "text-blue-400" : cell === "O" ? "text-red-400" : ""}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              disabled={gameStatus !== "playing" || cell !== null}
            >
              {cell}
            </button>
          )),
        )}
      </div>

      <div className="mb-6 flex items-center gap-8">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">Jugador X</div>
          <div className="flex items-center gap-1">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="text-xl">{scores.X}</span>
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg font-bold text-red-400">Jugador O</div>
          <div className="flex items-center gap-1">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="text-xl">{scores.O}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={resetGame} className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Nuevo juego
        </Button>
        <Button variant="outline" onClick={resetScores}>
          Reiniciar puntuaciones
        </Button>
      </div>
    </div>
  )
}
