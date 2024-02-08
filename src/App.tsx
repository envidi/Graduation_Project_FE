import React, { useState, useEffect, Suspense, CSSProperties } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import HomePage from "./pages/Home/HomePage";
import MobileNav from "./components/MobileNav";
import { PageLoader } from "./components/PageLoader";

import "./styles/styles.css";
import "./styles/queries.css";
import SignupModel from "./model/SignupModal";
import LoginModel from "./model/LoginModal";

function App() {
  const [signModalState, setSignModalState] = useState(false);
  const [loginModalState, setLoginModalState] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const [signedPerson, setSignedPerson] = useState(
    JSON.parse(window.localStorage.getItem("signedInPerson") || "{}")
  );

  const location = useLocation();

  const toastPrimaryCategories: ToastOptions<{}> = {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  };

  const menuStyle = {
    opacity: "1",
    pointerEvents: "auto",
    visibility: "visible",
    transform: "translateX(0)",
  };

  useEffect(() => {
    window.localStorage.setItem("signedInPerson", JSON.stringify(signedPerson));
  }, [signedPerson]);

  const handleSignState = () => {
    setSignModalState((prevState) => !prevState);
  };

  const handleLoginState = () => {
    setLoginModalState((prevState) => !prevState);
  };

  const handleSignedPerson = (data: any) => {
    setSignedPerson(data[0]);
    toast.success("Đăng nhập thành công", {
      ...toastPrimaryCategories,
      theme: "colored",
    });
  };

  const handleLogout = () => {
    setSignedPerson({});
  };

  const loginFailedToast = (msg: string) => {
    toast.error(msg, {
      ...toastPrimaryCategories,
      theme: "colored",
    });
  };

  const signupSuccessToast = (msg: string) => {
    toast.success(msg, {
      ...toastPrimaryCategories,
      theme: "colored",
    });
  };

  const signupFailedToast = (msg: string) => {
    toast.error(msg, {
      ...toastPrimaryCategories,
      theme: "colored",
    });
  };

  return (
    <>
      <ToastContainer />
      <Routes key={location.pathname} location={location}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <HomePage
                  signedPerson={signedPerson}
                  handleSignState={handleSignState}
                  handleLoginState={handleLoginState}
                  handlelogout={handleLogout}
                  setMenuState={setMenuState}
              />
            </Suspense>
          }
        />
      </Routes>

      {signModalState && (
        <SignupModel
          handleSignState={handleSignState}
          signupSuccessToast={signupSuccessToast}
          signupFailedToast={signupFailedToast}
        />
      )}
      {loginModalState && (
        <LoginModel
          handleLoginState={handleLoginState}
          handleSignedPerson={handleSignedPerson}
          loginFailedToast={loginFailedToast}
        />
      )}
      <MobileNav
        menuState={menuState}
        menuStyle={menuStyle as CSSProperties}
        setMenuState={setMenuState}
        signedPerson={signedPerson}
        handlelogout={handleLogout}
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
      />
    </>
  );
}

export default App;
