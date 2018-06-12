// /* global localStorage */
import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {Button} from 'react-foundation'

import apiUrl from './apiUrl'

class LastQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: window.localStorage.user ? window.localStorage.user : '',
      questionId: window.localStorage.last ? window.localStorage.last : '',
      entry: '',
      token: window.localStorage.token ? window.localStorage.token : '',
      answerArray: []
    }
    this.verifyAnswer = this.verifyAnswer.bind(this)
    console.log('questionId', this.state.questionId)
  }

  componentDidMount () {
    request
      .get(apiUrl(`/api/v1/questions/${this.state.questionId}`))
      .set('Authorization', 'Bearer ' + this.state.token)
      .then(response => {
        console.log(response.body)
        this.setState({
          entry: response.body,
          answerArray: response.body.answers
        })
      })
  }

  deleteAnswer (event) {
    console.log('answer deleted', apiUrl(`/api/v1/questions/${this.state.questionId}/answers/${event.target.id}`))
    // request
    //   .delete(apiUrl(`/api/v1/questions/${this.state.questionId}/answers/${event.target.id}`))
    //   .set('Authorization', 'Bearer ' + this.state.token)
    //   .then(response => {
    //     console.log(response)
    //   })
  }

  deleteQuestion () {
    console.log('deleted', apiUrl(`/api/v1/questions/${this.state.questionId}`))
    // request
    //   .delete(apiUrl(`/api/v1/questions/${this.state.questionId}`))
    //   .set('Authorization', 'Bearer ' + this.state.token)
    //   .then(response => {
    //     console.log(response)
    //   })
  }

  verifyAnswer (event) {
    console.log('question ID', this.state.questionId)
    console.log('answer ID', event.target.id)
  }

  render () {
    return (
      <React.Fragment>
        <div>
          <div className='hcenter'>
            <div className='questionDisplayDiv'>
              <h2 className='question-title-header'>{this.state.entry.title}</h2>
              <div className='question-info-main float-left'>Updated {moment(this.state.entry.updated).fromNow()}</div>
              <div className='question-info-main float-right'>Created on {moment(this.state.entry.created).format('MMM Do YYYY')}</div>
              <div className='clear' />
              <p className='question-content-main'>{this.state.entry.content}</p>
              {this.state.entry.image_url && <img className='question-image' src={this.state.entry.image_url} alt='Unknown' />}
              {this.state.entry.image_url === null && <img className='question-image' src='https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI3OTQ0fQ&s=1c03ebe02c8706d5cabccd3657f80559' alt='Unknown' />}
              <div className='answerButtonDiv'>
                <Link to={`/questions/${this.state.entry.questionID}/answers/add`}><Button className='postAnswerButton' onClick={this.submitAnAnswerToTrue}>Submit an Answer</Button></Link>
                {Number(this.state.entry.userID) === Number(this.state.userId) && <Link to={`/questions/${this.state.entry.questionID}/edit`} ><Button className='edit-question-button'>Edit Question</Button></Link>}
                {Number(this.state.entry.userID) === Number(this.state.userId) && <Button id={this.state.questionId} isHollow onClick={() => this.deleteQuestion()}>Delete Answer</Button>}
              </div>
            </div>
            <div className='answerDisplayDiv'>
              {this.state.answerArray.map((answer, i) => (
                <div key={i} className='answerDiv'>
                  <hr />
                  <h3 className='answer-title-header'>{answer.answerTitle}</h3>
                  <h5 className='answer-info-main'>{answer.answerUsername}</h5>
                  <p> {moment(answer.answerCreated).format('MMM Do YYYY')}</p>
                  <p className='answer-content-main'>{answer.answerContent}</p>
                  {answer.image_url && <img className='question-image' src={answer.image_url} alt='Unknown' />}
                  {answer.image_url === null && <img className='question-image' src='https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI3OTQ0fQ&s=1c03ebe02c8706d5cabccd3657f80559' alt='Unknown' />}
                  <br />
                  {Number(this.state.entry.userID) === Number(this.state.userId) && <Button id={answer.id} onClick={(event) => this.verifyAnswer(event)}>{console.log(this.state.entry.userID, this.state.userId)}Verify This Answer</Button>}
                  {Number(answer.answerUserID) === Number(this.state.userId) && <Link to='/edit/answer' ><Button className='edit-answer-button'>Edit Answer</Button></Link>}
                  {Number(answer.answerUserID) === Number(this.state.userId) && <Button id={answer.id} isHollow onClick={(event) => this.deleteAnswer(event)}>Delete Answer</Button>}
                </div>
              )
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default LastQuestion
