import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import './App.css';

import AuthPage from './Authentication/AuthPage'
import LoginPage from './Components/Auth/LoginCard'
import SignupPage from './Components/Auth/SignupCard'
import PwdReset from './Components/Auth/PwdReset'
import HomePage from './Pages/HomePage'
import Profile from './Pages/Profile'
import Wrapper from './Pages/Wrapper';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/forgotpassword" element={<PwdReset />} />
          </Route>
          <Route path="/home" element={<Wrapper />}>
            <Route path="" element={<HomePage />} />
          <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;