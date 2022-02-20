import React,{useContext} from 'react'
import { GlobalState } from '../../../GlobalState'

import { Link } from 'react-router-dom'

export default function BtnRender({product,ondelete}) {
    const state=useContext(GlobalState)
    const [isAdmin] =state.userApi.isAdmin
    const addCart=state.userApi.addCart
    return (
        <div className="row_btn">
            {
                isAdmin?<><Link id="btn_buy" to="#1" onClick={()=>ondelete(product._id,product.images.public_id)}>
               Delete
            </Link>
            <Link id="btn_view" to={`/edit_product/${product._id}/p`}>
               edit
            </Link></>:<><Link id="btn_buy" to="#1" onClick={()=>addCart(product)}>
                    Buy
                </Link>
                <Link id="btn_view" to={`/details/${product._id}/p`}>
                    view
                </Link></>
            }
                
            </div>
    )
}
