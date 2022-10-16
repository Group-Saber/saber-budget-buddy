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
                <Link to="/" className={locate.pathname === '/' ? 'current' : ''}><i className="material-icons">space_dashboard</i> Dashboard</Link>
                <Link to="/budget" className={locate.pathname === '/budget' ? 'current' : ''}><i className="material-icons">savings</i> Budget</Link>
                <Link to="/debt" className={locate.pathname === '/debt' ? 'current' : ''}><i className="material-icons">payments</i> Debt</Link>
                <Link to="/user" className={locate.pathname === '/user' ? 'current' : ''}><i className="material-icons">person</i> User</Link>
            </div>
        </div>
    )
}

export default SidePanel;