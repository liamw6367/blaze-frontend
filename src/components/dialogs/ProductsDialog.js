import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectTotalAmount } from '../../features/shoppingCartItems/shoppingCartItemsSlice';
import CartItem from '../CartItem';


function ProductsDialog() {
  const shoppingCartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount) || 0;

  return (
      <>
        <div className="head_banner">
          <div>
            <p>Sub Total</p>
            <p> { `${ totalAmount }$` } </p>
          </div>
          <div>
            <p>Delivery Charges</p>
            <p className="delivery_color">+49$</p>
          </div>
        </div>
          { shoppingCartItems.map(cartItem => <CartItem key={ cartItem.id }  cartItem={ cartItem } />) }
      </>
  );
}

export default ProductsDialog;
