import React, {useEffect, useState} from 'react'

const BudgetsList = () => {
    let [budgets, setBudgets] = useState([])

    useEffect(() => {
        getBudgets()
    }, [])

    let getBudgets = async () => {
        let response = await fetch('http://127.0.0.1:8000/app/budgets/')
        let data = await response.json()
        setBudgets(data)
    }

    return (
        <div>
            <div className="budgets-list">
                <h3>Budget</h3>
                <ul>
                    {budgets.map((budget, index) => (
                        <li key={index}>${budget.amount.toFixed(2)}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BudgetsList
