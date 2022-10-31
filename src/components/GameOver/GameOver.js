import React, { useContext } from 'react'
import { AppContext } from '../../App'
import CreateGameConfirmation from '../CreateGameConfirmation/CreateGameConfirmation'
import './GameOver.scss'
function GameOver({ newCustomWordleTextInputRef, notify }) {

  const { gameOver, setGameOver, currAttempt, correctWord } = useContext(AppContext)

  return (
    <div className='gameOver'>
      <div className="gameOver__content">
        <h3 className="gameOver__subhead">{gameOver.guessedWord ? "You are CORRECT! 🎉" : "You Failed!"} </h3>
        <div className="gameOver__stats">
          <p> Correct Word: <b> {correctWord}</b></p>
          {gameOver.guessedWord && (<p>You Guessed in <b> {currAttempt.attempt} {`Attempt${currAttempt.attempt === 1 ?"" : "s"}`}</b></p>)}
        </div>
        <CreateGameConfirmation newCustomWordleTextInputRef={newCustomWordleTextInputRef} notify={notify} />
      </div>
    </div>
  )
}

export default GameOver;