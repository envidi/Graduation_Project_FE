import { MouseEventHandler, useContext, useState } from 'react'
import BarLoader from 'react-spinners/BarLoader'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import ForgotPassword from './FogotPassword'
import { ContextAuth, ContextMain } from '@/context/Context'
import { SIGN_IN, SIGN_IN_GOOGLE } from '@/utils/constant'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import useMutationSign, { ErrorMutation, MutationSign } from '@/hooks/useSignIn'
export interface FormValues {
  email: string
  name?: string | undefined
  password: string | undefined
  avatar?: string | undefined
}
interface IJwtPayload extends JwtPayload {
  email: string
  name: string
  picture: string
}

export const LoginModal = () => {
  const [loading] = useState(false)
  const [passViewState, setPassViewState] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const { setIsLogined } = useContext<ContextAuth>(ContextMain)
  const togglePassState: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setPassViewState((prevState) => !prevState)
  }
  const toggoleShowForgot = () => {
    setShowForgotPassword(true)
  }

  const onSuccessSign = (response: MutationSign) => {
    setIsLogined(true)
    const { Accesstoken } = response.data
    localStorage.setItem('Accesstoken', Accesstoken)
    toast.success('Đăng nhập thành công')
  }
  const onErrorSign = (err: ErrorMutation) => {
    toast.error(err?.response?.data?.message)
  }
  const { mutateAsync: mutateSign } = useMutationSign(
    SIGN_IN,
    onSuccessSign,
    onErrorSign
  )
  const { mutate } = useMutationSign(SIGN_IN_GOOGLE, onSuccessSign, onErrorSign)

  const formikValidate = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {}

      if (!values.email) {
        errors.email = 'Yêu cầu email'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Chưa nhập địa chỉ email'
      }
      if (!values.password) {
        errors.password = 'Bắt buộc phải nhập mật khẩu '
      } else if (values.password.length < 6) {
        errors.password = 'Mật khẩu  phải lớn hơn 8 ký tự'
      }

      return errors
    },
    onSubmit: async (values) => {
      try {
        await mutateSign(values)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error)
      }
    }
  })

  const handleLoginState = () => {
    setShowForm((prevShowForm) => !prevShowForm) // Cập nhật trạng thái để ẩn/hiển thị form
  }
  const handleLoginGoogleSucess = (credentialResponse: CredentialResponse) => {
    const credential = jwtDecode<IJwtPayload>(credentialResponse.credential!)

    mutate({
      email: credential.email,
      name: credential.name,
      password: credential.sub,
      avatar: credential.picture
    })
  }
  const handleLoginGoogleError = () => {
    toast.error('Đăng nhập Google thất bại!')
  }

  return (
    <div>
      {showForm && !showForgotPassword && (
        <div className="login-form overlay">
          <form onSubmit={formikValidate.handleSubmit}>
            <div className="signup-form-heading">
              <h2 className="signup-form-heading-text">
              Đăng nhập vào tài khoản DREAM CINEMA của bạn
              </h2>
              <button
                type="button"
                className="btn-form-exit"
                onClick={handleLoginState}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="form-icon"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M368 368L144 144M368 144L144 368"
                  />
                </svg>
              </button>
            </div>

            {formikValidate.touched.email && formikValidate.errors.email && (
              <div className="text-red-500 text-xl font-bold">
                {formikValidate.errors.email}
              </div>
            )}
            <div className="signup-form-body">
              <div className="signup-form-category">
                <label>
                  Email: <span>*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={formikValidate.values.email}
                  onChange={formikValidate.handleChange}
                  onBlur={formikValidate.handleBlur}
                  placeholder="Nhập  Email"
                />
              </div>

              {formikValidate.touched.password &&
                formikValidate.errors.password && (
                  <div className="text-red-500">
                    {formikValidate.errors.password}
                  </div>
                )}
              <div className="signup-form-category">
                <label>
                Nhập mật khẩu của bạn: <span>*</span>
                </label>
                <div className="input-password">
                  <input
                    name="password"
                    value={formikValidate.values.password}
                    onChange={formikValidate.handleChange}
                    onBlur={formikValidate.handleBlur}
                    type={passViewState ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu"
                  />
                  <button
                    type="button"
                    className="pass-icon-btn"
                    onClick={togglePassState}
                  >
                    {passViewState ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="pass-icon"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        />
                        <circle
                          cx="256"
                          cy="256"
                          r="80"
                          fill="none"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeWidth="32"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="pass-icon"
                        viewBox="0 0 512 512"
                      >
                        <path d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM255.66 384c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zM490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z" />
                        <path d="M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zM165.78 233.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-center w-full">
                <GoogleLogin
                  onSuccess={handleLoginGoogleSucess}
                  onError={handleLoginGoogleError}
                />
              </div>
              <div className="flex justify-between">
                <a
                  type="button"
                  className="cursor-s-resize"
                  onClick={toggoleShowForgot}
                >
                  Quên mật khẩu ?
                </a>

                {/* Nhớ mật khẩu  <input type="checkbox"  />  */}
              </div>

              <button type="submit" className="btn-reg bg-[#eb3656]">
                {loading ? <BarLoader color="#e6e6e8" /> : 'Đăng nhập'}
              </button>
            </div>
          </form>
        </div>
      )}

      {showForgotPassword && <ForgotPassword />}
    </div>
  )
}
