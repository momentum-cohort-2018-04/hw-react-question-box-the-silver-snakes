import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import './foundation.css'

class Portal extends Component {
  render () {
    return (
      <Router>
        <div>
          <div className='fiddyfiddy'>
            <div className='fiddy'><Link to='/register'>Register Here</Link></div>
            <div className='fiddy'><Link to='/login'>Login Here</Link></div>
          </div>
          <Route path='/login' render={() => <Login />} />
          <Route path='/register' render={() => <Register />} />
        </div>
      </Router>

    )
  }
}

export default Portal
