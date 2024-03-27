import axios from 'axios'
const token = localStorage.getItem('Accesstoken')
export const baseAuth = axios.create({
  baseURL: 'http://localhost:8080/api/user'
})

export const InsanceToken = axios.create({
  baseURL: 'http://localhost:8080/api/user',

  headers: { Authorization: `Bearer ${token}` }
})
export const InsanceTokenFn = (token:string, endPoint:string) => {
  const accessToken = localStorage.getItem(token)
  const API_URL = 'http://localhost:8080/api'
  const InsanceTokenAccess = axios.create({
    baseURL: `${API_URL}/${endPoint}`,

    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return InsanceTokenAccess
}

