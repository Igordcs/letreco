import React from 'react'
import styles from '../styles/wordWrapper.module.css'
import { WordLetter } from './wordLetter'

export const WordWrapper = (props) => {
    return (
        <div className={`${styles.wordWrapper}`}>
            {[...Array(props.length)].map((v, i) => <WordLetter char={props.word[i]} id={`${props.word}${props.word[i]}${i}`} />)}
        </div>
    )
}