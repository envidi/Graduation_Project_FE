import { createPayment, createPaymentMomo } from '@/api/payment'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { PAYMENT } from '@/utils/constant'
export interface MutatePaymentType {
  amount: number
  language: string
  bankCode: string
}
// Hook này xử lý việc thanh toán khi người dùng chọn hình thức thanh toán
function usePaymentMuatation(
  paymentMethodId: number,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void,
  onError?: () => void
) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: MutatePaymentType) => {
      switch (paymentMethodId) {
        case 1:
          // Thanh toán qua ngân hàng VNpay
          return createPayment(data)
        case 2:
          // Thanh toán qua Momo
          return createPaymentMomo(data)
        default:
          return createPayment(data)
      }
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data)

      queryClient.invalidateQueries({
        queryKey: [PAYMENT]
      })
    },
    onError: (err: { response: { data: { message: string } } }) => {
      onError && onError()
      toast.error(
        err?.response?.data?.message || 'Thanh toán không thành công',
        {
          position: 'top-right'
        }
      )
    }
  })
  return { mutate, isPending }
}

export default usePaymentMuatation
