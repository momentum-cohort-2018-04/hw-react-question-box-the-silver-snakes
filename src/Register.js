import React, {Component} from 'react'
import {Button, Callout, Colors} from 'react-foundation'
import request from 'superagent'
import './foundation.css'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      passwordDup: '',
      token: '',
      registrationFail: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.attemptLogin = this.attemptLogin.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  doNOthing (event) {
    event.preventDefault()
  }

  attemptLogin () {
    console.log('register attempted')
    if (this.state.password === this.state.passwordDup) {
      request
        .post(`localhost:3000/api/v1/users`)
        // .set('Content-Type', 'application/json')
        .send({
          'username': this.state.username,
          'password': this.state.password
        })
        .then((response) => {
          window.localStorage.token = response
          this.setState({token: response})
          this.setState({registrationFail: false})
        })
    } else {
      this.setState({registrationFail: true})
    }
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
          {this.state.password !== '' && this.state.password === this.state.passwordDup && <div className='input-success'>Your Passwords Match!</div>}
          {this.state.password && this.state.passwordDup && this.state.password !== this.state.passwordDup && <div className='input-warning'>Passwords Do Not Match!</div>}
          {this.state.password !== '' && this.state.password === this.state.passwordDup ? <Button isExpanded>Submit</Button> : <Button isExpanded isDisabled onClick={(event) => this.doNOthing(event)}>Submit</Button>}
          {this.state.registrationFail && <Callout color={Colors.ALERT} className='text-center'>
            <h5>Unable to Register</h5>
            <p>Username taken, please choose another</p>
          </Callout>}
        </form>
      </div>
    )
  }
}

export default Register
