import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/NotFound'
import ProductDetails from './products/productDetails'
import { GlobalState } from '../../GlobalState'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Categories from '../Categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
export default function Pages() {
    const state=useContext(GlobalState)
    const [islogged]=state.userApi.islogged
    const [isAdmin]=state.userApi.isAdmin
    return (
        <div>
          <Routes>
              <Route path="/" exact element={<Products/>}/>
              <Route path="/details/:id/p" element={<ProductDetails/>}/>
              <Route path="/login" exact  element={islogged?<NotFound/>:<Login/>}/>
              <Route path="/register" exact element={islogged?<NotFound/>:<Register/>}/>
              <Route path="/categories" exact element={isAdmin?<Categories/>:<NotFound/>}/>
              <Route path="create_product" exact element={isAdmin?<CreateProduct/>:<NotFound/>}/>
              <Route path="/history" exact element={islogged?<OrderHistory/>:<NotFound/>}/>
              <Route path="/history/:id" exact element={islogged?<OrderDetails />:<NotFound/>}/>
              <Route path="/cart" exact element={<Cart/>}/>
              <Route path="*"  element={<NotFound/>}/>
          </Routes>
        </div>
    )
}
