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
    const noteLength = window.innerWidth > 1800 ? 50 : 25

    useEffect(() => {
        /**
         * Gets all debts the user has
         */
        let getDebts = async () => {
            if(uid !== '' && Object.keys(user).length !== 0) { 
                let data = Object.values(user.debts)
                getMonthlyDebts(data)
            }
        }

        /**
         * Gets all debt payments the user has
         */
        let getPaid = async () => {
            if(uid !== '' && Object.keys(user).length !== 0) { 
                let data = Object.values(user.paid)
                setPaid(data.reverse())
            }
        }

        getDebts()
        getPaid()
    }, [uid, user])

    /**
     * Calculates the debts for the current month
     * 
     * @param {*} data 
     */
    let getMonthlyDebts = (data) => {
        let p = 0
        let n = 0
        // get current date and set it to the first of the month
        let today = new Date()
        today.setDate(1)
        today.setHours(0,0,0,0)

        // iterate through data and add only data that matches the month
        for(let i in data) {
            if(data[i].date >= today.getTime()) {
                if(data[i].amount >= 0) {
                    p += data[i].amount
                } else {
                    n += data[i].amount
                }
            }
        }

        setDebts(data.reverse())
        setPositive(p)
        setNegative(n)
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

    let inputDebt = () => {
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
            {window.innerWidth > 768 ? 
            <div>
                <div className='debt-top'>
                    <div className='totals'>
                        <div className='total-stacked'>
                            <div className='split top'>
                                <i className='material-icons'>arrow_upward</i> 
                                <p>${positive.toFixed(2)}</p>
                            </div>
                            <div className='split bottom'>
                            <i className='material-icons'>arrow_downward</i>
                                <p>-${Math.abs(negative).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='total'>
                            <h2>Total</h2>
                            <p>{positive + negative >= 0 ? '$' + (positive + negative).toFixed(2) : '-$' + Math.abs(positive + negative).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='debt-chart'>
                        <DebtBarChart debts={debts.map((debt) => debt.amount >= 0 ? (debt) : (0))} color={'#599656'} title={'Positive Debts'} />
                    </div>
                    <div className='debt-chart'>
                        <DebtBarChart debts={debts.map((debt) => debt.amount < 0 ? (debt) : (0))} color={'#ec0a00'} title={'Negative Debts'} />
                    </div>
                </div>
                <div className='debt-bottom'>
                    <div className='table-container'>
                        <div className='table-title'>Debts</div>
                        <ul className='table'>
                            <li className='table-header debt-header'>
                                <div className='col col-1'>Name</div>
                                <div className='col col-2'>Amount</div>
                                <div className='col col-3'>Note</div>
                                <div className='col col-4'>Date</div>
                                <div className='col col-5'><i className='material-icons debt-icon' onClick={inputDebt}>add</i></div>
                            </li>
                            {debts.map((debt, index) => (
                                <li className='table-row' key={index}>
                                    <div className='col col-1' data-label='Name'>{debt.name}</div>
                                    <div className='col col-2' data-label='Amount'>{debt.amount.toFixed(2)}</div>
                                    <div className='col col-3' data-label='Note'>{debt.note.length > noteLength ? debt.note.substring(0, noteLength) + '...' : debt.note}</div>
                                    <div className='col col-4' data-label='Date'>{formatDate(new Date(debt.date))}</div>
                                    <div className='col col-5' data-label='Button'><i className='material-icons debt-icon' onClick={() => editDebt(index)}>more_vert</i></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='table-container'>
                        <div className='table-title'>Payments</div>
                        <ul className='table'>
                            <li className='table-header paid-header'>
                                <div className='col col-1'>Name</div>
                                <div className='col col-2'>Amount</div>
                                <div className='col col-3'>Note</div>
                                <div className='col col-4'>Date</div>
                                <div className='col col-5'><i className='material-icons debt-icon'>add</i></div>
                            </li>
                            {paid.map((pay, index) => (
                                <li className='table-row' key={index}>
                                    <div className='col col-1' data-label='Name'>{pay.name}</div>
                                    <div className='col col-2' data-label='Amount'>{pay.amount.toFixed(2)}</div>
                                    <div className='col col-3' data-label='Note'>{pay.note.length > noteLength ? pay.note.substring(0, noteLength) + '...' : pay.note}</div>
                                    <div className='col col-4' data-label='Date'>{formatDate(new Date(pay.paid))}</div>
                                    <div className='col col-5' data-label='Button'><i className='material-icons debt-icon' onClick={() => editPayment(index)}>more_vert</i></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div> : 
            <div>
                <div className='mobile-total top'>
                        <i className='material-icons positive'>arrow_upward</i> 
                        <p>${positive.toFixed(2)}</p>
                </div>
                <div className='mobile-total bottom'>
                    <i className='material-icons'>arrow_downward</i>
                        <p>-${Math.abs(negative).toFixed(2)}</p>
                </div>
                <div className='mobile-total'>
                    <h2>Total</h2>
                    <p>{positive + negative >= 0 ? '$' + (positive + negative).toFixed(2) : '-$' + Math.abs(positive + negative).toFixed(2)}</p>
                </div>
                <div className='debt-chart'>
                    <DebtBarChart debts={debts.map((debt) => debt.amount >= 0 ? (debt) : (0))} color={'#599656'} title={'Positive Debts'} />
                </div>
                <div className='debt-chart chart-bottom'>
                    <DebtBarChart debts={debts.map((debt) => debt.amount < 0 ? (debt) : (0))} color={'#ec0a00'} title={'Negative Debts'} />
                </div>
            </div>}
            <Routes>
                <Route path='input' element={<InputDebt user={user} uid={uid} pos={positive} neg={negative} setPos={setPositive} setNeg={setNegative} debts={debts} setDebts={setDebts} />}></Route>
                <Route path='d:index' element={<EditDebt user={user} uid={uid} pos={positive} neg={negative} setPos={setPositive} setNeg={setNegative} debts={debts} setDebts={setDebts} paid={paid} setPaid={setPaid} />}></Route>
                <Route path='p:index' element={<EditPayment user={user} uid={uid} pos={positive} neg={negative} setPos={setPositive} setNeg={setNegative} debts={debts} setDebts={setDebts} paid={paid} setPaid={setPaid} />}></Route>
            </Routes>
        </div>
    )
}

export default DebtPage
