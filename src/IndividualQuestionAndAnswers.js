// /* global localStorage */
import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import PostAnswer from './PostAnswer'
import EditAnswer from './EditAnswer'
import {Breadcrumbs, BreadcrumbItem, Button} from 'react-foundation'

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
    super()
    this.state = {
      // userId: 4, ????
      // entry: this.props.entry,
      entry: spiderpug,
      answerArray: [],
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

  editAnAnswerToTrue () {
    this.setState({editAnAnswer: true})
  }

  cancelSubmit () {
    this.setState({postAnAnswer: false})
  }

  render () {
    if (this.state.postAnAnswer) {
      return (
        <PostAnswer questionTitle={this.state.questionTitle.bind(this)} questionContent={this.state.questionContent.bind(this)} questionImage={this.state.questionImage.bind(this)} cancelSubmit={this.cancelSubmit.bind(this)} />)
    } else if (this.state.editAnAnswer) {
      return (
        <EditAnswer />
        // Above needs what we're passing as props
      )
    } else {
      return (
        <div>
          <div>
            <header className=''>
              <Breadcrumbs className='nav'>
                <BreadcrumbItem><a href='/'><img className='nav_img' src='https://tinyurl.com/yb7ek22r' /></a></BreadcrumbItem>
                {/* <BreadcrumbItem><a href='/'><img className='nav_img' src='./images/whatisit.png' /></a></BreadcrumbItem> */}
                <BreadcrumbItem className='nav-center'><a href='/user/id'>My Questions</a></BreadcrumbItem>
                {/* ^^^ pass userid by this.state.entry.user_id */}
                <BreadcrumbItem className='nav-center'><a href='/questions/qid?'>Last Q</a></BreadcrumbItem>
                <BreadcrumbItem className='nav-center'><a href='/??'>Logout</a></BreadcrumbItem>
              </Breadcrumbs>
            </header>
          </div>
          <div className='hcenter'>
            <div className='questionDisplayDiv'>
              <h2 className='question-title-header'>{this.state.entry.title}</h2>
              <p className='question-info-main'>Created on {this.state.entry.created_at}</p>
              <p className='question-content-main'>{this.state.entry.content}</p>
              <img className='question-image' src={this.state.entry.image} />
              <Button className='edit-question-button'>Edit Question</Button>

              <div className='answerButtonDiv'>
                <Button className='postAnswerButton' onClick={this.submitAnAnswerToTrue}>Submit an Answer</Button>
              </div>
            </div>

            <div clasName='answerDisplayDiv'>
              <div key='123' className='answerDiv'>
                <h4>It's a pugantula</h4>
                <p>SmartyMcSmartyPants July 20 1910</p>
                <p>This is totally a pugantula. They are native to North America and hunt wolves and deer. They form herds and take down humans as a last resort due to humans overhunting their primary prey sources. I would stay away from that park if I were you. Here's a photo of one trying to take down a human on its own.</p>
                <img src='https://i.pinimg.com/originals/9b/f4/fa/9bf4fa149f6dfa7dc8d009b5efd60d9e.jpg' />
                <Button isExpanded className='verify-button'>Verify This Answer</Button>
              </div>
              <div key='124' className='answerDiv'>
                <h4>It's a common black house spider</h4>
                <p>PantsonFire July 21 1910</p>
                <p>SmartyMcSmartyPants is totally off. Pugantulas are a fawn color and this species is black. It is clearly a common house spider. I've attached a photo for reference.</p>
                <img className='question-image' src='https://museumsvictoria.com.au/spiders/images/medium/mn16974.jpg' />
                <Button isExpanded>Upvote</Button>
              </div>

              {/* <div clasName='answerDisplayDiv'>
              {this.state.answerArray.map((answer, i) => (
              //     <div key={answer.id} className='answerDiv'>
                       <hr />
                  <h4 className='answer-title-header'>{answer.title}</h4>
                  <p className='answer-info-main'>{answer.username} {answer.created_at}</p>
                  <p className='answer-contenet-main'>{answer.content}</p>
                  <img className='question-image' src={answer.image} />
                  <Button >Verify This Answer</Button>
              // </div> */}
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
