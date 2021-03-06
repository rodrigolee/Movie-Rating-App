import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
