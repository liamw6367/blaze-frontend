import React, {useState} from 'react'
import './../../scss/modal.scss'
import VerificationInput2 from '../VerificationInput2'
import axios from 'axios'
import jwtDecode from "jwt-decode";
import {useDispatch} from "react-redux";

function PhoneVerificationCode({
                                   PhoneVerificationCodeActive,
                                   PhoneVerificationOpen,
                                   PhoneVerificationCodeOpen,
                                   getResponse,
                               }) {
    const [code, setCode] = useState('')
    const [close,setClose] = useState(false)
    let [error, setError] = useState('')
    let [success, setSuccess] = useState('')
    const dispatch = useDispatch()

    let submit = (event) => {
        let token = localStorage.getItem('token');
        let userData = jwtDecode(token);
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/users/activate-profile`,
                {verification_code: code, user_id: userData.id},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((res) => {
                setSuccess('verification success')
              const token = res.data.token;
              const user = jwtDecode(token);
              console.log(user)
              setClose(true)
              dispatch({
                type: 'SET_CUSTOMER',
                payload: user,
              })

            })
            .catch((err) => {
                console.log(err.response, 'err')
                setError('The code is wrong')
            })
    }
    console.log(code)
    return (
        <div
            className={PhoneVerificationCodeActive && !close ? 'modal-bg' : 'modal-bg--active'}
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
                        <VerificationInput2 setCode={setCode}/>
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
