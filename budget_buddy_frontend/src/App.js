import './App.css';
import BudgetsList from './components/BudgetsList'
import SidePanel from './components/SidePanel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DebtPage from './pages/DebtPage';
import TopPanel from './components/TopPanel';

function App() {
  let uid = 'YkzaPKHIUpaBvejgxISy8DIav243'
  return (
    <Router>
      <div>
        <header>
          <TopPanel uid={uid} />
          <SidePanel />
          <Routes>
            <Route path='/budget' element={<BudgetsList />}></Route>
            <Route path='/debt' element={<DebtPage />}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
