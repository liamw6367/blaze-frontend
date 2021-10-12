import React, {useState, useEffect} from "react";
import axios from "axios";
import config from "../../../config";
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux";

function SignUpDriver({ localUser}) {
    let [error, setError] = useState('')
    let [role_id,setRoleId] = useState('')
    let dispatch = useDispatch()
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
        
     useEffect(async () => {
        const response = await axios.get('http://54.245.154.47/users/get-roles', {
        })
            .then(response => {
                let id = Object.values(response.data[2])[0]
                setRoleId(id)
            })
            .catch(err => {
                console.log(err.response);
            })
  },[])

    let req = process.env.REACT_APP_API_URL
    let inputValue = (value, id) => {
        setError('')
        console.log(role_id)
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
        let first_name = inputs[0].value
        let last_name = inputs[1].value
        let username = inputs[2].value
        let address = inputs[3].value
        let phone = inputs[4].value
        let email = inputs[5].value
        let password = inputs[6].value
        let confirm_password = inputs[7].value


        if ( first_name && last_name && username && email && phone && address && password && confirm_password) {
            if (inputs[2].isValid) {
                if (password.length >= 8) {
                    if (password === confirm_password) {
                        axios.post(`${req}auth/register`, {
                            first_name,
                            last_name,
                            username,
                            email,
                            phone,
                            address,
                            password,
                            confirm_password,
                            role_id,

                        }).then(res => {
                            let token = jwt_decode(res.data.token)
                            dispatch({
                                type:'SET_CUSTOMER',
                                payload: token
                            })
                            window.localStorage.setItem('token', res.data.token);
                            localUser(token)
                            window.location.reload();
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
                <input className='login__form__inp' type='text' placeholder='first Name'
                       onChange={e => inputValue(e.target.value, 0)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='text' placeholder='Last Name'
                       onChange={e => inputValue(e.target.value, 1)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='text' placeholder='Username'
                       onChange={e => inputValue(e.target.value, 2)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='text' placeholder='Address'
                       onChange={e => inputValue(e.target.value, 3)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='number' placeholder='Phone'
                       onChange={e => inputValue(e.target.value, 4)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='email' placeholder='Email'
                       onChange={e => inputValue(e.target.value, 5)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='password' placeholder='Password'
                       onChange={e => inputValue(e.target.value, 6)}/>
            </label>
            <label className='login__form__item'>
                <input className='login__form__inp' type='password' placeholder='Confirm Password'
                       onChange={e => inputValue(e.target.value, 7)}/>
            </label>
            <p className='errorMessage'>{error}</p>
            <button type='submit' className='login__submite'>Log in</button>
        </form>
    )
}
export default SignUpDriver
