import axios from 'axios'
const token = localStorage.getItem('Accesstoken')
export const baseAuth = axios.create({
  baseURL: 'http://localhost:8080/api/user'
})

export const InsanceToken = axios.create({
  baseURL: 'http://localhost:8080/api/user',

  headers: { Authorization: `Bearer ${token}` }
})
export const InsanceTokenFn = () => {
  const accessToken = localStorage.getItem('Accesstoken')
  const InsanceTokenAccess = axios.create({
    baseURL: 'http://localhost:8080/api/user',

    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return InsanceTokenAccess
}
