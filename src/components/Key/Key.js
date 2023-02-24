import React, { useContext } from 'react'
import { AppContext } from "../../App"
import './Key.scss'
import backspaceIcon from '../../assets/backspace_FILL0_wght400_GRAD0_opsz48.svg'
function Key({ keyVal, bigKey, disabled }) {
    const { onSelectLetter, onDelete, onEnter, commitedLetters} = useContext(AppContext);



    const selectLetter = () => {
        if (keyVal === "ENTER") {
            onEnter();
        } else if (keyVal === "DELETE") {
            onDelete();
        } else {
            onSelectLetter(keyVal);
        }

    }

    let keyStatus = ''
    

    // console.log(bigKey)
    return (
        <div className={`key ${commitedLetters[keyVal] ? commitedLetters[keyVal] : '' }`} id={bigKey ? "big" : disabled ?  "disabled" : ""} onClick={selectLetter}>
            {keyVal === "DELETE"
                ? <img className='key__backspace-icon' src={backspaceIcon} alt="Backspace Icon" />
                : keyVal
            }
        </div>
    )
}

export default Key