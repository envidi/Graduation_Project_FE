import { InsanceToken, InsanceTokenFn, baseAuth } from './baseAuth'

export const signup = (user: any) => {
  return baseAuth.post('/register', user)
}
export const signin = (user: any) => {
  return baseAuth.post('/login', user)
}

export const updateUser = (user: any) => {
  return InsanceToken.patch('/updateUser', user)
}
export const updateClient = (user: any) => {
  if (!user) return {}
  return InsanceToken.patch('/updateClient', user)
}

export const forgotPassword = (email: string) => {
  return InsanceToken.post('/forgotPassword', email)
}

export const resetPassword = (user: any) => {
  return baseAuth.put('/resetPassword', user)
}

export const getDetailUser = () => {
  const instanceToken = InsanceTokenFn('Accesstoken', 'user')
  return instanceToken.get('/userDetail')
}
