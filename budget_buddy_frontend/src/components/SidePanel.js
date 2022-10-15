function SidePanel() {
    return (
        <div className="side-panel">
            <div className="side-header">
                <h2>Budget Buddy</h2>
                <hr></hr>
            </div>
            <div className="links">
                <a href="/">Dashboard</a>
                <a href="/budgets">Budgets</a>
                <a href="/debts">Debts</a>
            </div>
        </div>
    )
}

export default SidePanel;