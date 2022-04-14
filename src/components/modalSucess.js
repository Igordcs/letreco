import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '../styles/modalSucess.module.css'
import { WordLetter } from './wordLetter'


export const ModalSucess = (props) => {

    return (
        <div className={`${styles.modalMain} ${props.visible ? styles.visible : ""}`}>
            <button onClick={props.onAbort} className={styles.abortButton}>X</button>
            <FontAwesomeIcon icon={faCheckCircle} size={'5x'} color="#3ff275" />
            <h1>Você acertou a palavra!!</h1>

            <div className={`${styles.histogram}`}>
                {props.wordColors.map((row, index) => <div className={`${styles.histogramCellWrapper}`}>
                    {row.map((letterColor, index) => <WordLetter letterColor={letterColor} />)}
                </div>)}
            </div>
            
            <button onClick={props.onAbort} className={styles.submitButton}>Começar outro jogo</button>
        </div>
    )
}