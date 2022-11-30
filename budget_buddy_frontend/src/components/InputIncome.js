import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InputIncome = ({user}) => {
    let [income, setIncome] = useState('')
    let navigate = useNavigate()

    useEffect(() => {
        /**
         * gets the current user income
         */
        let getIncome = () => {
            setIncome(user.salary)
            document.getElementById('income').value = user.salary
        }

        getIncome()
    }, [user])
    
    /**
     * inputs the new income into the database through backend api call
     */
    let inputIncome = async () => {
        if(income !== '') {
            user.salary = parseFloat(income)

            await fetch(`http://127.0.0.1:8000/app/salary/input/${user.uid}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(parseFloat(income))
            })
    
            back()
        }
    }

    let clear = () => {
        setIncome('')
        document.getElementById('income').value = ''
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
        setIncome(e.target.value)
    }

    return (
        <div className='input-body'>
            <div className='input-box'>
                <div className='create-input'>
                    <div className='input-title'>Input Monthly Income</div>
                    <div className='budget-input label-input'>
                        <label>Income:</label>
                        <input id='income' type='number' min='0' onChange={handleChange}></input>
                    </div>
                    <div>
                        <button className='budget-button button' onClick={back}>Back</button>
                        <button className='budget-button button' onClick={clear}>Clear</button>
                        <button className='budget-button button' onClick={inputIncome}>Enter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputIncome
