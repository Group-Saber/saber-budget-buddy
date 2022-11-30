import React, { useEffect, useState } from 'react'
import DebtBarChart from '../components/DebtBarChart'
import ExpensesLineChart from '../components/ExpensesLineChart'
import ExpensesPieChart from '../components/ExpensesPieChart'
import ExpensesRadarChart from '../components/ExpensesRadarChart'

const DashboardPage = ({uid, user}) => {
    let [debts, setDebts] = useState([])
    let [expenses, setExpenses] = useState([])
    let [total, setTotal] = useState(0)

    useEffect(() => {
        /**
         * Gets all the debts the user has
         */
        let getDebts = async () => {
            if(uid !== '' && Object.keys(user).length !== 0) {
                let data = Object.values(user.debts)
                setDebts(data.reverse())
            }
        }

        /**
         * Gets all the expenses the user has
         */
        let getExpenses = async () => {
            if(uid !== '' && Object.keys(user).length !== 0) {
                let data = Object.values(user.expenses)
                getMonthlyExpenses(data.reverse())
            }
        }

        getDebts()
        getExpenses()
    }, [uid, user])

    /**
     * Calculates the total expenses for the current month
     * 
     * @param {*} data 
     */
    let getMonthlyExpenses = (data) => {
        let temp = 0
        let curMonth = new Date()
        curMonth.setDate(1)
        curMonth.setHours(0,0,0,0)
        
        for(let i in data) {
            if(data[i].date >= curMonth.getTime()) {
                temp += data[i].amount
            }
        }
        
        setExpenses(data)
        setTotal(temp)
    }

    return (
        <div className='tab-body'>
            <div className='dash-top'>
                {window.innerWidth > 1800 ? <div className='dash-column'>
                    <div className='dash-budget'>Income</div>
                    <div className='dash-budget'>Aside</div>
                    <div className='dash-budget'>Remaining</div>
                </div> : null}
                {window.innerWidth > 768 ? <div className='dash-column'>
                    <div className='dash-budget'>${parseFloat(user.income).toFixed(2)}</div>
                    <div className='dash-budget'>${parseFloat(user.aside).toFixed(2)}</div>
                    <div className='dash-budget'>${(user.income - user.aside - total).toFixed(2)}</div>
                </div> : null}
                <div className='dash-chart'>
                    <ExpensesLineChart expenses={expenses} color='#E8896E'></ExpensesLineChart>
                </div>
                <div className='dash-chart'>
                    <DebtBarChart debts={debts.map((debt) => debt)} color={'#618796'} title={'Debts'} />
                </div>
            </div>
            <div className='dash-bottom'>
                <div className='dash-piechart'>
                    <ExpensesPieChart expenses={expenses} />
                </div>
                <div className='dash-piechart'>
                    <ExpensesRadarChart expenses={expenses} color={'#FE2A4D'} />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
