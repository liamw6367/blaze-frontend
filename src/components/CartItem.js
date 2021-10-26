import deleteIcon from '../assets/images/icons/delete.png';
import shopIcon from '../assets/images/icons/shopIcon.png';
import phoneIcon from '../assets/images/icons/phoneIcon.png';
import React, { useState } from 'react';
import { removeCartItems, increaseCartItems, decreaseCartItems } from '../features/shoppingCartItems/shoppingCartItemsSlice';
import { useDispatch } from 'react-redux';


const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(cartItem.amount);
  
  const lessThanOne = itemQuantity <= 1;
  const moreThanTen = itemQuantity >= 10;

  return (
    <div className="product_cart_item">
      <button
        type="button" 
        className="thrush_btn"
        onClick={ () => dispatch(removeCartItems(cartItem.id)) }
      >
        <img src={deleteIcon} alt="" />
      </button>
      <div className="container">
        <div className="img-bar">
          <img src={ `${process.env.REACT_APP_API_URL}/uploads/product_images/${cartItem.image}` } alt="" />
        </div>
        <div className="information_content">
          <span className="percent">25% OFF</span>
          <p className="description">
            { cartItem.description }
            <span className="gr">300g</span>
          </p>
          <div
            className="container"
            style={{ justifyContent: 'space-between' }}
          >
            <div className="container">
              <div className="qtySelector">
                <button 
                  type="button" 
                  onClick={ () => { 
                    dispatch(decreaseCartItems(cartItem.id));
                    setItemQuantity(prevQuantity => prevQuantity - 1);
                  } }
                  disabled={ lessThanOne }
                >
                  -
                </button>
                <span> { itemQuantity } </span>
                <button 
                  type="button" 
                  onClick={ () => { 
                    dispatch(increaseCartItems(cartItem.id)); 
                    setItemQuantity(prevQuantity => prevQuantity + 1);
                  } }
                  disabled={ moreThanTen }
                >
                  +
                </button>
              </div>
              <span className="x"> x </span>
              <p className="price" style={{ margin: '0 9px' }}>
                $50.30
              </p>
              <p
                className="price old"
                style={{ textDecoration: 'line-through' }}
              >
                { `$${ cartItem.normal_price }` }
              </p>
            </div>
            <div>
              <p className="price" style={{ color: '#FF8400' }}>
                { `$${ cartItem.sales_price }` }
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container contact">
        <div className="shopName">
          <img src={shopIcon} alt="" />
          <p> { cartItem.name } </p>
        </div>
        <div className="phoneNum">
          <img src={phoneIcon} alt="" />
          <p> +454 55 44 54 </p>
        </div>
      </div>
    </div>
  )
}
export default CartItem;
