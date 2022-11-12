import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ExpensesPieChart from '../components/ExpensesPieChart'
import InputExpense from '../components/InputExpense'
import InputSalary from '../components/InputSalary'

const BudgetPage = ({uid, user}) => {
    let [expenses, setExpenses] = useState([])
    let [bills, setBills] = useState(0)
    let [food, setFood] = useState(0)
    let [groceries, setGroceries] = useState(0)
    let [other, setOther] = useState(0)
    let [shopping, setShopping] = useState(0)
    let [subscriptions, setSubscriptions] = useState(0)
    let [total, setTotal] = useState(0)
    let navigate = useNavigate()

    useEffect(() => {
        let getData = () => {
            if(uid !== '' && Object.keys(user).length !== 0) {
                let data = Object.values(user.expenses)
                getExpenses(data)
            }
        }
        
        getData()
    }, [uid, user])

    let inputSalary = () => {
        navigate('/main/budget/salary')
    }

    let inputExpense = () => {
        navigate('/main/budget/expense')
    }

    let getExpenses = (data) => {
        let temp = 0
        let today = new Date()
        today.setDate(1)
        today.setHours(0,0,0,0)

        for(let i in data) {
            if(data[i].date >= today.getTime()) {
                temp += data[i].amount

                switch(data[i].type) {
                    case 'bills':
                        setBills(bills + data[i].amount)
                        break
                    case 'food':
                        setFood(food + data[i].amount)
                        break
                    case 'groceries':
                        setGroceries(groceries + data[i].amount)
                        break
                    case 'other':
                        setOther(other + data[i].amount)
                        break
                    case 'shopping':
                        setShopping(shopping + data[i].amount)
                        break
                    case 'subscriptions':
                        setSubscriptions(subscriptions + data[i].amount)
                        break
                    default:
                        break
                }
            }
        }

        setExpenses(data.reverse())
        setTotal(temp)
    }

    let formatDate = (date) => {
        let newDate = `${date.getMonth() + 1}/${date.getDate()}`

        if(new Date().getFullYear() !== date.getFullYear()) {
            newDate += `/${date.getFullYear()}`
        }

        return newDate
    }

    let editExpense = (index) => {
        console.log(index)
    }

    return (
        <div className='tab-body'>
            <div className='budget-top'>
                <div className='salary' onClick={inputSalary}>${user.salary}</div>                
                <div className='salary' onClick={inputExpense}>${total.toFixed(2)}</div>
            </div>
            <div className='budget-bottom'>
                <div className='table-container'>
                    <div className='table-title'>Expenses</div>
                    <ul className='table'>
                        <li className='table-header expenses-header'>
                            <div className='col col-1'>Type</div>
                            <div className='col col-2'>Amount</div>
                            <div className='col col-4'>Date</div>
                            <div className='col col-5'><i className='material-icons debt-icon' onClick={inputExpense}>add</i></div>
                        </li>
                        {expenses.map((expense, index) => (
                            <li className='table-row' key={index}>
                                <div className='col col-1' data-label='Name'>{expense.type}</div>
                                <div className='col col-2' data-label='Amount'>{expense.amount.toFixed(2)}</div>
                                <div className='col col-4' data-label='Date'>{formatDate(new Date(expense.date))}</div>
                                <div className='col col-5' data-label='Button'><i className='material-icons debt-icon' onClick={() => editExpense(index)}>more_vert</i></div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='dash-piechart'>
                    <ExpensesPieChart bills={bills} food={food} groceries={groceries} shopping={shopping} subscriptions={subscriptions} other={other} />
                </div>
            </div>
            <Routes>
                <Route path='salary' element={<InputSalary user={user} />}></Route>
                <Route path='expense' element={<InputExpense user={user} expenses={expenses} setExpenses={setExpenses} total={total} setTotal={setTotal} />}></Route>
            </Routes>
        </div>
    )
}

export default BudgetPage
