import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditExpense = ({user, uid, total, setTotal, expenses, setExpenses}) => {
    let [amount, setAmount] = useState(0)
    let [type, setType] = useState('')
    let [index, setIndex] = useState(0)
    let navigate = useNavigate()
    let location = useLocation()

    useEffect(() => {
        /**
         * gets the values for the selected expense
         * 
         * @param {*} index 
         */
        let getExpense = (index) => {
            let temp = expenses[index]

            setAmount(temp.amount)
            setType(temp.type)
            document.getElementById('amount').value = temp.amount
            document.getElementById('type').value = temp.type

            setIndex(index)
        }
        
        getExpense(location.state)
    }, [expenses, location.state])

    /**
     * updates the values of the expense
     */
    let update = () => {
        user.expenses[index] = expenses[index]
        const oldExpense = Object.assign({}, expenses[index])

        expenses[location.state].amount = parseFloat(amount)
        expenses[location.state].type = type
    
        inputExpense(oldExpense)
    }

    /**
     * updates the expense in the database through backend api call
     * 
     * @param {*} oldExpense 
     */
    let inputExpense = async (oldExpense) => {
        const newExpense = expenses[index]
        let tempTotal = total - oldExpense.amount

        await fetch(`http://127.0.0.1:8000/app/budget/input/${uid}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newExpense)
        })

        setTotal(tempTotal + newExpense.amount)
        back()
    }

    /**
     * deletes an expense from the database through backend api call
     */
    let deleteExpense = async () => {
        await fetch(`http://127.0.0.1:8000/app/budget/delete/${uid}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(expenses[index])
        })

        setTotal(total - expenses[index])

        user.expenses = [
            ...expenses.slice(0, index),
            ...expenses.slice(index + 1, expenses.length)
        ].reverse()

        setExpenses(expenses => [
            ...expenses.slice(0, index),
            ...expenses.slice(index + 1, expenses.length)
        ])

        back()
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
                    <div className='input-title'>Edit Expense</div>
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
                        <button className='budget-button button' onClick={deleteExpense}>Delete</button>
                        <button className='budget-button button' onClick={update}>Enter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditExpense
