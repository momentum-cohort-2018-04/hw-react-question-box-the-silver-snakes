/// * global localStorage */
import React, { Component } from 'react'
import './App.css'
// import request from 'superagent'
import { BrowserRouter as Link } from 'react-router-dom'
import {Button} from 'react-foundation'
import IndividualQuestionAndAnswers from './IndividualQuestionAndAnswers'

class PostQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questionId: null, // When is this assigned?
      userId: '',
      title: '',
      content: '',
      image: 'https://tinyurl.com/yb7ek22r',
      donePosting: false,
      history: this.props.history
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
      image: this.state.image
    }
    console.log(body)
    event.preventDefault()
    // request
    //   .post(`api/v1/questions`)
    //   .set('Authorization', 'Bearer ' + this.state.token)
    //   .send(body)
    //   .then((response) => {
    //     if (response.status === 201) {
    //       console.log('posted')
    //       this.state.history.push('/')
    //     }
    //   })
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

  render () {
    if (this.state.donePosting) {
      return (
        <IndividualQuestionAndAnswers questionId={this.questionId} />)
    } else {
      return (
        <div>
          <div className='fullcenter'>
            <h2 className='header'>Post a Question</h2>
            <form className='postQuestionForm' type='submit' onSubmit={this.handleSubmit}>
            Title: <input type='text' name='title' onChange={this.handleChange} />
            Content: <textarea className='content-textarea' type='textarea' name='content' onChange={this.handleChange} />
            Photo URL: <input type='url' name='image' onChange={this.handleImage} />
              <Button className='submitButton' type='submit'>Submit</Button>
              <Link to='/'><Button className='cancelButton' type='button' isHollow onClick={this.state.history.goBack}>Cancel</Button></Link>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default PostQuestion
