import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import SearchBar from './SearchBar/SearchBar';
import { useContext } from 'react';
import { SignupModal } from '@/pages/modals/SignupModal';
import { ContextMain } from '@/context/Context';
import { LoginModal } from '@/pages/modals/LoginModal';
import Profile from '@/pages/modals/Profile';
import { MdLogout } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ModeToggle } from './mode-toggle';

export const Navbar = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { userDetail, isLogined, setIsLogined } = useContext<any>(ContextMain);
  const navRef = useRef(null);

  const toggleShowForm = () => {
    setShowSignup((prev) => !prev);
  };

  const toggleShowNav = () => {
    setShowNav((prev) => !prev);
  };

  const toggleShowNavBar = () => {
    setShowNavBar((prev) => !prev);
  };

  const toggleShowProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const toggleShowFormSignIn = () => {
    setShowSignIn((prev) => !prev);
  };

  const logout = (e: any) => {
    localStorage.removeItem('Accesstoken');
    setIsLogined(false);
    toast.success('Đăng xuất thành công nhé <3');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowNavBar(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header>
      <div>
        <button className="btn-menu" onClick={toggleShowNavBar}>
          {showNavBar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="close-icon"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          ) : (
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
          )}
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

      <nav ref={navRef}>
        <ul className={showNavBar ? 'nav-items show-nav' : 'nav-items'}>
          <li >
            <Link className="nav-item" to="/">
              Home
            </Link>
          </li >
          <li >
            <Link className="nav-item" to="/showtimes">
              Showtimes
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/movies">
              Movies
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/aboutus">
              About Us
            </Link>
          </li>
          <li className="relative">
            <SearchBar />
          </li>
        </ul>
      </nav>

      <div className="nav-signup ml-[75%]">
        <ModeToggle />

        {isLogined ? (
          <>
            <p
              className="nav-signed-name text-xl hover:text-gray-400 cursor-pointer"
              onClick={toggleShowProfile}
            >
              Hello : {userDetail?.message?.name}
            </p>
            <MdLogout className="text-2xl cursor-pointer" onClick={logout} />
          </>
        ) : (
          <>
            <button className="customer-profile-btn">
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
                  strokeWidth="32"
                />
                <path
                  d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                />
              </svg>
            </button>
            <div>
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
                    d="M112 184l144 144 144-144"
                  />
                </svg>
              </button>

              {showNav && (
                <div className="signup-options">
                  <ul className="signup-buttons">
                    <li>
                      <button className="signup-button" onClick={toggleShowForm}>
                        Sign up
                      </button>
                    </li>
                    <li>
                      <button className="login-button" onClick={toggleShowFormSignIn}>
                        Sign in
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div>
        {showSignup && <SignupModal />}

        {showSignIn && <LoginModal />}

        {showProfile && <Profile />}
      </div>
    </header>
  );
};
