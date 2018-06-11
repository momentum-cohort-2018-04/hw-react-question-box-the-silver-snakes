import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
// import moment from 'moment'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Button} from 'react-foundation'
import './foundation.css'
import apiUrl from './apiUrl'

class EditQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: window.localStorage.token ? window.localStorage.token : '',
      questionId: this.props.questionId,
      userId: this.props.questionuserId,
      title: this.props.questionTitle,
      content: this.props.questionContent,
      image: this.props.questionImage,
      donePosting: false,
      history: this.props.history
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImage = this.handleImage.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const body = {
      questionId: this.state.questionId,
      userId: this.state.userId,
      title: this.state.title,
      content: this.state.content,
      image: this.state.image,
      token: window.localStorage.token
    }
    console.log(body)
    request
      .put(apiUrl(`/questions/${this.state.questionId}`))
      .set('Authorization', 'Bearer ' + this.state.token)
      .send(body)
      .then((response) => {
        if (response.status === 201) {
          // this.changePostingStatus()
          this.state.history.push('/')
        }
      })
      .end()
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

  render () {
    return (
      <Router >
        <div>
          <Route exact path='/edit/question' render={() =>
          // Above line should go to '/questions/questionid/edit', I can't get the syntax
            <div>
              <h2 className='header'>Edit My Question</h2>
              <form className='postAnswerForm' type='submit' onSubmit={this.handleSubmit}>
            Title: <input type='text' name='title' value={this.state.title} onChange={this.handleChange} />
            Question: <textarea className='content-textarea' type='textarea' name='content' value={this.state.content} onChange={this.handleChange} />
            Photo URL: <input type='url' name='image' value={this.state.image} onChange={this.handleImage} />
                <Button className='submitButton' type='submit'>Submit</Button>
                <Button className='cancelButton' onClick={this.state.history.goBack} isHollow>Cancel</Button>
              </form>
            </div>} />
        </div>
      </Router>
    )
  }
}

export default EditQuestion
