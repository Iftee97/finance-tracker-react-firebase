import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'

const App = () => {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path='/login'
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path='/signup'
            element={user ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App