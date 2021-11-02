import React, { useState } from 'react';
import './../scss/cardItem.scss';
import shoppingCart from '../assets/images/icons/shopping-cart.svg';
import { useDispatch } from 'react-redux';
import { addCartItems } from '../features/shoppingCartItems/shoppingCartItemsSlice';


function CardItem({ imgUrl, paragraph, title, salePrice, price, sale, cartItem }) {
  const [itemQuantity, setItemQuantity] = useState(1);
  const lessThanOne = itemQuantity <= 1;
  const moreThanTen = itemQuantity >= 10;

  const dispatch = useDispatch();

  return (
    <div className="cardItem__item">
      {console.log('dsadsadsa')}
      <div className="today_sale">{sale}</div>
        <img src={ `${process.env.REACT_APP_API_URL}/uploads/product_images/${imgUrl}`} className="cardItem__item__img" alt="" />
      <div>
        <p className="today-card_product-paragraph">{paragraph}</p>
        <h3 className="today-card_product-title">{title}</h3>
        <div className="cardItem__item__container">
          <div className="cardItem__item__container__left">
            <h3 className="cardItem__item__container__left__title">
              {salePrice}
            </h3>
            <div className="qtySelector">
              <button 
                type="button" 
                onClick={ () => setItemQuantity(prevQuantity => prevQuantity - 1) }
                disabled={ lessThanOne }
              >
                -
              </button>
              <span> { itemQuantity } </span>
              <button 
                type="button" 
                onClick={ () => setItemQuantity(prevQuantity => prevQuantity + 1) }
                disabled={ moreThanTen }
              >
                +
              </button>
            </div>
          </div>
          <div className="cardItem__item__container__right">
            <h3 className="cardItem__item__container__right__title"> { price } </h3>
            <button 
              type="button" 
              className="shoppingCart_btn"
              onClick={ () => {
                dispatch(addCartItems({
                  ...cartItem, 
                  amount: itemQuantity
                }));
              } }
            >
              <img src={shoppingCart} alt="shopping cart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardItem;
