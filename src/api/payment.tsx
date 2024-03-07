import instance from './config'

export interface PaymentApi {
  amount: number
  bankCode: string
  language : string
}

export const createPayment = async (data : PaymentApi) => {
  const result = await instance.post('payment/vnpay/create_payment_url', data)
  return result
}
export const createPaymentMomo = async (data : { amount : number}) => {
  const result = await instance.post('payment/momo/create_payment_url', data)
  return result
}
