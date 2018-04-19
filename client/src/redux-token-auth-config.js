import { generateAuthActions } from 'redux-token-auth'
import { authUrl } from './constants'

const config = {
  authUrl,
  userAttributes: {
    username: 'nickname',
  },
  userRegistrationAttributes: {
    username: 'nickname',
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
