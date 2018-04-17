import React, { Component } from 'react'

const Button = ({title, isActive, option, onClick = f => f}) => {
  const active = (isActive) ? 'btn-outline-primary' : 'btn-outline-secondary'
  return (
    <div className="nav-item my-xs-1 mb-sm-1">
      <div className={`nav-link btn  ${active}`} onClick={() => onClick(option)}>
        {title}
      </div>
    </div>
  )
}
export default Button
