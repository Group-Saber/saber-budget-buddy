import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import InputSalary from '../components/InputSalary'

const BudgetPage = ({uid, user}) => {
    let navigate = useNavigate()

    let inputSalary = () => {
        navigate('/main/budget/salary')
    }

    return (
        <div className='tab-body'>
            <div className='budget-top'>
                <div className='salary' onClick={inputSalary}>${user.salary}</div>                
            </div>
            <Routes>
                <Route path='salary' element={<InputSalary user={user} />}></Route>
            </Routes>
        </div>
    )
}

export default BudgetPage
