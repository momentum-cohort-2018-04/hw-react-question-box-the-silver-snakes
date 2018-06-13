// /* global localStorage */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Button, Label, Colors} from 'react-foundation'
import request from 'superagent'
import moment from 'moment'
import './App.css'

import verifyAnswer from './verifier'
import apiUrl from './apiUrl'

class IndividualQuestionAndAnswers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: window.localStorage.user ? window.localStorage.user : '',
      questionId: this.props.match.params.id,
      entry: '',
      token: window.localStorage.token ? window.localStorage.token : '',
      answerArray: []
    }
    this.verification = this.verification.bind(this)
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
    event.preventDefault()
    const tempAnswerId = Number(event.target.id)
    request
      .delete(apiUrl(`/api/v1/questions/${this.state.questionId}/answers/${event.target.id}`))
      .set('Authorization', 'Bearer ' + this.state.token)
      .then(response => {
        if (response.status === 204) {
          this.props.history.push(`/questions/${this.state.questionId}`)
          const subArray = this.state.entry.answers.filter((answer) => answer.id !== tempAnswerId)
          this.setState({answerArray: subArray})
        }
      })
  }

  deleteQuestion (event) {
    event.preventDefault()
    request
      .delete(apiUrl(`/api/v1/questions/${this.state.questionId}`))
      .set('Authorization', 'Bearer ' + this.state.token)
      .then(response => {
        this.props.history.push('/')
      })
  }
  verification (event, letter) {
    event.preventDefault()
    const tempAnswerId = Number(event.target.id)
    verifyAnswer(this.state.questionId, tempAnswerId, this.state.token, letter)
    const subArray = this.state.answerArray.map((answer) => {
      if (answer.id === tempAnswerId) {
        answer.verify = !answer.verify
        return answer
      } else { return answer }
    })
    this.setState({answerArray: subArray})
  }

  render () {
    const verifiedA = this.state.answerArray.filter(answer => answer.verify === true)
    console.log('verified', verifiedA)
    const regA = this.state.answerArray.filter(answer => answer.verify === false)
    console.log('reg', regA)
    const fullArray = verifiedA.concat(regA)
    console.log('full', fullArray)
    return (
      <React.Fragment>
        <div>
          <div className='hcenter'>
            <div className='questionDisplayDiv'>
              <h2 className='question-title-header'>{this.state.entry.title}</h2>
              <h4 className='question-subtitle'>Asked by {this.state.entry.username}</h4>
              <div className='question-info-main float-right'> Updated {moment(this.state.entry.updated).fromNow()}  |  Created on {moment(this.state.entry.created).format('MMM Do YYYY')}</div>
              <div className='clear' />
              <p className='question-content-main'>{this.state.entry.content}</p>
              {this.state.entry.image_url && <img className='question-image' src={this.state.entry.image_url} alt='Unknown' />}
              {this.state.entry.image_url === null && <img className='question-image' src='https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI3OTQ0fQ&s=1c03ebe02c8706d5cabccd3657f80559' alt='Unknown' />}
              <div className='answerButtonDiv'>
                {this.state.token && <Link to={`/questions/${this.state.entry.questionID}/answers/add`}><Button className='postAnswerButton' onClick={this.submitAnAnswerToTrue}>Submit an Answer</Button></Link>}
                {!this.state.token && <Button className='postAnswerButton' isHollow>Login to Submit an Answer</Button>}
                {Number(this.state.entry.userID) === Number(this.state.userId) && <Link to={`/questions/${this.state.entry.questionID}/edit`} ><Button className='edit-question-button'>Edit Question</Button></Link>}
                {Number(this.state.entry.userID) === Number(this.state.userId) && <Button id={this.state.questionId} isHollow onClick={(event) => this.deleteQuestion(event)}>Delete Question</Button>}
              </div>
            </div>

            <div className='answerDisplayDiv'>
              {fullArray.map((answer, i) => (
                <div key={i} className='answerDiv'>
                  <hr />
                  {answer.verify === true && <Label color={Colors.PRIMARY} className='verified'>Verified</Label>}
                  <h3 className='answer-title-header'>{answer.answerTitle}</h3>
                  <h5 className='answer-info-main'>Answered by {answer.answerUsername}</h5>
                  <p> {moment(answer.answerCreated).format('MMM Do YYYY')}</p>
                  <p className='answer-contenet-main'>{answer.answerContent}</p>
                  {answer.image_url && <img className='question-image' src={answer.image_url} alt='Unknown' />}
                  {answer.image_url === null && <img className='question-image' src='https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI3OTQ0fQ&s=1c03ebe02c8706d5cabccd3657f80559' alt='Unknown' />}

                  <br />
                  {answer.id === this.state.userId && <Link to='/edit/answer' ><Button className='edit-answer-button'>Edit Answer</Button></Link>}
                  {Number(this.state.entry.userID) === Number(this.state.userId) && answer.verify === false && <Button id={answer.id} onClick={(event) => this.verification(event, 't')}>Verify This Answer</Button>}
                  {Number(this.state.entry.userID) === Number(this.state.userId) && answer.verify === true && <Button id={answer.id} onClick={(event) => this.verification(event, 'f')}>Un-verify Answer</Button>}

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

export default IndividualQuestionAndAnswers
