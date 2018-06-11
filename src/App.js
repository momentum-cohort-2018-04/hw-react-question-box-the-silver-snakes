import React, { Component } from 'react'
import './foundation.css'
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {Breadcrumbs, BreadcrumbItem} from 'react-foundation'

import Login from './Login'
import Questions from './Questions'
import UserQuestions from './UserQuestions'
import LastQuestion from './LastQuestion'
import Register from './Register'

// import IndividualQuestionAndAnswers from './IndividualQuestionAndAnswers'

class App extends Component {
  constructor () {
    super()
    this.state = {
      token: window.localStorage.token ? window.localStorage.token : '',
      last: window.localStorage.last ? window.localStorage.last : ''
    }
  }
  render () {
    return (
      <Router>
        <div>
          <header>
            <div className='breadcrumbs-example'>
              <Breadcrumbs>
                <BreadcrumbItem><Link to='/'><img className='nav_img' src='https://tinyurl.com/yb7ek22r' alt='logo' /></Link></BreadcrumbItem>
                {!this.state.token &&
                  <BreadcrumbItem className='nav-center'><Link to='/login'>Login/Register</Link></BreadcrumbItem>}
                {this.state.token &&
                <div>
                  <BreadcrumbItem className='nav-center'><Link to='/user'>My Questions</Link></BreadcrumbItem>
                  <BreadcrumbItem className='nav-center'><Link to='/last'>Last Q</Link></BreadcrumbItem>
                  <BreadcrumbItem className='nav-center'><Link to='/??'>Logout</Link></BreadcrumbItem>
                </div>}
              </Breadcrumbs>
            </div>
          </header>
          <Route exact path='/register' render={({history}) => <Register history={history} />} />
          <Route exact path='/login' render={({history}) => <Login history={history} />} />
          <Route exact path='/last' render={() => <LastQuestion questionid='1' />} />
          <Route exact path='/user' render={() => <UserQuestions userid='1' />} />
          {/* <Route path='/' render={() => <Questions />} /> */}
        </div>
      </Router>
    )
  }
}

export default App
