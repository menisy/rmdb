import axios from 'axios'

const authHeaders = {
  'access-token': localStorage.getItem('access-token'),
  'client': localStorage.getItem('client'),
  'uid': localStorage.getItem('uid')
}

const updateAuthHeaders = () => {
  axios.defaults.headers.common = authHeaders
  axios.defaults.headers.post = authHeaders
}

export default updateAuthHeaders
