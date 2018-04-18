import React from 'react'

const Button = ({title, isActive, onClick = f => f}) => {
  const active = (isActive) ? 'btn-outline-primary' : 'btn-outline-secondary'
  return (
    <div className="nav-item my-xs-1 mb-sm-1">
      <div className={`nav-link btn  ${active}`} onClick={() => onClick()}>
        {title}
      </div>
    </div>
  )
}
export default Button
