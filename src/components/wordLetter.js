import React from 'react';
import styles from '../styles/wordWrapper.module.css'

export const WordLetter = (props) => {
    
    const checkLetter = () => {
        const letterColor = props.letterColor

        switch(letterColor) {
            case 0:
                return '';
            case 1:
                return `${styles.displaced}`
            case 2:
                return `${styles.right}`
            case 3:
                return `${styles.wrong}`
        }
    }

    return (
        <div id={props.id} className={`${styles.letterWrapper} ${checkLetter()}`} >
            {props.char ? props.char.toUpperCase() : ''}
        </div>
    )
}