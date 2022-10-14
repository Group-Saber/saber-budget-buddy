import React, { useState } from 'react'

const InputBudget = () => {
    let [budget, setBudget] = useState(null)

    let inputBudget = async () => {
        fetch('http://127.0.0.1:8000/app/budgets/input', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(budget)
        })
    }

    let handleChange = (e) => {
        setBudget(e.target.value)
    }

    return (
        <div>
            <input id="budget" onChange={handleChange} type="number" min="0"></input>
            <button id="budget" onClick={inputBudget}>Enter</button>
            <h2>{budget}</h2>
        </div>
    )
}

export default InputBudget
