import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Component/Navbar'
import Home from './Component/Home'
import Shop from './Component/Shop'
// import { Home } from 'lucide-react'
import CartPage from './Component/Cart'
import { Toaster } from "react-hot-toast";
import SingleProduct from './Component/SingleProduct'
import LoginPage from './Component/Login'
import Register from './Component/Register'
import { useEffect, useState } from 'react'
import { GET_TOKEN } from './constatnt/LocalStorage'
import Order from './Component/Order'

function App() {
  const [auth, setAuth] = useState(false)
  const [order, setOrder] = useState([])
  
  useEffect(() => {
    if (GET_TOKEN) {
      setAuth(true)
    }
    else{
      setAuth(false)
    }
  },[auth])
  return (
    <>
    <HashRouter>
    <Toaster position="top-right" reverseOrder={false} />
    <Navbar />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/shop' element={<Shop />} />
    <Route path='/product/:id' element={<SingleProduct />} />
    <Route path='/cart' element={auth ? <CartPage setOrder={setOrder} order={order} /> : <LoginPage/>} /> 
    <Route path='/login' element={<LoginPage setAuth={setAuth}/>} />
    <Route path='/register' element={<Register />}/>
    <Route path='/order' element={order.length > 0 ? <Order order={order}/>  : <CartPage setOrder={setOrder} order={order}/>}/>
    
    </Routes>
    </HashRouter> 
    </>
  )
}

export default App
