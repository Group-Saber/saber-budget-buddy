import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InputSalary = ({user}) => {
    let [salary, setSalary] = useState('')
    let navigate = useNavigate()

    useEffect(() => {
        let getSalary = () => {
            setSalary(user.salary)
            document.getElementById('salary').value = user.salary
        }

        getSalary()
    }, [user])

    let update = () => {
        user.salary = parseFloat(salary)
        input()
    }

    let input = async () => {
        await fetch(`http://127.0.0.1:8000/app/salary/input/${user.uid}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(parseFloat(salary))
        })

        back()
    }

    let clear = () => {
        setSalary('')
        document.getElementById('salary').value = ''
    }

    let back = () => {
        navigate(-1)
    }

    let handleChange = (e) => {
        setSalary(e.target.value)
    }

    return (
        <div className='input-body'>
            <div className='input-box'>
                <div className='create-input'>
                    <div className='input-title'>Input Monthly Salary</div>
                    <div className='budget-input label-input'>
                        <label>Salary:</label>
                        <input id='salary' type='number' onChange={handleChange}></input>
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
