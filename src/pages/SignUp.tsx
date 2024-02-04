import { IoCloseSharp } from "react-icons/io5";
const SignUp = () => {
  return (
    <div className='fixed w-[28.8rem] bg-[#fff] top-[7.6rem] left-[50%] transform -translate-x-1/2 p-[2.2rem] rounded-xl z-[2] '>
        <form >
            <div className='flex items-center justify-between mb-5'>
                <h2 className='text-[1.2rem] font-bold text-[#313441]'>Create Into Your ASHO DEKHI Account</h2>
                <button>
              <IoCloseSharp className='text-red-500 text-xl' />
                </button>
            </div>

            <div>
                <div className='flex items-center mb-3'>
                    <div className='mr-[0.5rem]'>
                        <label className='text-[#313441] font-semibold text-sm'>
                             First Name : 
                             <span className="text-red-500"> *</span> </label>
                        <input className=' text-sm block pl-[0.6rem] h-5 w-full p-[1.3rem] rounded-md border border-[#babbc0] outline-none focus:border-red-500  focus:outline-none ' type="text" name="firstname" placeholder='Enter First Name' required />
                    </div>
                    <div>
                        <label className='text-[#313441] font-semibold text-sm' > Last Name :   <span className="text-red-500"> *</span> </label>
                        <input className=' text-sm block pl-[0.6rem]  h-5 p-[1.3rem] w-full rounded-md border border-[#babbc0] outline-none focus:border-red-500 focus:outline-none ' type="text" name="lastname" placeholder='Enter Last Name' required />
                    </div>
                </div>

                <div className='mb-3'>
                    <label className='text-[#313441] font-semibold text-sm'>
                    Phone Number(Must contain 11 digits) : 
                     <span className="text-red-500"> *</span>
                    </label>
                    <input className=' text-sm block pl-[0.6rem]  w-full  h-5 p-[1.3rem] rounded-md border border-[#babbc0] outline-none focus:border-red-500 focus:outline-none ' type="number" placeholder='Enter Your Phone' required />
                </div>

                <div className='mb-3'>
                    <label className='text-[#313441] font-semibold text-sm'>
                    Email : 
                    <span className="text-red-500"> *</span>
                    </label>
                    <input className=' text-sm block pl-[0.6rem]  w-full  h-5 p-[1.3rem] rounded-md border border-[#babbc0] outline-none focus:border-red-500 focus:outline-none ' type="email" placeholder='Enter Your Email' required />
                </div>  

                <div className='mb-3'>
                    <label className='text-[#313441] font-semibold text-sm' >
                    Password(Must contain at least 8 digits) : 
                    <span className="text-red-500"> *</span>
                    </label>
                    <input className=' text-sm block pl-[0.6rem]  w-full  h-5 p-[1.3rem] rounded-md border border-[#babbc0] outline-none focus:border-red-500 focus:outline-none ' type="password" placeholder='Enter Your Password' required />
                </div>

                <div className='mt-[2.7rem] bg-[#eb3656] h-[2.7rem] outline-none rounded-full text-[#e6e6e6] flex items-center justify-center font-bold text-sm mb-[1rem]'>
                <button className=''>Sign up</button>


                </div>
            </div>
        </form>
    </div>
  )
}

export default SignUp