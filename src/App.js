import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// pages & components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
