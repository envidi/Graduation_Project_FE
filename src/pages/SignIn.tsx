import { IoCloseSharp } from "react-icons/io5";
const SignIn = () => {
  return (
    <div className="fixed w-full md:w-[28.8rem] max-w-[828px] bg-[#fff] top-[7.6rem] left-[50%] transform -translate-x-1/2 p-[2.2rem] rounded-xl z-[2] ">
    <form>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[1.2rem] font-bold text-[#313441]">
          Log Into Your ASHO DEKHI Account
        </h2>
        <button>
          <IoCloseSharp className="text-red-500 text-xl" />
        </button>
      </div>
  
      <div>
        <div className="mb-3">
          <label className="text-[#313441] font-semibold text-sm">
            Email :<span className="text-red-500"> *</span>
          </label>
          <input
            className="text-sm block pl-[0.6rem] w-full h-5 p-[1.3rem] rounded-md border border-[#babbc0] outline-none focus:border-red-500 focus:outline-none"
            type="email"
            placeholder="Enter Your Email"
            required
          />
        </div>
  
        <div className="mb-3">
          <label className="text-[#313441] font-semibold text-sm">
            Enter Your Password :<span className="text-red-500"> *</span>
          </label>
          <input
            className="text-sm block pl-[0.6rem] w-full h-5 p-[1.3rem] rounded-md border border-[#babbc0] outline-none focus:border-red-500 focus:outline-none"
            type="password"
            placeholder="Enter Your Password"
            required
          />
        </div>
  
        <div className="mt-[2.7rem] bg-[#eb3656] h-[2.7rem] outline-none rounded-full text-[#e6e6e6] flex items-center justify-center font-bold text-sm mb-[1rem]">
          <button className="">Sign In</button>
        </div>
      </div>
    </form>
  </div>
  
  
  );
};

export default SignIn;
