import React, {Component} from 'react'
import {Button} from 'react-foundation'
import request from 'superagent'
import Register from './Register'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      register: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.attemptLogin = this.attemptLogin.bind(this)
    this.registerNew = this.registerNew.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  registerNew () {
    this.setState({register: true})
  }

  attemptLogin () {
    console.log('loginattempted')
    request
      .post(`localhost:3000/api/v1/sessions`)
      // .set('Content-Type', 'application/json')
      .send({
        'username': this.state.username,
        'password': this.state.password
      })
      .then((response) => {
        if (response.status === 201) {
          window.localStorage.token = response.api_token
          this.setState({token: response.api_token})
          // this.setState({registrationFail: false})
        }
      })
      .catch((error) => {
        console.log(error)
        console.log(error.status)
      })
  }
  render () {
    if (this.state.register) {
      return (
        <Register />
      )
    } else {
      return (
        <div className='fullcenter'>
          <div className='title'><h1>Login</h1></div>
          <form onSubmit={this.attemptLogin}>
            <label>Username</label>
            <input type='text' name='username' placeholder='enter username' onChange={(event) => this.handleChange(event)} />
            <label>Password</label>
            <input type='text' name='password' placeholder='enter password' onChange={(event) => this.handleChange(event)} />
            {!this.state.username && !this.state.password && <Button isExpanded isDisabled type='submit' >Submit</Button>}
            {!this.state.username && this.state.password && <Button isExpanded isDisabled type='submit' >Submit</Button>}
            {this.state.username && !this.state.password && <Button isExpanded isDisabled type='submit' >Submit</Button>}
            {this.state.username && this.state.password && <Button isExpanded type='submit' >Submit</Button>}
          </form>
          <p>Don't have an account? <button className='register-button' onClick={this.registerNew}>Register here.</button></p>
        </div>
      )
    }
  }
}

export default Login
