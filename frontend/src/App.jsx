import React from 'react'
import LandingPage from './pages/LandingPage';
import ServiceProviderSignUp from './pages/ServiceProviderSignUp'
import UserSignUp from './pages/UserSignUp'
import ServiceProviderLogin from './pages/ServiceProviderLogin'
import UserLogin from './pages/UserLogin'
import { Route, Routes } from 'react-router-dom'
import ProtectRouter from './router/ProtectRouter'
import SProtectRouter from './router/SProtectRouter'
import Sprofile from './pages/Sprofile'
import Map from './pages/Map';
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/map" element={
        <ProtectRouter>
        <Map/>
        </ProtectRouter>
        } />
      <Route path="/Sprofile" element={<SProtectRouter>
        <Sprofile/>
        </SProtectRouter>
        } />
      <Route path="/service-provider-signup" element={<ServiceProviderSignUp />} />
      <Route path="/user-signup" element={<UserSignUp />} />
      <Route path="/service-provider-login" element={<ServiceProviderLogin />} />
      <Route path="/user-login" element={<UserLogin />} />
    </Routes>
    </>
  )
}

export default App