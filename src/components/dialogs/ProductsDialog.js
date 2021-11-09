import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectTotalAmount } from '../../features/shoppingCartItems/shoppingCartItemsSlice';
import CartItem from '../CartItem';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import '../../scss/ProductsDialog.scss'
import { addCartItems } from '../../features/shoppingCartItems/shoppingCartItemsSlice'
import axios from "axios";
import jwtDecode from "jwt-decode";


function ProductsDialog() {
  const shoppingCartItems = useSelector(selectCartItems);
  const [cardItems,setCardItems] = useState()
  const token = localStorage.getItem('token')
  const [data,setData] = useState({product_orders:[]})
  const userId = jwtDecode(token).id
  console.log(userId)
  const productItems = localStorage?.getItem('products')
  // const dispatch = useDispatch()
  // const item = JSON.parse(productItems)
  // const items = [item]
 
  

  

  const products = useSelector(store => {
    return store.shoppingCartItem.cartItems
  })
    console.log(products, 'products')
  const totalAmount = useSelector(selectTotalAmount) || 0;
  
  let verified = useSelector(store => {
    return store.customer.verified || null
  });


  // useEffect(() => {
  //
  //   axios.get(`${process.env.REACT_APP_API_URL}/orders/get?user_id=${userId}&checked_out=0`)
  //       .then(res => {
  //         setData(res.data[0])
  //         console.log(res)
  //       })
  //       .catch(e => console.log(e))
  // },[])

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
          <p> {`${totalAmount}$`} </p>
        </div>
        <div>
          <p>Delivery Charges</p>
          <p className="delivery_color">+49$</p>
        </div>
      </div>
      {console.log(shoppingCartItems)}
      {shoppingCartItems.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      {/*{ data?.product_orders.map((products) => {*/}
      {/*  return <CartItem key={products.id} cartItem={products}/>*/}
      {/*})}*/}
      {token && products.length ? (
        <button
          onClick={checkoutPageRedirect}
          className="BestSavers__link BestSavers__link__card"
        >
          Shop Now
        </button>
      ) : null}
      <Link to="/profile">
        {alert && (
          <Alert severity="error">
            {!delAddresses && verified && <Link to='/profile' className="delivery_error">"Check your address delivery!"</Link>}
            {!verified && delAddresses && <Link to='/profile' className="delivery_error">"Check your phone verification"</Link>}
            {!delAddresses &&
              !verified &&
              <Link to='/profile' className="delivery_error">
               "Check your phone verification and address delivery!" 
              </Link>}
          </Alert>
        )}
      </Link>
    </>
  );
}

export default ProductsDialog;
