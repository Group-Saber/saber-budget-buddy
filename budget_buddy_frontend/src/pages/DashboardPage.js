import React, { useEffect, useState } from 'react'
import DebtBarChart from '../components/DebtBarChart'
import ExpensesPieChart from '../components/ExpensesPieChart'

const DashboardPage = ({uid, user}) => {
    let [debts, setDebts] = useState([])
    let [expenses, setExpenses] = useState([])
    let [total, setTotal] = useState(0)
    let [color, setColor] = useState('#222222')
    let [contrast, setContrast] = useState('#ffffff')

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

    let handleClick = () => {
        randomColor()
    }

    let randomColor = () => {
        const hex = '0123456789ABCDEF'
        let newColor = ''

        for(let i = 0; i < 6; i++) {
            newColor += hex.charAt(Math.floor(Math.random() * hex.length))
        }

        console.log(newColor)
        setColor('#' + newColor)
        setContrast('#' + invertHex(newColor))
    }

    let invertHex = (hex) => {
        return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substring(1)
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
                <div className='dash-chart'>Spending Chart</div>
                <div className='dash-chart'>
                    <DebtBarChart debts={debts.map((debt) => debt)} color={'#618796'} title={'Debts'} />
                </div>
            </div>
            <div className='dash-bottom'>
                <div className='dash-piechart'>
                    <ExpensesPieChart expenses={expenses} />
                </div>
                <div className='user-info'>
                    <div className='user-img box' style={{backgroundColor: color, color: contrast}} onClick={handleClick}>Profile Image</div>
                    <div className='user-detail'>
                        <div className='user-label'>Name:</div>
                        <div className='user-text'>{`${user.first} ${user.last}`}</div>
                        <i className='material-icons user-icon'>edit</i>
                    </div>
                    <div className='user-detail'>
                        <div className='user-label'>Email:</div>
                        <div className='user-text'>{user.email}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
