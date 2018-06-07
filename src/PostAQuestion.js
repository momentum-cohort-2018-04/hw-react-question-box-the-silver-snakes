/* global localStorage */
import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class PostAQuestion extends Component {
  constructor (props) {
    super()
    this.state = {
      questionId: null,
      userId: null,
      title: '',
      content: '',
      image: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const body = {
      questionId: this.state.questionId,
      userId: this.state.userId,
      title: this.state.title,
      content: this.state.content,
      image: this.state.image
    // Don't think we need date info here, as back end will generate it at time of creation, then we will need to retrieve it for the question/answer display page
  }
    console.log(body)
    event.preventDefault()
    request
      .post(`api/v1/questions`)
      .auth(localStorage.username, localStorage.password)
      .send(body)
      .end()
      // Go to view of question
  }

  handleChange (event) {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  render () {
    return (
      <div>
        <header>
        <ul>
          <li><a href="/"><img src='./images/whatisit.png' /></a></li>
          <li><a href="/user/id">My Questions</a></li>
          <li><a href="/questions/qid"></a>Last Q</li>
          <li><a href="/">Logout</a></li>
        </ul>
        {/* NAVBAR */}

        </header>
      </div>
      <div>
        <h2 className='header'>Post a Question</h2>
        <form className='postQuestionForm' type='submit' onSubmit={this.handleSubmit}>
        Title: <input type='text' name='title' onChange={this.handleChange} />
        Content: <input type='textarea' name='content' onChange={this.handleChange} />
        {/* Photo: How to get photos  */}
          <button className='submitButton' type='submit'>Submit</button>
          <button className='cancelButton' onClick={this.props.notAddingQuestion}>Cancel</button>
        </form>
      </div>
  }
}

export default PostAQuestion
