// /* global localStorage */
import React, { Component } from 'react'
import './App.css'
// import request from 'superagent'
import moment from 'moment'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
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
  'content': 'Ut mollit aliqua do nisi consectetur. Eiusmod ea voluptate quis est excepteur. Excepteur deserunt ut velit minim cupidatat deserunt magna qui aliquip reprehenderit et laboris et. Magna pariatur esse anim do excepteur do aliqua ut.\r\n',
  'image': 'https://images.dog.ceo/breeds/bullterrier-staffordshire/n02093256_3582.jpg',
  'answers': [{
    'username': 'atorrez',
    'userID': 1,
    'title': 'tempor ea ex magna aliquip velit non dolor sint cupidatat',
    'content': 'Ut mollit aliqua do nisi consectetur. Eiusmod ea voluptate quis est excepteur. Excepteur deserunt ut velit minim cupidatat deserunt magna qui aliquip reprehenderit et laboris et. Magna pariatur esse anim do excepteur do aliqua ut.\r\n',
    'image': 'https://images.dog.ceo/breeds/bullterrier-staffordshire/n02093256_3582.jpg'
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
    this.editAnAnswerToTrue = this.editAnAnswerToTrue.bind(this)
    this.getAnswerArray = this.getAnswerArray.bind(this)
    this.transformDate = this.transformDate.bind(this)
    this.cancelSubmit = this.cancelSubmit.bind(this)
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

  editAnAnswerToTrue () {
    this.setState({editAnAnswer: true})
  }

  cancelSubmit () {
    this.setState({postAnAnswer: false})
  }

  render () {
    if (this.state.postAnAnswer) {
      return (
        <PostAnswer questionTitle={this.state.entry.title.bind(this)} questionContent={this.state.entry.content.bind(this)} questionImage={this.state.entry.image.bind(this)} cancelSubmit={this.cancelSubmit.bind(this)} />)
    } else if (this.state.editAnAnswer) {
      return (
        <EditAnswer />
        // Above needs what we're passing as props
      )
    } else {
      return (
        <div>
          <div className='hcenter'>
            <div className='questionDisplayDiv'>
              <h2 className='header'>{this.state.entry.title}</h2>
              <p>Created on {this.state.entry.created_at}</p>
              <p>{this.state.entry.content}</p>
              <img src={this.state.entry.image} />

              <div className='answerButtonDiv'>
                <Button isExpanded className='postAnswerButton' onClick={this.submitAnAnswerToTrue}>Answer</Button>
              </div>
            </div>
            <div clasName='answerDisplayDiv'>
              {this.state.answerArray.map((answer) => (
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

export default LastQuestion
