import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import EditExpense from '../components/EditExpense'
import ExpensesLineChart from '../components/ExpensesLineChart'
import ExpensesPieChart from '../components/ExpensesPieChart'
import InputAside from '../components/InputAside'
import InputExpense from '../components/InputExpense'
import InputSalary from '../components/InputSalary'

const BudgetPage = ({uid, user}) => {
    let [expenses, setExpenses] = useState([])
    let [total, setTotal] = useState(0)
    let [months, setMonths] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        let getData = () => {
            if(uid !== '' && Object.keys(user).length !== 0) {
                let data = Object.values(user.expenses)
                getExpenses(data.reverse())
            }
        }
        
        getData()
    }, [uid, user])

    let getExpenses = (data) => {
        let temp = 0
        let curMonth = new Date()
        curMonth.setDate(1)
        curMonth.setHours(0,0,0,0)
        let prevMonth = new Date(curMonth)
        let prevMonths = []
        let index = 0

        prevMonths.push({
            date: new Date(prevMonth),
            amount: 0
        })

        for(let i in data) {
            if(data[i].date >= curMonth.getTime()) {
                temp += data[i].amount
            }

            if(data[i].date >= prevMonth.getTime()) {
                prevMonths[index].amount += data[i].amount
            } else {
                prevMonth.setMonth(prevMonth.getMonth() - 1)
                prevMonths.push({
                    date: new Date(prevMonth),
                    amount: data[i].amount
                })

                index++
            }
        }
        
        setExpenses(data)
        setTotal(temp)
        setMonths(prevMonths)
    }

    let inputSalary = () => {
        navigate('/main/budget/salary')
    }

    let inputAside = () => {
        navigate('/main/budget/aside')
    }

    let inputExpense = () => {
        navigate('/main/budget/expense')
    }

    let formatDate = (date) => {
        let newDate = `${date.getMonth() + 1}/${date.getDate()}`

        if(new Date().getFullYear() !== date.getFullYear()) {
            newDate += `/${date.getFullYear()}`
        }

        return newDate
    }

    let formatMonth = (date) => {
        let month = date.toLocaleString('default', { month: 'long' })

        if(date.getFullYear() !== new Date().getFullYear()) {
            month += ` ${date.getFullYear()}`
        }

        return month
    }

    let editExpense = (index) => {
        navigate('/main/budget/e' + index, {state:index})
    }

    return (
        <div className='tab-body'>
            <div className='budget-top'>
                <div className='budget-column'>
                    <div className='budget-title'>Monthly Details</div>
                    <div className='budget-row'>
                        <div className='budget-tile'>Salary</div>
                        <div className='budget-tile'>Aside</div>
                        <div className='budget-tile'>Expenses</div>
                        <div className='budget-tile'>Remaining</div>
                    </div>
                    <div className='budget-row'>
                        <div className='budget-tile click-tile' onClick={inputSalary}>${parseFloat(user.salary).toFixed(2)}</div>
                        <div className='budget-tile click-tile' onClick={inputAside}>${parseFloat(user.aside).toFixed(2)}</div>
                        <div className='budget-tile click-tile' onClick={inputExpense}>${total.toFixed(2)}</div>
                        <div className='budget-tile'>${(user.salary - user.aside - total).toFixed(2)}</div>
                    </div>
                </div>
                <div className='budget-chart'>
                    <ExpensesLineChart expenses={expenses} color={'#6C43B0'}></ExpensesLineChart>
                </div>
                {window.innerWidth > 1800 ? 
                <div className='small-table'>
                    <div className='table-title'>Expenses per Month</div>
                    <ul className='table'>
                        <li className='table-header months-header'>
                            <div className='col small-col-1'>Month</div>
                            <div className='col small-col-2'>Amount</div>
                        </li>
                        {months.map((month, index) => (
                            <li className='table-row' key={index}>
                                <div className='col small-col-1'>{formatMonth(month.date)}</div>
                                <div className='col small-col-2'>{month.amount.toFixed(2)}</div>
                            </li>
                        ))}
                    </ul>
                </div> : null}
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
                                <div className='col col-1' data-label='Type'>{expense.type.charAt(0).toUpperCase() + expense.type.slice(1)}</div>
                                <div className='col col-2' data-label='Amount'>{expense.amount.toFixed(2)}</div>
                                <div className='col col-4' data-label='Date'>{formatDate(new Date(expense.date))}</div>
                                <div className='col col-5' data-label='Button'><i className='material-icons debt-icon' onClick={() => editExpense(index)}>more_vert</i></div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='dash-piechart'>
                    <ExpensesPieChart expenses={expenses} />
                </div>
            </div>
            <Routes>
                <Route path='salary' element={<InputSalary user={user} />}></Route>
                <Route path='aside' element={<InputAside user={user} />}></Route>
                <Route path='expense' element={<InputExpense user={user} expenses={expenses} setExpenses={setExpenses} total={total} setTotal={setTotal} />}></Route>
                <Route path='e:index' element={<EditExpense uid={uid} total={total} setTotal={setTotal} expenses={expenses} setExpenses={setExpenses} />}></Route>
            </Routes>
        </div>
    )
}

export default BudgetPage
