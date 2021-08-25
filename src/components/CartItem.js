import deleteIcon from '../assets/images/icons/delete.png'
import nanPro from '../assets/images/nan_pro.png'
import shopIcon from '../assets/images/icons/shopIcon.png'
import phoneIcon from '../assets/images/icons/phoneIcon.png'
import React, { useState } from 'react'

const CartItem = () => {
  const [number, setNumber] = useState(0)

  return (
    <div className="product_cart_item">
      <button className="thrush_btn">
        <img src={deleteIcon} alt="" />
      </button>
      <div className="container">
        <div className="img-bar">
          <img src={nanPro} alt="" />
        </div>
        <div className="information_content">
          <span className="percent">25% OFF</span>
          <p className="description">
            Nestle Ceregrow Multigrain With Milk & Fruits...
            <span className="gr">300g</span>
          </p>
          <div
            className="container"
            style={{ justifyContent: 'space-between' }}
          >
            <div className="container">
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
              <span className="x">x</span>
              <p className="price" style={{ margin: '0 9px' }}>
                $50.30
              </p>
              <p
                className="price old"
                style={{ textDecoration: 'line-through' }}
              >
                $28.75
              </p>
            </div>
            <div>
              <p className="price" style={{ color: '#FF8400' }}>
                $50.30
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container contact">
        <div className="shopName">
          <img src={shopIcon} alt="" />
          <p>Shop Name</p>
        </div>
        <div className="phoneNum">
          <img src={phoneIcon} alt="" />
          <p>+454 55 44 54</p>
        </div>
      </div>
    </div>
  )
}
export default CartItem
