import React, { Component } from 'react'
import request from 'superagent'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Button} from 'react-foundation'
import './foundation.css'
import './App.css'
import apiUrl from './apiUrl'

class EditAnswer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: window.localStorage.token ? window.localStorage.token : '',
      id: window.localStorage.user ? window.localStorage.user : '',
      questionId: this.props.match.params.id,
      // answerId: this.props.questionanswerId,
      userId: this.props.questionuserId,
      title: '',
      content: '',
      image: '',
      donePosting: false,
      history: this.props.history
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImage = this.handleImage.bind(this)
    this.getAnswer = this.getAnswer.bind(this)
    // this.changePostingStatus = this.changePostingStatus.bind(this)
    // this.getQuestion()
  }

  handleSubmit (event) {
    event.preventDefault()
    const body = {
      questionId: this.state.questionId,
      answerId: this.state.answerId,
      userId: this.state.userId,
      title: this.state.title,
      content: this.state.content,
      image: this.state.image,
      token: window.localStorage.token
    }
    console.log(body)
    event.preventDefault()
    // request
      .put(apiUrl(`api/v1/questions/${this.state.questionId}/answers/${this.state.answerId}`))
      .set('Authorization', 'Bearer ' + this.state.token)
      .send(body)
      .then((response) => {
        if (response.status === 200) {
          // this.changePostingStatus()
          this.state.history.push(`/questions/${this.state.questionId}/answers/${this.state.answerId}`)
        }
      })
  }

  handleChange (event) {
    // event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  handleImage (event) {
    // event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    if (value) {
      this.setState({[name]: value})
    }
  }

  getAnswer () {
    request
      .get(apiUrl(`/api/v1/questions/${this.state.questionId}/answers/${this.state.answerId}`))
      .set('Authorization', 'Bearer ' + this.state.token)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          this.setState({title: response.body.title,
            content: response.body.content,
            image: response.body.image_url})
        }
      })
      .catch((error) => {
        console.log('get Question error', error.status)
      })
  }

  render () {
    return (<Router >
      <div>
        <Route exact path='/edit/answer' render={() =>
          <div>
            <h2 className='header'>Edit An Answer</h2>
            <form className='postAnswerForm' type='submit' onSubmit={this.handleSubmit}>
            Title: <input type='text' name='title' value={this.state.title} onChange={this.handleChange} />
            Answer: <textarea className='content-textarea' type='textarea' name='content' value={this.state.content} onChange={this.handleChange} />
            Photo URL: <input type='url' name='image' value={this.state.image} onChange={this.handleImage} />
              <Button className='submitButton' type='submit'>Submit</Button>
              <Button className='cancelButton' isHollow onClick={this.state.history.goBack}>Cancel</Button>
            </form>
          </div>} />
      </div>
    </Router>)
  }
}

export default EditAnswer
