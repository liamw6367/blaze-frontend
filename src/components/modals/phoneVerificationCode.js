import React, { useState } from 'react'
import './../../scss/modal.scss'
import VerificationInput2 from '../VerificationInput2'
import axios from 'axios'

function PhoneVerificationCode({
  PhoneVerificationCodeActive,
  PhoneVerificationOpen,
  PhoneVerificationCodeOpen,
  getResponse,
}) {
  const [code, setCode] = useState('')
  let [error, setError] = useState('')
  let [success, setSuccess] = useState('')

  let submit = (event) => {
    let token = localStorage.getItem('token')
    axios
      .put(
        'http://blazebeanstalk-env.eba-rn2hwvqp.us-west-2.elasticbeanstalk.com/api/profile/activate',
        { verification_code: code },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setSuccess('verification success')
      })
      .catch((err) => {
        console.log(err.response, 'err')
        setError('The code is not correctly')
      })
  }
  console.log(code)
  return (
    <div
      className={PhoneVerificationCodeActive ? 'modal-bg' : 'modal-bg--active'}
      onClick={PhoneVerificationCodeOpen}
    >
      <section
        className="modalBanner login"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="modalContainer">
          <h1 className="modalTitle">
            Phone Number Verification{PhoneVerificationCodeActive}
          </h1>
          <h2 className="modalSubTitle">
            Enter 4 digit code sent to your phone <span></span>
          </h2>
          <form className="modalForm">
            <VerificationInput2 setCode={setCode} />
            <p className="errorMessage ">{error}</p>
            <p className="success ">{success}</p>
            <button
              type="button"
              className="modalSubmit"
              onClick={() => submit()}
            >
              Next
            </button>
            <button
              type="submit"
              className="modalBack"
              onClick={PhoneVerificationCodeOpen}
            >
              <span>&#8249;</span> Back
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default PhoneVerificationCode
