import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'

const VerifyPage = () => {
    let [code, setCode] = useState('')
    let [error, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const test = 'A3NS0J'

    let verify = () => {
        if(code === test) {
            console.log(location.state)
            navigate('/login')
        } else {
            setError('Invalid code.')
        }
    }

    let handleChange = (e) => {
        setCode(e.target.value)
    }

    return (
        <div className="login-body">
            <div className="login-info">
                <div className='login-title'>Budget Buddy</div>
                <div className='login-sub'>Verify Email</div>
                <div className={error === '' || code !== '' ? 'login-input' : 'login-input error'}>
                    <label>Code:</label>
                    <input id="code" type="text" onChange={handleChange}></input>
                </div>
                {error !== '' ? <div className='login-error'>{error}</div> : null}
                <div>
                    <button className='login-button' onClick={() => navigate('/login')}>Cancel</button>
                    <button className='login-button' onClick={verify}>Enter</button>
                </div>
            </div>
        </div>
    )
}

export default VerifyPage
