import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IndividualQuesetionAndAnswers from 'IndividualQuestionAndAnswers'

class PostAnswer extends Component {
  constructor (props) {
    super()
    this.state = {
      questionId: this.props.questionId,
      answerId: null, // When is this assigned?
      userId: '',
      title: '',
      content: '',
      image: 'https://tinyurl.com/yb7ek22r',
      donePosting: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImage = this.handleImage.bind(this)
    this.changePostingStatus = this.changePostingStatus.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const body = {
      questionId: this.props.questionId,
      answerId: this.state.answerId,
      userId: this.state.userId,
      title: this.state.title,
      content: this.state.content,
      image: this.state.image,
      token: window.localStorage.token
    // Don't think we need date info here, as back end will generate it at time of creation, then we will need to retrieve it for the question/answer display page?
    }
    console.log(body)
    event.preventDefault()
    request
      .post(`api/v1/questions/{this.state.questionId}/answers`)
      .set('Authorization', 'Bearer ' + this.state.token)
      .send(body)
      .end()
      // Go to view of question
    this.changePostingStatus()
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

  changePostingStatus () {
    this.setState({donePosting: true})
  }

  render () {
    if (this.state.donePosting) {
      return (
        <IndividualQuesetionAndAnswers  />)
    } else {
      return (
        <div>
          <div>
            <header>
              <ul>
                <li><a href='/'><img src='./images/whatisit.png' /></a></li>
                <li><a href='/user/id'>My Questions</a></li>
                <li><a href='/questions/qid?'>Last Q</a></li>
                <li><a href='/??'>Logout</a></li>
              </ul>
            </header>
          </div>
          <div>
            <h2 className='header'>Answer a Question</h2>
            <form className='postAnswerForm' type='submit' onSubmit={this.handleSubmit}>
            Title: <input type='text' name='title' onChange={this.handleChange} />
            Answer: <input type='textarea' name='content' onChange={this.handleChange} />
            Photo URL: <input type='url' name='image' onChange={this.handleImage} />
              <button className='submitButton' type='submit'>Submit</button>
              <button className='cancelButton' onClick={this.props.notAddingQuestion}>Cancel</button>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default PostAnswer
