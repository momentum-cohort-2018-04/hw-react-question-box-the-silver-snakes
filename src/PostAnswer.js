import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IndividualQuestionAndAnswers from './IndividualQuestionAndAnswers'

import {Breadcrumbs, BreadcrumbItem, Button} from 'react-foundation'
import './foundation.css'

class PostAnswer extends Component {
  constructor (props) {
    super()
    this.state = {
      // questionId: this.props.questionId,
      // userId: '',
      // title: '',
      // content: '',
      image: 'https://tinyurl.com/yb7ek22r',
      donePosting: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImage = this.handleImage.bind(this)
    this.changePostingStatus = this.changePostingStatus.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const body = {
      questionId: this.props.questionId,
      answerId: this.state.answerId,
      userId: this.state.userId,
      title: this.state.title,
      content: this.state.content,
      image: this.state.image,
      token: window.localStorage.token,
      donePosting: false
    }
    console.log(body)
    event.preventDefault()
    request
      .post(`api/v1/questions/${this.state.questionId}/answers`)
      .set('Authorization', 'Bearer ' + this.state.token)
      .send(body)
      .then((response) => {
        if (response.status === 201) {
          this.changePostingStatus()
        }
      })
      .end()
  }

  handleChange (event) {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  handleImage (event) {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    if (value) {
      this.setState({[name]: value})
    }
  }

  changePostingStatus () {
    this.setState({donePosting: true})
  }

  render () {
    if (this.state.donePosting) {
      return (
        <IndividualQuestionAndAnswers questionId={this.questionId} />)
    } else {
      return (
        <div>
          <div>
            <header>
              <div className='breadcrumbs-example'>
                <nav aria-label='You are here:' role='navigation'>
                  <Breadcrumbs>
                    <BreadcrumbItem><a href='/'><img src='./images/whatisit.png' /></a></BreadcrumbItem>
                    <BreadcrumbItem><a href='/user/id'>My Questions</a></BreadcrumbItem>
                    <BreadcrumbItem><a href='/questions/qid?'>Last Q</a></BreadcrumbItem>
                    <BreadcrumbItem><a href='/??'>Logout</a></BreadcrumbItem>
                  </Breadcrumbs>
                </nav>
              </div>
            </header>
          </div>
          <div className='fullCenter'>
            <h2 className='header'>Answer a Question</h2>
            <form className='postAnswerForm' type='submit' onSubmit={this.handleSubmit}>
            Title: <input type='text' name='title' onChange={this.handleChange} />
            Answer: <input type='textarea' className='content-textarea' name='content' onChange={this.handleChange} />
            Photo URL: <input type='url' name='image' onChange={this.handleImage} />
              <Button className='submitButton' type='submit'>Submit</Button>
              <Button className='cancelButton' onClick={this.props.cancelSubmit} isHollow >Cancel</Button>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default PostAnswer
