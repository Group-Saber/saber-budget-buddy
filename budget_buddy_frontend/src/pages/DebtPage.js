import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import DebtBarChart from '../components/DebtBarChart'
import InputDebt from '../components/InputDebt'
import EditDebt from '../components/EditDebt'
import EditPayment from '../components/EditPayment'

const DebtPage = ({uid, user}) => {
    let [debts, setDebts] = useState([])
    let [paid, setPaid] = useState([])
    let [positive, setPositive] = useState(0)
    let [negative, setNegative] = useState(0)
    let navigate = useNavigate()

    useEffect(() => {
        let getDebts = async () => {
            if(uid !== '' && Object.keys(user).length !== 0) { 
                let data = Object.values(user.debts)
                setDebts(data.reverse())
                getTotals(data)
            }
        }

        let getPaid = async () => {
            if(uid !== '' && Object.keys(user).length !== 0) { 
                let data = Object.values(user.paid)
                setPaid(data.reverse())
            }
        }

        getDebts()
        getPaid()
    }, [uid, user])

    let getTotals = (data) => {
        let p = 0
        let n = 0

        for(let i in data) {
            if(data[i].amount >= 0) {
                p += data[i].amount
            } else {
                n += data[i].amount
            }
        }
        
        setPositive(p)
        setNegative(n)
    }

    let formatDate = (date) => {
        let newDate = `${date.getMonth() + 1}/${date.getDate()}`

        if(new Date().getFullYear() !== date.getFullYear()) {
            newDate += `/${date.getFullYear()}`
        }

        return newDate
    }

    let add = () => {
        navigate('/main/debt/input')
    }

    let editDebt = (index) => {
        navigate('/main/debt/d' + index, {state:index})
    }

    let editPayment = (index) => {
        navigate('/main/debt/p' + index, {state:index})
    }

    return (
        <div className='tab-body'>
            <div className='debt-top'>
                <div className='totals'>
                    <div className='total-stacked'>
                        <div className='split top'>
                            <i className='material-icons'>arrow_upward</i> 
                            <p>${positive.toFixed(2)}</p>
                        </div>
                        <div className='split bottom'>
                        <i className='material-icons'>arrow_downward</i>
                            <p>${negative.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='total'>
                        <h2>Total</h2>
                        <p>${(positive + negative).toFixed(2)}</p>
                    </div>
                </div>
                <div className='debt-chart'>
                    <DebtBarChart debts={debts.map((debt) => debt.amount >= 0 ? (debt) : (0))} color={'#599656'} title={'Positive Debt'} />
                </div>
                <div className='debt-chart'>
                    <DebtBarChart debts={debts.map((debt) => debt.amount < 0 ? (debt) : (0))} color={'#ec0a00'} title={'Negative Debt'} />
                </div>
            </div>
            <div className='debt-bottom'>
                <div className='debts-container'>
                    <div className='debts-table-title'>Debts</div>
                    <ul className='debts-table'>
                        <li className='debts-header'>
                            <div className='col col-1'>Name</div>
                            <div className='col col-2'>Amount</div>
                            <div className='col col-3'>Note</div>
                            <div className='col col-4'>Date</div>
                            <div className='col col-5'><i className='material-icons debt-icon' onClick={add}>add</i></div>
                        </li>
                        {debts.map((debt, index) => (
                            <li className='debts-row' key={index}>
                                <div className='col col-1' data-label='Name'>{debt.name}</div>
                                <div className='col col-2' data-label='Amount'>{debt.amount.toFixed(2)}</div>
                                <div className='col col-3' data-label='Note'>{debt.note.length > 25 ? debt.note.substring(0, 25) + '...' : debt.note}</div>
                                <div className='col col-4' data-label='Date'>{formatDate(new Date(debt.date))}</div>
                                <div className='col col-5' data-label='Button'><i className='material-icons debt-icon' onClick={() => editDebt(index)}>more_vert</i></div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='debts-container'>
                    <div className='debts-table-title'>Payments</div>
                    <ul className='debts-table'>
                        <li className='debts-header paid'>
                            <div className='col col-1'>Name</div>
                            <div className='col col-2'>Amount</div>
                            <div className='col col-3'>Note</div>
                            <div className='col col-4'>Date</div>
                            <div className='col col-5'><i className='material-icons debt-icon'>add</i></div>
                        </li>
                        {paid.map((pay, index) => (
                            <li className='debts-row' key={index}>
                                <div className='col col-1' data-label='Name'>{pay.name}</div>
                                <div className='col col-2' data-label='Amount'>{pay.amount.toFixed(2)}</div>
                                <div className='col col-3' data-label='Note'>{pay.note.length > 30 ? pay.note.substring(0, 30) + '...' : pay.note}</div>
                                <div className='col col-4' data-label='Date'>{formatDate(new Date(pay.paid))}</div>
                                <div className='col col-5' data-label='Button'><i className='material-icons debt-icon' onClick={() => editPayment(index)}>more_vert</i></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path='input' element={<InputDebt uid={uid} pos={positive} neg={negative} setPos={setPositive} setNeg={setNegative} debts={debts} setDebts={setDebts} />}></Route>
                <Route path='d:index' element={<EditDebt uid={uid} pos={positive} neg={negative} setPos={setPositive} setNeg={setNegative} debts={debts} setDebts={setDebts} paid={paid} setPaid={setPaid} />}></Route>
                <Route path='p:index' element={<EditPayment uid={uid} pos={positive} neg={negative} setPos={setPositive} setNeg={setNegative} debts={debts} setDebts={setDebts} paid={paid} setPaid={setPaid} />}></Route>
            </Routes>
        </div>
    )
}

export default DebtPage
