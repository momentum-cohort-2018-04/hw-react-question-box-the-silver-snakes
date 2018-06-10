import React, { Component } from 'react'
import './foundation.css'
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {Breadcrumbs, BreadcrumbItem} from 'react-foundation'

import SitePortal from './SitePortal'
import Questions from './Questions'
import UserQuestions from './UserQuestions'
import LastQuestion from './LastQuestion'

// import IndividualQuestionAndAnswers from './IndividualQuestionAndAnswers'

class App extends Component {
  constructor () {
    super()
    this.state = {
      token: window.localStorage.token ? window.localStorage.token : 's',
      last: window.localStorage.last ? window.localStorage.last : ''
    }
  }
  render () {
    return (
      <Router>
        <div>
          <header>
            <div className='breadcrumbs-example'>
              <nav aria-label='You are here:' role='navigation'>
                <Breadcrumbs>
                  <BreadcrumbItem><Link to='/'><img className='nav_img' src='https://tinyurl.com/yb7ek22r' /></Link></BreadcrumbItem>
                  {/* <BreadcrumbItem><a href='/'><img src='./images/whatisit.png' /></a></BreadcrumbItem> */}
                  <BreadcrumbItem className='nav-center'><Link to='/portal'>Login/Register</Link></BreadcrumbItem>
                  {this.state.token &&
                    <div>
                      <BreadcrumbItem className='nav-center'><Link to='/user/questions'>My Questions</Link></BreadcrumbItem>
                      <BreadcrumbItem className='nav-center'><Link to='/questions/last'>Last Q</Link></BreadcrumbItem>
                      <BreadcrumbItem className='nav-center'><Link to='/??'>Logout</Link></BreadcrumbItem>
                    </div>
                  }
                </Breadcrumbs>
              </nav>
            </div>
          </header>

          <Route exact path='/' render={() => <Questions />} />
          <Route exact path='/portal' render={() => <SitePortal />} />
          <Route path='/questions/last' render={() => <LastQuestion questionid='1' />} />
          <Route path='/user/questions' render={() => <UserQuestions userid='1' />} />

        </div>
      </Router>
    )
  }
}

export default App
