import React, {useState} from 'react'
import axios from "axios";
import config from "../../config";

function NewPass(props) {
    // console.log(props, 'props');
    const [pass, setPass] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [error, setError] = useState('')
    let [inputs, setInputs] = useState([
            {
                isTuched: false,
                isValid: false,
                value: "",
                validation: {
                    required: true,

                }
            }, {
                isTuched: false,
                isValid: false,
                value: "",
                validation: {
                    required: true,

                }
            },

        ],
    )

    let handleChange = (value, id,f1) => {
        f1(value)
        setError('')
        console.log(value);
        const inpts = inputs
        const input = inpts[id]
        input.value = value
        input.isTuched = true
        Object.keys(input.validation).map((elm, index) => {
            if (elm === "required") {
                input.isValid = !(value === "" || value == null);
            }
        })
        setInputs(inpts)
    }


    let submit = (event) => {
        event.preventDefault();

        let password = inputs[0].value
        let confirm_password = inputs[1].value
        if (password && confirm_password) {
            if (password.length >= 8) {
                if (password === confirm_password) {
                    axios.put(`${config.url}forgot/password`, {
                        userId: props.res.userId,
                        token: props.res.token,
                        password: pass,
                        confirm_password: confirmPass
                    })
                        .then(res => {
                            props.NewPassOpen()
                            // console.log(res);
                        })
                        .catch(err => {
                            // console.log(err);
                        })
                }
                else {
                    setError('Passwords do not match')
                }
            } else {
                setError("Password length at least must be 8")

            }
        } else (
            setError("All fields are required")
        )
    }

    return (
        <div className={props.newPassActive ? 'modal-bg' : 'modal-bg--active'}>


            <section className='modalBanner'>
                <div className="modalContainer reset_container">
                    <h1 className='modalTitle'>Reset Password</h1>
                    <form className='modalForm'>
                        <label>
                            <input className='modalForm__inp' type='password' placeholder='Password'
                                   onChange={(e) => handleChange(e.target.value,0, setPass)}/>
                        </label>
                        <label>
                            <input className='modalForm__inp' type='password' placeholder='Confirm Password'
                                   onChange={(e) => handleChange(e.target.value,1, setConfirmPass)}/>
                        </label>
                        <button className='login__submite' onClick={submit}>Reset Password</button>
                        <p className='errorMessage'>{error}</p>
                    </form>
                </div>
            </section>

        </div>
    )
}

export default NewPass