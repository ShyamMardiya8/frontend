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
function App() {

  return (
    <>
    {/* <HashRouter>
    <Navbar />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/shop' element={<Shop />} />
    <Route path='/product/:id' element={<SingleProduct />} />
    <Route path='/cart' element={<CartPage />} />
    </Routes>
    </HashRouter> */}
    <Toaster position="top-right" reverseOrder={false} />
  <LoginPage />
  {/* <Register /> */}
    </>
  )
}

export default App
