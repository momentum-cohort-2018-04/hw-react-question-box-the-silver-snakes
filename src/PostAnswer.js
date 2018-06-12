import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
// import moment from 'moment'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Button} from 'react-foundation'
import './foundation.css'
import apiUrl from './apiUrl'

class PostAnswer extends Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      questionId: this.props.match.params.id,
      userId: window.localStorage.user ? window.localStorage.user : '',
      token: window.localStorage.token ? window.localStorage.token : '',
      title: '',
      content: '',
      image_url: '',
      history: this.props.history
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImage = this.handleImage.bind(this)
    this.goRoot = this.goRoot.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const body = {
      question_id: Number(this.state.questionId),
      user_id: Number(this.state.userId),
      title: this.state.title,
      content: this.state.content,
      image_url: this.state.image_url
    }
    console.log(body)
    request
      .post(apiUrl(`/api/v1/questions/${this.state.questionId}/answers`))
      .set('Authorization', 'Bearer ' + this.state.token)
      .send(body)
      .then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          this.props.history.push('/')
        }
      })
  }

  handleChange (event) {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  handleImage (event) {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    if (value) {
      this.setState({[name]: value})
    }
  }

  goRoot () {
    this.props.history.push(`/questions/${this.state.questionId}`)
  }

  render () {
    return (
      <div className='fullcenter'>
        <h2 className='header'>Answer a Question</h2>
        <form className='postAnswerForm' onSubmit={this.handleSubmit} >
            Title: <input type='text' name='title' onChange={this.handleChange} />
            Answer: <textarea className='content-textarea' type='textarea' name='content' onChange={this.handleChange} />
            Photo URL: <input type='url' name='image_url' onChange={this.handleImage} />
          <Button className='submitButton' type='submit'>Submit</Button>
          <Button className='cancelButton' isHollow onClick={this.goRoot}>Cancel</Button>
        </form>

      </div>
    )
  }
}

export default PostAnswer
