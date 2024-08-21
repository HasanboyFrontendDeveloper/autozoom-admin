import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Brands, Cars, Categories, Cities, Home, Locations, Login, Modals } from './Pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layout/layout';

const App = () => {

  const token = localStorage.getItem('token') || ''
  const navigate = useNavigate()

  useEffect(() => {
    if (token.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey')) {
      navigate('/')
    } else {
      navigate('/login')
    }

  }, [])



  return (
    <div className=''>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/categories' element={<Categories />}></Route>
          <Route path='/brands' element={<Brands />}></Route>
          <Route path='/modals' element={<Modals />}></Route>
          <Route path='/locations' element={<Locations />}></Route>
          <Route path='/cities' element={<Cities />}></Route>
          <Route path='/cars' element={<Cars />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App