import React, { useState } from 'react'
import './../scss/navbar.scss'
import './../scss/CartItem.scss'
import { Link } from 'react-router-dom'
import logo from './../assets/images/logo.png'
import mapIcon from './../assets/images/map-pin.png'
import loginArrow from './../assets/images/loginArrow.png'
import { ReactComponent as Path1 } from './../assets/images/user.svg'
import { ReactComponent as Path2 } from './../assets/images/cart.svg'
import { ReactComponent as Path3 } from './../assets/images/search.svg'
import Login from './modals/login'
import Card from './modals/card'
import SignUp from './modals/signUp'
import Location from './modals/location'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import CartItem from './CartItem'
import ForgotPass from './modals/forgotPass'
import VerifyCode from './modals/verifyCode'
import NewPass from './modals/resetPass'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import axios from 'axios'
import config from '../config'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

function Navbar() {
  let customer = useSelector((store) => {
    return store.customer
  })
  const ROUT = customer.user_role?.name
  const history = useHistory()
  const pathName = history.location.pathname
  const [hamburgerActiv, setHamburgerActiv] = useState(false)
  const [loginActiv, setLoginActiv] = useState(false)
  const [signUpActiv, setSignUpActiv] = useState(false)
  const [forgotActive, setForgotActive] = useState(false)
  const [newPassActive, setNewPassActive] = useState(false)
  const [verifyCodeActive, setVerifyCodeActive] = useState(false)
  const [cardActiv, setCardActiv] = useState(false)
  const [mapActiv, setmapActiv] = useState(false)
  const [locationChange, setLocationChange] = useState(false)
  const [res, setRes] = useState({})

  const hamburgerOpen = () => {
    setHamburgerActiv(!hamburgerActiv)
  }

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
  const cardOpen = () => {
    setCardActiv(!cardActiv)
  }
  const mapOpen = () => {
    setmapActiv(!mapActiv)
    setLocationChange(false)
  }

  /**********************************************/
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  let [token, setToken] = useState(
    window.localStorage.getItem('token')
      ? window.localStorage.getItem('token')
      : null
  )

  const bbb = () => {
    setLoginActiv(false)
  }

  let getResponse = (userId, token) => {
    setRes({ userId, token })
  }
  function handleRout () {
    if(ROUT === 'driver') {
      return '/profile-driver'
    }else {
      return '/profile'
    }
  }
  // const [number, setNumber] = useState(0)
  /**********************************************/

  let setLocalStorage = (token) => {
    setToken(token)
    console.log('aaapopp')
  }
  let logOut = (e) => {
    console.log(config, 'Config')
        setToken('')
        window.localStorage.removeItem('token')
        history.push('/')
        window.location.reload()
  }

  function myAccount(){
    if(pathName === '/profile-driver' || pathName === '/profile') {
      return ''
    }else {
      return (
            <Link to="/" className="__link menu_navigation__link">
              <MenuItem><Link style={ {color: '#000' }} classname='login_user' to={handleRout}>My Account</Link></MenuItem>
            </Link>
      )
    }
  }

  return (
    <>
      <section className="menu">
        <div className="menu-container">
          <div className="menu-container__logo">
            <Link to="/" className="menu__logo">
              <img src={logo} alt="" />
            </Link>
            <div className="menu-container__map" onClick={mapOpen}>
              <img src={mapIcon} className="menu-container__map__icon" alt="" />
              <p className="menu-container__map__text">Balaiya Garden</p>
              <img
                src={loginArrow}
                className="menu-container__map__arrow"
                alt=""
              />
            </div>
          </div>
          <div className="menu__navigation">
            <div className="menu__navigation__item">
              <Path3 className="menu-icons" />
              <p>Search</p>
            </div>
            {token ? (
              <div className=" login_user menu__navigation__item">
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Button
                        variant="contained"
                        className="user_profile_btn"
                        {...bindTrigger(popupState)}
                      >
                        <Path1 className="menu-icons" />
                        <p style={{ color: '#FF8400' }}>{customer.first_name}</p>
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        {/*onClick={popupState.close}*/}
                        {myAccount()}
                        <MenuItem onClick={logOut}>Log Out</MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </div>
            ) : (
              <div
                className="no_login_user menu__navigation__item"
                onClick={loginOpen}
              >
                <Path1 className="menu-icons" />
                <p>Login</p>
              </div>
            )}
            <button
              className=" menu__navigation__item selected_cart_items"
              onClick={handleClickOpen}
            >
              <Path2 className="menu-icons" />
              <p>My Cart (0)</p>
            </button>
          </div>
          <div className="hamburger-mb-menu" onClick={hamburgerOpen}>
            <span className={!hamburgerActiv ? 'hamburger1' : 'hamburger11'}>
              {' '}
            </span>
            <span className={!hamburgerActiv ? 'hamburger2' : 'hamburger22'}>
              {' '}
            </span>
            <span className={!hamburgerActiv ? 'hamburger3' : 'hamburger33'}>
              {' '}
            </span>
          </div>

          <div
            className={hamburgerActiv ? 'menu-blok-active' : 'menu-blok'}
            onClick={hamburgerOpen}
          >
            <div
              className="menu-blok__container"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Link to="/" className="menu__logo">
                <img src={logo} alt="" />
              </Link>

              <div className="menu__navigation__item">
                <Path3 className="menu-icons" />
                <p>Search</p>
              </div>
              {token ? (
                <>
                  <div className=" login_user menu__navigation__item">
                    <Path1 className="menu-icons" />
                    <p style={{ color: '#FF8400' }}>John Smith</p>
                  </div>
                </>
              ) : (
                <div
                  className="no_login_user menu__navigation__item"
                  onClick={loginOpen}
                >
                  <Path1 className="menu-icons" />
                  <p>Login</p>
                </div>
              )}
              <button
                className=" menu__navigation__item selected_cart_items"
                onClick={handleClickOpen}
              >
                <Path2 className="menu-icons" />
                <p>My Cart (0)</p>
              </button>
            </div>
          </div>
        </div>
      </section>
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

      <Card cardActiv={cardActiv} cardOpen={cardOpen} />
      <Location
        mapOpen={mapOpen}
        mapActiv={mapActiv}
        locationChange={locationChange}
        setLocationChange={setLocationChange}
      />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="dialog-title">
          My Cart(3 items)
          <DialogActions>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </DialogActions>
        </DialogTitle>
        <DialogContent id="dialogContent">
          <div className="head_banner">
            <div>
              <p>Sub Total</p>
              <p>454$</p>
            </div>
            <div>
              <p>Delivery Charges</p>
              <p className="delivery_color">+49$</p>
            </div>
          </div>
          <CartItem />
          <CartItem />
          <CartItem />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Navbar
