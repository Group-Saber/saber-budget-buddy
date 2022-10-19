import React, { useEffect, useState } from 'react'

const DebtPage = ({uid}) => {
    let [debts, setDebts] = useState([])
    let [positive, setPositive] = useState(0)
    let [negative, setNegative] = useState(0)

    useEffect(() => {
        getDebts()
    // eslint-disable-next-line
    }, [])

    let inputDebt = () => {
        if(document.getElementById('amount').value !== '' && document.getElementById('name').value !== '') {
            const newDebt = {
                'amount': parseFloat(document.getElementById('amount').value),
                'name': document.getElementById('name').value,
                'note': document.getElementById('note').value,
                'date': Date.now()
            }

            fetch(`http://127.0.0.1:8000/app/debts/input/${uid}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newDebt)
            })

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

    let getDebts = async () => {
        let response = await fetch(`http://127.0.0.1:8000/app/debts/${uid}`)
        let data = await response.json()
        setDebts(data.reverse())
        getTotals(data)
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

    let formatDate = (date) => {
        let newDate = `${date.getMonth() + 1}/${date.getDate()}`

        if(new Date().getFullYear() !== date.getFullYear()) {
            newDate += `/${date.getFullYear()}`
        }

        return newDate
    }

    return (
        <div className='tab-body'>
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
            <div className='totals'>
                <p>{positive}</p>
                <p>{negative}</p>
            </div>
            <div className='debts-list'>
                <table className='debt-table'>
                    <thead className='debt-table-header'>
                        <tr className='debt-header'>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Note</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody className='debt-table-body'>
                        {debts.map((debt, index) => (
                            <tr key={index} className='debt-body'>
                                <td>{debt.name}</td>
                                <td>{debt.amount.toFixed(2)}</td>
                                <td>{debt.note}</td>
                                <td>{formatDate(new Date(debt.date))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DebtPage
