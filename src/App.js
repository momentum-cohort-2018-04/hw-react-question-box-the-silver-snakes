import React, { Component } from 'react'
import './foundation.css'
import './App.css'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import {Breadcrumbs, BreadcrumbItem} from 'react-foundation'

import Login from './Login'
import Questions from './Questions'
import UserQuestions from './UserQuestions'
import LastQuestion from './LastQuestion'
import PostQuestion from './PostQuestion'
import PostAnswer from './PostAnswer'
import EditAnswer from './EditAnswer'
import EditQuestion from './EditQuestion'
import IndividualQuestionAndAnswers from './IndividualQuestionAndAnswers'
import Register from './Register'

class App extends Component {
  constructor () {
    super()
    this.state = {
      token: window.localStorage.token ? window.localStorage.token : '',
      userid: window.localStorage.user ? window.localStorage.user : '',
      username: window.localStorage.username ? window.localStorage.username : '',
      last: window.localStorage.last ? window.localStorage.last : ''

    }
    this.updateApp = this.updateApp.bind(this)
  }
  updateApp () {
    this.setState({
      token: window.localStorage.token ? window.localStorage.token : '',
      userid: window.localStorage.user ? window.localStorage.user : '',
      username: window.localStorage.username ? window.localStorage.username : '',
      last: window.localStorage.last ? window.localStorage.last : ''
    })
  }
  clearLocal (event) {
    event.preventDefault()
    window.localStorage.clear()
    this.setState({
      token: '',
      userid: '',
      username: '',
      last: ''
    })
    window.location.reload()
  }
  render () {
    return (
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
                  {this.state.last && <BreadcrumbItem className='nav-center'><Link to='/last'>Last Q</Link></BreadcrumbItem> }
                  <BreadcrumbItem className='nav-center'> <a href='' onClick={(event) => this.clearLocal(event)}>Logout</a></BreadcrumbItem>
                </div>}
            </Breadcrumbs>
          </div>
        </header>
        <Route exact path='/register' render={({history}) => <Register history={history} update={this.updateApp} />} />
        <Route exact path='/login' render={({history}) => <Login history={history} update={this.updateApp} />} />
        <Route exact path='/last' render={() => <LastQuestion />} />
        <Route exact path='/user' render={() => <UserQuestions />} />
        <Route exact path='/add' render={({history}) => <PostQuestion history={history} />} />
        <Route exact path='/questions/:id' render={(props) => <IndividualQuestionAndAnswers {...props} />} />
        <Route exact path='/questions/:id/edit' render={(props) => <EditQuestion {...props} />} />
        <Route exact path='/questions/:id/answers/:id/edit' render={(props) => <EditAnswer {...props} />} />
        <Route exact path='/questions/:id/answers/add' render={(props) => <PostAnswer {...props} />} />
        <Route exact path='/' render={() => <Questions />} />
      </div>
    )
  }
}

export default App
