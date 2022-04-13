import { WordWrapper } from "./wordWrapper"
import styleWord from '../styles/wordWrapper.module.css'
import { GUESSES_CHANCES, WORD_CARACTERES } from "../constants"

export const WordGuess = (props) => {
    const chances = GUESSES_CHANCES
    
    return (
        <div className={styleWord.wordGuess}>
            {[...Array(chances)].map((x, i) =>
                <WordWrapper caracteres={WORD_CARACTERES} word={props.words[i]} wordColors={props.wordColors[i]} />
            )}
        </div> 
    )
}