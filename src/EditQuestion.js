import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IndividualQuestionAndAnswers from './IndividualQuestionAndAnswers'

import {Breadcrumbs, BreadcrumbItem} from 'react-foundation'
import './foundation.css'

class EditQuestion extends Component {
  constructor (props) {
    super()
    this.state = {
      questionId: this.props.questionId,
      userId: this.props.userId,
      title: this.props.title,
      content: this.props.content,
      image: this.props.image,
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
      questionId: this.state.questionId,
      userId: this.state.userId,
      title: this.state.title,
      content: this.state.content,
      image: this.state.image,
      token: window.localStorage.token
    }
    console.log(body)
    event.preventDefault()
    request
      .put(`api/v1/questions/${this.state.questionId}`)
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
        <IndividualQuestionAndAnswers questionId={this.state.questionId} />)
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
          <div>
            <h2 className='header'>Edit My Question</h2>
            <form className='postAnswerForm' type='submit' onSubmit={this.handleSubmit}>
            Title: <input type='text' name='title' value='this.state.title' onChange={this.handleChange} />
            Question: <input type='textarea' name='content' value='this.state.content' onChange={this.handleChange} />
            Photo URL: <input type='url' name='image' value='this.state.image' onChange={this.handleImage} />
              <button className='submitButton' type='submit'>Submit</button>
              <button className='cancelButton' onClick={this.props.cancelSubmit}>Cancel</button>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default EditQuestion
