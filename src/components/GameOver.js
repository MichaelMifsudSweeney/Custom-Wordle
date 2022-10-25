import React, { useContext } from 'react'
import { AppContext } from '../App'
import CreateGameConfirmation from './CreateGameConfirmation'
import '../App.css';
function GameOver({ newCustomWordleTextInputRef, notify }) {

  const { gameOver, setGameOver, currAttempt, correctWord } = useContext(AppContext)

  return (
    <div className='gameOver'>
      <div className="gameOver__content">
        <h3>{gameOver.guessedWord ? "You Correctly Guessed!" : "You Failed!"} </h3>
        <h1> Correct Word: {correctWord}</h1>
        {gameOver.guessedWord && (<h3>You Guessed in {currAttempt.attempt} attempts</h3>)}
        <CreateGameConfirmation newCustomWordleTextInputRef={newCustomWordleTextInputRef} notify={notify} />
      </div>
    </div>
  )
}

export default GameOver;