import React from 'react'
import './../scss/order.scss'
import searchImg from './../assets/images/search1.png'

function OrderSearchItem(){
    return(
        <div className='order-item'>
            <div className='order-item__block'>
                <img alt='' className='order-item__block__img' src={searchImg}/>
                <div className='order-item__block__content'>
                    <h3 className='order-item__block__title'>Taro Chips Par-fried & baked</h3>
                    <p className='order-item__block__text'>Food & Snacks</p>
                </div>
            </div>
            <p className='order-item__text'>3</p>
            <p className='order-item__text'>05/03/2021</p>
            <p className='order-item__text'>Completed</p>
            <p className='order-item__text'>25$</p>
        </div>
    )
}

export default OrderSearchItem