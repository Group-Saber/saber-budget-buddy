import React, { useEffect, useState } from 'react'
import { Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import DashboardPage from '../pages/DashboardPage';
import DebtPage from '../pages/DebtPage';
import UserPage from '../pages/UserPage'
import BudgetsList from './BudgetsList'


const Panel = ({uid, updateUID}) => {
    let locate = useLocation()
    let navigate = useNavigate()
    let [user, setUser] = useState({})
    let [name, setName] = useState('You')


    useEffect(() => {
        let getUser = async () => {
            if(uid !== '') {
                let response = await fetch(`http://127.0.0.1:8000/app/user/${uid}`)
                let data = await response.json()
                setUser(data)
                setName(`${data.first} ${data.last}`)
            }
        }

        getUser()
    }, [uid])

    let isCurrent = (path) => {
        console.log(locate.pathname)
        return locate.pathname.includes(`/main${path}`) ? 'current' : ''
        // return locate.pathname === `/main${path}` ? 'current' : ''
    }

    let logout = () => {
        updateUID('')
        navigate('/login')
    }

    return (
        <div>
            <div className='top-panel'>
                <div className='panel-name'>
                    <button className='name-btn'>{name}<div className='dropdown-arrow'></div></button>
                    <div className='dropdown-content'>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className='side-panel'>
                <div className='side-header'>
                    <h2>Budget Buddy</h2>
                    <hr></hr>
                </div>
                <div className='links'>                    
                    <Link to='dashboard' className={isCurrent('/dashboard')}><i className='material-icons panel-icon'>space_dashboard</i> Dashboard</Link>
                    <Link to='budget' className={isCurrent('/budget')}><i className='material-icons panel-icon'>savings</i> Budget</Link>
                    <Link to='debt' className={isCurrent('/debt')}><i className='material-icons panel-icon'>payments</i> Debt</Link>
                    <Link to='user' className={isCurrent('/user')}><i className='material-icons panel-icon'>person</i> User</Link>
                </div>
            </div>
            <Routes>
                <Route path='dashboard' element={<DashboardPage uid={uid} user={user} />}></Route>
                <Route path='budget' element={<BudgetsList />}></Route>
                <Route path='debt/*' element={<DebtPage uid={uid} user={user} />}></Route>
                <Route path='user' element={<UserPage user={user} />}></Route>
            </Routes>
        </div>
    )
}

export default Panel
