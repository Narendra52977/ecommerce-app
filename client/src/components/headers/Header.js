import React, {  useContext,useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import Cart from "./icons/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
const adminRouter = () => {
  return (
    <>
      <li>
        <Link to="/create_product">Create Product</Link>
      </li>
      <li>
        <Link to="/categories">Categories</Link>
      </li>
    </>
  );
};

export default function Header() {
  const state = useContext(GlobalState);
  const [islogged] = state.userApi.islogged;
  const [isAdmin] = state.userApi.isAdmin;
  const [cart]=state.userApi.cart
  const [menu,setMenu]=useState(false)
  const styleMenu={
    left:menu?0:"-100%"
  }
  const logoutUser=async ()=>{
    await axios.post('/user/logout')
    localStorage.removeItem('firstLogin')
    window.location.href="/"
  }
  const toggleMenu=()=>{
    setMenu(!menu)
  }
  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>logout</Link>
        </li>
      </>
    );
  };
  

  
  return (
    <header>
      <div className="menu" onClick={()=>{toggleMenu()}}>
        <img src={Menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "Narendra Shop"}</Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        {isAdmin && adminRouter()}
        {islogged ? (
        loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login/Register</Link>
          </li>
        )}

        <li onClick={()=>{toggleMenu()}}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>
      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}
