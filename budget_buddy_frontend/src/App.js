import './App.css';
import BudgetsList from './components/BudgetsList'
import InputBudget from './components/InputBudget'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const[data,setData] = useState(null)                                        //sets the value to nothing initially of data
  const[print,setPrint]=useState(false);                                      //prints out the data given
  
  function getData(val)
  {
    setData(val.target.value)
    console.warn(val.target.value)
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Budget Buddy</h1>
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
