import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div className='login-body'>
            <div className='login-info'>
                <div className='login-title'>Budget Buddy</div>
                <div className='login-sub'>Log in</div>
                <div className='login-input'>
                    <label>Email:</label>
                    <input id="email" type="email"></input>
                </div>
                <div className='login-input'>
                    <label>Password:</label>
                    <input id="password" type="password"></input>
                </div>
                <div>
                    
                    <button className='login-button'><Link to='/signup' className='login-link'>Signup</Link></button>
                    <button className='login-button'><Link to='/main/dashboard' className='login-link'>Login</Link></button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
