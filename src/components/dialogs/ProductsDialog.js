import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectTotalAmount } from '../../features/shoppingCartItems/shoppingCartItemsSlice';
import CartItem from '../CartItem';
import Alert from '@material-ui/lab/Alert';
import '../../scss/ProductsDialog.scss'


function ProductsDialog() {
  const shoppingCartItems = useSelector(selectCartItems);
  const token = localStorage.getItem('token')
  const products = useSelector(store => {
    return store.shoppingCartItem.cartItems
  })
  //console.log(products, 'dsadsad')
  const totalAmount = useSelector(selectTotalAmount) || 0;
  
  let verified = useSelector(store => {
    return store.customer.verified;
  });

  let delAddresses = useSelector(store => {
    return store.customer.delivery_addresses?.length+1;
  });

  console.log(delAddresses);

  console.log(verified);

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
          { verified && delAddresses ?
             token && products.length ?
             <Link to='/checkout' className="BestSavers__link BestSavers__link__card ">
               Shop Now     
            </Link> 
            : null
           : <Alert severity="error">Error: Check your phone verification or address delivery!</Alert>
        }
         
      </>
  );
}

export default ProductsDialog;
