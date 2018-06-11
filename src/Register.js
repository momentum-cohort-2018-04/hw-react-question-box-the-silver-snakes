import React, {Component} from 'react'
import {Button, Callout, Colors} from 'react-foundation'
import request from 'superagent'
import apiUrl from './apiUrl'
import './foundation.css'

class Register extends Component {
  constructor (props) {
    super(props)
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

  attemptLogin (event) {
    event.preventDefault()
    if (this.state.username !== '' && this.state.password !== '' && this.state.password === this.state.passwordDup) {
      console.log('ACTUAL register attempted')
      request
        .post(apiUrl('/api/v1/users'))
        .send({
          'username': this.state.username,
          'password': this.state.password
        })
        /*
      .then((error) => {
      if (error.status === 201) {
        console.log('???? did good???', error.status)
        // console.log('201 Good?', response.status)
        request
          .post(apiUrl(`/api/v1/sessions`))
          .send({
            'username': this.state.username,
            'password': this.state.password
          })
          .then((response) => {
            if (response.status === 201) {
              window.localStorage.token = response.body.api_token
              this.setState({token: response.body.api_token,
                register: true})
            }
          })
          .catch((error) => {
            console.log(error)
            console.log(error.status)
      })
      }
      })
      */
        .catch((error) => {
          if (error.status === 422) {
            this.setState({registrationFail: true})
          }
          if (error.status === 201) {
            console.log('Register Cleared, Logging in', error.status)
            // THIS IS DUMB
            request
              .post(apiUrl(`/api/v1/sessions`))
              .send({
                'username': this.state.username,
                'password': this.state.password
              })
              .then((response) => {
                if (response.status === 201) {
                  window.localStorage.token = response.body.api_token
                  this.setState({token: response.body.api_token,
                    registrationFail: false})
                  this.props.update()
                  this.props.history.push('/')
                }
              })
              .catch((error) => {
                console.log('Inner error', error.status)
              })
          }
        })
    } else { return null }
  }
  render () {
    return (
      <div className='fullcenter'>
        <div className='title'><h1>Register</h1></div>
        <form onSubmit={(event) => this.attemptLogin(event)}>
          <label>Username</label>
          <input type='text' name='username' placeholder='create your username' onChange={(event) => this.handleChange(event)} />
          <label>Password</label>
          <input type='text' name='password' placeholder='create your password' onChange={(event) => this.handleChange(event)} />
          <label>Password Confirmation</label>
          <input type='text' name='passwordDup' placeholder='confirm your password' onChange={(event) => this.handleChange(event)} />
          {this.state.password !== '' && this.state.password === this.state.passwordDup && <div className='input-success'>Your Passwords Match!</div>}
          {this.state.password && this.state.passwordDup && this.state.password !== this.state.passwordDup && <div className='input-warning'>Passwords Do Not Match!</div>}
          {this.state.password !== '' && this.state.password === this.state.passwordDup ? <Button isExpanded>Submit</Button> : <Button isExpanded isDisabled>Submit</Button>}
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
