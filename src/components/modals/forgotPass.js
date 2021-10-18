import React, {useState} from 'react'
import './../../scss/modal.scss'
import axios from "axios";
import config from "../../config";


function ForgotPass({forgotActive, ForgotPassOpen, VerifyCodeOpen}) {
    let [email, setEmail] = useState('')

    const forgotPass = (event) => {
        event.preventDefault();
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email_valid = re.test(email);
        console.log(email_valid);
        if (email_valid) {
            axios.post(`${process.env.REACT_APP_API_URL}/auth/send-forgot-pass-email`, {
                email
            }).then((res) => {
                VerifyCodeOpen()
                localStorage.setItem('forgot-email', email)
            }).catch((err) => {
                setError('User not found')
            })
        } else {
        setError('Incorrect email')
        }

    }

    let [error, setError] = useState('')


    return (
        <div className={forgotActive ? 'modal-bg' : 'modal-bg--active'} onClick={ForgotPassOpen}>
            <section className='modalBanner' onClick={(e) => {
                e.stopPropagation();
            }}>
                <div className="modalContainer">
                    <h1 className='modalTitle'>Forgot Password</h1>
                    <form className='modalForm' onSubmit={forgotPass}>

                        <label>
                            <input className='modalForm__inp' type='email' placeholder='example@gmail.com' name='email'
                                   onChange={(e) => {
                                       setError('')
                                       setEmail(e.target.value)
                                   }}/>
                        </label>

                        {/*<button type='submit' className='modalSubmit' onClick={VerifyCodeOpen}>Forgot Password</button>*/}
                        <button type='submit' className='login__submite' onClick={forgotPass}>Forgot Password
                        </button>
                        <p className='errorMessage'>{error}</p>


                    </form>
                </div>
            </section>
        </div>
    )
}

export default ForgotPass