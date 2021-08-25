import React, { useState } from 'react'
import VerificationInput from '../VerificationInput'
import './../../scss/modal.scss'
import axios from 'axios'
import config from '../../config'

function VerifyCode({
  verifyCodeActive,
  VerifyCodeOpen,
  NewPassOpen,
  getResponse,
}) {
  const [code, setCode] = useState('')
  let [error, setError] = useState('')

  let submit = (event) => {
    event.preventDefault()
    axios
      .post(`${config.url}forgot/code`, { token: code })
      .then((res) => {
        console.log(res, 'res')
        getResponse(res.data.userId, res.data.token)
        NewPassOpen()
        console.log(res)
      })
      .catch((err) => {
        console.log(err.response, 'err')
        setError('The code is not correctly')
      })
  }

  return (
    <div
      className={verifyCodeActive ? 'modal-bg' : 'modal-bg--active'}
      onClick={VerifyCodeOpen}
    >
      <section
        className="modalBanner"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="modalContainer verify_code_container">
          <h1 className="modalTitle">Verify Code</h1>
          <form className="modalForm" onSubmit={(e) => submit(e)}>
            <VerificationInput setCode={setCode} />
            <p className="errorMessage ">{error}</p>
            <button type="submit" className="modalSubmit ">
              Verify
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default VerifyCode
