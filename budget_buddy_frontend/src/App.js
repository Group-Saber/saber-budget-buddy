import './App.css';
import BudgetsList from './components/BudgetsList'
import React, {useState} from 'react'                                     

function App() {
  const[data,setData] = useState(null)                                        //sets the value to nothing initially of data
  const[print,setPrint]=useState(false);                                      //prints out the data given
  
  function getData(val)
  {
    setData(val.target.value)
    console.warn(val.target.value)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Budget Buddy</h1>
        <input type="number" onChange= {getData}/>                               {/*identifies the type of value ex: text or number*/}
        <button on Click={()=>setPrint(true)} >Print Value</button>             {/*button that prints value*/}
        <h1>{data}</h1>                                                         {/*prints out the data given on the site is here to show that it works in storing the value*/}
        <BudgetsList />
      </header>
    </div>
  );
}

export default App;
