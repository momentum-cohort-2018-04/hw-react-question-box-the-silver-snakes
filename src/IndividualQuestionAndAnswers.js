// /* global localStorage */
import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import apiUrl from './apiUrl'

import PostAnswer from './PostAnswer'
import EditAnswer from './EditAnswer'
import EditQuestion from './EditQuestion'
import {Button} from 'react-foundation'
// import dbA from './dbA'

class IndividualQuestionAndAnswers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: window.localStorage.user ? window.localStorage.user : '',
      questionId: this.props.match.params.id,
      // entry: this.props.questions.filter(entry => Number(entry.id) === Number(this.props.match.params.id))[0],
      token: window.localStorage.token ? window.localStorage.token : ''
    }
    // this.getAnswerArray = this.getAnswerArray.bind(this)
    // console.log(this.state.userId)
    // console.log(this.props.questions)
    // console.log(this.props.match.params.id)
    // console.log(this.props.questions.filter(entry => Number(entry.id) === Number(this.props.match.params.id)))
    // console.log(this.state.entry)
    console.log('question ID', this.state.questionId)
  }

  componentDidUpdate () {
    console.log('?')
    console.log(`api/v1/questions/${this.state.questionId}`)
    // request
    //   .get(apiUrl(`api/v1/questions/${this.state.questionId}`))
    //   .set('Authorization', 'Bearer ' + this.state.token)
    //   .then(response => {
    //     console.log(response)
    //     // let answerArray = response.body
    //     this.setState({answerArray: []})
    //   })
  }

  render () {
    return (
      null
      /*
      <React.Fragment>
        <div>
          <div className='hcenter'>
            <div className='questionDisplayDiv'>
              <h2 className='question-title-header'>{this.state.entry.title}</h2>
              <p className='question-info-main'>Created on {this.state.entry.created_at}</p>
              <p className='question-content-main'>{this.state.entry.content}</p>
              <img className='question-image' src={this.state.entry.image} alt='Unknown' />
              <Link to='/edit/question' ><Button className='edit-question-button'>Edit Question</Button></Link>

              <div className='answerButtonDiv'>
                <Link to='/post/answer'><Button className='postAnswerButton' onClick={this.submitAnAnswerToTrue}>Submit an Answer</Button></Link>
              </div>
            </div>

            <div clasName='answerDisplayDiv'>
              {this.state.answerArray.map((answer, i) => (
                <div key={answer.id} className='answerDiv'>
                  <hr />
                  <h4 className='answer-title-header'>{answer.title}</h4>
                  <p className='answer-info-main'>{answer.username} {answer.created_at}</p>
                  <p className='answer-contenet-main'>{answer.content}</p>
                  <img className='question-image' src={answer.image} alt='identification image' />
                  <br />
                  {answer.id === this.state.userId && <Link to='/edit/answer' ><Button className='edit-answer-button'>Edit Answer</Button></Link>}
                  <Button>Verify This Answer</Button>
                </div>
              )
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
      */)
  }
}

export default IndividualQuestionAndAnswers
