import React from 'react'
import './../scss/order.scss'
// import searchImg from './../assets/images/search1.png'
import moment from 'moment'

function OrderSearchItem({description, id, normal_price, created_at, category,order_id}){
    return(
        <div className='order-item'>
            <div className='order-item__block'>
                {/* <img alt='' className='order-item__block__img' src={searchImg}/> */}
                <div className='order-item__block__content'>
                    <h3 className='order-item__block__title'>{description}</h3>
                    <p className='order-item__block__text'>{category}</p>
                    <p className='order-item__block__text order-item__text-gold'>{`Order ID ${order_id}`}</p>
                </div>
            </div>
            <p className='order-item__text'>{moment(created_at).format("YYYY-MM-DD") }</p>
            <p className='order-item__text order-item__text-gold'>Completed</p>
            <p className='order-item__text'>{normal_price}$</p>
            <p className='order-item__text'><button type="submit" className="BestSavers__link BestSavers__link__button">View</button></p>
        </div>
    )
}

export default OrderSearchItem