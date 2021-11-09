import deleteIcon from '../assets/images/icons/delete.png';
import shopIcon from '../assets/images/icons/shopIcon.png';
import phoneIcon from '../assets/images/icons/phoneIcon.png';
import React, { useState, useEffect } from 'react';
import { removeCartItems, increaseCartItems, decreaseCartItems } from '../features/shoppingCartItems/shoppingCartItemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";


const CartItem = ({ cartItem }) => {
  const { product_stores } = cartItem;
  cartItem.amount = cartItem.orders_products?.amount || cartItem.amount;
  const userId = useSelector(store => {
    return store.customer?.id
  })
  console.log(cartItem, 'cardItemsBack')

  console.log(product_stores, "cartitem -> product stores");

  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(cartItem.amount);

  console.log(cartItem.amount, "amount");

  useEffect(() => {
    setItemQuantity(cartItem.amount);
  }, [cartItem.amount]);

  function saveProdcuts(e) {
    e.preventDefault()
    const obj = {
      user_id : userId,
      amount : cartItem.amount || 1,
      product_ids : [1],
      total_price : 1,
      checked_out : 0
    }
    console.log(cartItem)
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/orders/add`,obj)
        .then(res => console.log(res))
        .catch(e => console.log(e))
    // localStorage.setItem('products', JSON.stringify(cartItem))
  }
  
  const lessThanOne = itemQuantity <= 1;
  const moreThanTen = itemQuantity >= 10;
  return (
    <form className="product_cart_item">
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
            { cartItem.name }
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
        {
          product_stores?.map(productStore => {
            return (
              <div key={ productStore.id } className="shopName">
                <img src={shopIcon} alt="" />
                <p> { productStore.name } </p>
              </div>
            );
          })
        }
                {
          product_stores?.map(productStore => {
            return (
              <div className="phoneNum">
              <img src={phoneIcon} alt="" />
              <p> {productStore.contact_number} </p>
            </div>
            );
          })
        }

      </div>
      <button type="submit" onClick={saveProdcuts}>save</button>
    </form>
  )
}
export default CartItem;
