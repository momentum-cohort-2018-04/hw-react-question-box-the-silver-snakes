/// * global localStorage */
import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
// import { Link } from 'react-router-dom'
import {Button} from 'react-foundation'
import apiUrl from './apiUrl'

class PostQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: window.localStorage.user ? window.localStorage.user : '',
      token: window.localStorage.token ? window.localStorage.token : '',
      title: '',
      content: '',
      image: '',
      history: this.props.history
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImage = this.handleImage.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const body = {
      user_id: Number(this.state.userId),
      title: this.state.title,
      content: this.state.content,
      image: this.state.image
    }
    console.log(body)
    event.preventDefault()
    request
      .post(apiUrl(`/api/v1/questions`))
      .set('Authorization', 'Bearer ' + this.state.token)
      .send(body)
      .then((response) => {
        if (response.status === 200) {
          console.log('posted')
          this.state.history.push('/')
        }
      })
  }

  handleChange (event) {
    // event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  handleImage (event) {
    // event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    if (value) {
      this.setState({[name]: value})
    }
  }

  render () {
    return (
      <div>
        <div className='fullcenter'>
          <h2 className='header'>Post a Question</h2>
          <form className='postQuestionForm' type='submit' onSubmit={this.handleSubmit}>
            Title: <input type='text' name='title' onChange={this.handleChange} />
            Content: <textarea className='content-textarea' type='textarea' name='content' onChange={this.handleChange} />
            Photo URL: <input type='url' name='image' onChange={this.handleImage} />
            <Button className='submitButton' type='submit'>Submit</Button>
            <Button className='cancelButton' type='button' isHollow onClick={this.state.history.goBack}>Cancel</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default PostQuestion
