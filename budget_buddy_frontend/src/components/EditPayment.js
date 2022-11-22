import React, { useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditPayment = ({user, uid, pos, neg, setPos, setNeg, debts, setDebts, paid, setPaid}) => {
    let [index, setIndex] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let getDebt = (index) => {
            let temp = paid[index]

            document.getElementById('amount').value = temp.amount
            document.getElementById('name').value = temp.name
            document.getElementById('note').value = temp.note

            setIndex(index)
        }

        getDebt(location.state)
    }, [paid, location.state])

    let unpayDebt = async () => {
        await fetch(`http://127.0.0.1:8000/app/paid/unpaid/${uid}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(paid[index])
        })

        if(paid[index].amount >= 0) {
            setPos(pos + paid[index].amount)
        } else {
            setNeg(neg + paid[index].amount)
        }

        user.debts = [paid[index], ...debts].reverse()
        setDebts(debts => [paid[index], ...debts])
        removePaid()
        back()
    }

    let deletePayment = async () => {
        await fetch(`http://127.0.0.1:8000/app/paid/delete/${uid}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(paid[index])
        })

        removePaid()
        back()
    }

    let removePaid = () => {
        user.paid = [
            ...paid.slice(0, index),
            ...paid.slice(index + 1, paid.length)
        ].reverse()

        setPaid(paid => [
            ...paid.slice(0, index),
            ...paid.slice(index + 1, paid.length)
        ])
    }

    let back = () => {
        navigate(-1)
    }

    return (
        <div className='input-body'>
            <div className='input-box'>
                <div className='create-input'>
                    <div className='input-title'>Edit Payment</div>
                    <div className='debt-input label-input'>
                        <label>Amount:</label>
                        <input id='amount' type='number' value={paid[index].amount}></input>
                    </div>
                    <div className='debt-input label-input'>
                        <label>Name:</label>
                        <input id='name' type='text' value={paid[index].name}></input>
                    </div>
                    <div className='debt-input label-input'>
                        <label>Note:</label>
                        <input id='note' type='text' value={paid[index].note}></input>
                    </div>
                    <div>
                        <button className='debt-button button' onClick={back}>Back</button>
                        <button className='debt-button button' onClick={deletePayment}>Delete</button>
                        <button className='debt-button button' onClick={unpayDebt}>Unpay</button>
                        <button className='debt-button button' onClick={back}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPayment
