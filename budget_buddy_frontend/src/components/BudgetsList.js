import React, {useEffect, useState} from 'react'

const BudgetsList = () => {
    let [budgets, setBudgets] = useState([])
    let [budget, setBudget] = useState({})
    let [update, setUpdate] = useState(0)

    useEffect(() => {
        getBudgets()
    }, [update])

    let inputBudget = async () => {
        fetch('http://127.0.0.1:8000/app/budget/input/', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(budget)
        })

        setUpdate(update + 1)
        document.getElementById('budget').value = ''
    }

    let handleChange = (e) => {
        setBudget({
            'amount': e.target.value,
            'date': Date.now()
        })
    }

    let getBudgets = async () => {
        let response = await fetch('http://127.0.0.1:8000/app/budgets/')
        let data = await response.json()
        setBudgets(data)
    }

    return (
        <div className="tab-body">
            <input id="budget" onChange={handleChange} type="number" min="0"></input>
            <button onClick={budget.amount >= 0 ? inputBudget : null}>Enter</button>
            <div className="budgets-list">
                <ul>
                    {budgets.map((budget, index) => (
                        <li key={index}>$ {budget.amount.toFixed(2)}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BudgetsList
