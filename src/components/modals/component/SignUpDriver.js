import React, {useState} from "react";
import axios from "axios";
import config from "../../../config";

function SignUpDriver({loginOpen}) {
    let [error, setError] = useState('')
    let [inputs, setInputs] = useState([
            {
                isTuched: false,
                isValid: false,
                value: "",
                validation: {
                    required: true
                }
            },
            {
                isTuched: false,
                isValid: false,
                value: "",
                validation: {
                    required: true
                }
            },
            {
                isTuched: false,
                isValid: false,
                value: "",
                validation: {
                    required: true,
                    email: true
                }
            },
            {
                isTuched: false,
                isValid: false,
                value: "",
                validation: {
                    required: true
                }
            },
            {
                isTuched: false,
                isValid: false,
                value: "",
                validation: {
                    required: true
                }
            },
            {
                isTuched: false,
                isValid: false,
                value: "",
                validation: {
                    required: true
                }
            },
            {
                isTuched: false,
                isValid: false,
                value: "",
                validation: {
                    required: true
                }
            },
        ],
    )

    let inputValue = (value, id) => {
        setError('')
        const inpts = inputs
        const input = inpts[id]
        input.value = value
        input.isTuched = true
        Object.keys(input.validation).map((elm, index) => {
            if (elm === "required") {
                input.isValid = !(value === "" || value == null);
            } else if (elm === "email") {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                input.isValid = re.test(value);
            }
        })
        setInputs(inpts)
    }
    let createAccount = (e) => {
        e.preventDefault()
        let name = inputs[0].value
        let user_name = inputs[1].value
        let email = inputs[2].value
        let phone = inputs[3].value
        let address = inputs[4].value
        let password = inputs[5].value
        let confirm_password = inputs[6].value


        if (name && user_name && email && phone && address && password && confirm_password) {
            if (inputs[2].isValid) {
                if (password.length >= 8) {
                    if (password === confirm_password) {
                        axios.post(`${config.url}`, {}).then(res => {
                            console.log(res,'res')
                        }).catch(err => {
                            console.log(err.response, 'err')
                        })
                    } else {
                        setError("Password mismatch")
                    }
                } else {
                    setError("Password length at least must be 8")
                }
            } else {
                setError("Incorrect email")
            }
        } else {
            setError("All fields are required")
        }
    }

    return (
        <form className='login__form' onSubmit={createAccount}>
            <label className='login__form__item'>
                <input className='login__form__inp' type='text' placeholder='Name'
                       onChange={e => inputValue(e.target.value, 0)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='text' placeholder='Username'
                       onChange={e => inputValue(e.target.value, 1)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='email' placeholder='Email'
                       onChange={e => inputValue(e.target.value, 2)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='number' placeholder='Phone'
                       onChange={e => inputValue(e.target.value, 3)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='text' placeholder='Address'
                       onChange={e => inputValue(e.target.value, 4)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='password' placeholder='Password'
                       onChange={e => inputValue(e.target.value, 5)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='password' placeholder='Confirm Password'
                       onChange={e => inputValue(e.target.value, 6)}/>
            </label>
            <p className='errorMessage'>{error}</p>
            <button type='submit' className='login__submite'>Log in</button>
        </form>
    )
}
export default SignUpDriver
