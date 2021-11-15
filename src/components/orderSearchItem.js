import React from 'react'
import './../scss/order.scss'
// import searchImg from './../assets/images/search1.png'
import moment from 'moment'

function OrderSearchItem({id, created_at, total_price, checked_out}) {
    return (
        <div className='order-item'>
            <div className='order-item__block'>
                {/* <img alt='' className='order-item__block__img' src={searchImg}/> */}
                <div className='order-item__block__content'>
                    <p className='order-item__text'>{id}</p>
                </div>
            </div>
            <p className='order-item__text'>{total_price}$</p>
            <p className='order-item__text'>{moment(created_at).format("YYYY-MM-DD")}</p>
            <p className='order-item__text order-item__text-gold'>{checked_out ? 'Completed' : 'Pending'}</p>
            <p className='order-item__text'>
                <button type="submit" className="BestSavers__link BestSavers__link__button">View</button>
            </p>
        </div>
    )
}

export default OrderSearchItem