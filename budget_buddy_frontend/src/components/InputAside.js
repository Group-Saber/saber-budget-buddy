import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InputAside = ({user}) => {
    let [aside, setAside] = useState('')
    let navigate = useNavigate()

    useEffect(() => {
        /**
         * gets the current user aside
         */
        let getAside = () => {
            setAside(user.aside)
            document.getElementById('aside').value = user.aside
        }

        getAside()
    }, [user])
    
    /**
     * inputs the new aside into the database through backend api call
     */
    let inputAside = async () => {
        if(aside !== '') {
            user.aside = parseFloat(aside)

            await fetch(`http://127.0.0.1:8000/app/aside/input/${user.uid}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(parseFloat(aside))
            })
    
            back()
        }
    }

    let clear = () => {
        setAside('')
        document.getElementById('aside').value = ''
    }

    let back = () => {
        navigate(-1)
    }

    /**
     * changes the value of the variable that was edited by user
     * 
     * @param {*} e 
     */
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
                        <button className='budget-button button' onClick={inputAside}>Enter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputAside
