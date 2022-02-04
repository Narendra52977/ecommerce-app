import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/NotFound'
import ProductDetails from './products/productDetails'
export default function Pages() {
    return (
        <div>
          <Routes>
              <Route path="/" exact element={<Products/>}/>
              <Route path="/details/:id/p" element={<ProductDetails/>}/>
              <Route path="/login" exact  element={<Login/>}/>
              <Route path="/register" exact element={<Register/>}/>
              <Route path="/cart" exact element={<Cart/>}/>
              <Route path="*"  element={<NotFound/>}/>
          </Routes>
        </div>
    )
}
