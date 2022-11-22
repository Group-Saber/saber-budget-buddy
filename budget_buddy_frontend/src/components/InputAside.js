import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InputSalary = ({user}) => {
    let [aside, setAside] = useState('')
    let navigate = useNavigate()

    useEffect(() => {
        let getAside = () => {
            setAside(user.aside)
            document.getElementById('aside').value = user.aside
        }

        getAside()
    }, [user])

    let update = () => {
        user.aside = parseFloat(aside)
        input()
    }

    let input = async () => {
        await fetch(`http://127.0.0.1:8000/app/aside/input/${user.uid}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(parseFloat(aside))
        })

        back()
    }

    let clear = () => {
        setAside('')
        document.getElementById('aside').value = ''
    }

    let back = () => {
        navigate(-1)
    }

    let handleChange = (e) => {
        setAside(e.target.value)
    }

    return (
        <div className='input-body'>
            <div className='input-box'>
                <div className='create-input'>
                    <div className='input-title'>Input Monthly Aside</div>
                    <div className='budget-input label-input'>
                        <label>Aside:</label>
                        <input id='aside' type='number' min='0' onChange={handleChange}></input>
                    </div>
                    <div>
                        <button className='budget-button button' onClick={back}>Back</button>
                        <button className='budget-button button' onClick={clear}>Clear</button>
                        <button className='budget-button button' onClick={update}>Enter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputSalary
