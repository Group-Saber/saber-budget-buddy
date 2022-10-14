import React, { useEffect, useState } from 'react'
import DebtLineChart from '../components/DebtLineChart'

const DebtPage = ({uid, user}) => {
    let [debts, setDebts] = useState([])
    let [paid, setPaid] = useState([])
    let [positive, setPositive] = useState(0)
    let [negative, setNegative] = useState(0)

    useEffect(() => {
        let getDebts = async () => {
            let data = Object.values(user.debts)
            setDebts(data.reverse())
            getTotals(data)
        }

        let getPaid = async () => {
            let data = Object.values(user.paid)
            setPaid(data.reverse())
        }

        getDebts()
        getPaid()
    }, [uid, user])

    let inputDebt = async () => {
        if(document.getElementById('amount').value !== '' && document.getElementById('name').value !== '') {
            const newDebt = {
                'amount': parseFloat(document.getElementById('amount').value),
                'name': document.getElementById('name').value,
                'note': document.getElementById('note').value,
                'date': Date.now()
            }

            let response = await fetch(`http://127.0.0.1:8000/app/debts/input/${uid}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newDebt)
            })
            let data = await response.json()

            console.log(data)

            if(newDebt.amount >= 0) {
                setPositive(positive + newDebt.amount)
            } else {
                setNegative(negative + newDebt.amount)
            }

            setDebts(debts => [newDebt, ...debts])
            clear()
        }
    }

    let clear = () => {
        document.getElementById('amount').value = ''
        document.getElementById('name').value = ''
        document.getElementById('note').value = ''
    }

    let getTotals = (data) => {
        let p = 0
        let n = 0

        for(let i in data) {
            if(data[i].amount >= 0) {
                p += data[i].amount
            } else {
                n += data[i].amount
            }
        }
        
        setPositive(p)
        setNegative(n)
    }

    let debtPaid = async (e) => {
        const index = e.target.id

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
            setPositive(positive - debts[index].amount)
        } else {
            setNegative(negative - debts[index].amount)
        }

        setPaid(paid => [debts[index], ...paid])

        setDebts(debts => [
            ...debts.slice(0, index),
            ...debts.slice(index + 1, debts.length)
        ]);
    }

    let debtUnpaid = async (e) => {
        const index = e.target.id

        await fetch(`http://127.0.0.1:8000/app/paid/unpaid/${uid}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(paid[index])
        })

        if(paid[index].amount >= 0) {
            setPositive(positive + paid[index].amount)
        } else {
            setNegative(negative + paid[index].amount)
        }

        setDebts(debts => [paid[index], ...debts])

        setPaid(paid => [
            ...paid.slice(0, index),
            ...paid.slice(index + 1, paid.length)
        ]);
    }

    let formatDate = (date) => {
        let newDate = `${date.getMonth() + 1}/${date.getDate()}`

        if(new Date().getFullYear() !== date.getFullYear()) {
            newDate += `/${date.getFullYear()}`
        }

        return newDate
    }

    return (
        <div className='tab-body'>
            <div className='debt-top'>
                <div className='totals'>
                    <div className='total-stacked'>
                        <div className='split top'>
                            <i className="material-icons">arrow_upward</i> 
                            <p>${positive.toFixed(2)}</p>
                        </div>
                        <div className='split bottom'>
                        <i className="material-icons">arrow_downward</i>
                            <p>${negative.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='total'>
                        <h2>Total</h2>
                        <p>${(positive + negative).toFixed(2)}</p>
                    </div>
                </div>
                <div className='chart'>
                    <DebtLineChart debts={debts.map((debt) => debt.amount >= 0 ? (debt) : (0))} />
                </div>
                <div className='chart'>
                    <DebtLineChart debts={debts.map((debt) => debt.amount < 0 ? (debt) : (0))} />
                </div>
                <div className='create-debt'>
                    <div className='debt-input'>
                        <label>Amount:</label>
                        <input id="amount" type="number"></input>
                    </div>
                    <div className='debt-input'>
                        <label>Name:</label>
                        <input id="name" type="text"></input>
                    </div>
                    <div className='debt-input'>
                        <label>Note(optional):</label>
                        <textarea id="note" type="text" rows="3" cols="25"></textarea>
                    </div>
                    <div>
                        <button className='debt-button' onClick={clear}>Clear</button>
                        <button className='debt-button' onClick={inputDebt}>Enter</button>
                    </div>
                </div>
            </div>
            <div className='debt-bottom'>
                <div className='debts-container'>
                    <ul className='debts-table'>
                        <li className='debts-header'>
                            <div className="col col-1">Name</div>
                            <div className="col col-2">Amount</div>
                            <div className="col col-3">Note</div>
                            <div className="col col-4">Date</div>
                        </li>
                        {debts.map((debt, index) => (
                            <div onClick={debtPaid} className='row-click' key={index} id={index}>
                                <li className='debts-row' id={index}>
                                    <div className="col col-1" data-label="Name" id={index}>{debt.name}</div>
                                    <div className="col col-2" data-label="Amount" id={index}>{debt.amount.toFixed(2)}</div>
                                    <div className="col col-3" data-label="Note" id={index}>{debt.note.length > 25 ? debt.note.substring(0, 25) + '...' : debt.note}</div>
                                    <div className="col col-4" data-label="Date" id={index}>{formatDate(new Date(debt.date))}</div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className='debts-container'>
                    <ul className='debts-table'>
                        <li className='debts-header paid'>
                            <div className="col col-1">Name</div>
                            <div className="col col-2">Amount</div>
                            <div className="col col-3">Note</div>
                            <div className="col col-4">Date</div>
                        </li>
                        {paid.map((pay, index) => (
                            <div onClick={debtUnpaid} className='row-click' key={index} id={index}>
                                <li className='debts-row' id={index}>
                                    <div className="col col-1" data-label="Name" id={index}>{pay.name}</div>
                                    <div className="col col-2" data-label="Amount" id={index}>{pay.amount.toFixed(2)}</div>
                                    <div className="col col-3" data-label="Note" id={index}>{pay.note.length > 30 ? pay.note.substring(0, 30) + '...' : pay.note}</div>
                                    <div className="col col-4" data-label="Date" id={index}>{formatDate(new Date(pay.paid))}</div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DebtPage