import React, { useState } from 'react'
import './../../scss/modal.scss'
import axios from 'axios'

function PhoneVerification({
  PhoneVerificationActive,
  PhoneVerificationOpen,
  PhoneVerificationCodeOpen,
}) {
  // const [email, setEmail] = useState('')
  const [phone, setNumber] = useState('')

  const phoneVerificatioN = (event) => {
    event.preventDefault()
    // const re = '[0 - 9]'
    // let phone_valid = re.test(number)
    // console.log(phone_valid)
    console.log(phone, 'llllllllllllooooooooooo')
    //if (number) {
    let token = localStorage.getItem('token')
    axios
      .put(
        'http://blazebeanstalk-env.eba-rn2hwvqp.us-west-2.elasticbeanstalk.com/api/profile/send_activation_code',
        {
          phone: '+' + phone,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res)
        PhoneVerificationCodeOpen()
        console.log(phone, 'Numbeeer')
      })
      .catch((err) => {
        console.log(err.response)
        setError('Phone Number not found')
      })
    //} else {
    //  setError('Incorrect Phone Number')
    // }
  }
  /*
  const phoneVerificatioN = (event) => {
    event.preventDefault()
    PhoneVerificationOpen()
  }
*/
  let [error, setError] = useState('')

  return (
    <div
      className={PhoneVerificationActive ? 'modal-bg' : 'modal-bg--active'}
      onClick={PhoneVerificationOpen}
    >
      <section
        className="modalBanner login"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="modalContainer">
          <h1 className="modalTitle">Phone Number Verification</h1>
          <h2 className="modalSubTitle">
            Enter your phone number <span>to Login/Sign up</span>
          </h2>
          <form className="modalForm" onSubmit={phoneVerificatioN}>
            <label>
              <input
                className="modalForm__inp"
                type="number"
                placeholder="+91"
                onChange={(e) => {
                  setError('')
                  setNumber(e.target.value)
                }}
              />
            </label>
            <button
              type="button"
              className="modalSubmit"
              onClick={phoneVerificatioN}
            >
              Sign Up
            </button>
            <p className="errorMessage">{error}</p>
          </form>
        </div>
      </section>
    </div>
  )
}

export default PhoneVerification
