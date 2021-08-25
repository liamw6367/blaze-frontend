import React, {useState} from "react";
import axios from "axios";
import config from "../../../config";
import {useSelector, useDispatch} from "react-redux";

const LoginForm = ({aaa, ForgotPassOpen, localUser}) => {

    const dispatch = useDispatch()
    let [error, setError] = useState('')
    let [inputs, setInputs] = useState([
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
                    required: true,

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
        let email = inputs[0].value
        let password = inputs[1].value
        if (email && password) {
            if (inputs[0].isValid) {
                if (password.length >= 8) {
                    axios.post(`${config.url}auth/login`, {
                        email,
                        password,
                    }).then(res => {
                        let token = res.data.token;
                        axios.get('https://blaze123.herokuapp.com/api/auth/me', {
                            headers: {
                                'Authorization': token
                            }
                        })
                            .then(data => {
                                dispatch({
                                    type: 'SET_CUSTOMER',
                                    payload: data.data
                                })
                            })
                        window.localStorage.setItem('token', token);
                        localUser(token)
                        aaa()
                            .catch(err => {
                                console.log(err.response);
                            })

                    }).catch(err => {
                        console.log(err.response, err)
                        if (err) {
                            setError("Login or Password do not match")
                        }
                    })
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

    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)

    return (
        <>
            <form className='login__form' onSubmit={createAccount}>
                <label className='login__form__item'>
                    <span className='visually-hidden'>searchInp</span>
                    <input className='login__form__inp' type='email' placeholder='Email'
                           onChange={e => inputValue(e.target.value, 0)}/>
                </label>
                <label className='login__form__item'>
                    <span className='visually-hidden'>searchInp</span>
                    <input className='login__form__inp' type='password' placeholder='Password'
                           onChange={e => inputValue(e.target.value, 1)}/>
                </label>
                <p className='errorMessage'>{error}</p>

                <div className='login__form__bottom'>
                    <label className='BusinessRegistration__radioL'>
                        <span className='visually-hidden'>searchInp</span>
                        <input onClick={handleClick} defaultChecked={checked} type='checkbox' name="CompanyAddress"/>
                        <span className='checkmarkR'> </span>
                        <span className='login__form__checkBox__text'>Remember me</span>
                    </label>
                    <p className='bottom__text__link ' onClick={ForgotPassOpen}>Forgot Password?</p>
                </div>

                <button type='submit' className='login__submite'>Log in</button>
            </form>
        </>
    )
}

export default LoginForm
