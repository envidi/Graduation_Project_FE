import { checkPaymentMBBank } from '@/api/payment'
import { DialogClose } from '@/components/ui/dialog'
import { TicketType } from '@/store/ticket'
import { formatVND } from '@/utils'
import { useLocalStorage } from '@uidotdev/usehooks'
import { Loader2, MoveLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function ModalPayMentMB() {
  const [isLoadingPayment, setIsLoadingPayment] = useState(true)
  const my_bank = { BANK_ID: 'MB', ACCOUNT_NUMBER: 9830908070605 }
  const [ticket] = useLocalStorage<TicketType>('ticket')
  const QR = `https://img.vietqr.io/image/${my_bank.BANK_ID}-${my_bank.ACCOUNT_NUMBER}-compact2.png?amount=${ticket.total}&addInfo=${ticket.name_movie}&accountName=envidi`

  useEffect(() => {
    let count = 0
    let idInterval: NodeJS.Timeout

    const checkPayment = async () => {
      try {
        const result = await checkPaymentMBBank(ticket.total)
        if (result) {
          toast.success('Pay successfully !', {
            position: 'top-right'
          })
          clearInterval(idInterval)
        } else {
          count++
          if (count > 10) {
            clearInterval(idInterval)
          }
        }
      } catch (error) {
        toast.error('Pay failed !', {
          position: 'top-right'
        })
        // Xử lý lỗi nếu cần thiết
      } finally {
        setIsLoadingPayment(false)
      }
    }
    const idTimeOut = setTimeout(() => {
      idInterval = setInterval(checkPayment, 4000)
    }, 8000)

    return () => {
      clearTimeout(idTimeOut)
      clearInterval(idInterval)
    }
  }, [ticket.total, setIsLoadingPayment])

  return (
    <div className="contain-overlay-product-detail">
      <div className="contain-product-detail">
        <div className="sideBar_pay">
          <div className="timePay blockPayment">
            <span>Đơn hàng hết hạn sau</span>
            <span className="timeRestPay">10:00</span>
          </div>
          <div className="timePay blockPayment">
            <span>
              <i className="fa-solid fa-shop"></i> Nhà cung cấp
            </span>
            <span>Shop</span>
          </div>
          <div className="timePay blockPayment">
            <span>
              <i className="fa-solid fa-money-bill"></i> Số tiền
            </span>
            <span>{formatVND(ticket?.total)}</span>
          </div>
          <div className="timePay blockPayment">
            <span>
              <i className="fa-solid fa-circle-info"></i> Thông tin
            </span>
            <span>Thanh toán bằng MBbank</span>
            <span>STK : 123456789</span>
          </div>
          <div className="timePay blockPayment">
            <span>
              <i className="fa-solid fa-id-card-clip"></i> Mã đơn hàng
            </span>
            <span> 123</span>
          </div>
          <div className="timePay blockPayment">
            <DialogClose asChild>
              <button className="button-back-pay bg-white text-black text-2xl flex justify-center items-center gap-2">
                <MoveLeft size={16} className="text-black" /> Quay lại
              </button>
            </DialogClose>
          </div>
        </div>
        <div className="contain_QR_code">
          <div className="w-100 d-f jf-e">
            <div className="close_show">
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div className="contain_logo_MBbank">
            <div className="logo_MBbank">
              <img
                width="120px"
                src="https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png"
                alt=""
              />
            </div>
            <div className="logo_MBbank">
              <img
                width="120px"
                src="https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png"
                alt=""
              />
            </div>
          </div>
          <div className="line_pay"></div>
          <div className="qr_code w-100 flex items-center flex-col">
            <h4 className="m-t-b10 my-5 text-black font-bold text-2xl">
              Quét mã để thanh toán
            </h4>
            <div className="img_QR_code">
              <img src={QR} width="230px" alt="qr code" />
            </div>
            <p className="text-black text-2xl my-3 mt-4">
              Sử dụng app MBBank để quét mã
            </p>
            <div>
              <span className="loading-pay ">
                <i className="fa-solid fa-spinner loading-pay-icon loading-pay-icon-ani"></i>
              </span>
              <span className="processing-pay text-black text-2xl flex">
                Đang chờ quét mã{' '}
                {isLoadingPayment ? (
                  <Loader2 className="animate-spin ms-2" size={16} />
                ) : (
                  ''
                )}
              </span>
            </div>
          </div>
          <div className="notePay text-black text-2xl">
            * Sau khi chuyển khoản hãy chờ để ngân hàng xác nhận
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalPayMentMB
