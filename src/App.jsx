import React, { useState } from 'react'
import mainLogo from './assets/logo.svg'
import x from './assets/x.svg'
import o from './assets/o.svg'
import boardBg from './assets/background.svg'
import './App.css'

function App() {

  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState(1)
  const [winner, setWinner] = useState([])
  const [isOver, setIsOver] = useState(false)
  const [winningLine, setWinningLine] = useState({ direction: '', index: 0 })
  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])

  const startGame = () => {
    setIsPlaying(true)
  }

  const rematch = () => {
    setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0])
    setIsOver(false)
    setWinner([])
    setPlayer(1)
  }

  function play(index) {
    return () => {
      if (board[index] === 0) {
        const newBoard = board.map((cell, i) => i === index ? player : cell)
        let winner = checkWinner(newBoard)
        if (winner[0] !== 0) {
          setWinner(winner)
          setIsOver(true)
        } else if (!newBoard.includes(0)) {
          setIsOver(true)
        }
        setBoard(newBoard)
        setPlayer(player === 1 ? 2 : 1)
      }
    }
  }

  function checkWinner(board) {
    // Rows
    for (let i = 0; i <= 6; i += 3) {
      if (board[i] !== 0 && board[i] === board[i + 1] && board[i] === board[i + 2]) {
        setWinningLine({ index: i, direction: 'row' });
        return [board[i], i, 'row']
      }
    }

    // Columns
    for (let i = 0; i <= 2; ++i) {
      if (board[i] !== 0 && board[i] === board[i + 3] && board[i] === board[i + 6]) {
        setWinningLine({ index: i, direction: 'column' });
        return [board[i], i, 'column']
      }
    }

    // Diagonals
    if (board[0] !== 0 && board[0] === board[4] && board[0] === board[8]) {
      setWinningLine({ index: i, direction: 'diagonal' });
      return [board[0], 0, 'diagonal']
    }
    if (board[2] !== 0 && board[2] === board[4] && board[2] === board[6]) {
      setWinningLine({ index: i, direction: 'diagonal' });
      return [board[2], 2, 'diagonal']
    }

    // No winner
    return [0, 0, '']
  }

  return (
    <>
      {!isPlaying && (
        <>
          <div>
            <img src={mainLogo} alt="Logo" className="logo" />
          </div>
          <h1 className="heading">Tic Tac Toe</h1>
          <button className="start-button" onClick={startGame} >Click To Play!</button>
        </>
      )}
      {isPlaying && (
        <>
          <a href="/" className="landing-page-button">
            <img src={mainLogo} alt="Logo" />
            <p>Tic Tac Toe</p>
          </a>
          {!isOver && (
            <>
              <div className="game">
                <div className="game-board-background">
                  <div className="game-board">
                    {board.map((cell, index) => (
                      <button className="cell" key={index} onClick={play(index)}>
                        {cell === 1 && <img src={x} alt="X" />}
                        {cell === 2 && <img src={o} alt="O" />}
                      </button>
                    ))}
                  </div>
                  <img src={boardBg} alt="Background" className="game-board-background-img" />
                </div>
              </div>
            </>
          )}
          {isOver && (
            <>
              <div className="game">
                {winningLine.direction === 'row' && (
                  <div className={`winning-line row-${winningLine.index}`}>{""}</div>
                )}
                {winningLine.direction === 'column' && (
                  <div className={`winning-line column-${winningLine.index}`}>{""}</div>
                )}
                {winningLine.direction === 'diagonal' && (
                  <div className={`winning-line diagonal-${winningLine.index}`}>{""}</div>
                )}
                <div className="game-board-background">
                  <div className="game-board">
                    {board.map((cell, index) => (
                      <div className="cell" key={index}>
                        {cell === 1 && <img src={x} alt="X" />}
                        {cell === 2 && <img src={o} alt="O" />}
                      </div>
                    ))}
                  </div>
                  <img src={boardBg} alt="Background" className="game-board-background-img" />
                </div>
                <p className="end-message">
                  {winner.length === 0 && 'Draw!'}
                  {winner[0] === 1 && 'X Wins!'}
                  {winner[0] === 2 && 'O Wins!'}
                </p>
                <button className="rematch-button" onClick={rematch}>Rematch</button>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default App
