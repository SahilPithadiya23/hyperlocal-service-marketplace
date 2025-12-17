import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';

const UserSignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {user,setUser} = useContext(UserDataContext)

  // 📍 Location
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)

  // 📍 Get user location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude)
        setLong(pos.coords.longitude)
        alert("Location captured successfully")
      },
      () => alert("Location permission denied")
    )
  }   

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!lat || !long) {
      alert("Location not available")
      return
    }

    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password,
      address,
      city,
      pincode,
      lat,
      long
    }
    try {
    const response = await axios.post(
      'http://localhost:3000/api/auth/user/register',
      newUser,
      { withCredentials: true }
    )

    if (response.status === 201) {
      setUser(response.data.user)
      navigate('/')
    }
  } catch (err) {
    setError(err.response.data.message);
  }
    // Reset form
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setPassword('')
    setAddress('')
    setCity('')
    setPincode('')
  }

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100'>
      <div className="bg-white p-8 rounded shadow-md w-full md:mt-4 max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          Register
        </h1>
        {error && <div className='bg-red-100 text-red-700 p-2 rounded mb-4 text-center'>{error}</div>}
        <form onSubmit={submitHandler}>
          {/* Full Name */}
          <h3 className="text-lg font-semibold mb-1">Full Name</h3>
          <div className='flex gap-4 mb-4'>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Email */}
          <h3 className="text-lg font-semibold mb-1">Email Address</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="border p-2 rounded w-full mb-4"
            required
          />

          {/* Phone */}
          <h3 className="text-lg font-semibold mb-1">Phone Number</h3>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="border p-2 rounded w-full mb-4"
            required
          />

          {/* Password */}
          <h3 className="text-lg font-semibold mb-1">Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="border p-2 rounded w-full mb-6"
            required
          />

          {/* Address */}
          <h3 className='text-lg font-semibold mb-1'>Address</h3>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='border p-2 rounded w-full mb-4'
            placeholder='Enter your address here'
          />

          {/* City & Pincode */}
          <div className='flex gap-4 mb-4'>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className='border p-2 rounded w-full'
            />
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Pincode"
              className='border p-2 rounded w-full'
            />
          </div>
          {/* 📍 Get Location */}
          <button
            type="button"
            onClick={getLocation}
            className="bg-gray-200 text-black p-2 rounded w-full mb-3"
          >
            Get My Location
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="bg-gray-800 text-white p-2 rounded w-full hover:bg-gray-950 transition"
          >
            Sign Up
          </button>

          <p className='text-center mt-4'>
            Already have account?
            <Link to="/user-login" className='text-blue-600 ml-1'>
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default UserSignUp
