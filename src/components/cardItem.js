import React, { useState } from 'react'
import dropdown from './../assets/images/vegetablesPngTransparent.png'
import './../scss/cardItem.scss'

import shoppingCart from '../assets/images/icons/shopping-cart.svg'

function CardItem({ imgUrl, paragraph, title, salePrice, price, sale }) {
  const [number, setNumber] = useState(0)

  return (
    <div className="cardItem__item">
      <div className="today_sale">{sale}</div>
      <img src={dropdown} className="cardItem__item__img" alt="" />
      <div>
        <p className="today-card_product-paragraph">{paragraph}</p>
        <h3 className="today-card_product-title">{title}</h3>
        <div className="cardItem__item__container">
          <div className="cardItem__item__container__left">
            <h3 className="cardItem__item__container__left__title">
              {salePrice}
            </h3>
            <div className="qtySelector">
              <button onClick={() => setNumber(number - 1)}>-</button>
              <input
                type="text"
                className="qtyValue"
                placeholder="kg"
                defaultValue={number}
              />
              <button onClick={() => setNumber(number + 1)}>+</button>
            </div>
          </div>
          <div className="cardItem__item__container__right">
            <h3 className="cardItem__item__container__right__title">{price}</h3>
            <a href="#" className="shoppingCart_btn">
              <img src={shoppingCart} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardItem
