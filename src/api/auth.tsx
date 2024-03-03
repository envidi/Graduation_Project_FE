import { InsanceToken, baseAuth } from './baseAuth'

export const signup = (user: any) => {
  return baseAuth.post('/register', user)
}
export const signin = (user: any) => {
  return baseAuth.post('/login', user)
}

export const updateUser = (user: any) => {
  return InsanceToken.put('/updateUser', user)
}

export const forgotPassword = (email: string) => {
  return InsanceToken.post('/forgotPassword', email)
}

export const resetPassword = (user: any) => {
  return baseAuth.put('/resetPassword', user)
}

export const getDetailUser = () => {
  return InsanceToken.get('/userDetail')
}