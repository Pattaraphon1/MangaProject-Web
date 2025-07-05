import React from 'react'
import HomeIcon from '../../icons'

function Login() {
  return (
        <div className='flex w-full h-full justify-center bg-[#e8caa0] min-h-screen'>
          <div>
          {/* Card */}
          <div className='flex flex-col border w-64 p-4 m-6 rounded-md bg-[#E1AB5E]'>

            <h1 className='flex font-bold text-center my-6 justify-center gap-3.5'>Login <HomeIcon className="w-5"/></h1>

            {/* Form */}
            <form className="flex flex-col gap-5">
              <div className='flex flex-col'>
                <input className='border w-full rounded-md bg-[#DAB98A]  p-1 px-4'
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className='flex flex-col gap-4'>
                <input className='border w-full rounded-md bg-[#DAB98A] p-1 px-4'
                  placeholder="Username"
                  type="text"
                />
              </div>
              <div className='flex flex-col gap-4'>
                <input className='border w-full rounded-md bg-[#DAB98A] p-1 px-4'
                  placeholder="Password"
                  type="text"
                />
              </div>

              <div className='flex justify-center mt-4'>
                <button className='bg-white text-black rounded-md
    hover:bg-gray-300 hover:scale-105 hover:cursor-pointer hover:duration-300 px-5 py-1'>Login</button>

              </div>
            </form>
          </div>
          </div>
        </div>
      )
    }
export default Login