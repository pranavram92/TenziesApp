import React from 'react'
import './index.css'

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
}
  return (
    <div className="die" style = {styles} onClick={props.idNo}>
      <h2 className='Die-Num'>{props.value}</h2>
    </div>
  )
}