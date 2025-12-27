import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ServiceProviderDataContext } from '../context/ServiceProviderContext';
import axios from 'axios';

const ServiceProviderSignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [experience, setExperience] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const navigate = useNavigate();
  //  NEW: latitude & longitude
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [error, setError] = useState('');

  const { provider, setProvider } = useContext(ServiceProviderDataContext);

  //  Get user's current location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLong(pos.coords.longitude);
        alert("Location captured successfully");
      },
      () => alert("Location permission denied")
    );
  };


  async function submitHandler(e) {
    e.preventDefault();

    if (!lat || !long) {
      alert("Location not available. Please allow location access.");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      serviceName,
      email,
      phone: phoneNumber,
      password,
      serviceCategory: category,
      experience,
      address,
      city,
      pincode,
      lat,
      long
    };
    try {
    const response = await axios.post(
      'http://localhost:3000/api/auth/sprovider/register',
      newUser,
      { withCredentials: true }
    );

    if (response.status === 201) {
      const data = response.data;
      setProvider(data.provider);
      navigate('/Sprofile');
    }
  } catch (err) {
    setError(err.response.data.message);
  }

    // Reset form
    setFirstName('');
    setLastName('');
    setServiceName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setCategory('');
    setExperience('');
    setAddress('');
    setCity('');
    setPincode('');
  }

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100'>
      <div className="bg-white p-8  rounded shadow-md w-full  max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          Service Provider
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

          {/* Service Name */}
          <h3 className="text-lg font-semibold mb-1">Service Name</h3>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Enter service name"
            className="border p-2 rounded w-full mb-4"
            required
          />

          {/* Email */}
          <h3 className="text-lg font-semibold mb-1">Email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            required
          />

          {/* Phone */}
          <h3 className="text-lg font-semibold mb-1">Phone Number</h3>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            required
          />

          {/* Password */}
          <h3 className="text-lg font-semibold mb-1">Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-6"
            required
          />

          {/* Category & Experience */}
          <div className='flex gap-4 mb-4'>
            <div className='w-full'>
              <h3 className='text-lg font-semibold mb-1'>Category</h3>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="Home Services">Home Services</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Education">Education</option>
                <option value="Health & Fitness">Health & Fitness</option>
              </select>
            </div>

            <div className='w-full'>
              <h3 className="text-lg font-semibold mb-1">Experience</h3>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Years"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          {/* Address */}
          <h3 className='text-lg font-semibold mb-1'>Address</h3>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='border p-2 rounded w-full mb-4'
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
          <button
            type="button"
            onClick={getLocation}
            className="bg-gray-200 text-black p-2 rounded w-full mb-3 hover:cursor-pointer"
          >
             Get My Location
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 hover:cursor-pointer"
          >
            Sign Up
          </button>

          <p className='text-center mt-4'>
            Already have an account?
            <Link to="/service-provider-login" className='text-blue-600 ml-1'>
              Login here
            </Link>
          </p>


        </form>
      </div>
    </div>
  )
}

export default ServiceProviderSignUp;
