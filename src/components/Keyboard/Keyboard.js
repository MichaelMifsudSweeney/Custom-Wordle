import React, { useContext, useCallback, useEffect } from 'react'
import Key from '../Key/Key';
import {AppContext} from "../../App"
import { v4 as uuidv4 } from 'uuid';
import './Keyboard.scss'
function Keyboard({newCustomWordleTextInputRef}) {
  const { onEnter, onDelete, onSelectLetter,  disabledLetters} = useContext(AppContext);
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((event) => {
    if(document.activeElement === newCustomWordleTextInputRef.current) return
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      })
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      })
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      })
    }
  }) 

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)
    
    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }
  
  }, [handleKeyboard])

  return (
    <div className='keyboard' onKeyDown={handleKeyboard}>
       <div className='keyboard__row'>
          {keys1.map((key) => {
            return <Key keyVal ={key} key={uuidv4()} disabled = {disabledLetters.includes(key)}/>;
          })}
       </div>
       <div className='keyboard__row keyboard__row--middle'>
          {keys2.map((key) => {
            return <Key keyVal ={key} key={uuidv4()} disabled = {disabledLetters.includes(key)}/>;
          })}  
       </div>
       <div className='keyboard__row'>
          <Key keyVal={"ENTER" } bigKey />
          {keys3.map((key) => {
            return <Key keyVal ={key} key={uuidv4()} disabled = {disabledLetters.includes(key)}/>;
          })}
          <Key keyVal={"DELETE" } bigKey />
       </div>
       
    </div>
  )
}

export default Keyboard;