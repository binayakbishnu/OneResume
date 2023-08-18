import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import AuthPage from './Authentication/AuthPage'
import LoginPage from './Components/Auth/LoginCard'
import SignupPage from './Components/Auth/SignupCard'
import PwdReset from './Components/Auth/PwdReset'
import HomePage from './Pages/HomePage'

import './App.css';

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
          <Route path="/home" element={<HomePage />}>
            {/* <Route path="" element={} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;