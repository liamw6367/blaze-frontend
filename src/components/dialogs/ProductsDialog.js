import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
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
  
  let phoneVerified = useSelector(store => {
    return store.customer.verified;
  });

  let deliveryAddresses = useSelector(store => {
    return store.customer.delivery_addresses.length;
  });

  const Expire = props => {
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
      }, props.delay);
    }, [props.delay]);
  
    return visible ? <div>{props.children}</div> : <div />;
  };

  return (
    <>
      <div className="head_banner">
        <div>
          <p>Sub Total</p>
          <p> {`${totalAmount}$`} </p>
        </div>
        <div>
          <p>Delivery Charges</p>
          <p className="delivery_color">+49$</p>
        </div>
      </div>
      {shoppingCartItems.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      {phoneVerified && deliveryAddresses ? (
        token && products.length ? (
          <Link
            to="/checkout"
            className="BestSavers__link BestSavers__link__card "
          >
            Shop Now
          </Link>
        ) : null
      ) : (
        <Expire delay="10000">
          <Link to="/profile">
            <Alert severity="error">
              Check phone verification or address delivery in user profile page!
            </Alert>
          </Link>
        </Expire>
      )}
    </>
  );
}

export default ProductsDialog;
