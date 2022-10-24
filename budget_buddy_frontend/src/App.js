import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Panel from './components/Panel';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  let uid = 'YkzaPKHIUpaBvejgxISy8DIav243'

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignupPage />}></Route>
          <Route path='/main/*' element={<Panel uid={uid} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
