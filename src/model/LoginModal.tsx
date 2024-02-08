import React, { useState } from "react";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";

interface LoginModalProps {
  handleLoginState: () => void;
  handleSignedPerson: (data: any) => void;
  loginFailedToast: (msg: string) => void;
}

const LoginModel: React.FC<LoginModalProps> = ({
  handleLoginState,
  handleSignedPerson,
  loginFailedToast,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [passViewState, setPassViewState] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const togglePassState = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPassViewState((prevState) => !prevState);
  };

  const handleLoginDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const getLoginData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginDetails.email !== "" && loginDetails.password !== "") {
      setLoading(true);

      try {
        // call the login API
        const response = await axios.post(
          `${import.meta}/login`,
          {
            email: loginDetails.email,
            password: loginDetails.password,
          }
        );

        handleSignedPerson(response.data);
        handleLoginState();
      } catch (err) {
        handleLoginState();
        loginFailedToast(err.response.data.message);
        console.log("Couldn't log in");
      } finally {
        setLoading(false);
        setLoginDetails({
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={(e) => getLoginData(e)}>
        <div className="signup-form-heading">
          <h2 className="signup-form-heading-text">
            Log Into Your ASHO DEKHI Account
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

        <div className="signup-form-body">
          <div className="signup-form-category">
            <label>
              Email: <span>*</span>
            </label>
            <input
              name="email"
              type="email"
              value={loginDetails.email}
              placeholder="Enter Email"
              onChange={(e) => handleLoginDetails(e)}
              required
            />
          </div>

          <div className="signup-form-category">
            <label>
              Enter Your Password: <span>*</span>
            </label>
            <div className="input-password">
              <input
                name="password"
                value={loginDetails.password}
                type={passViewState ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(e) => handleLoginDetails(e)}
                required
              />
              <button
                type="button"
                className="pass-icon-btn"
                onClick={(e) => togglePassState(e)}
              >
                {passViewState ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="pass-icon"
                    viewBox="0 0 512 512"
                  >
                    {/* Your SVG paths here */}
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="pass-icon"
                    viewBox="0 0 512 512"
                  >
                    {/* Your SVG paths here */}
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-reg">
            {loading ? <BarLoader color="#e6e6e8" /> : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginModel;
