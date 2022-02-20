import React, { useContext,useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/ProductItem'
import Loading from '../utils/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'



export default function Products() {
    const state=useContext(GlobalState)
    const [products,setProducts]=state.ProductsAPI.products
    const [token]=state.token
    const [callback,setCallback]=state.ProductsAPI.callback
    const [isAdmin] =state.userApi.isAdmin
    const [loading,setLoading]=useState(false)
    const [isCheck,setIsCheck]=useState(false)
    const deleteProduct=async(id,public_id)=>{
        setLoading(true)
       try{
        const destroyImg=await axios.post('/api/destroy',{public_id},{
            headers:{Authorization:token}
        })
        const deleteProduct=await axios.delete(`/api/product/${id}`,{
            headers:{Authorization:token}
        })
        alert(deleteProduct.msg)
        setCallback(!callback)
        setLoading(false)
       }catch(err){
        alert(err.response.data.msg)
        setLoading(false)
       }
    }
    const handleCheck=(id)=>{
        products.forEach(product=>{
            if(product._id===id) product.checked=!product.checked
        })
        setProducts([...products])
        console.log([...products])
    }
    const checkAll=()=>{
        products.forEach(product=>{
            product.checked=!isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }
    const deleteAll=()=>{
        products.forEach(product=>{
            if(product.checked) deleteProduct(product._id,product.images.public_id)
        })
    }
    if(loading) return <Loading/>
    return (
        <>
        <Filters/>
        {
            isAdmin&&<div className='delete-all'>
                <span>Select All</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll}/>
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }
        <div className="products">
            {
                products.map(product=>{
                    return <ProductItem product={product} isAdmin={isAdmin} ondelete={deleteProduct} handleCheck={handleCheck}/>

                })
            }
        </div>
        <LoadMore/>
        {
            products.length===0 && <Loading/>
        }
        </>
    )
}
