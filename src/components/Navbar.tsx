// import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import SearchBar from './SearchBar/SearchBar'
import { useContext, useState } from 'react'
import { SignupModal } from '@/pages/modals/SignupModal'
import { ContextMain } from '@/context/Context'
import { LoginModal } from '@/pages/modals/LoginModal'
import Profile from '@/pages/modals/Profile'
import { MdLogout } from "react-icons/md";
import { toast } from 'react-toastify'

export const Navbar = () => {
  const [showSignup, setShowSignup] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  // const [signUpState, setSignUpState] = useState(false)
  // const navigate = useNavigate()
  const { userDetail, isLogined, setIsLogined } = useContext(ContextMain)
  console.log('detail', userDetail)
  const toggleShowForm = () => {
    setShowSignup((pre) => !pre)
  }
  const toggleShowNav = () => {
    setShowNav((pre) => !pre)
  }
  const toggleShowProfile = () => {
    setShowProfile((pre) => !pre)
  }

  const toggleShowFormSignIn = () => {
    setShowSignIn((pre) => !pre)
  }
  const logout = (e : any) => {
    localStorage.removeItem("Accesstoken")
    setIsLogined(false)
    toast.success("Đăng xuất thành công nhé <3")
  }
  // const toggleSignState = () => {
  //   setSignUpState((prevState) => !prevState)
  // }

  return (
    <header>
      <div>
        <button
          className="btn-menu"
          // onClick={() => setMenuState((prevState) => !prevState)}
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
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M80 160h352M80 256h352M80 352h352"
            />
          </svg>
        </button>

        <HashLink className="logo-container" to="#headerTop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="main-logo-icon"
          viewBox="0 0 512 512"
        >
          <path
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M360 94.59V296M443.13 212.87L296 360M417.41 360H216M299.13 443.13l-144-144M152 416V216M68.87 299.13l144-144M94.59 152H288M212.87 68.87L360 216"
          />
        </svg>
        <h1 className="logo-text">Asho Dekhi</h1>
      </HashLink>
      </div>

      {/* {isTrue ? ( */}
      
      {/* ) : ( */}
      {/* <Link className="logo-container" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="main-logo-icon"
            viewBox="0 0 512 512"
          >
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M360 94.59V296M443.13 212.87L296 360M417.41 360H216M299.13 443.13l-144-144M152 416V216M68.87 299.13l144-144M94.59 152H288M212.87 68.87L360 216"
            />
          </svg>
          <h1 className="logo-text">Asho Dekhi</h1>
        </Link> */}
      {/* )} */}

      <nav>
        <ul className="nav-items">
          <li>
            <Link
              className="nav-item"
              to="/"
              // style={pageName === 'home' ? selectionTab : {}}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="nav-item"
              to="/showtimes"
              // style={pageName === 'showtimes' ? selectionTab : {}}
            >
              Showtimes
            </Link>
          </li>
          <li>
            <Link
              className="nav-item"
              to="/aboutus"
              // style={pageName === 'aboutUs' ? selectionTab : {}}
            >
              About Us
            </Link>
          </li>
          <li className="relative">
            <SearchBar />
          </li>

          {/* {Object.keys(signedPerson).length !== 0 &&
            signedPerson.person_type === 'Admin' && (
              <li>
                <Link
                  className="nav-item"
                  to="/admin"
                  style={pageName === 'admin' ? selectionTab : {}}
                >
                  Admin
                </Link>
              </li>
            )} */}
        </ul>
      </nav>

      <div className="nav-signup ml-[75%]">
        {/* {Object.keys(signedPerson).length !== 0 && (
          <p className="nav-signed-name">{signedPerson.first_name}</p>
        )} */}
        {isLogined ? (
          <><p className="nav-signed-name text-xl hover:text-gray-400 cursor-pointer" onClick={toggleShowProfile}>Hello : {userDetail?.message?.name}</p><MdLogout  className='text-2xl cursor-pointer ' onClick={logout}/></>

        ) : (
          <><button className="customer-profile-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="profile-icon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32" />
                <path
                  d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="32" />
              </svg>
            </button><div>
                <button className="btn-signup-arrow" onClick={toggleShowNav}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="signup-icon"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="48"
                      d="M112 184l144 144 144-144" />
                  </svg>
                </button>

                {showNav && (
                  <div className="signup-options">
                    {<ul className="signup-buttons">
                      <li>
                        <button className="signup-button" onClick={toggleShowForm}>
                          Sign up
                        </button>
                      </li>
                      <li>
                        <button
                          className="login-button"
                          onClick={toggleShowFormSignIn}
                        >
                          Sign in
                        </button>
                      </li>
                    </ul>}
                  </div>
                )}
              </div></>
        )}
        
     
      </div>

      <div>
        {showSignup && <SignupModal />}

        {showSignIn && <LoginModal />}

        {showProfile && <Profile />}
      </div>
    </header>
  )
}
