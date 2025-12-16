import React from 'react'

const ServiceProviderSignUp = () => {
  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100'>
      <div className="bg-white p-8 rounded shadow-md w-full md:mt-4  max-w-xl">
        <h1 className="text-3xl font-bold  w-full text-center">
          Service Provider
        </h1>

        <form>
          <h3 className="text-lg font-semibold mb-1">
            Full Name
          </h3>
          <div className='flex gap-4 mb-4'>
            <input
              type="text"
              placeholder="Enter first name"
              className="border p-2 rounded  w-full"
            />
            <input type="text"
              placeholder='Enter last name'
              className="border p-2 rounded  w-full "
            />
          </div>
          <h3 className='className="text-lg font-semibold mb-1"'>Service Name</h3>
          <input
            type="text"
            placeholder="Enter service name"
            className="border p-2 rounded w-full mb-4"
          />
          <h3 className="text-lg font-semibold mb-1">
            Email Address
          </h3>
          <input
            type="email"
            placeholder="Enter email"
            className="border p-2 rounded w-full mb-4"
          />
          <h3 className="text-lg font-semibold mb-1">
            Phone Number
          </h3>
          <input
            type="tel"
            placeholder="Enter phone number"
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
          <div className='flex gap-4 mb-4 '>
            <div className='w-full'>
              <h3 className='text-lg font-semibold mb-1'>
                 Categories
              </h3>
              <select className="w-full p-2 border rounded-md" >
                <option value="">Select Service Category </option>
                <option value="Home Services">Home Services</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Education">Education</option>
                <option value="Health & Fitness">Health & Fitness</option>
              </select>
            </div>
            <div className='w-full'>
              <h3 className="text-lg font-semibold mb-1">
                Experience
              </h3>
              <input
                type="text"
                placeholder="Experience (in years)"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
          <h3 className='text-lg font-semibold mb-1'>Address</h3>
         <textarea className='border p-2 rounded w-full mb-4' placeholder='Enter your address here'>
         </textarea>
          <div className='flex gap-4 mb-4 '>
            <div className='w-full'>
              <h3 className='text-lg font-semibold mb-1'>
                City
              </h3>
              <input type="text" 
              placeholder='your city' 
              className='border p-2 rounded w-full'
              />
            </div>
            <div className='w-full'>
              <h3 className="text-lg font-semibold mb-1">
                Pincode
              </h3>
              <input
                type="text"
                placeholder="pincode"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
          <p className='text-center mt-4'>
        Already have account?  <a  href='/' className='text-blue-600'>Login here</a>
        </p>
        </form>
        
      </div>
    </div>

  )
}

export default ServiceProviderSignUp
