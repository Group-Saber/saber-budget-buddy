import React, { useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditDebt = ({user, uid, pos, neg, setPos, setNeg, debts, setDebts, paid, setPaid}) => {
    let [amount, setAmount] = useState('')
    let [name, setName] = useState('')
    let [note, setNote] = useState('')
    let [index, setIndex] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let getDebt = (index) => {
            let temp = debts[index]

            setAmount(temp.amount)
            setName(temp.name)
            setNote(temp.note)
            document.getElementById('amount').value = temp.amount
            document.getElementById('name').value = temp.name
            document.getElementById('note').value = temp.note

            setIndex(index)
        }

        getDebt(location.state)
    }, [debts, location.state])

    let update = () => {
        const oldDebt = Object.assign({}, debts[index])

        debts[location.state].amount = parseFloat(amount)
        debts[location.state].name = name
        debts[location.state].note = note
    
        inputDebt(oldDebt)
    }

    let inputDebt = async (oldDebt) => {
        if(amount !== '' && name !== '' && note !== '') {
            user.debts[index] = debts[index]
            const newDebt = debts[index]
            let tempPos = pos
            let tempNeg = neg

            await fetch(`http://127.0.0.1:8000/app/debts/input/${uid}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newDebt)
            })

            if(oldDebt.amount >= 0) {
                tempPos -= oldDebt.amount
            } else {
                tempNeg -= oldDebt.amount
            }

            if(newDebt.amount >= 0) {
                setPos(tempPos + newDebt.amount)
            } else {
                setNeg(tempNeg + newDebt.amount)
            }

            back()
        }
    }

    let payDebt = async () => {
        debts[index] = Object.assign(debts[index], {'paid': Date.now()})
        console.log(debts.index)

        await fetch(`http://127.0.0.1:8000/app/paid/input/${uid}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(debts[index])
        })

        if(debts[index].amount >= 0) {
            setPos(pos - debts[index].amount)
        } else {
            setNeg(neg - debts[index].amount)
        }

        user.paid = [debts[index], ...paid].reverse()
        setPaid(paid => [debts[index], ...paid])
        removeDebt()
        back()
    }

    let deleteDebt = async () => {
        await fetch(`http://127.0.0.1:8000/app/debts/delete/${uid}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(debts[index])
        })

        if(debts[index].amount >= 0) {
            setPos(pos - debts[index].amount)
        } else {
            setNeg(neg - debts[index].amount)
        }

        removeDebt()
        back()
    }

    let removeDebt = () => {
        user.debts = [
            ...debts.slice(0, index),
            ...debts.slice(index + 1, debts.length)
        ].reverse()

        setDebts(debts => [
            ...debts.slice(0, index),
            ...debts.slice(index + 1, debts.length)
        ])
    }

    let back = () => {
        navigate(-1)
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

    return (
        <div className='input-body'>
            <div className='input-box'>
                <div className='create-input'>
                    <div className='input-title'>Edit Debt</div>
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
                        <input id='note' type='text' rows='3' cols='25' onChange={handleChange}></input>
                    </div>
                    <div>
                        <button className='debt-button button' onClick={back}>Back</button>
                        <button className='debt-button button' onClick={deleteDebt}>Delete</button>
                        <button className='debt-button button' onClick={payDebt}>Pay</button>
                        <button className='debt-button button' onClick={update}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDebt
