import React from 'react'
import styles from '../styles/wordWrapper.module.css'
import { WordLetter } from './wordLetter'

export const WordWrapper = (props) => {
    const wordSplited = props.word.split("")

    return (
        <div className={`${styles.wordWrapper}`}>
            {[...Array(props.caracteres)].map((v, i) => <WordLetter key={i} char={wordSplited[i]} letterColor={props.wordColors[i]} />)}
        </div>
    )
}