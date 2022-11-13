import React, { useEffect, useState } from 'react'
import DebtBarChart from '../components/DebtBarChart'
import ExpensesPieChart from '../components/ExpensesPieChart'

const DashboardPage = ({uid, user}) => {
    let [debts, setDebts] = useState([])

    useEffect(() => {
        let getDebts = async () => {
            if(uid !== '' && Object.keys(user).length !== 0) {
                let data = Object.values(user.debts)
                setDebts(data.reverse())
            }
        }

        getDebts()
    }, [uid, user])

    return (
        <div className='tab-body'>
            <div className='dash-top'>
                <div className='dash-column'>
                    <div className='dash-budget'>${user.salary}</div>
                    <div className='dash-budget'>Remaining</div>
                    <div className='dash-budget'>Needed</div>
                </div>
                <div className='dash-chart'>Spending Chart</div>
                <div className='dash-chart'>
                    <DebtBarChart debts={debts.map((debt) => debt)} color={'#25537b'} title={'Debts'} />
                </div>
            </div>
            <div className='dash-bottom'>
                <div className='dash-piechart'>
                    <ExpensesPieChart expenses={user.expenses}/>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
