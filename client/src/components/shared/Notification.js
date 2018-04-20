import React from 'react'
import Transition  from 'react-transition-group/Transition'

const duration = 500

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

const Notification = ({ in: inProp, notification, color, onHide }) =>
  <Transition in={inProp} timeout={duration} unmountOnExit={true}>
    {(transitionState) => {
      return (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[transitionState]
          }}  className={`alert alert-${color} text-center my-0 mx-auto alert-dismissible fade`}
              role="alert">
            <p className="p-3 my-0">{notification}</p>
            <button type="button" onClick={onHide} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
      )
    }}
  </Transition>

export default Notification
