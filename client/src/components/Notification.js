import React from 'react'
import Transition  from 'react-transition-group/Transition'

const duration = 1000

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
  opacity: 0,
  padding: '10px'
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exisiting: { opacity: 0 },
  exisited: { opacity: 0}
}

const Notification = ({ in: inProp, notification, color }) =>
  <Transition in={inProp} timeout={duration}>
    {(transitionState) => {
      return (
        <span style={{
          ...defaultStyle,
          ...transitionStyles[transitionState]
        }} className={'msg ' + color}>
          {notification}
        </span>
      )
    }}
  </Transition>

export default Notification
