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
        let getDebts = async () => {
            if(uid !== '' && Object.keys(user).length !== 0) {
                let data = Object.values(user.debts)
                setDebts(data.reverse())
            }
        }

        let getExpenses = async () => {
            if(uid !== '' && Object.keys(user).length !== 0) {
                let data = Object.values(user.expenses)
                getMonthly(data.reverse())
            }
        }

        getDebts()
        getExpenses()
    }, [uid, user])

    let getMonthly = (data) => {
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
                    <div className='dash-budget'>Salary</div>
                    <div className='dash-budget'>Aside</div>
                    <div className='dash-budget'>Remaining</div>
                </div> : null}
                <div className='dash-column'>
                    <div className='dash-budget'>${parseFloat(user.salary).toFixed(2)}</div>
                    <div className='dash-budget'>${parseFloat(user.aside).toFixed(2)}</div>
                    <div className='dash-budget'>${(user.salary - total).toFixed(2)}</div>
                </div>
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
