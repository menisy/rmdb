import TYPES from '../shared/notifications-action-types'
import errorsToSentences from '../shared/util/errorsToSentences'

const setNotificationMessages = (msgs) => {
  // check whether object or string
  let message
  const sorry = 'Sorry, something went wrong!'
  if(typeof msgs === 'object'){
    try{
      message = errorsToSentences(msgs)
    }
    catch(error){
      message = sorry
    }
  }else{
    // don't display huge errors
    message = (msgs.length > 1000) ? sorry : msgs
  }
  return {
    type: TYPES.SET_MESSAGES,
    payload: message
  }
}

const setNotificationColor = (color) => {
  return {
    type: TYPES.SET_COLOR,
    payload: color
  }
}

const setTranstion = (bool) => {
  return{
    type: TYPES.SET_TRANSITION,
    payload: bool,
  }
}

export const hideNotification = () => {
  return dispatch => {
    dispatch(setTranstion(false))
  }
}


export const showNotification = (messages, color) => {
  return dispatch => {
    dispatch(setNotificationMessages(messages))
    dispatch(setNotificationColor(color))
    dispatch(setTranstion(true))
    setTimeout(()=> {
      dispatch(setTranstion(false))
    }, 5000)
  }
}

const notificationsActions = {
  setNotificationMessages,
  setNotificationColor,
  setTranstion,
  showNotification,
  hideNotification
}

export default notificationsActions
