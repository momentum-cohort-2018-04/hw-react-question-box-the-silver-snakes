// /* global localStorage */
import React, { Component } from 'react'
import './App.css'
// import request from 'superagent'
import moment from 'moment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PostAnswer from './PostAnswer'
import EditAnswer from './EditAnswer'
import EditQuestion from './EditQuestion'
import {Button} from 'react-foundation'
import dbA from './dbA'

const spiderpug = {
  'id': 42,
  'title': 'Spider Identification',
  'content': 'What kind of spider is this?! I saw it at the park today and I am concerned that we have mutant spiders in our neighborhood. It didn\'t seem aggressive, but it did follow this lady around, possibly stalking her.',
  'created_at': '2018-06-09T01:34:41.300Z',
  'updated_at': '2018-06-09T01:34:41.300Z',
  'image': 'http://cdn.trendhunterstatic.com/thumbs/pug-spider.jpeg',
  'user_id': 4
}

class IndividualQuestionAndAnswers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // questions: this.props.questions,
      questionId: this.props.history.location.pathname.split('/')[2],
      userId: window.localStorage.user ? window.localStorage.user : '2',
      // question: this.props.entry,
      // entry: '',
      entry: spiderpug,
      answerArray: dbA,
      // token: window.localStorage.token,
      postAnAnswer: false,
      editAnAnswer: false
    }
    this.selectQuestionEntry()
    this.getAnswerArray = this.getAnswerArray.bind(this)
    this.transformDate = this.transformDate.bind(this)
  }

  selectQuestionEntry () {
    const newArray = this.state.questions.filter(entry => entry.questionID === this.state.questionId)
    this.setState({entry: newArray})
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
    // request
    //   .get(`api/v1/questions/${this.state.questionId}/answers`)
    //   // .set('Authorization', 'Bearer ' + this.state.token)
    //   .then(response => {
    //     let answerArray = response.body
    //     this.setState({answerArray: answerArray})
    //   })
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact path='/post/answer' render={({history}) => <PostAnswer history={history} questionTitle={this.state.entry.title} questionContent={this.state.entry.content} questionImage={this.state.entry.image} cancelSubmit={this.cancelSubmit.bind(this)} />} />
          <Route exact path='/edit/answer' render={({history}) => <EditAnswer history={history} />} />
          <Route exact path='/edit/question' render={({history}) => <EditQuestion history={history} />} />
          <Route exact path={`/question/${this.state.questionId}`} render={({history}) =>
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
            </React.Fragment>} />
        </div>
      </Router>)
  }
}

export default IndividualQuestionAndAnswers
