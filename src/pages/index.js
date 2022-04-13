import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';

import styles from '../styles/Home.module.css'
import { WordGuess } from '../components/wordGuess';
import { Keyboard } from '../components/keyboard'
import {WORDLIST} from '../words';
import {VALIDGUESSES} from '../validGuesses';
import { GUESSES_CHANCES } from '../constants';

export default function Home() {
  const [words, setWords] = useState(["", "", "", "", "", ""]);
  const [wordColors, setWordColors] = useState(words.map((item, index) => [0, 0, 0, 0, 0]));
  const [disabledKeys, setDisabledKeys] = useState("");
  const [displacedKeys, setDisplacedKeys] = useState("");
  const [rightKeys, setRightKeys] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentStage, setCurrentStage] = useState(0);
  const [streak, setStreak] = useState(0);
  const validKeys = "qwertyuiopasdfghjklzxcvbnm"

  console.log(wordColors[3])

  const resetGame = () => {
    setWords(["", "", "", "", "", ""])
    setWordColors(words.map((item, index) => [0, 0, 0, 0, 0]))
    setDisabledKeys("")
    setRightKeys("")
    setDisplacedKeys("")
    setCurrentStage(0)
    getRandomWord()
  }

  const onDelete = () => {
    const newArray = [...words]
    newArray[currentStage] = ""
    setWords(newArray)
  } 
  
  const onConfirm = () => { 
    const currentWord = words[currentStage]
    if(!VALIDGUESSES.includes(currentWord))
      return toast.error("A palavra não existe no banco de dados")

    if (currentWord.length < 5)
      return toast.warn("A palavra deve conter 5 letras.")

    if (currentWord == currentGuess) {
      let currentStreak = streak
      currentStreak += 1
      setStreak(currentStreak)
      toast.success(`Aeeee, você acertou! SUA SEQUÊNCIA É DE ${currentStreak} ACERTOS`)
      window.localStorage.setItem("@charadinha:Streak", JSON.stringify({currentStreak}))
      return resetGame();
    }

    let disabledKeysTemp = disabledKeys
    let displacedKeysTemp = displacedKeys
    let rightKeysTemp = rightKeys

    currentWord.split("").map((char, index) => {
      const isInWord = currentGuess.includes(char);
      const isInSamePos = char == currentGuess[index]
      const isRight = rightKeysTemp.includes(char)

      if (isInWord && !isInSamePos && !isRight) {
        displacedKeysTemp += char
        const wordColorArray = wordColors
        wordColorArray[currentStage][index] = 1 // displaced
        setWordColors(wordColorArray)
        return;
      }
      
      if (isInWord && isInSamePos) {
        rightKeysTemp += char
        const wordColorArray = wordColors
        wordColorArray[currentStage][index] = 2 // exactPos
        setWordColors(wordColorArray)
        return;
      }
      
      if (!isInWord || isInWord && !isInSamePos && isRight) {
        disabledKeysTemp += char
        const wordColorArray = wordColors
        wordColorArray[currentStage][index] = 3 // wrong
        setWordColors(wordColorArray)
        return;
      }
      
    })
    
    setDisplacedKeys(displacedKeysTemp)
    setRightKeys(rightKeysTemp)
    setDisabledKeys(disabledKeysTemp)
    setCurrentStage(currentStage + 1)
  }

  const handleKeyPress = (e) => {
    const char = e.key.toLowerCase()
    const isKeyVerify = validKeys.includes(char)

      if (e.key == 'Backspace')
        return onDelete()

      if (e.key == 'Enter')
        return onConfirm()

      if (!isKeyVerify)
        return

      if (words[currentStage].length == 5)
        return;

      const newArray = [...words]
      newArray[currentStage] = newArray[currentStage] + char
      setWords(newArray)
  }

  const getRandomWord = () => {
    const random = Math.floor(Math.random() * WORDLIST.length)
    setCurrentGuess(WORDLIST[random].normalize("NFD").replace(/[^a-zA-Zs]/g, ""))
  }

  useEffect(() => {
    if(currentStage + 1 > GUESSES_CHANCES){
      toast(`Que pena! A palavra era ${currentGuess}`)
      setStreak(0)
      window.localStorage.setItem("@charadinha:Streak", JSON.stringify({currentStreak: 0}))
      return resetGame();
    }
  }, [currentStage])

  useEffect(() => {

    const getStoredStreak = () => {
      const storedValue = window.localStorage.getItem("@charadinha:Streak")

      if (storedValue) {
        const value = JSON.parse(storedValue)
        setStreak(Number(value.currentStreak))
      }

    }

    getStoredStreak()
    getRandomWord()
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [words[currentStage]])

  console.log(currentGuess)

  return (
    <div className={styles.container}>
      <Head>
        <title>Letreco</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>LETRECO DA GAMBIARRA</h1>
 
        <WordGuess words={words} wordColors={wordColors} />
        
        <Keyboard handleKeyPress={handleKeyPress} disabledKeys={disabledKeys} displacedKeys={displacedKeys} rightKeys={rightKeys}  />

      </main>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
