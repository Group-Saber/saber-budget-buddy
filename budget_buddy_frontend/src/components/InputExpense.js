import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InputExpense = ({user, expenses, setExpenses, total, setTotal}) => {
    let [amount, setAmount] = useState('')
    let [type, setType] = useState('bills')
    let navigate = useNavigate()

    /**
     * inputs the newly created expense into the database through backend api call
     */
    let inputExpense = async () => {
        if(amount !== '' && type !== '') {
            const newExpense = {
                'amount': parseFloat(amount),
                'type': type,
                'date': Date.now()
            }
    
            await fetch(`http://127.0.0.1:8000/app/budget/input/${user.uid}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newExpense)
            })
    
            setTotal(total + newExpense.amount)
            user.expenses = [newExpense, ...expenses].reverse()
            setExpenses(expenses => [newExpense, ...expenses])
            back()
        }
    }

    let clear = () => {
        setAmount('')
        document.getElementById('amount').value = ''
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
        const id = e.target.id

        switch(id) {
            case 'amount':
                setAmount(e.target.value)
                break
            case 'type':
                setType(e.target.value)
                break
            default:
                break
        }
    }

    return (
        <div className='input-body'>
            <div className='input-box'>
                <div className='create-input'>
                    <div className='input-title'>Input Expense</div>
                    <div className='budget-input label-input'>
                        <label>Amount:</label>
                        <input id='amount' type='number' min='0' onChange={handleChange}></input>
                    </div>
                    <div className='budget-input label-input'>
                        <label htmlFor='type'>Type:</label>
                        <select name='type' id='type' onChange={handleChange}>
                            <option value='bills'>Bills</option>
                            <option value='food'>Food</option>
                            <option value='groceries'>Groceries</option>
                            <option value='shopping'>Shopping</option>
                            <option value='subscriptions'>Subscriptions</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>
                    <div>
                        <button className='budget-button button' onClick={back}>Back</button>
                        <button className='budget-button button' onClick={clear}>Clear</button>
                        <button className='budget-button button' onClick={inputExpense}>Enter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputExpense
