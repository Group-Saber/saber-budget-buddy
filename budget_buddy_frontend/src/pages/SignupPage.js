import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignupPage = () => {
    let [email, setEmail] =  useState('')
    let [password, setPassword] =  useState('')
    let [repass, setRepass] =  useState('')
    let [first, setFirst] =  useState('')
    let [last, setLast] =  useState('')

    let signup = () => {
        if(email !== '' && password !== '' && repass !== '' && first !== '' && last !== '') {
            const creds = {
                'email': document.getElementById('email').value,
                'password': document.getElementById('password').value,
                'first': document.getElementById('first').value,
                'last': document.getElementById('last').value,
            }

            fetch(`http://127.0.0.1:8000/app/signup/`, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(creds)
            })
        }
    }

    let handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value
        
        switch(id) {
            case 'first':
                setFirst(value)
                break
            case 'last':
                setLast(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            case 'repass':
                setRepass(value)
                break
        }
    }

    return (
        <div className='login-body'>
            <div className='login-info'>
                <div className='login-title'>Budget Buddy</div>
                <div className='login-sub'>Sign up</div>
                <div className='login-input'>
                    <label>First Name:</label>
                    <input id="first" type="text" onChange={handleChange}></input>
                </div>
                <div className='login-input'>
                    <label>Last Name:</label>
                    <input id="last" type="text" onChange={handleChange}></input>
                </div>
                <div className='login-input'>
                    <label>Email:</label>
                    <input id="email" type="email" onChange={handleChange}></input>
                </div>
                <div className='login-input'>
                    <label>Password:</label>
                    <input id="password" type="password" onChange={handleChange}></input>
                </div>
                <div className='login-input'>
                    <label>Retype Password:</label>
                    <input id="repass" type="password" onChange={handleChange}></input>
                </div>
                <div>
                    <button className='login-button'><Link to='/' className='login-link'>Login</Link></button>
                    <button className='login-button' onClick={signup}>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default SignupPage