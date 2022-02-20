import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function UserApi(token) {
    console.log(token)
    const [islogged,setIsLogged]=useState(false)
    const [isAdmin,setIsAdmin]=useState(false)
    const [cart,setCart]=useState([])
    const [history,setHistory]=useState([])
  
    useEffect(()=>{
        if(token){
            const getuser=async()=>{
                try {
                    const res=await axios.get('/user/info',{
                        headers:{Authorization:token}
                    })
                    setIsLogged(true)
                    res.data.role===1?setIsAdmin(true):setIsAdmin(false)
                    setCart(res.data.cart)
                    console.log(res)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getuser()
        }
    },[token])

   
    const addCart=async (product)=>{
        if(!islogged) return alert('Please login to continue buying')
        const check=cart.every(item=>{
            return item._id!==product._id
        })
        if(check){
            setCart([...cart,{...product,quantity:1}])
            await axios.patch('/user/addcart',{cart:[...cart,{...product,quantity:1}]},{
                headers:{Authorization:token}
            })
        }else{
            alert("This product has been added to cart")
        }
    }
  return {
      islogged:[islogged,setIsLogged],
      isAdmin:[isAdmin,setIsAdmin],
      cart:[cart,setCart],
      addCart:addCart,
      history:[history,setHistory]

  }
}
