// /* global localStorage */
import React, { Component } from 'react'
import './App.css'
// import request from 'superagent'
import moment from 'moment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PostAnswer from './PostAnswer'
import EditAnswer from './EditAnswer'
import {Button} from 'react-foundation'

const test = {
  'username': 'atorrez',
  'questionID': 12,
  'userID': 1,
  'created': '2018-06-09T01:35:00.751Z',
  'updated': '2018-06-09T01:35:00.751Z',
  'title': 'tempor ea ex magna aliquip velit non dolor sint cupidatat',
  'content': 'Ut mollit aliqua do nisi consectetur. Eiusmod ea voluptate quis est excepteur. Excepteur deserunt ut velit minim cupidatat deserunt magna qui aliquip reprehenderit et laboris et. Magna pariatur esse anim do excepteur do aliqua ut.',
  'image': 'https://images.dog.ceo/breeds/bullterrier-staffordshire/n02093256_3582.jpg',
  'answers': [{
    'username': 'atorrez',
    'userID': 1,
    'title': 'tempor ea ex magna aliquip velit non dolor sint cupidatat',
    'content': 'Ut mollit aliqua do nisi consectetur. Eiusmod ea voluptate quis est excepteur. Excepteur deserunt ut velit minim cupidatat deserunt magna qui aliquip reprehenderit et laboris et. Magna pariatur esse anim do excepteur do aliqua ut.',
    'image': 'https://images.dog.ceo/breeds/collie-border/n02106166_7454.jpg'
  }, {
    'username': 'francis',
    'userID': 2,
    'title': 'Mit aliqua do nisi consectolor sint cupidatat',
    'content': 'Voluptatet mollit aliqua do nisi consectetur. Eiusmod deserunt ut velit minim cupidatat deserunt magna qui ',
    'image': 'https://images.dog.ceo/breeds/setter-irish/n02100877_592.jpg'
  }]
}

class LastQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.questionid,
      entry: test,
      // entry: '',
      answerArray: test.answers,
      // answerArray: [],
      // token: window.localStorage.token,
      postAnAnswer: false,
      editAnAnswer: false
    }
    this.postAnAnswerToTrue = this.postAnAnswerToTrue.bind(this)
    // this.editAnAnswerToTrue = this.editAnAnswerToTrue.bind(this)
    this.getAnswerArray = this.getAnswerArray.bind(this)
    this.transformDate = this.transformDate.bind(this)
    this.cancelSubmit = this.cancelSubmit.bind(this)
  }

  componentDidUpdate () {
    this.getAnswerArray()
    // this.transformDate()
  }

  transformDate () {
    let date = moment(this.state.questionCreateDate).format('MMMM Do YYYY')
    this.setState({questionCreateDate: date})
  }

  getAnswerArray () {
    // request
    //   .get(`localhost:3000/api/v1/questions/${this.state.id}`)
    //   .set('Authorization', 'Bearer ' + this.state.token)
    //   .then(response => {
    //     this.setState({entry: response})
    //     this.setState({answerArray: response.answers})
    //   })
  }

  postAnAnswerToTrue () {
    this.setState({submitAnAnswer: true})
  }

  // editAnAnswerToTrue () {
  //   this.setState({editAnAnswer: true})
  // }

  cancelSubmit () {
    this.setState({postAnAnswer: false})
  }

  render () {
    return (<Router>
      <div>
        <Route exact path='/post/answer' render={({history}) => <PostAnswer history={history} />} />
        <Route exact path='/edit/answer' render={({history}) => <EditAnswer history={history} questionTitle={this.state.entry.title} questionContent={this.state.entry.content} questionImage={this.state.entry.image}
          questionanswerId={this.state.id} questionuserId={this.state.user_id} />} />
        <Route exact path='/last' render={({history}) =>
          <React.Fragment>
            <div>
              <div className='hcenter'>
                <div className='questionDisplayDiv'>
                  <h2 className='question-title-header'>{this.state.entry.title}</h2>
                  <p className='question-info-main'>Created on {this.state.entry.created_at}</p>
                  <p className='question-content-main'>{this.state.entry.content}</p>
                  <Link to='/edit/answer' ><Button className='edit-question-button'>Edit Question</Button></Link>
                  <br />
                  <img className='question-image' src={this.state.entry.image} alt='Unknown' />

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

export default LastQuestion
