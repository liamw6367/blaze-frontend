import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectTotalAmount } from '../../features/shoppingCartItems/shoppingCartItemsSlice';
import CartItem from '../CartItem';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import '../../scss/ProductsDialog.scss'


function ProductsDialog() {
  const shoppingCartItems = useSelector(selectCartItems);
  const token = localStorage.getItem('token')
  const products = useSelector(store => {
    return store.shoppingCartItem.cartItems
  })
  const totalAmount = useSelector(selectTotalAmount) || 0;
  
  let verified = useSelector(store => {
    return store.customer.verified || null
  });

  let delAddresses = useSelector(store => {
    return store.customer.delivery_addresses?.length || null
  });

  const [alert,setAlert] = useState(false)

  const history = useHistory()

  function checkoutPageRedirect() {
    if (!delAddresses || !verified) {
      setAlert(true)
    } 
   else {
    setAlert(false)
    history.push('/checkout')
  }
  }

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
          { 
             token && products.length ? (
             <button onClick={checkoutPageRedirect} className="BestSavers__link BestSavers__link__card ">
               Shop Now     
            </button> 
            ) : null
          }
          {alert && <Alert severity="error">
            {!delAddresses && verified && 'Check your address delivery!'}
            {!verified && delAddresses && 'Check your phone verification'}
            {!delAddresses  && !verified && 'Check your phone verification and address delivery!'}
           </Alert>}
         
      </>
  );
}

export default ProductsDialog;
