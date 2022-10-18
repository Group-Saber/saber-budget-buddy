import React, { useEffect, useState } from 'react'

const DebtPage = ({uid}) => {
    let [debts, setDebts] = useState([])

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

            setDebts(debts => [newDebt, ...debts])

            document.getElementById('amount').value = ''
            document.getElementById('name').value = ''
            document.getElementById('note').value = ''
        }
    }

    let getDebts = async () => {
        let response = await fetch(`http://127.0.0.1:8000/app/debts/${uid}`)
        let data = await response.json()
        setDebts(data.reverse())
    }

    return (
        <div className="tab-body">
            <div className="debt-input">
                <label>Amount</label>
                <input id="amount" type="number"></input>
            </div>
            <div className="debt-input">
                <label>Name</label>
                <input id="name" type="text"></input>
            </div>
            <div className="debt-input">
                <label>Note (optional)</label>
                <textarea id="note" type="text" rows="3" cols="25"></textarea>
            </div>
            <button className="debt-button" onClick={inputDebt}>Enter</button>
            <div className="budgets-list">
                <ul>
                    {debts.map((debt, index) => (
                        <li key={index}>$ {debt.amount.toFixed(2)}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DebtPage
