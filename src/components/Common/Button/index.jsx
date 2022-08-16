import React from 'react'
import './Button.scss'

const Button = ({type,textBtn,onClick}) => {
  return (
    <div className='butn'>
        <button type={type} className="brk-btn" onClick={onClick}>
            {textBtn}
        </button>
    </div>
  )
}

export default Button;
