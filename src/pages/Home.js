import React, { useState } from 'react'
import './../scss/home.scss'
import Footer from '../components/Footer';
import BestOffers from '../components/bestOffers';
import BestEveryday from '../components/bestEveryday';
import BestSavers from '../components/bestSavers';
import ShopByCategory from '../components/shopByCategory';
import Slider from '../components/slider';
import Navbar from "../components/Navbar";
import test1 from './../assets/images/welcome.png'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Login from '../components/modals/login'
import SignUp from '../components/modals/signUp'
import ForgotPass from '../components/modals/forgotPass'
import VerifyCode from '../components/modals/verifyCode'
import NewPass from '../components/modals/resetPass'


function Home() {
    const user_id = useSelector(store => store.customer.id)
    const history = useHistory()
    
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
    
      let setLocalStorage = (token) => {
        setToken(token)
        console.log('aaapopp')
      }
      
      let getResponse = (userId, token) => {
        setRes({ userId, token })
      }
    
      function categoryPage() {
        history.push('/category')
      }
  

    return (
        <div className='home'>
            <Navbar isLoggedIn={true} />
            <div className='welcome'>
                <div className='wrapper welcome__container'>
                    <h2 className='welcome__title'>Lorem Ipsum is simply dummye <br/> typesetting industry. </h2>
                    <h3 className='welcome__title'>ON 200 + BIG BRANDS</h3>
                    <button  onClick={user_id ? categoryPage : loginOpen} className='home__link'>Shop Now</button>
                    <img src={test1} className='welcomebgImg'/>
                </div>
            </div>       
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
            <Slider/>
            <ShopByCategory/>
            <BestSavers/>
            <BestEveryday/>
            <BestOffers/>
            <Footer/>
            
        </div>
    )
}

export default Home