import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import './../scss/slider.scss'
import { Link } from 'react-router-dom'
import OWLcorusel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router'
import Login from './modals/login'
import SignUp from './modals/signUp'
import ForgotPass from './modals/forgotPass'
import VerifyCode from './modals/verifyCode'
import NewPass from './modals/resetPass'

const options = {
  responsive: {
    0: {
      items: 1,
      // margin: 1,
    },
    400: {
      items: 1,
      // margin: 1,
    },
    650: {
      items: 2,
      // margin: 20,
    },
    1000: {
      items: 3,
      // margin: 20,
    },
  },
}
  
function Slider() {
  const dispatch = useDispatch()
  const sliderItems = useSelector((store) => {
    return store.sliderItems
  })
  const user = useSelector(store => store.customer)
  const history = useHistory()
  const [loginActiv, setLoginActiv] = useState(false)
  const [signUpActiv, setSignUpActiv] = useState(false)
  const [forgotActive, setForgotActive] = useState(false)
  const [newPassActive, setNewPassActive] = useState(false)
  const [verifyCodeActive, setVerifyCodeActive] = useState(false)
  const [cardActiv, setCardActiv] = useState(false)
  const [mapActiv, setmapActiv] = useState(false)
  const [locationChange, setLocationChange] = useState(false)
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
    history.push('/category')
  }
  
  let getResponse = (userId, token) => {
    setRes({ userId, token })
  }
  console.log(user.id)

  function categoryPage() {
    history.push('/category')
  }


  useEffect(async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/get`, {
        })
            .then(response => {
                dispatch({
                    type: 'SLIDER_ITEMS',
                    payload: response.data
                })
            })
            .catch(err => {
                console.log(err.response);
            })
           
  },[])


  return (
    <section className="productsSlider wrapper">
      {sliderItems.length ? (
        <OWLcorusel
        items="3"
        autoplay
        autoplayHoverPause
        dots
        loop
        responsive={options.responsive}
        margin={20}
      >
        { sliderItems.map((item) => {
         return (
            <div className="sliderItem" key={item.id}>
              <div className="sliderItem__content">
                <h3 className="sliderItem__title">{item.name}</h3>
                 <h3 className="sliderItem__subTitle">40% OFF</h3>
                   <button onClick={user.id ? categoryPage : loginOpen} className="BestSavers__link">
                    Shop Now
                   </button>
             </div>
                <img src={`${process.env.REACT_APP_API_URL}/uploads/product_images/${item.image}`} className='sliderItem__img '/>
               </div>
         )
                  })
      }
      </OWLcorusel>
      ): ''}
  
        {/* {ProductsElement} */}
 
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
      
    </section>
  )
}

export default Slider
