import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, generateWordSet } from './components/Words';
import GameOver from './components/GameOver';
import { db } from './firebase-config'
import { collection, getDoc, doc } from 'firebase/firestore';

export const AppContext = createContext();
console.log(process.env)
function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [correctWord, setCorrectWord] = useState("")
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetter] = useState([]);
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  
  
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
    })
  }, [])

  useEffect(() => {
    const wordId = window.location.pathname
    const cleanedWordId = wordId.substring(1);
    console.log(cleanedWordId)
    const docRef = doc(db, "main", cleanedWordId);
    const getUsers = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let returnedData = docSnap.data();
        setCorrectWord(returnedData.word)
      } else {
        console.log("No such document!");
      }
    }
    getUsers()
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ""
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    console.log(currWord)
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
    } else {
      alert("Word Not Found")
      console.log(wordSet)
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true })
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false })
    }


  }
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
        <input type="text" />
      </nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        onDelete,
        onSelectLetter,
        onEnter,
        correctWord,
        setDisabledLetter,
        disabledLetters,
        setGameOver,
        gameOver
      }}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : < Keyboard />}
        </div>
      </AppContext.Provider>

    </div>
  );
}

export default App;
