import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import GeneratedLink from '../GeneratedLink/GeneratedLink';
import { useState } from 'react';
import { db } from '../../firebase-config'
import { doc, setDoc } from 'firebase/firestore';
import CopyIcon from '../../assets/content_copy_FILL0_wght400_GRAD0_opsz40.svg';
function CreateGame({ newCustomWordleTextInputRef, notify }) {
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
            <div>CreateGame</div>
            <p>Hey there! Create a custom wordle and send it to your friends!</p>
            <img src={CopyIcon} alt="Copy Icon" onClick={copyHandler} />
            <input type="text" value={newWordle} onChange={e => setNewWordle(e.target.value)} ref={newCustomWordleTextInputRef} />
            <button onClick={submitNewWordle}>create new wordle</button>
            {lastGeneratedWordleLink === "localhost:3000/" ? null : <GeneratedLink lastGeneratedWordleLink={lastGeneratedWordleLink} />}
        </>

    )
}

export default CreateGame