import TYPES from '../shared/notifications-action-types'
const initialState = {
  color: 'warning',
  messages: [],
  transition: false
}

const notificationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_MESSAGES:
      return { ...state, messages: payload };
    case TYPES.SET_COLOR:
      return { ...state, color: payload };
    case TYPES.SET_TRANSITION:
      return { ...state, transition: payload };
    default:
      return state;
  }
};

export default notificationsReducer
