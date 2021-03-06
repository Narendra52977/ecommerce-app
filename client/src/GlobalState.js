import React,{createContext,useEffect,useState} from "react";
import ProductsAPI from "./api/productsAPI";
import axios from "axios";
import UserApi from "./api/UserApi";
import CategoriesAPI from "./api/CategoriesAPI";
export const GlobalState=createContext()

export const DataProvider=({children})=>{
    const [token,setToken]=useState(false)
    
    useEffect(()=>{
        if(localStorage.getItem('firstLogin')){
        const refreshToken=async()=>{
            const res=await axios.get('/user/refresh_token')
            setToken(res.data.accesstoken)
        }
        setTimeout(()=>{
            refreshToken()
        },15000)
        refreshToken()
      }
      
    },[])
    const state={
        token:[token,setToken],
        ProductsAPI:ProductsAPI(),
        userApi:UserApi(token),
        categoriesAPI:CategoriesAPI()
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}