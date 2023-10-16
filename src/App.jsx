import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Die from './Die.jsx'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {

  const [diceState, setDiceState] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [result, setResult] = useState({ rolls: 0 })

  function allNewDice() {
    let diceArray = [];
    for (let i = 0; i < 10; i++) {
      let randomNum = (Math.floor(Math.random() * 6) + 1)
      diceArray.push({ value: randomNum, isHeld: false, key: nanoid() })
    }
    return diceArray
  }
  function holdDice(id) {
    // console.log(id)
    let newDice = diceState.map(prevDice => {
      return id === prevDice.key ? { ...prevDice, isHeld: !prevDice.isHeld } : { ...prevDice }
    })
    setDiceState(newDice)
  }

  const dieRender = diceState.map(prevValue => <Die isHeld={prevValue.isHeld}
    key={prevValue.key}
    value={prevValue.value}
    idNo={() => holdDice(prevValue.key)} >
  </Die>)

  function rollDice() {
    if (tenzies) {
      setDiceState(allNewDice())
      setTenzies(false)     
    }

    else {
      setDiceState(olddice => olddice.map(dice => {
        return dice.isHeld ? { ...dice } : { value: (Math.floor(Math.random() * 6) + 1), isHeld: false, key: nanoid() }
      }))
    }

    let noOfRolls = result.rolls
    noOfRolls++;
    setResult(prevResult => {
      return { ...prevResult, rolls: noOfRolls }
    })

  }

  useEffect(() => {
    const allHeld = diceState.every(die => die.isHeld);
    const winValue = diceState[0].value;
    const winCheck = diceState.every(die => die.value === winValue);
    if (allHeld && winCheck) {
      alert(`You've Won!! Your Score is ${result.rolls}`) ;
       setTenzies(true);
       setResult({rolls: 0})
    }
  }, [diceState])


  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='Die-Components'>
        {dieRender}
      </div>
      <div><button onClick={rollDice} className='rollButton'>{tenzies ? "New Game" : "Roll"}</button></div>
    </main>
  )
}

export default App
