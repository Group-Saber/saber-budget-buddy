import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Panel from './components/Panel';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerifyPage from './pages/VerifyPage';

function App() {
  let [uid, setUID] = useState('')

  let updateUID = (newUID) => {
    window.localStorage.setItem('uid', JSON.stringify(newUID));
    setUID(newUID)
  }

  useEffect(() => {
    let getUID = () => {
      const data = window.localStorage.getItem('uid');
  
      if(data !== null) {
        setUID(JSON.parse(data));
      }
    }

    let detectTheme = () => {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")

      if (darkThemeMq.matches) {
        document.body.className = 'dark-theme'
      } else {
        document.body.className = 'light-theme'
      }
    }

    getUID()
    detectTheme()
  }, [uid])

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
          <Route path='/main' element={<Navigate to='/main/dashboard'></Navigate>}></Route>
          <Route path='/login' element={<LoginPage uid={updateUID} />}></Route>
          <Route path='/signup' element={<SignupPage />}></Route>
          <Route path='/verify' element={<VerifyPage />}></Route>
          <Route path='/main/*' element={<Panel uid={uid} updateUID={updateUID} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
