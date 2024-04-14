import { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
interface MobileNav {
  menuState: boolean
  menuStyle: CSSProperties
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  setMenuState: (state: any) => void
}

const MobileNav = ({ menuState, menuStyle, setMenuState }: MobileNav) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="mobile-nav-menu z-50" style={menuState ? menuStyle : {}}>
        <button
          className="btn-menu-close"
          onClick={() => setMenuState((state: boolean) => !state)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="menu-icon"
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

        <ul className="mobile-nav-items">
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev: boolean) => !prev)
                navigate('/')
              }}
            >
              Trang chủ
            </button>
          </li>
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev: boolean) => !prev)
                navigate('/showtimes')
              }}
            >
              Lịch chiếu 
            </button>
          </li>
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev: boolean) => !prev)
                navigate('/aboutus')
              }}
            >
              Về chúng tôi
            </button>
          </li>
          {/* {Object.keys(signedPerson).length !== 0 &&
            signedPerson.person_type === 'Admin' && (
              <li className="mobile-nav-list-item">
                <button
                  className="mobile-nav-item"
                  onClick={() => {
                    setMenuState((prev: any) => !prev)
                    navigate('/admin')
                  }}
                >
                  Admin
                </button>
              </li>
            )} */}

          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev: boolean) => !prev)
              }}
            >
             Đăng nhập 
            </button>
          </li>
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev: boolean) => !prev)
              }}
            >
              Đăng ký 
            </button>
          </li>

          {/* {Object.keys(signedPerson).length > 0 && (
            <li className="mobile-nav-list-item">
              <button
                className="mobile-nav-item"
                onClick={() => {
                  handlelogout()
                  setMenuState((prev: any) => !prev)
                }}
              >
                Log out
              </button>
            </li>
          )} */}
        </ul>

        {/* {Object.keys(signedPerson).length !== 0 && (
          <p className="mobile-nav-name">
            Signed in as ({signedPerson.first_name})
          </p>
        )} */}
      </div>
    </>
  )
}
export default MobileNav
