import React, {useState,useEffect, useContext} from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/Loading'
import {useNavigate,useParams} from 'react-router-dom'
import { param } from 'express/lib/request'
const initialState={
    product_id:'',
    title:'',
    price:0,
    description:'Description',
    content:'Content',
    category:'',
    id:''
}
export default function CreateProduct() {
    const state=useContext(GlobalState)
    const [product,setProduct]=useState(initialState)
    const [categories]=state.categoriesAPI.categories
    const [images,setImage]=useState(false)
    const [loading,setLoading]=useState(false)
    const [onEdit,setedit]=useState(false)
    const history=useNavigate()
    const params=useParams()
    const styleUpload={
        display:images?"block":"none"
    }
    const [isAdmin]=state.userApi.isAdmin
    const [token]=state.token
    const [products]=state.ProductsAPI.products
    const [callback,setCallback]=state.ProductsAPI.callback
    useEffect(()=>{
        if(params.id){
            products.forEach(product=>{
                if(product._id===params.id) {setImage(product.images);setProduct(product); setedit(true)}
            })
        }else{
            setImage(false)
            setProduct(initialState)
        }
    },[params.id,products])
    const handleUpload=async e=>{
        e.preventDefault();
        try{
            if(!isAdmin) return alert('You are Not an Admin')
            const file=e.target.files[0]
            console.log(file)
            if(!file) return alert('file Not Exist')
            if(file.size>1024 *1024){
                return alert('Size too large')
            }
            if(file.type!=='image/jpeg' && file.type !== 'image/png'){
                return alert('File Format is incorrect')
            }
            let formdata=new FormData()
            formdata.append('file',file)
            setLoading(true)
            const res=await axios.post('/api/upload',formdata,{
                headers:{'content-type':'multipart/form-data',Authorization:token}
            })
            setLoading(false)
            setImage(res.data)

        }catch(err){
            alert(err.response.data.msg)
        }
    }
    const handleDelete=async()=>{
        try{
            if(!isAdmin) return alert('You are Not an Admin')
            setLoading(true)
            await axios.post('/api/destroy',{public_id:images.public_id},{
                headers:{Authorization:token}
            })
            setLoading(false)
            setImage(false)

        }catch(err){
            alert(err.response.data.msg)
        }
    }
    const handleChangeInput=(e)=>{
        let prod={...product}
        prod[e.target.name]=e.target.value
        setProduct(prod)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
            if(!isAdmin) return alert('You are Not an Admin')
            if(onEdit){
                await axios.put(`/api/product/${product._id}`,{...product,images},{
                    headers:{Authorization:token}
                }) 
            } else{      
            await axios.post('/api/products',{...product,images},{
                headers:{Authorization:token}
            })
           }
            setImage(false)
            setProduct(initialState)
            setCallback(!callback)
            history('/')
        }
        catch(err){
            alert(err.response.data.msg)
        }
    }
  return (
    <div className='create_product'>
        <div className='upload'>
            <input type='file' name='file' id='file_up' onChange={handleUpload} />
            {
                loading?<div><Loading/></div>: <div id="file_img" style={styleUpload}>
                <img src={images?images.url:''} alt=""/>
                <span onClick={handleDelete}>X</span>
            </div>
            }
           
        </div>
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <label htmlFor='product_id'>Product ID</label>
                <input type="text" name='product_id' id='product_id' required value={product.product_id} onChange={handleChangeInput} disabled={onEdit}/>
            </div>
            <div className='row'>
                <label htmlFor='title'>Title</label>
                <input type="text" name='title' id='title' required value={product.title} onChange={handleChangeInput}/>
            </div>
            <div className='row'>
                <label htmlFor='price'>Price</label>
                <input type="text" name='price' id='price' required value={product.price} onChange={handleChangeInput}/>
            </div>
            <div className='row'>
                <label htmlFor='description'>Description</label>
                <textarea type="text" name='description' id='description' required value={product.description} rows="5" onChange={handleChangeInput}/>
            </div>
            <div className='row'>
                <label htmlFor='content'>Content</label>
                <textarea type="text" name='content' id='content' required value={product.content} rows="7" onChange={handleChangeInput}/>
            </div>
            <div className='row'>
                <label htmlFor='product_id'>Categories: </label>
                <select name="category" value={product.category} onChange={handleChangeInput}>
                    <option value="">Please select a category</option>
                    {
                        categories.map(category=>(
                            <option value={category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <button type='submit'>{onEdit?'Update':'Create'}</button>
        </form>
        
    </div>
  )
}
