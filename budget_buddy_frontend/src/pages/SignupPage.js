import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
    let [email, setEmail] =  useState('')
    let [pass, setPassword] =  useState('')
    let [repass, setRepass] =  useState('')
    let [first, setFirst] =  useState('')
    let [last, setLast] =  useState('')
    let [error, setError] = useState('')
    const navigate = useNavigate()

    /**
     * allows the user to sign up
     */
    let signup = async () => {
        // checks that all fields are not empty
        if(email !== '' && pass !== '' && repass !== '' && first !== '' && last !== '' && pass.length >= 8 && pass === repass) {
            const creds = {
                'email': email,
                'password': pass,
                'first': first,
                'last': last,
            }

            // checks that the user does not exist
            let response = await fetch(`http://127.0.0.1:8000/app/verify/`, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(creds)
            })
            let data = await response.json()

            // gives error message or creates user account
            if(data === 'sign') {
                setError('Error signing up.')
            } else if(data === 'taken') {
                setError('Account already exists.')
            } else {
                navigate('/verify', {state:{creds: creds, code: data}})
            }
        } else {
            if(pass.length < 8) {
                setError('Password must be at least 8 characters.')
            } else if(pass !== repass) {
                setError('Passwords do not match.')
            } else {
                setError('Missing fields.')
            }
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
            default:
                break
        }
    }

    return (
        <div className='login-body'>
            <div className='login-info'>
                <div className='login-title'>Budget Buddy</div>
                <div className='login-sub'>Sign up</div>
                <div className={error === '' || first !== '' ? 'login-input label-input' : 'login-input label-input error'}>
                    <label>First Name:</label>
                    <input id="first" type="text" onChange={handleChange}></input>
                </div>
                <div className={error === '' || last !== '' ? 'login-input label-input' : 'login-input label-input error'}>
                    <label>Last Name:</label>
                    <input id="last" type="text" onChange={handleChange}></input>
                </div>
                <div className={error === '' || email !== '' ? 'login-input label-input' : 'login-input label-input error'}>
                    <label>Email:</label>
                    <input id="email" type="email" onChange={handleChange}></input>
                </div>
                <div className={error === '' || pass !== '' ? 'login-input label-input' : 'login-input label-input error'}>
                    <label>Password:</label>
                    <input id="password" type="password" onChange={handleChange}></input>
                </div>
                <div className={error === '' || repass !== '' ? 'login-input label-input' : 'login-input label-input error'}>
                    <label>Retype Password:</label>
                    <input id="repass" type="password" onChange={handleChange}></input>
                </div>
                {error !== '' ? <div className='login-error'>{error}</div> : null}
                <div>
                    <button className='login-button button' onClick={() => navigate('/login')}>Login</button>
                    <button className='login-button button' onClick={signup}>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default SignupPage