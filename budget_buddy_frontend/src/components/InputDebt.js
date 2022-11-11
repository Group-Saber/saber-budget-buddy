import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InputDebt = ({uid, pos, neg, setPos, setNeg, debts, setDebts}) => {
    let [amount, setAmount] = useState('')
    let [name, setName] = useState('')
    let [note, setNote] = useState('')
    let navigate = useNavigate()

    let inputDebt = async () => {
        if(amount !== '' && name !== '' && note !== '') {
            const newDebt = {
                'amount': parseFloat(amount),
                'name': name,
                'note': note,
                'date': Date.now()
            }

            await fetch(`http://127.0.0.1:8000/app/debts/input/${uid}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newDebt)
            })

            if(newDebt.amount >= 0) {
                setPos(pos + newDebt.amount)
            } else {
                setNeg(neg + newDebt.amount)
            }

            setDebts(debts => [newDebt, ...debts])
            clear()
            back()
        }
    }

    let clear = () => {
        setAmount('')
        setName('')
        setNote('')
        document.getElementById('amount').value = ''
        document.getElementById('name').value = ''
        document.getElementById('note').value = ''
    }

    let handleChange = (e) => {
        const id = e.target.id

        switch(id) {
            case 'amount':
                setAmount(e.target.value)
                break;
            case 'name':
                setName(e.target.value)
                break;
            case 'note':
                setNote(e.target.value)
                break;
            default:
                break;
        }
    }
    
    let back = () => {
        navigate(-1)
    }

    return (
        <div className='debt-body'>
            <div className='debt-box'>
                <div className='create-debt'>
                    <div className='debt-title'>Input Debt</div>
                    <div className='debt-input label-input'>
                        <label>Amount:</label>
                        <input id='amount' type='number' onChange={handleChange}></input>
                    </div>
                    <div className='debt-input label-input'>
                        <label>Name:</label>
                        <input id='name' type='text' onChange={handleChange}></input>
                    </div>
                    <div className='debt-input label-input'>
                        <label>Note:</label>
                        <input id='note' type='text' onChange={handleChange}></input>
                    </div>
                    <div>
                        <button className='debt-button button' onClick={back}>Back</button>
                        <button className='debt-button button' onClick={clear}>Clear</button>
                        <button className='debt-button button' onClick={inputDebt}>Enter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputDebt
