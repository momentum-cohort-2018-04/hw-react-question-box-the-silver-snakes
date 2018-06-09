// /* global localStorage */
import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import PostAnswer from './PostAnswer'
import {Breadcrumbs, BreadcrumbItem, Button} from 'react-foundation'

class IndividualQuestionAndAnswers extends Component {
  constructor (props) {
    super()
    this.state = {
      userId: 4,
      questionId: 42,
      questionTitle: 'here is the QUESTION',
      questionContent: 'words go here that belong to the content of the question',
      questionCreateDate: '05 17 1910',
      questionImage: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Penguin_shuvuu.jpg',
      // userId: this.props.user_id,
      // questionId: this.props.id,
      // questionTitle: this.props.title,
      // questionContent: this.props.content,
      // questionCreateDate: this.props.created_at,
      // questionImage: this.props.image,
      answerArray: [],
      // token: window.localStorage.token,
      postAnAnswer: false
    }
    this.postAnAnswerToTrue = this.postAnAnswerToTrue.bind(this)
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
      .get(`api/v1/questions/${this.state.questionId}/answers`)
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
            <header className=''>
              <Breadcrumbs className='nav'>
                <BreadcrumbItem><a href='/'><img className='nav_img' src='https://tinyurl.com/yb7ek22r' /></a></BreadcrumbItem>
                {/* <BreadcrumbItem><a href='/'><img className='nav_img' src='./images/whatisit.png' /></a></BreadcrumbItem> */}
                <BreadcrumbItem className='nav-center'><a href='/user/id'>My Questions</a></BreadcrumbItem>
                <BreadcrumbItem className='nav-center'><a href='/questions/qid?'>Last Q</a></BreadcrumbItem>
                <BreadcrumbItem className='nav-center'><a href='/??'>Logout</a></BreadcrumbItem>
              </Breadcrumbs>
            </header>
          </div>
          <div className='hcenter'>
            <div className='questionDisplayDiv'>
              <h2 className='header'>{this.state.questionTitle}</h2>
              <p>Created on {this.state.questionCreateDate}</p>
              <p>{this.state.questionContent}</p>
              <img src={this.state.questionImage} />

              <div className='answerButtonDiv'>
                <Button isExpanded className='postAnswerButton' onClick={this.submitAnAnswerToTrue}>Answer</Button>
              </div>
            </div>

            <div clasName='answerDisplayDiv'>
              {this.state.answerArray.map((answer, i) => (
                <div key={answer.id} className='answerDiv'>
                  <h4>{answer.title}</h4>
                  <p>{answer.username} {answer.created_at}</p>
                  <p>{answer.content}</p>
                  <img src={answer.image} />
                  <Button>Upvote</Button>
                </div>
              )
              )}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default IndividualQuestionAndAnswers
