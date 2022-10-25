import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import GeneratedLink from '../GeneratedLink/GeneratedLink';
import { useState } from 'react';
import { db } from '../../firebase-config'
import { doc, setDoc } from 'firebase/firestore';
function CreateGameConfirmation({ newCustomWordleTextInputRef, notify }) {
    const [newWordle, setNewWordle] = useState("")
    const [lastGeneratedWordleLink, setlastGeneratedWordleLink] = useState("localhost:3000/")

    const submitNewWordle = async () => {
        let wordleId = uuidv4()
        await setDoc(doc(db, "main", wordleId), {
            word: newWordle.toUpperCase()
        });
        setlastGeneratedWordleLink(`localhost:3000/${wordleId}`)

    }

    const copyHandler = () => {
        navigator.clipboard.writeText(lastGeneratedWordleLink)
        notify()
    }

    return (
        <>
            <div className="create-game-section">
                <h3>Send a new Wordle</h3>
                
                <input type="text" className='create-game-section__text-field' value={newWordle} onChange={e => setNewWordle(e.target.value)} ref={newCustomWordleTextInputRef} />
                <button className='create-game-section__create-wordle-button' onClick={submitNewWordle}>create new wordle</button>
                {/* {lastGeneratedWordleLink === "localhost:3000/" ? null : <GeneratedLink lastGeneratedWordleLink={lastGeneratedWordleLink} />} */}
                
                <button onClick={copyHandler}>Copy Link to New Wordle</button>
            </div>
        </>

    )
}

export default CreateGameConfirmation