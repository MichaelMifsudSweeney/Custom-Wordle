import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext , useEffect, useState, useCallback} from 'react';
import { boardDefault, generateWordSet } from './components/Words';
import GameOver from './components/GameOver';
import firebase from './components/Firebase';


export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const  [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetter] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})  
  const ref = firebase.firestore().collection("main").doc("hU8SS325pOLENz9hnNsv");
  const [correctWord, setWordForServer] = useState(() => "");
 
  const getServerWord = useCallback(() => {
  
    ref.get().then((doc) => {
      if (doc.exists) {
        setWordForServer(doc.data().fieldCheck.toUpperCase())
          console.log("Document data:", doc.data().fieldCheck);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
  }, [ref])
 

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
    })
    

    
  }, []) 

  useEffect(() => {
    
    getServerWord()
    
  }, [getServerWord]) 

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
        const newBoard = [...board]
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
        setBoard(newBoard)
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
            const newBoard = [...board];
            newBoard[currAttempt.attempt][currAttempt.letterPos-1] = ""
            setBoard(newBoard);
            setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos-1})
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let  currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    console.log(currWord)
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0} )
    } else {
      alert("Word Not Found")
    }

    if (currWord === correctWord) {
      setGameOver({gameOver: true, guessedWord: true})
      return;
    }

    if (currAttempt.attempt === 5) {
     setGameOver({gameOver: true, guessedWord: false})
    }

            
  }
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
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
        gameOver}}>
        <div className='game'>
        <Board />
        {gameOver.gameOver ? <GameOver />  : < Keyboard />}
        </div>
      </AppContext.Provider>

    </div>
  );
}

export default App;
