import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import EditExpense from '../components/EditExpense'
import ExpensesLineChart from '../components/ExpensesLineChart'
import ExpensesPieChart from '../components/ExpensesPieChart'
import InputAside from '../components/InputAside'
import InputExpense from '../components/InputExpense'
import InputIncome from '../components/InputIncome'

const BudgetPage = ({uid, user}) => {
    let [expenses, setExpenses] = useState([])
    let [total, setTotal] = useState(0)
    let [months, setMonths] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        /**
         * Gets all the expenses the user has
         */
        let getExpenses = () => {
            if(uid !== '' && Object.keys(user).length !== 0) {
                let data = Object.values(user.expenses)
                getMonthlyExpenses(data.reverse())
            }
        }
        
        getExpenses()
    }, [uid, user])

    /**
     * Calculates the total expenses for the current month, and previous months
     * 
     * @param {*} data 
     */
    let getMonthlyExpenses = (data) => {
        let temp = 0
        // set current date to the first of the month
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
            // gets total for current month
            if(data[i].date >= curMonth.getTime()) {
                temp += data[i].amount
            }

            // gets total for previous months, or decreases the month
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

    let inputIncome = () => {
        navigate('/main/budget/income')
    }

    let inputAside = () => {
        navigate('/main/budget/aside')
    }

    let inputExpense = () => {
        navigate('/main/budget/expense')
    }

    /**
     * Gets a date in milliseconds and converts it to the month and day,
     * adds year to the end if it is not the same as the current year
     * 
     * @param {*} date 
     * @returns the date in mm/dd or mm/dd/yyyy format
     */
    let formatDate = (date) => {
        let newDate = `${date.getMonth() + 1}/${date.getDate()}`

        if(new Date().getFullYear() !== date.getFullYear()) {
            newDate += `/${date.getFullYear()}`
        }

        return newDate
    }

    /**
     * Gets a date in milliseconds and converts it to the month,
     * adds year to the end if it is not the same as the current year
     * 
     * @param {*} date 
     * @returns the name of the month
     */
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
        <div>
            {window.innerWidth > 768 ?
            <div className='tab-body'>
                <div className='budget-top'>
                    <div className='budget-column'>
                        <div className='budget-title'>Monthly Details</div>
                        <div className='budget-row'>
                            <div className='budget-tile'>Income</div>
                            <div className='budget-tile'>Aside</div>
                            <div className='budget-tile'>Expenses</div>
                            <div className='budget-tile'>Remaining</div>
                        </div>
                        <div className='budget-row'>
                            <div className='budget-tile click-tile' onClick={inputIncome}>${parseFloat(user.salary).toFixed(2)}</div>
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
                    <div className='budget-piechart'>
                        <ExpensesPieChart expenses={expenses} />
                    </div>
                </div>
            </div> : 
            <div className='tab-body'>
                <div className='mobile-title'>Monthly Details</div>
                <div className='mobile-column'>
                    <div className='mobile-row'>
                        <div className='mobile-tile'>Income</div>
                        <div className='mobile-tile'>Aside</div>
                        <div className='mobile-tile'>Expenses</div>
                        <div className='mobile-tile'>Remaining</div>
                    </div>
                    <div className='mobile-row'>
                        <div className='mobile-tile'>${parseFloat(user.salary).toFixed(2)}</div>
                        <div className='mobile-tile'>${parseFloat(user.aside).toFixed(2)}</div>
                        <div className='mobile-tile'>${total.toFixed(2)}</div>
                        <div className='mobile-tile'>${(user.salary - user.aside - total).toFixed(2)}</div>
                    </div>
                </div>
                <div className='budget-piechart'>
                    <ExpensesPieChart expenses={expenses} />
                </div>
            </div> }
            <Routes>
                <Route path='income' element={<InputIncome user={user} />}></Route>
                <Route path='aside' element={<InputAside user={user} />}></Route>
                <Route path='expense' element={<InputExpense user={user} expenses={expenses} setExpenses={setExpenses} total={total} setTotal={setTotal} />}></Route>
                <Route path='e:index' element={<EditExpense user={user} uid={uid} total={total} setTotal={setTotal} expenses={expenses} setExpenses={setExpenses} />}></Route>
            </Routes>
        </div>
    )
}

export default BudgetPage
