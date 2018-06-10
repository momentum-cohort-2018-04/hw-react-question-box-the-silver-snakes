import React, {Component} from 'react'
// import request from 'superagent'
import {MediaObject, MediaObjectSection, Thumbnail} from 'react-foundation'
import moment from 'moment'
import db from './db'
import './foundation.css'
import './App.css'

class Questions extends Component {
  constructor (props) {
    super()
    this.state = {
      token: window.localStorage.token ? window.localStorage.token : '',
      questions: db,
      cancelSubmit: false
    }
  }

  componentDidMount () {
    this.getQuestions()
  }

  cancelSubmit () {
    this.setState({cancelSubmit: true})
  }
  // Need to link above function to "PostQuesion"

  getQuestions () {
    this.setState({question: db})
    // request
  //     .get('api/v1/questions')
  //     .then((response) => {
  //       if (response.status === 200) {
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
      const userid = entry.userID
      const updated = moment(entry.updated_at).fromNow()
      const created = moment(entry.created_at).format('MMM Do YYYY')
      const title = entry.title
      const content = entry.content
      const image = entry.image
      const user = entry.userName
      const id = entry.id
      let shortForm
      let long
      if (content.length > 300) {
        long = true
        shortForm = content.slice(0, 300)
      } else { long = false }
      // console.log(id, title, content, image, user)
      return (
        <div className='question-each' key={index} id={id}>
          <MediaObject stackForSmall>
            <MediaObjectSection isMiddle>
              {image && <Thumbnail className='question-preview-img' src={image} />}
            </MediaObjectSection>
            <MediaObjectSection isMiddle>
              <h5 className='question-title'>{title}</h5>
              <p className='text-left question-info'>Posted by<strong> {user} </strong> on <strong>{created}</strong>, last updated<strong> {updated}</strong></p>
              {long && <p className='question-content'>{shortForm} ...</p>}
              {!long && <p className='question-content'>{content}</p>}
            </MediaObjectSection>
          </MediaObject>
        </div>)
    })
    return (
      <div className='main'>
        <div className='title'><h1>What is This <img className='title-logo' src='https://tinyurl.com/yb7ek22r' /></h1></div>
        <div className='text-center'>
          {this.state.token && <button className='button'>Add Question</button>}
          {/* Button will be a link eventually properly */}
          {/* Need to pass cancelSubmit as function with link */}
          {!this.state.token && 'Login to ask and answer questions'}</div>
        <div className='questionsAll'>{questionList}</div>
      </div>
    )
  }
}

export default Questions
