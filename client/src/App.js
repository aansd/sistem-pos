import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from './components/Navbar/Navbar'
import Cart from './pages/Cart/Cart'
import Profile from './pages/Profile/Profile';
import CheckOut from './pages/CheckOut/CheckOut';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import LoginAndRegister from './pages/LoginAndRegister/LoginAndRegister';
const App = () => {
  return (
   <>
    <div className='app'>
      <ToastContainer/>
      <Navbars/>
      <main style={{ flex: 1 }}> {/* Make main take the remaining space */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/login' element={<LoginAndRegister />} />
        </Routes>
      </main>
    </div>
      <Footer/>
   </>
  )
}

export default App
