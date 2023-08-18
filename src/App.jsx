import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import AuthPage from './Authentication/AuthPage'
import LoginPage from './Authentication/LoginPage'
import SignupPage from './Authentication/SignupPage'
import HomePage from './Pages/HomePage'

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
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