import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({uid}) => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [error, setError] = useState('')
    const navigate = useNavigate()

    /**
     * allows the user to log into their account
     */
    let login = async () => {
        // checks that the email and password are not empty
        if(email !== '' && password !== '') {
            const creds = {
                'email': email,
                'password': password,
            }

            // checks that the email and password are valid
            let response = await fetch(`http://127.0.0.1:8000/app/login/`, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(creds)
            })
            let data = await response.json()

            // logs in valid user, or gives an error message
            if(data !== '') {
                uid(data)
                navigate('/main')
            } else {
                setError('Invalid email or password.')
            }
        } else {
            setError('Missing fields.')
        }
    }

    /**
     * changes the value of the variable that was edited by user
     * 
     * @param {*} e 
     */
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
            default:
                break
        }
    }

    return (
        <div className='login-body'>
            <div className='login-info'>
                <div className='login-title'>Budget Buddy</div>
                <div className='login-sub'>Log in</div>
                <div className={error === '' || email !== '' ? 'login-input label-input' : 'login-input label-input error'}>
                    <label>Email:</label>
                    <input id="email" type="email" onChange={handleChange}></input>
                </div>
                <div className={error === '' || password !== '' ? 'login-input label-input' : 'login-input label-input error'}>
                    <label>Password:</label>
                    <input id="password" type="password" onChange={handleChange}></input>
                </div>
                {error !== '' ? <div className='login-error'>{error}</div> : null}
                <div>
                    <button className='login-button button' onClick={() => navigate('/signup')}>Signup</button>
                    <button className='login-button button' onClick={login}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
