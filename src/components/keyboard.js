import React from 'react';
import styles from '../styles/keyboard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faDeleteLeft
} from "@fortawesome/free-solid-svg-icons"

export const Keyboard = (props) => {
    const keyboardPattern = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]

    const checkLetter = (char) => {
        const key = char.toLowerCase()
        const isWrong = props.disabledKeys.includes(key)
        const isDisplaced = props.displacedKeys.includes(key)
        const isRight = props.rightKeys.includes(key)

        if (isWrong && !isDisplaced && !isRight)
            return `${styles.wrong}`
        if (isDisplaced)
            return `${styles.displaced}`
        if (isRight)
            return `${styles.right}`

        return ``
    }

    return (
        <div className={styles.keyBoardWrapper}>
            <div className={styles.keyBoardFunctions}>
                <button onClick={() => props.handleKeyPress({key: "Enter"})}>
                    <FontAwesomeIcon icon={faCheck} size={'2x'} />
                </button>
                <button onClick={() => props.handleKeyPress({key: "Backspace"})}>
                    <FontAwesomeIcon icon={faDeleteLeft} size={'2x'}/>
                </button>
            </div>

            {keyboardPattern.map((item, index) => {
                const caracteres = item.split("");
                return (
                    <div key={`column${index}`}>
                        {caracteres.map(char => <button 
                            key={`button${char}`} 
                            id={`keyBoard${char}`} 
                            className={`${styles.keyBoardButton} ${checkLetter(char)}`}
                            onClick={() => props.handleKeyPress({key: char})}
                            >
                                {char}
                            </button>)}
                    </div>
                )
            })}
        </div>
    )
}