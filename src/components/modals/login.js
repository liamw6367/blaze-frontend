import React from 'react'
import './../../scss/modal.scss'
import faceI from './../../assets/images/faceIcon.png'
import GoogleI from './../../assets/images/googleIcon.png'
import AppleI from './../../assets/images/appleIcon.png'

import LoginForm from './component/LoginForm'

function Login({aaa,loginActiv, loginOpen, SignUpOpen,ForgotPassOpen, localToken}) {

    return (
        <div className={loginActiv ? 'modal-bg' : 'modal-bg--active'} onClick={loginOpen}>
            <section className='login' onClick={(e) => {
                e.stopPropagation();
            }}>
                <h1 className='login__title'>Log In to <span className='login__title__logo'>Blaze</span></h1>
                <button className='login__continue__btn--f'><img src={faceI} className='login__continue__btn__img' alt=''/>Continue
                    with Facebook
                </button>
                <button className='login__continue__btn'><img src={GoogleI} className='login__continue__btn__img' alt=''/>Continue
                    with Google
                </button>
                <button className='login__continue__btn'><img src={AppleI} className='login__continue__btn__img' alt=''/>Continue
                    with Apple
                </button>
                <h2 className='login__title__OR'>OR</h2>

                <LoginForm aaa={aaa} ForgotPassOpen={ForgotPassOpen} localUser={localToken}/>

                <p className='bottom__text'>Don't have an account?<span className='bottom__text__link '
                                                                        onClick={SignUpOpen}>Sign Up</span></p>

            </section>
        </div>
    )
}

export default Login