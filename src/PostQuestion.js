/* global localStorage */
import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Breadcrumbs, BreadcrumbItem, Button} from 'react-foundation'

class PostQuestion extends Component {
  constructor (props) {
    super()
    this.state = {
      questionId: null, // When is this assigned?
      userId: '',
      title: '',
      content: '',
      image: 'https://tinyurl.com/yb7ek22r'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImage = this.handleImage.bind(this)
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
      .post(`api/v1/questions`)
      .set('Authorization', 'Bearer ' + this.state.token)
      .send(body)
      .end()
      // Go to view of question
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

  render () {
    return (
      <div>
        <div>
          <header>
            <Breadcrumbs className='nav'>
              <BreadcrumbItem><a href='/'><img className='nav_img' src='https://tinyurl.com/yb7ek22r' /></a></BreadcrumbItem>
              {/* <BreadcrumbItem><a href='/'><img className='nav_img' src='./images/whatisit.png' /></a></BreadcrumbItem> */}
              <BreadcrumbItem className='nav-center'><a href='/user/id'>My Questions</a></BreadcrumbItem>
              <BreadcrumbItem className='nav-center'><a href='/questions/qid?'>Last Q</a></BreadcrumbItem>
              <BreadcrumbItem className='nav-center'><a href='/??'>Logout</a></BreadcrumbItem>
            </Breadcrumbs>
          </header>
        </div>
        <div className='fullcenter'>
          <h2 className='header'>Post a Question</h2>
          <form className='postQuestionForm' type='submit' onSubmit={this.handleSubmit}>
            Title: <input type='text' name='title' onChange={this.handleChange} />
            Content: <textarea className='content-textarea' type='textarea' name='content' onChange={this.handleChange} />
            Photo URL: <input type='url' name='image' onChange={this.handleImage} />
            <Button className='submitButton' type='submit'>Submit</Button>
            <Button className='cancelButton' onClick={this.props.notAddingQuestion} isHollow >Cancel</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default PostQuestion
