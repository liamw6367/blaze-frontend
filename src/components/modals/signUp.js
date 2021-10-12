import React, {useState, useEffect} from 'react'
import './../../scss/modal.scss'
import faceI from './../../assets/images/faceIcon.png'
import GoogleI from './../../assets/images/googleIcon.png'
import AppleI from './../../assets/images/appleIcon.png'
import SignUpCostumer from './component/SignUpCostumer'
import SignUpDriver from './component/SignUpDriver'
import axios  from 'axios'

function SignUp({aaa, signUpActiv, loginOpen, SignUpOpen, localToken}) {

    let [tab, setTab] = useState(true)

    return (
        <div className={signUpActiv ? 'modal-bg' : 'modal-bg--active'} onClick={SignUpOpen}>
            <section className='login' onClick={(e) => {
                e.stopPropagation();
            }}>
                <h1 className='login__title'>Sign up with <span className='login__title__logo'>Blaze</span></h1>
                <div className="registerAs_checkbox">
                    <label onClick={() => setTab(true)} className='setTab_content' >
                        <input type="radio" name="setTabVal" defaultChecked={tab}/>
                        Costumer
                    </label>
                    <label onClick={() => setTab(false)} className='setTab_content'>
                        <input type="radio" name="setTabVal" defaultChecked={!tab}/>
                        Driver
                    </label>
                </div>
                <button className='login__continue__btn--f'><img alt='' src={faceI} className='login__continue__btn__img'/>Continue
                    with Facebook
                </button>
                <button className='login__continue__btn'><img alt='' src={GoogleI} className='login__continue__btn__img'/>Continue
                    with Google
                </button>
                <button className='login__continue__btn'><img alt='' src={AppleI} className='login__continue__btn__img'/>Continue
                    with Apple
                </button>
                <h2 className='login__title__OR'>OR</h2>

                {tab ?
                    <SignUpCostumer localUser={localToken} />
                    :
                    <SignUpDriver localUser={localToken} />
                }
                <p className='bottom__text'>Already have an account?<span className='bottom__text__link'
                                                                          onClick={loginOpen}>Log In</span>
                </p>

            </section>
        </div>
    )
}

export default SignUp
