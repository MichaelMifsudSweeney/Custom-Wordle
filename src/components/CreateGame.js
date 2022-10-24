import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import GeneratedLink from './GeneratedLink';
import { useState } from 'react';
import { db } from '../firebase-config'
import { doc, setDoc } from 'firebase/firestore';

function CreateGame({newCustomWordleTextInputRef}) {
    const [newWordle, setNewWordle] = useState("")
  const [lastGeneratedWordleLink, setlastGeneratedWordleLink] = useState("localhost:3000/")

    const submitNewWordle = async () => {
        let wordleId = uuidv4()
        await setDoc(doc(db, "main", wordleId), {
          word: newWordle.toUpperCase()
        });
        console.log("end of submitNewWordle")
        setlastGeneratedWordleLink(`localhost:3000/${wordleId}`)
      }

    return (
        <>
            <div>CreateGame</div>
            <input type="text" value={newWordle} onChange={e => setNewWordle(e.target.value)} ref={newCustomWordleTextInputRef} />
            <button onClick={submitNewWordle}>create new wordle</button>
            {lastGeneratedWordleLink === "localhost:3000/" ? null : <GeneratedLink lastGeneratedWordleLink={lastGeneratedWordleLink} />}
        </>

    )
}

export default CreateGame