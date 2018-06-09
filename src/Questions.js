import React, {Component} from 'react'
// import request from 'superagent'
import {MediaObject, MediaObjectSection, Thumbnail} from 'react-foundation'
import db from './db'
import './foundation.css'

class Questions extends Component {
  constructor (props) {
    super()
    this.state = {
      token: window.localStorage.token ? window.localStorage.token : '',
      questions: db
    }
  }

  componentDidMount () {
    this.getQuestions()
  }

  getQuestions () {
    this.setState({question: db})
    // request
  //     .get('api/v1/questions')
  //     .set('Authorization', 'Bearer ' + this.state.token)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         this.setState({questions: db})
  //         // this.setState({questions: response.questions})
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('get Questions error', error.status)
  //     })
  }

  render () {
    console.log(this.state.questions)
    const questionList = this.state.questions.map((entry, index) => {
      const id = entry.user_id
      const title = entry.title
      const content = entry.content
      const image = entry.image
      const user = entry.user
      let shortForm
      let long
      if (content.length > 300) {
        long = true
        shortForm = content.slice(0, 300)
      } else { long = false }
      // console.log(id, title, content, image, user)
      return (
        <div className='question-each red' key={index} id={id}>
          <MediaObject stackForSmall>
            <MediaObjectSection isMiddle>
              {image && <Thumbnail className='question-preview-img' src={image} />}
            </MediaObjectSection>
            <MediaObjectSection isMiddle>
              <h5 className='question-title'>{title}</h5>
              <p className='text-right question-info'><small>asked by user</small> Number {user}</p>
              {long && <p className='question-content'>{shortForm} ...</p>}
              {!long && <p className='question-content'>{content}</p>}
            </MediaObjectSection>
          </MediaObject>
        </div>)
    })
    return (
      <div className='main'>
        <div className='title'><h1>Free For All~</h1></div>
        <div className='text-center'>
          {this.state.token && <button className='button'>Add Question</button>}
          {/* Button will be a link eventually properly */}
          {!this.state.token && 'Login to be able to ask Questions'}</div>
        <div className='questionsAll'>{questionList}</div>
      </div>
    )
  }
}

export default Questions
