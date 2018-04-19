import TYPES from '../shared/notifications-action-types'

const setNotificationMessages = (msgs) => {
  return {
    type: TYPES.SET_MESSAGES,
    payload: msgs
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

const hideNotification = () => {
  return dispatch => {
    dispatch(setTranstion(false))
    dispatch(setNotificationMessages([]))
    dispatch(setNotificationColor(''))
  }
}


const showNotification = (messages, color) => {
  return dispatch => {
    dispatch(setNotificationMessages(messages))
    dispatch(setNotificationColor(color))
    dispatch(setTranstion(true))
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
