import axios from 'axios';
import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';

export default function Categories() {
    const state=useContext(GlobalState)
    const [categories]=state.categoriesAPI.categories
    const [category,setCategory]=useState('')
    const [token]=state.token
    const [callback,setCallback]=state.categoriesAPI.callback
    const [onEdit,setEdit]=useState(false)
    const [id,setId]=useState('')
const createCategory=async e=>{
    e.preventDefault();
    try{
        if(onEdit){
            const res=await axios.put(`/api/category/${id}`,{name:category},{
                headers:{Authorization:token}
            })
            alert(res.data.msg)
        }else{
        const res=await axios.post('/api/category',{name:category},{
            headers:{Authorization:token}
        })
        alert(res.data.msg)
       
    }
    setEdit(false)
    setCategory('')
    setCallback(!callback)
    
    }catch(err){
        alert(err.response.data.msg)
    }
}
const editCategory=async(id,name)=>{
    console.log(id)
    setId(id)
    setCategory(name)
    setEdit(true)

}
const deleteCategory=async id=>{
    try {
        const res=await axios.delete(`/api/category/${id}`,{
            headers:{Authorization:token}
        })
        alert(res.data.msg)
        setCallback(!callback)
    } catch (err) {
        alert(err.response.data.msg)
    }

}
const cancel=()=>{
    setCategory('')
    setEdit(false)
    setId('')
}
    return (
        <div className='categories'>
            <form onSubmit={createCategory}>
                <label htmlFor='category'>category</label>
                <input type="text" name='category' value={category} onChange={e=>setCategory(e.target.value)} required/>

                <button type='submit'>{onEdit?'Update':'Save'}</button>
                {onEdit&&<button onClick={cancel}>{'cancel'}</button> }
            </form>
            <div className='col'>
                {
                    categories.map(category=>(
                        <div className='row' key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={()=>editCategory(category._id,category.name)}>Edit</button>
                                <button onClick={()=>deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>    
                    ))
                }
            </div>
        </div>
    );
}
