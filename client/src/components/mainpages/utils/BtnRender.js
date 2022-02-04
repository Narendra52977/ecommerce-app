import React from 'react'

import { Link } from 'react-router-dom'

export default function BtnRender({product}) {
    return (
        <div className="row_btn">
                <Link id="btn_buy" to="#1">
                    Buy
                </Link>
                <Link id="btn_view" to={`/details/${product._id}/p`}>
                    view
                </Link>
            </div>
    )
}
