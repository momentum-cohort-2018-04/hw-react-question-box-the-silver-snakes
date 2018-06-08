/* global localStorage */
import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PostAnswer from 'PostAnswer'

class IndividualQuestionAndAnswers extends Component {
  constructor (props) {
    super()
    this.state = {
      userId: this.props.user_id,
      questionId: this.props.id,
      questionTitle: this.props.title,
      questionContent: this.props.content,
      questionCreateDate: this.props.created_at,
      questionImage: this.props.image,
      answerArray: [],
      token: window.localStorage.token,
      postAnAnswer: false
    }

    this.postAnAnswerToTrue = this.submitAnAnswerToTrue.bind(this)
    this.getAnswerArray = this.getAnswerArray.bind(this)
    this.transformDate = this.transformDate.bind(this)
  }

  componentDidUpdate () {
    this.getAnswerArray()
    this.transformDate()
  }

  transformDate () {
    let date = moment(this.state.questionCreateDate).format('MMMM Do YYYY')
    this.setState({questionCreateDate: date})
  }

  getAnswerArray () {
    request
      .get(`api/v1/questions/${questionid}/answers`)
      .set('Authorization', 'Bearer ' + this.state.token)
      .then(response => {
        let answerArray = response.body
        this.setState({answerArray: answerArray})
      })
  }

  postAnAnswerToTrue () {
    this.setState({submitAnAnswer: true})
  }

  render () {
    if (this.state.postAnAnswer) {
      return (
        <PostAnswer questionTitle={this.state.questionTitle.bind(this)} questionContent={this.state.questionContent.bind(this)} questionImage={this.state.questionImage.bind(this)} />)
    } else {
      return (
        <div>
          <div>
            <header className='navbar'>
              <ul>
                <li><a href='/'><img src='./images/whatisit.png' /></a></li>
                <li><a href='/user/id'>My Questions</a></li>
                <li><a href='/questions/qid'>Last Q</a></li>
                <li><a href='/??'>Logout</a></li>
              </ul>
            </header>
          </div>
          <div className='questionDisplayDiv'>
            <h2 className='header'>{this.props.title}</h2>
            <p>Created on {this.props.questionCreateDate}</p>
            <p>{this.props.questionContent}</p>
            <img src={this.props.questionImage} />
          </div>
          <div className='answerButtonDiv'>
            <button className='postAnswerButton' onClick={this.submitAnAnswerToTrue}>Answer</button>
          </div>
          <div clasName='answerDisplayDiv'>
            {this.state.answerArray.map((answer, i) => (
              <div key={answer.id} className='answerDiv'>
                <h4>{answer.title}</h4>
                <p>{answer.username} {answer.created_at}</p>
                <p>{answer.content}</p>
                <img src={answer.image} />
                <button>Upvote</button>
              </div>
            )
            )}
          </div>
        </div>
      )
    }
  }
}

export default IndividualQuestionAndAnswers
