import React, { useState } from 'react'
import './../scss/order.scss'
// import searchImg from './../assets/images/search1.png'
import moment from 'moment'
import OrderView from '../pages/OrderView'

function OrderSearchItem({el}) {
    const [loginActiv, setLoginActiv] = useState(false)

    const loginOpen = () => {
        setLoginActiv(!loginActiv)
    }
    return (
        <div className='order-item'>
            <div className='order-item__block'>
                {/* <img alt='' className='order-item__block__img' src={searchImg}/> */}
                <div className='order-item__block__content'>
                    <p className='order-item__text'>{el.id}</p>
                </div>
            </div>
            <p className='order-item__text'>{el.total_price}$</p>
            <p className='order-item__text'>{moment(el.created_at).format("YYYY-MM-DD")}</p>
            <p className='order-item__text order-item__text-gold'>{el.checked_out ? 'Completed' : 'Pending'}</p>
            <p className='order-item__text'>
                <button type="submit" className="BestSavers__link BestSavers__link__button" onClick={loginOpen}>View</button>
            </p>
            
            <OrderView
                el={el}
                loginActiv={loginActiv}
                loginOpen={loginOpen}
            />
        </div>
    )
    
}

export default OrderSearchItem