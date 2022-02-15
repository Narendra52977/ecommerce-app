import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/ProductItem'
import Loading from '../utils/Loading'

export default function Products() {
    const state=useContext(GlobalState)
    const [products]=state.ProductsAPI.products
    const [isAdmin] =state.userApi.isAdmin
    console.log(isAdmin)
    return (
        <>
        <div className="products">
            {
                products.map(product=>{
                    return <ProductItem product={product} isAdmin={isAdmin}/>

                })
            }
        </div>
        {
            products.length===0 && <Loading/>
        }
        </>
    )
}
