import React from 'react'
import './../scss/orderViewCard.scss'
// import test from 'https://blaze24x7.com/uploads/product_images/group-of-vegetables-in-basket.jpg'


function OrderViewCard({ title, price, count, src}) {
    return(
        <div className='OrderViewCard'>
            <img  className='OrderViewCard__img' src={`${process.env.REACT_APP_API_URL}/uploads/product_images/${src}`}/>
            <h2 className='OrderViewCard__title'>{title}</h2>
            <p className='OrderViewCard__price'>{`Price:  ${price}`}</p>
            <p className='OrderViewCard__count'>{`Count:  ${count}`}</p>
        </div>
    )
}

export default OrderViewCard