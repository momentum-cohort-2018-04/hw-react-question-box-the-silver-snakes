import React, {Component} from 'react'
import {Button} from 'react-foundation'
// import request from 'superagent'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      passwordDup: '',
      token: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.attemptLogin = this.attemptLogin.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  attemptLogin () {
    console.log('register attempted')
  }
  render () {
    return (
      <div className='fullcenter'>
        <div className='title'><h1>Register Here</h1></div>
        <form onSubmit={this.attemptLogin}>
          <label>Username</label>
          <input type='text' name='username' placeholder='create your username' onChange={(event) => this.handleChange(event)} />
          <label>Password</label>
          <input type='text' name='password' placeholder='create your password' onChange={(event) => this.handleChange(event)} />
          <label>Password Confirmation</label>
          <input type='text' name='passwordDup' placeholder='confirm your password' onChange={(event) => this.handleChange(event)} />
          {this.state.password === this.state.passwordDup && <div className='input-success'>Your Passwords Match!</div>}
          {this.state.password && this.state.passwordDup && this.state.password !== this.state.passwordDup && <div className='input-warning'>Passwords Do Not Match!</div>}
          <Button isExpanded type='submit' >Submit</Button>
        </form>
      </div>
    )
  }
}

export default Register
