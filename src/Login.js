import React, {Component} from 'react'
import {Button} from 'react-foundation'
// import request from 'superagent'

class Login extends Component {
  constructor () {
    super()
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

  attemptLogin () {
    console.log('loginattempted')
  }
  render () {
    return (
      <div className='fullcenter'>
        <div className='title'><h1>Login</h1></div>
        <form onSubmit={this.attemptLogin}>
          <label>Username</label>
          <input type='text' name='username' placeholder='enter username' onChange={(event) => this.handleChange(event)} />
          <label>Password</label>
          <input type='text' name='password' placeholder='enter password' onChange={(event) => this.handleChange(event)} />
          <Button isExpanded type='submit' >Submit</Button>
        </form>
      </div>
    )
  }
}

export default Login
