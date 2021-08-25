import React, { useState } from 'react'
import axios from 'axios'
import config from '../../../config'

function SignUpCostumer({ loginOpen }) {
  let [error, setError] = useState('')
  let [inputs, setInputs] = useState([
    {
      isTuched: false,
      isValid: false,
      value: '',
      validation: {
        required: true,
      },
    },
    {
      isTuched: false,
      isValid: false,
      value: '',
      validation: {
        required: true,
        email: true,
      },
    },
    {
      isTuched: false,
      isValid: false,
      value: '',
      validation: {
        required: true,
      },
    },
    {
      isTuched: false,
      isValid: false,
      value: '',
      validation: {
        required: true,
      },
    },
  ])

  let inputValue = (value, id) => {
    setError('')
    const inpts = inputs
    const input = inpts[id]
    input.value = value
    input.isTuched = true
    Object.keys(input.validation).map((elm, index) => {
      if (elm === 'required') {
        input.isValid = !(value === '' || value == null)
      } else if (elm === 'email') {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        input.isValid = re.test(value)
      }
    })
    setInputs(inpts)
  }

  let createAccount = () => {
    let username = inputs[0].value
    let email = inputs[1].value
    let password = inputs[2].value
    let confirm_password = inputs[3].value

    if (username && email && password && confirm_password) {
      if (inputs[1].isValid) {
        if (password.length >= 8) {
          if (password === confirm_password) {
            console.log(username, email, password, confirm_password)
            console.log(config.url, 'URL')
            axios
              .post(`${config.url}auth/register`, {
                username,
                email,
                password,
                confirm_password,
              })
              .then((res) => {
                loginOpen()
                console.log(res, 'res')
              })
              .catch((err) => {
                console.log(err.response, 'err')
              })
          } else {
            setError('Password mismatch')
          }
        } else {
          setError('Password length at least must be 8')
        }
      } else {
        setError('Incorrect email')
      }
    } else {
      setError('All fields are required')
    }
  }

  const signUp = (event) => {
    event.preventDefault()
    loginOpen()
  }

  return (
    <form className="login__form" onSubmit={(e) => signUp(e)}>
      <label className="login__form__item">
        <input
          className="login__form__inp"
          type="text"
          placeholder="Username"
          onChange={(e) => inputValue(e.target.value, 0)}
        />
      </label>
      <label className="login__form__item">
        <input
          className="login__form__inp"
          type="email"
          placeholder="Email"
          onChange={(e) => inputValue(e.target.value, 1)}
        />
      </label>
      <label className="login__form__item">
        <input
          className="login__form__inp"
          type="password"
          placeholder="Password"
          onChange={(e) => inputValue(e.target.value, 2)}
        />
      </label>
      <label className="login__form__item">
        <input
          className="login__form__inp"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => inputValue(e.target.value, 3)}
        />
      </label>
      <p className="errorMessage">{error}</p>
      <button type="button" onClick={createAccount} className="login__submite">
        Sign Up
      </button>
    </form>
  )
}

export default SignUpCostumer
