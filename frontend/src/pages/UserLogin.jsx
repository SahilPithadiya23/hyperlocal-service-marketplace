import React from 'react'

const UserLogin = () => {
  return (
    <div className='flex flex-col items-center min-h-screen justify-center bg-gray-100'>
      <div className="bg-white p-8 rounded shadow-md w-full  max-w-xl">
        <h1 className="text-3xl font-bold  w-full text-center">
          Login
        </h1>

        <form>
          
         
          <h3 className="text-lg font-semibold mb-1">
            Email Address
          </h3>
          <input
            type="email"
            placeholder="Enter email"
            className="border p-2 rounded w-full mb-4"
          />
         
          <h3 className="text-lg font-semibold mb-1">
            Password
          </h3>
          <input
            type="password"
            placeholder="Enter password"
            className="border p-2 rounded w-full mb-6"
          />
          

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 transition"
          >
            Login
          </button>
          <p className='text-center mt-4'>
        New here?   <a  href='/' className='text-blue-600'>Create new Account</a>
        </p>
        </form>
        
      </div>
    </div>

  )
}

export default UserLogin
