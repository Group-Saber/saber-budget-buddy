import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import InputSalary from '../components/InputSalary'

const BudgetPage = ({uid, user}) => {
    let [bills, setBills] = useState([])
    let [food, setFood] = useState([])
    let [groceries, setGroceries] = useState([])
    let [other, setOther] = useState([])
    let [shopping, setShopping] = useState([])
    let [subscriptions, setSubscriptions] = useState([])
    let [total, setTotal] = useState(0)
    let navigate = useNavigate()

    useEffect(() => {
        let getSpendings = () => {
            if(uid !== '' && Object.keys(user).length !== 0) {
                let temp = 0
                let data = Object.values(user.spent.bills)
                setBills(data.reverse())
                temp += getTotal(data)
                data = Object.values(user.spent.food)
                setFood(data.reverse())
                temp += getTotal(data)
                data = Object.values(user.spent.groceries)
                setGroceries(data.reverse())
                temp += getTotal(data)
                data = Object.values(user.spent.other)
                setOther(data.reverse())
                temp += getTotal(data)
                data = Object.values(user.spent.shopping)
                setShopping(data.reverse())
                temp += getTotal(data)
                data = Object.values(user.spent.subscriptions)
                setSubscriptions(data.reverse())
                temp += getTotal(data)

                setTotal(temp)
            }
        }

        getSpendings()
    }, [uid, user])

    let inputSalary = () => {
        navigate('/main/budget/salary')
    }

    let getTotal = (list) => {
        let temp = 0

        for(let i in list) {
            temp += list[i].amount
        }

        return temp
    }

    return (
        <div className='tab-body'>
            <div className='budget-top'>
                <div className='salary' onClick={inputSalary}>${user.salary}</div>                
                <div className='salary'>${total}</div>                
                {/* <div className='salary'>${bills}</div>                
                <div className='salary'>${food}</div>                
                <div className='salary'>${groceries}</div>                
                <div className='salary'>${other}</div>                
                <div className='salary'>${shopping}</div>                
                <div className='salary'>${subscriptions}</div>*/}
            </div>
            <Routes>
                <Route path='salary' element={<InputSalary user={user} />}></Route>
            </Routes>
        </div>
    )
}

export default BudgetPage
