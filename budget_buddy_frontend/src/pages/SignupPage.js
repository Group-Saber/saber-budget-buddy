import React from 'react'
import { Link } from 'react-router-dom'

const SignupPage = () => {
    return (
        <div className='login-body'>
            <div className='login-info'>
                <div className='login-title'>Budget Buddy</div>
                <div className='login-sub'>Sign up</div>
                <div className='login-input'>
                    <label>First Name:</label>
                    <input id="first" type="text"></input>
                </div>
                <div className='login-input'>
                    <label>Last Name:</label>
                    <input id="last" type="text"></input>
                </div>
                <div className='login-input'>
                    <label>Email:</label>
                    <input id="email" type="email"></input>
                </div>
                <div className='login-input'>
                    <label>Password:</label>
                    <input id="password" type="password"></input>
                </div>
                <div className='login-input'>
                    <label>Retype Password:</label>
                    <input id="re-password" type="password"></input>
                </div>
                <div>
                    <button className='login-button'><Link to='/' className='login-link'>Login</Link></button>
                    <button className='login-button'>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default SignupPage