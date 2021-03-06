import React from 'react'
import Header from './Header'
import Home from './Home'
import Public from './Public'
import Notify from './Notify'
import User from './UpdateProfile'
import Users from './Userprofile'
import chat from './Chat'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export default function Dashboard() {
  
  return (
      <div style={{backgroundColor:"#ccc",height:'100vh'}}>
        <Router>
        <Header />
        {/* <Notify /> */}
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/chat" component={chat} />
            <Route path="/public" component={Public} />
            <Route path="/user/:id" component={Users} /> 
            <Route path="/update-profile" component={User} />
          </Switch>
        </Router>
      </div>
  )
}