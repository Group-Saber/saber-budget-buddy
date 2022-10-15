import React, { useState } from 'react'

const InputBudget = () => {
    let [budget, setBudget] = useState({})

    let inputBudget = async () => {
        fetch('http://127.0.0.1:8000/app/budget/input/', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(budget)
        })
    }

    let handleChange = (e) => {
        setBudget({
            'amount': e.target.value,
            'date': Date.now()
        })

        console.log(budget)
    }

    return (
        <div>
            <input id="budget" onChange={handleChange} type="number" min="0"></input>
            <button id="budget" onClick={budget.amount >= 0 ? inputBudget : null}>Enter</button>
            <h2>{budget.amount}</h2>
        </div>
    )
}

export default InputBudget
