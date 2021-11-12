import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectCartItems, selectTotalAmount} from '../../features/shoppingCartItems/shoppingCartItemsSlice';
import CartItem from '../CartItem';
import {useHistory} from 'react-router';
import Alert from '@material-ui/lab/Alert';
import '../../scss/ProductsDialog.scss'
import { addCartItems, clearCard } from '../../features/shoppingCartItems/shoppingCartItemsSlice'
import axios from "axios";
import jwtDecode from "jwt-decode";
import Login from '../modals/login';
import SignUp from '../modals/signUp';
import ForgotPass from '../modals/forgotPass';
import NewPass from '../modals/resetPass';
import VerifyCode from '../modals/verifyCode';


function ProductsDialog() {
    const products = useSelector(store => {
        return JSON.parse(JSON.stringify(store.shoppingCartItem.cartItems))
    });

    const userId = useSelector(store => {
      return store.customer.id
    })
 

    console.log(products, 'shopCardItem')

    const [loginActiv, setLoginActiv] = useState(false)
    const [signUpActiv, setSignUpActiv] = useState(false)
    const [forgotActive, setForgotActive] = useState(false)
    const [newPassActive, setNewPassActive] = useState(false)
    const [verifyCodeActive, setVerifyCodeActive] = useState(false)
    const [res, setRes] = useState({})

    const loginOpen = () => {
      setLoginActiv(!loginActiv)
      setSignUpActiv(false)
      setForgotActive(false)
      setVerifyCodeActive(false)
  }
  const SignUpOpen = () => {
      setSignUpActiv(!signUpActiv)
      setLoginActiv(false)
      setForgotActive(false)
      setVerifyCodeActive(false)
  }

  const ForgotPassOpen = () => {
      setForgotActive(!forgotActive)
      setLoginActiv(false)
      setSignUpActiv(false)
      setVerifyCodeActive(false)
  }

  const VerifyCodeOpen = () => {
      setVerifyCodeActive(!verifyCodeActive)
      setLoginActiv(false)
      setSignUpActiv(false)
      setForgotActive(false)
  }

  const NewPassOpen = () => {
      console.log(newPassActive, 'newPassActive')
      setNewPassActive(!newPassActive)
      setLoginActiv(false)
      setSignUpActiv(false)
      setForgotActive(false)
      setVerifyCodeActive(false)
  }
    
  let [token, setToken] = useState(
    window.localStorage.getItem('token')
        ? window.localStorage.getItem('token')
        : null
)

  
// if (token) {
//   userId = jwtDecode(token).id
// }

    const bbb = () => {
      setLoginActiv(false)
  }
  

  let setLocalStorage = (token) => {
    saveProdcuts(null,null)
    setToken(token)
    history.push('/checkout')
  }

  let getResponse = (userId, token) => {
      setRes({userId, token})
  }



    const [cardItems, setCardItems] = useState()
    const [data, setData] = useState({product_orders: []})
    const order_id = localStorage.getItem('order_id')

    const dispatch = useDispatch()
    const productItems = localStorage?.getItem('products')
    
   


    const prod = useSelector(store => {
        return console.log(store.shoppingCartItem)
    })
    console.log(prod)
    console.log(products, 'products')
    const totalAmount = useSelector(selectTotalAmount) || 0;

    let verified = useSelector(store => {
        return store.customer.verified || null
    });

    let delAddresses = useSelector(store => {
        return store.customer.delivery_addresses?.length || null
    });

    const [alert, setAlert] = useState(false)

    const history = useHistory()

    function checkoutPageRedirect(e) {
        if (!token){
          loginOpen();
          saveProdcuts(e,true)
        }
        else if (!delAddresses || !verified) {
            setAlert(true)
        } else {

            setAlert(false)
            saveProdcuts(e,true)
        }
    }

    function saveProdcuts(e, checkout = false) {
   
        console.log(products)
        e?.preventDefault()

        const obj = {
            user_id: userId,
            products: JSON.parse(JSON.stringify(products)),
            total_price: 1,
            checked_out: 0,
            order_id: order_id || ''
        };

        axios.post(`${process.env.REACT_APP_API_URL}/orders/add`, obj)
            .then(res => {
                console.log(res.data[0])
                res.data[0].product_orders.map(i => {
                  dispatch(clearCard())
                    dispatch(addCartItems({
                        ...i,
                        amount: i.orders_products.amount
                    }))
                })
                localStorage.setItem('order_id', res.data[0]?.id)
                if(checkout){
                    history.push('/checkout')
                }
            })
            .catch(e => console.log(e))
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
        {console.log(products)}
        {products.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
        {/*{ data?.product_orders.map((products) => {*/}
        {/*  return <CartItem key={products.id} cartItem={products}/>*/}
        {/*})}*/}
        {products.length ? (
          <>
            <button
              onClick={checkoutPageRedirect}
              className="BestSavers__link BestSavers__link__card"
            >
              Shop Now
            </button>
            {token && (
              <button type="submit" onClick={saveProdcuts}>
                save
              </button>
            )}
          </>
        ) : null}
        <Link to="/profile">
          {alert && (
            <Alert severity="error">
              {!delAddresses && verified && (
                <Link to="/profile" className="delivery_error">
                  "Check your address delivery!"
                </Link>
              )}
              {!verified && delAddresses && (
                <Link to="/profile" className="delivery_error">
                  "Check your phone verification"
                </Link>
              )}
              {!delAddresses && !verified && (
                <Link to="/profile" className="delivery_error">
                  "Check your phone verification and address delivery!"
                </Link>
              )}
            </Alert>
          )}
        </Link>
        <Login
          aaa={bbb}
          loginActiv={loginActiv}
          loginOpen={loginOpen}
          signUpActiv={signUpActiv}
          SignUpOpen={SignUpOpen}
          ForgotPassOpen={ForgotPassOpen}
          localToken={setLocalStorage}
        />
        <SignUp
          aaa={bbb}
          loginActiv={loginActiv}
          loginOpen={loginOpen}
          signUpActiv={signUpActiv}
          SignUpOpen={SignUpOpen}
          localToken={setLocalStorage}
        />
        <ForgotPass
          forgotActive={forgotActive}
          ForgotPassOpen={ForgotPassOpen}
          VerifyCodeOpen={VerifyCodeOpen}
        />
        <NewPass
          newPassActive={newPassActive}
          NewPassOpen={NewPassOpen}
          res={res}
        />
        <VerifyCode
          verifyCodeActive={verifyCodeActive}
          VerifyCodeOpen={VerifyCodeOpen}
          NewPassOpen={NewPassOpen}
          getResponse={getResponse}
        />
      </>
    );
}

export default ProductsDialog;