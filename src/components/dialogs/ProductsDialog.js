import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectTotalAmount } from '../../features/shoppingCartItems/shoppingCartItemsSlice';
import CartItem from '../CartItem';
import Login from '../modals/login';
import SignUp from '../modals/signUp';
import ForgotPass from '../modals/forgotPass';
import NewPass from '../modals/resetPass';
import VerifyCode from '../modals/verifyCode';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import '../../scss/ProductsDialog.scss'


function ProductsDialog() {
  const shoppingCartItems = useSelector(selectCartItems);
  let [token, setToken] = useState(
    window.localStorage.getItem('token')
      ? window.localStorage.getItem('token')
      : null
  )
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

  const [alert,setAlert] = useState(false);
  const [loginActiv, setLoginActiv] = useState(false);
  const [signUpActiv, setSignUpActiv] = useState(false);
  const [forgotActive, setForgotActive] = useState(false);
  const [verifyCodeActive, setVerifyCodeActive] = useState(false);
  const [newPassActive, setNewPassActive] = useState(false);
  const [res, setRes] = useState({});

  const history = useHistory()

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

  let setLocalStorage = (token) => {
    setToken(token)
    console.log('aaapopp')
  }

  const bbb = () => {
    setLoginActiv(false)
  }

  let getResponse = (userId, token) => {
    setRes({ userId, token })
  }

  function checkoutPageRedirect() {
    if (!token) {
      loginOpen();
    }
    else if (!delAddresses || !verified) {
      setAlert(true);
    } else {
      setAlert(false);
      history.push("/checkout");
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
      {shoppingCartItems.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      {products.length ? (
        <button
          onClick={checkoutPageRedirect}
          className="BestSavers__link BestSavers__link__card"
        >
          <Link to='/checkout' className="link">
            Shop Now
          </Link>
        </button>
      ) : null}
      <Link to="/profile">
        {alert && (
          <Alert severity="error">
            {!delAddresses && verified && "Check your address delivery!"}
            {!verified && delAddresses && "Check your phone verification"}
            {!delAddresses &&
              !verified &&
              "Check your phone verification and address delivery!"}
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
