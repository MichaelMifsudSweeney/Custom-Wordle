import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import GeneratedLink from '../GeneratedLink/GeneratedLink';
import { useState } from 'react';
import { db } from '../../firebase-config'
import { doc, setDoc } from 'firebase/firestore';
import CopyIcon from '../../assets/content_copy_FILL0_wght400_GRAD0_opsz40.svg';
import './CreateGame.scss'
import { generateWordSet } from '../Words/Words';
function CreateGame({ newCustomWordleTextInputRef, notify }) {
    const [newWordle, setNewWordle] = useState("")
    const [lastGeneratedWordleLink, setlastGeneratedWordleLink] = useState("")
    const [submittedWordleWord, setSubmittedWordleWord] = useState("")
    const [newWordleErrorState, setNewWordleErrorState] = useState(false)
    const submitNewWordle = async () => {

        if(newWordle.length !== 5) {
            setNewWordleErrorState(true)
            return
        } else {
            setNewWordleErrorState(false)
        }

        let wordleId = uuidv4()
        await setDoc(doc(db, "main", wordleId), {
            word: newWordle.toUpperCase()
        });
        setSubmittedWordleWord(newWordle)
        setlastGeneratedWordleLink(process.env.REACT_APP_SITE_URL + wordleId)
        
    }
//hello
    const copyHandler = () => {
        navigator.clipboard.writeText(lastGeneratedWordleLink)
        notify()
    }

    return (
        <>
            <div className="create-game-section">
                <div className="create-game-section__container">
                <h3 className='create-game-section__subhead'>Send a New Wordle</h3>
                {newWordleErrorState ? <p className='create-game-section__error-text'>must be 5 letters</p> : null}
                <input type="text" className='create-game-section__text-field' placeholder='New Wordle' value={newWordle} onChange={e => setNewWordle(e.target.value)} ref={newCustomWordleTextInputRef} />
                <button className={`create-game-section__create-wordle-button ${submittedWordleWord === newWordle && lastGeneratedWordleLink.length !== 0 ? "create-game-section__create-wordle-button--disabled" : ""}`} onClick={submitNewWordle}>{submittedWordleWord === newWordle && lastGeneratedWordleLink.length !== 0 ? "Created ✅" : "Create"}</button>
                {lastGeneratedWordleLink.length === 0 ? null : <button className='create-game-section__copy-link-button' onClick={copyHandler}>Copy Link to Clipboard</button>}
                </div>
            </div>
        </>

    )
}

export default CreateGame