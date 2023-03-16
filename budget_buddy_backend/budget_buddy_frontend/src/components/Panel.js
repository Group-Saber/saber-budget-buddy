import React, { useEffect, useState } from 'react'
import { Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import BudgetPage from '../pages/BudgetPage';
import DashboardPage from '../pages/DashboardPage';
import DebtPage from '../pages/DebtPage';


const Panel = ({uid, updateUID}) => {
    let [user, setUser] = useState({})
    let [name, setName] = useState('You')
    let [color, setColor] = useState('#ffffff')
    let [theme, setTheme] = useState(document.body.className)
    let locate = useLocation()
    let navigate = useNavigate()


    useEffect(() => {
        /**
         * Gets all the user data from database
         */
        let getUser = async () => {
            if(uid !== '') {
                let response = await fetch(`http://127.0.0.1:8000/app/user/${uid}`)
                let data = await response.json()
                setUser(data)
                setName(`${data.first} ${data.last}`)
                setTheme(document.body.className)
            }
        }

        getUser()
    }, [uid])

    /**
     * checks if path given is currently selected
     * 
     * @param {*} path 
     * @returns a class name for the currently selected path
     */
    let isCurrent = (path) => {
        return locate.pathname.includes(`/main${path}`) ? 'current' : ''
    }

    /**
     * Logs out the user
     */
    let logout = () => {
        updateUID('')
        navigate('/login')
    }

    /**
     * toggles the theme between light and dark mode
     */
    let switchTheme = async () => {
        if(document.body.className === 'dark-theme') {
            document.body.className = 'light-theme'
            setTheme('light-theme')
            window.localStorage.setItem('theme', 'light-theme')
        } else {
            document.body.className = 'dark-theme'
            setTheme('dark-theme')
            window.localStorage.setItem('theme', 'dark-theme')
        }
    }

    /**
     * generates six random characters from a string to
     * create a hex color code
     */
    let randomColor = () => {
        const hex = '0123456789ABCDEF'
        let newColor = ''

        for(let i = 0; i < 6; i++) {
            newColor += hex.charAt(Math.floor(Math.random() * hex.length))
        }

        console.log(newColor)
        setColor('#' + newColor)
    }

    return (
        <div>
            {window.innerWidth > 768 ? 
            <div>
                <div className='top-panel'>
                    <div className='panel-info'>
                        {theme === 'dark-theme' ? 
                        <i className='material-icons top-icon' onClick={switchTheme}>light_mode</i> :
                        <i className='material-icons top-icon' onClick={switchTheme}>dark_mode</i>}
                        <div className='panel-name'>
                            <button className='name-btn'>{name}<div className='dropdown-arrow'></div></button>
                            <div className='dropdown-content'>
                                <button onClick={logout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='side-panel'>
                    <div className='side-header'>
                        <h2 style={{color: color}} onClick={randomColor}>Budget Buddy</h2>
                        <hr></hr>
                    </div>
                    <div className='links'>                    
                        <Link to='dashboard' className={isCurrent('/dashboard')} style={{color: color}}><i className='material-icons panel-icon'>space_dashboard</i> Dashboard</Link>
                        <Link to='budget' className={isCurrent('/budget')} style={{color: color}}><i className='material-icons panel-icon'>savings</i> Budget</Link>
                        <Link to='debt' className={isCurrent('/debt')} style={{color: color}}><i className='material-icons panel-icon'>payments</i> Debt</Link>
                    </div>
                </div>
            </div> : 
            <div>
                <div className='top-panel'>
                    <div className='panel-title' style={{color: color}} onClick={randomColor}>Budget Buddy</div>
                </div>
                <div className='side-panel'>
                    <div className='links'>                    
                        <Link to='dashboard' className={isCurrent('/dashboard')} style={{color: color}}><i className='material-icons panel-icon'>space_dashboard</i></Link>
                        <Link to='budget' className={isCurrent('/budget')} style={{color: color}}><i className='material-icons panel-icon'>savings</i></Link>
                        <Link to='debt' className={isCurrent('/debt')} style={{color: color}}><i className='material-icons panel-icon'>payments</i></Link>
                    </div>
                </div>
            </div>}
            <Routes>
                <Route path='dashboard' element={<DashboardPage uid={uid} user={user} />}></Route>
                <Route path='budget/*' element={<BudgetPage uid={uid} user={user} />}></Route>
                <Route path='debt/*' element={<DebtPage uid={uid} user={user} />}></Route>
            </Routes>
        </div>
    )
}

export default Panel
