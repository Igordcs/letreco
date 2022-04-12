import React from 'react';
import styles from '../styles/wordWrapper.module.css'

export const WordLetter = (props) => {
    return (
        <div id={props.id} className={`${styles.letterWrapper}`} >
            {props.char}
        </div>
    )
}