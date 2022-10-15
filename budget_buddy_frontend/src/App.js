import './App.css';
import BudgetsList from './components/BudgetsList'
import SidePanel from './components/SidePanel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <SidePanel />
          {/* <h1>Budget Buddy</h1>
          <NavBar /> */}
          <Routes>
            <Route path='/budgets' element={<BudgetsList />}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
