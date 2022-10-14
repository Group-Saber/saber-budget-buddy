import './App.css';
import BudgetsList from './components/BudgetsList'
import InputBudget from './components/InputBudget'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Budget Buddy</h1>
          <NavBar />
          <Routes>
            <Route path='/budgets' element={<BudgetsList />}></Route>
            <Route path='/input' element={<InputBudget />}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
