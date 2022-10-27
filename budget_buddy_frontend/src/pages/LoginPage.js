import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let login = () => {
        if(email !== '' && password !== '') {
            const creds = {
                'email': document.getElementById('email').value,
                'password': document.getElementById('password').value,
            }

            fetch(`http://127.0.0.1:8000/app/login/`, {
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
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
        }
    }

    return (
        <div className='login-body'>
            <div className='login-info'>
                <div className='login-title'>Budget Buddy</div>
                <div className='login-sub'>Log in</div>
                <div className='login-input'>
                    <label>Email:</label>
                    <input id="email" type="email" onChange={handleChange}></input>
                </div>
                <div className='login-input'>
                    <label>Password:</label>
                    <input id="password" type="password" onChange={handleChange}></input>
                </div>
                <div>
                    <button className='login-button'><Link to='/signup' className='login-link'>Signup</Link></button>
                    <button className='login-button' onClick={login}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
