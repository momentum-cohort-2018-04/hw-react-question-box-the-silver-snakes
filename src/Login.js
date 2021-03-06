import React, {Component} from 'react'
import {Button} from 'react-foundation'
import request from 'superagent'
import {Link} from 'react-router-dom'
import apiUrl from './apiUrl'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.attemptLogin = this.attemptLogin.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  attemptLogin (event) {
    event.preventDefault()
    event.target.reset()
    request
      .post(apiUrl(`/api/v1/sessions`))
      .send({
        'username': this.state.username,
        'password': this.state.password
      })
      .then((response) => {
        if (response.status === 201) {
          window.localStorage.token = response.body.api_token
          window.localStorage.user = response.body.id
          window.localStorage.username = response.body.username
          this.setState({token: response.body.api_token,
            userID: response.body.id,
            username: response.body.username
          })
          this.props.update()
          this.props.history.push('/')
        }
      })
      .catch((error) => {
        console.log('Login Error', error, error.status)
      })
  }
  render () {
    return (
      <div className='fullcenter'>
        <div className='title'><h1>Login</h1></div>
        <form onSubmit={(event) => this.attemptLogin(event)}>
          <label>Username</label>
          <input type='text' name='username' placeholder='enter username' onChange={(event) => this.handleChange(event)} />
          <label>Password</label>
          <input type='password' name='password' placeholder='enter password' onChange={(event) => this.handleChange(event)} />
          {!this.state.username && !this.state.password && <Button isExpanded isDisabled type='submit' >Submit</Button>}
          {!this.state.username && this.state.password && <Button isExpanded isDisabled type='submit' >Submit</Button>}
          {this.state.username && !this.state.password && <Button isExpanded isDisabled type='submit' >Submit</Button>}
          {this.state.username && this.state.password && <Button isExpanded type='submit' >Submit</Button>}
        </form>
        <p>Don't have an account? <Link to='/register' >Register here.</Link></p>
      </div>
    )
  }
}

export default Login
