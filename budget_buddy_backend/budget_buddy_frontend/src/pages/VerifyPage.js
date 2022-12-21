import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'

const VerifyPage = () => {
    let [code, setCode] = useState('')
    let [error, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    /**
     * creates the user account if the code is verified
     */
    let signup = async () => {
        let response = await fetch(`http://127.0.0.1:8000/app/signup/`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(location.state.creds)
        })
        let data = await response.json()

        if(data !== '') {
            navigate('/login')
        }
    }

    /**
     * checks that user inputted code is the same as the generated code
     */
    let verify = async () => {
        if(code === location.state.code) {
            await signup()
            navigate('/login')
        } else {
            setError('Invalid code.')
        }
    }

    /**
     * changes the value of the variable that was edited by user
     * 
     * @param {*} e 
     */
    let handleChange = (e) => {
        setCode(e.target.value)
    }

    return (
        <div className="login-body">
            <div className="login-info">
                <div className='login-title'>Budget Buddy</div>
                <div className='login-sub'>Verify Email</div>
                <div className={error === '' || code !== '' ? 'login-input label-input' : 'login-input label-input error'}>
                    <label>Code:</label>
                    <input id="code" type="text" onChange={handleChange}></input>
                </div>
                {error !== '' ? <div className='login-error'>{error}</div> : null}
                <div>
                    <button className='login-button button' onClick={() => navigate('/login')}>Cancel</button>
                    <button className='login-button button' onClick={verify}>Enter</button>
                </div>
            </div>
        </div>
    )
}

export default VerifyPage
