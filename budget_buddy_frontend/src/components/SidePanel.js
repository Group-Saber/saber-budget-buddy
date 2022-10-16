import React from 'react'
import { Link, useLocation } from "react-router-dom";

function SidePanel() {
    let locate = useLocation()

    return (
        <div className="side-panel">
            <div className="side-header">
                <h2>Budget Buddy</h2>
                <hr></hr>
            </div>
            <div className="links">
                <Link to="/" className={locate.pathname === '/' ? 'current' : ''}>Dashboard</Link>
                <Link to="/budget" className={locate.pathname === '/budget' ? 'current' : ''}>Budget</Link>
                <Link to="/debt" className={locate.pathname === '/debt' ? 'current' : ''}>Debt</Link>
                <Link to="/user" className={locate.pathname === '/user' ? 'current' : ''}>User</Link>
            </div>
        </div>
    )
}

export default SidePanel;