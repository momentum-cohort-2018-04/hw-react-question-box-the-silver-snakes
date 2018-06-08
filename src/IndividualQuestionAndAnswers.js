/* global localStorage */
import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class IndividualQuestionAndAnswers extends Component {
  constructor (props) {
    super()
    this.state = {
      // answerFormExpanded: false,
      questionId: null,
      questionTitle: '',
      questionContent: '',
      questionCreateDate: '',
      questionImage: ''
      answerArray: []
    }
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.expandAnswerForm = this.expandAnswerForm.bind(this)
  }

  // handleSubmit (event) {
  //   event.preventDefault()
  //   const body = {
  //     questionId: this.state.questionId,
  //     userId: this.state.userId,
  //     title: this.state.title,
  //     content: this.state.content,
  //     image: this.state.image
  //   // Don't think we need date info here, as back end will generate it at time of creation, then we will need to retrieve it for the question/answer display page?
  //   }
  //   console.log(body)
  //   event.preventDefault()
  //   request
  //     .post(`api/v1/questions`)
  //     .auth(localStorage.username, localStorage.password)
  //     .send(body)
  //     .end()
  //     // Go to view of question
  // }

  // handleChange (event) {
  //   event.preventDefault()
  //   const name = event.target.name
  //   const value = event.target.value
  //   this.setState({[name]: value})
  // }

  getQuestionInfo() {
    request
      .get(`api/v1/questions/questionid`)
      .auth(localStorage.username, localStorage.password)
      .then(response => {
        let contactListArray = response.body
        console.log(contactListArray)
        this.setState({contactList: contactListArray})
      })
  }

  render () {
    return (
      <div>
        <div>
          <header>
            <ul>
              <li><a href='/'><img src='./images/whatisit.png' /></a></li>
              <li><a href='/user/id'>My Questions</a></li>
              <li><a href='/questions/qid'>Last Q</a></li>
              <li><a href='/??'>Logout</a></li>
            </ul>
          </header>
        </div>
        <div>
          <h2 className='header'>Title{this.props.title}</h2>
          <p>Created on {this.props.createDate}
          <p>{this.props.content}</p>
          <img src={this.props.image} />
          <button className='postAnswerButton' onClick={this.expandAnswerForm}>Answer</button>
          {/* Conditionally rendered answer form section?? */}
          <div>
            {/* Answer Text */}
          </div>
        </div>
      </div>
    )
  }
}

export default IndividualQuestionAndAnswers
