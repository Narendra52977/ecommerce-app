import axios from 'axios'
import React,{useContext, useState,useEffect} from 'react'
// import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import PaypalButton from './PaypalButton'


export default function Cart() {
    const state=useContext(GlobalState)
    const [cart,setCart]=state.userApi.cart
    const [token]=state.token
    const [total,setTotal]=useState(0)

   
    const addTocart=async(cart)=>{
        await axios.patch('/user/addcart',{cart},{
            headers:{Authorization:token}
        })
    }

    useEffect(()=>{
        const gettotal=()=>{
            const total=cart.reduce((prev,item)=>{
                return prev+(item.price*item.quantity)
            },0)
            setTotal(total)
        }
        gettotal()
    },[cart])
    const increment=(id)=>{
        cart.forEach(item=>{
            if(item._id===id){
                item.quantity+=1
            }
        })
        setCart([...cart])
        addTocart(cart)
    }
    const decrement=(id)=>{
        cart.forEach(item=>{
            if(item._id===id){
                item.quantity ===1?item.quantity=1:item.quantity-=1
            }
        })
        setCart([...cart])
        addTocart(cart)
    }
    const deleteProduct=(id)=>{
        if(window.confirm("Do you want to remove this product?")){
            cart.forEach((item,index)=>{
                if(item._id===id){
                    cart.splice(index,1)
                }
            })
            setCart([...cart])
            addTocart(cart)
        }
    }
    const tranSuccess=async (payment)=>{
        const {paymentID,address}=payment;
        await axios.post('/api/payment',{cart,paymentID,address},{
            headers:{Authorization:token}
        })
        setCart([])
        addTocart([])
        alert('You have successfully placed an order')
  
    }

    if(cart.length==0){
        return <h2 style={{textAlign:'center',fontSize:'5rem'}}>cart empty</h2>
    }

    return (
        <div>
            {
                cart.map((Product)=>(<div className="detail cart" key={Product._id}>
                <img src={Product.images.url} alt="" className='img_container' />
                <div className="box-detail">
                    <div className="row">
                        <h2>{Product.title}</h2>
                        <h6>#id:  {Product.product_id}</h6>
                    </div>
                    <h3>$ {Product.price * Product.quantity}</h3>
                    <p>{Product.description}</p>
                    <p>{Product.content}</p>
                    <div className='amount'>
                        <button onClick={()=>decrement(Product._id)}>-</button>
                        <span>{Product.quantity}</span>
                        <button onClick={()=>increment(Product._id)}>+</button>
                    </div>
                   <div className='delete' onClick={()=>deleteProduct(Product._id)}>X</div>
                </div>
                
            </div>))
            }
            <div className='total'>
                <h3>Total:${total}</h3>
                <PaypalButton total={total} tranSuccess={tranSuccess}/>
            </div>
            
        </div>
    )
}
